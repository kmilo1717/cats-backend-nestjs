import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../../../shared/decorators/public.decorator';

/**
 * JWT authentication guard.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  /**
   * Constructor for JwtAuthGuard.
   * @param reflector - The reflector to access metadata.
   */
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * Check if the request is authorized.
   * @param context - The execution context.
   * @returns True if the request is authorized, false otherwise.
   */
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}