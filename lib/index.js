/**
 * @module leekslazylogger-fastify
 * @author eartharoid <contact@eartharoid.me>
 * @description leekslazylogger fastify plugin
 * @copyright 2020 Isaac Saunders (eartharoid)
 * @license MIT
 */

const Logger = require('leekslazylogger');
const plugin = require('fastify-plugin');
const onFinished = require('on-finished');

const reqDuration = start => {
	const NS_PER_SEC = 1e9; // convert to nanoseconds
	const NS_TO_MS = 1e6; // convert to milliseconds
	const diff = process.hrtime(start);
	return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

let format = '{method} {status-colour}{status} &7{path} {time-colour}({time})';

module.exports = class FastifyLogger extends Logger {
	constructor(options) {
		super(options);
		this.verbose(`[${this.timestamp()} | LOGGER] Fastify extension enabled`);

		this.fastify = plugin((fastify, options, next) => {

			fastify.addHook('onRequest', (req, res, done) => {

				done();

				const { method, protocol, routerPath, hostname, url } = req;

				onFinished(res, (err, res) => {
					const { statusCode } = res;
					let statusColour = statusCode >= 500 ? '&4' // server error, red
						: statusCode >= 400 ? '&6' // client error, yellow
							: statusCode >= 300 ? '&3' // redirects, cyan
								: statusCode >= 200 ? '&2' // success, green
									: '&f';

					let ms = reqDuration(process.hrtime()).toLocaleString();
					let timeColour = ms >= 10 ? '&c' // took too long, light red
						: ms >= 1 ? '&e' // over 1ms is a little slow, light yellow
							: '&a'; // speed™️, light green
					let time = `${ms} ms`;

					let text = (options.format || format)
						.replace(/{method}/gmi, method)
						.replace(/{protocol}/gmi, protocol.toUpperCase())
						.replace(/{route}/gmi, routerPath)
						.replace(/{path}/gmi, new URL(`${protocol}://${hostname}${url}`).pathname)
						.replace(/{status-colou?r}/gmi, statusColour)
						.replace(/{status}/gmi, statusCode)
						.replace(/{time-colou?r}/gmi, timeColour)
						.replace(/{time}/gmi, time);

					this.console(this.format(text));
				});
			});

			next();
		}, {
			fastify: '^3.5.0',
			name: 'leekslazylogger-fastify'
		});
	}
};
