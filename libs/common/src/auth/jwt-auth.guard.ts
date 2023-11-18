import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AUTH_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { map, tap } from 'rxjs';
import { UserDto } from '../dtos';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if (!jwt) {
      return false;
    }
    this.authClient
      .send<UserDto>('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
      );
  }
}
