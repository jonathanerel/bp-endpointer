import { MongooseModule } from '@nestjs/mongoose';
import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';

import { EndpointerModule } from './components/endpointer/endpointer.module';
import { CorsWithCredentialsMiddleware } from './common/middlewares/cors-with-credentials.middleware';

@Module({
	imports: [EndpointerModule, MongooseModule.forRoot('mongodb://localhost/endpointer')],
	controllers: [],
	providers: [],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(CorsWithCredentialsMiddleware)
			.forRoutes({
				path: '*', method: RequestMethod.ALL,
			});
	}
}
