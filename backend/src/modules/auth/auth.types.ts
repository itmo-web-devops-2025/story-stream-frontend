import { User } from '@/modules/user/entities/user.entity';
import { FastifyRequest } from 'fastify';

export type FastifyRequestWithUser = FastifyRequest & {
  user: User;
};
