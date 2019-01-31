import * as cors from 'cors';
import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

@Injectable()
export class CorsWithCredentialsMiddleware implements NestMiddleware {
	resolve(...args: any[]): MiddlewareFunction {
		return cors({credentials: true, origin: '*'});
	}
}