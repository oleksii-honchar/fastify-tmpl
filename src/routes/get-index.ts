import { FastifyReply, FastifyRequest } from 'fastify';

const routePath = '/';

const routeHandler = async (_request: FastifyRequest, reply: FastifyReply) => {
  return reply.code(200).send('Hello, world!');
};

export const getIndexRoute = {
  routePath,
  routeHandler,
};
