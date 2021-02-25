const fastify = require('fastify')();
const port = 3000;

const Logger = require('../lib');
const log = new Logger({
	name: 'My fastify server',
	fastify: {
		type: 'warn'
	}
});

fastify.register(log.fastify, {
	format: '{method} {protocol} &7{path} &6{route} {status-colour}{status} {time-colour}({time})'
}); // logger

fastify.get('/', (req, res) => {
	res.send(log.options);
});

fastify.listen(port, () => {
	log.info(`Example app listening at http://localhost:${port}`);
});