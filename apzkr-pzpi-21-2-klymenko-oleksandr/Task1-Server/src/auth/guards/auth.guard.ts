import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { FirebaseApp, InjectFirebase } from 'src/firebase';
import { Public } from '../decorators/public.decorator';

declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email: string;
        isAdmin: boolean;
      };
    }
  }
}

export class AuthGuard implements CanActivate {
  constructor(
    @InjectFirebase() private readonly firebase: FirebaseApp,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const isPublic = this.reflector.get<boolean>(Public, context.getHandler());
    if (isPublic) {
      return true;
    }

    const { authorization }: any = request.headers;

    if (!authorization || authorization.trim() === '') {
      throw new UnauthorizedException();
    }
    const authToken = authorization.replace(/bearer/gim, '').trim();

    try {
      const { uid, email, admin } =
        await this.firebase.auth.verifyIdToken(authToken);
      request['user'] = {
        uid,
        email,
        isAdmin: !!admin,
      };
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
