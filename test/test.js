const fastify = require('fastify');
const app1 = fastify();
const app2 = fastify();

const requestIp = require('request-ip');

const Logger = require('../lib');
const log = new Logger({
	name: 'Fastify test',
	levels: {
		http: {
			format: '[{timestamp} | INFO] [HTTP] {text}'
		}
	}
});

app1.register(log.fastify({
	level: 'http'
})); // logger
app2.register(log.fastify(), {
	format: req => `TWO {method} ${requestIp.getClientIp(req)} {protocol} &7{path} &6{route} {status-colour}{status} {time-color}({time})`,
	level: 'http'
}); // logger

app1.get('/', (req, res) => {
	res.send(log.options);
});
app2.get('/', (req, res) => {
	res.send(log.options);
});

app1.get('/:page', (req, res) => {
	res.send({
		status: '200 OK'
	});
});
app2.get('/:page', (req, res) => {
	res.send({
		status: '200 OK'
	});
});

app1.listen(3000, () => {
	log.info('Example app 1 listening at http://localhost:3000');
});
app2.listen(3001, () => {
	log.info('Example app 2 listening at http://localhost:3001');
});