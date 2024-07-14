import { FastifyReply, FastifyRequest } from 'fastify';

const routePath = '/ping';

const routeHandler = async (_request: FastifyRequest, reply: FastifyReply) => {
  return reply.code(200).send('pong');
};
export const getPingRoute = {
  routePath,
  routeHandler,
};
