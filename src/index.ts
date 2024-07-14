import fastify, { FastifyInstance } from 'fastify';
import pino from 'pino';

import pkg from 'package.json';

import { getIndexRoute } from 'src/routes/get-index';
import { getPingRoute } from 'src/routes/get-ping';

const name = `${pkg.name}@${pkg.version}`;
const logger = pino({
  name,
});
logger.info('Starting app');

const server: FastifyInstance = fastify({
  logger: {
    name,
  },
});

server.addHook('onSend', (_request, reply, _payload, done) => {
  reply.header('X-App-Name', pkg.name);
  reply.header('X-App-Version', pkg.version);
  done();
});

server.get(getPingRoute.routePath, getPingRoute.routeHandler);
server.get(getIndexRoute.routePath, getIndexRoute.routeHandler);

server.listen(
  {
    port: parseInt(process.env.SERVE_PORT || '9000'),
    host: '0.0.0.0',
  },
  err => {
    if (err) {
      server.log.error(err);
      throw err;
    }
  },
);
