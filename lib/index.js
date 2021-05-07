/**
 * @module leekslazylogger-fastify
 * @author eartharoid <contact@eartharoid.me>
 * @description leekslazylogger fastify plugin
 * @copyright 2021 Isaac Saunders (eartharoid)
 * @license MIT
 */

const Logger = require('leekslazylogger');
const plugin = require('fastify-plugin');
const onFinished = require('on-finished');

const reqDuration = start => {
	const NS_PER_SEC = 1e9;
	const NS_TO_MS = 1e6;
	const diff = process.hrtime(start);
	return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

module.exports = class FastifyLogger extends Logger {
	constructor(o) {
		super(o);
		this.register('fastify');
		this.options.fastify = [];
	}

	/**
 	 * Create a new fastify plugin
 	 * @param {*} [o] - plugin options
 	 */
	fastify(o = {}) {
		let id = this.options.fastify.length;
		this.options.fastify[id] = {};
		return plugin((fastify, options = {}, next) => {
			let level = o.level || options.level;
			let format = o.format || options.format;
			this.options.fastify[id].level = level || 'info';
			this.options.fastify[id].format = format || '{status-colour}{status} &r{method} &7{path} {time-colour}({time})';
			fastify.addHook('onRequest', (req, res, done) => {
				done();

				const { method, protocol, routerPath, hostname, url } = req;

				onFinished(res, (err, res) => {
					const { statusCode } = res;
					let statusColour = statusCode >= 500
							? '&4' // server error, red
							: statusCode >= 400
								? '&6' // client error, yellow
								: statusCode >= 300
									? '&3' // redirects, cyan
									: statusCode >= 200
										? '&2' // success, green
										: '&f',
						ms = reqDuration(process.hrtime()).toLocaleString(),
						timeColour = ms >= 10
							? '&c' // took too long, light red
							: ms >= 1
								? '&e' // over 1ms is a little slow, light yellow
								: '&a', // speed™️, light green
						time = `${ms} ms`;
					let format = typeof this.options.fastify[id].format === 'function'
						? this.options.fastify[id].format(req)
						: this.options.fastify[id].format;
					let text = format
						.replace(/{+ ?method ?}+/gmi, method)
						.replace(/{+ ?protocol ?}+/gmi, protocol.toUpperCase())
						.replace(/{+ ?route ?}+/gmi, routerPath || '*')
						.replace(/{+ ?path}/gmi, new URL(`${protocol}://${hostname}${url}`).pathname)
						.replace(/{+ ?status-colou?r ?}+/gmi, statusColour)
						.replace(/{+ ?status ?}+/gmi, statusCode)
						.replace(/{+ ?time-colou?r ?}+/gmi, timeColour)
						.replace(/{+ ?time ?}+/gmi, time);

					this[this.options.fastify[id].level](Logger.format(text));
				});
			});

			next();
		}, {
			fastify: '^3.12.0',
			name: 'leekslazylogger-fastify'
		});
	}
};
