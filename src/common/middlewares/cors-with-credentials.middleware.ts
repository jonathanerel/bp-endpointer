import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import * as cors from 'cors';

@Injectable()
export class CorsWithCredentialsMiddleware implements NestMiddleware {
	resolve(...args: any[]): MiddlewareFunction {
		return cors({credentials: true, origin: '*'});
	}
}