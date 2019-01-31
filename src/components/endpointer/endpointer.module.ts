import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EndpointerStore } from './endpointer.store';
import { EndpointerRouter } from './endpointer.router';
import { EndpointSchema } from './models/endpoint.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Endpoint', schema: EndpointSchema }])],
	controllers: [EndpointerRouter],
	providers: [EndpointerStore],
})
export class EndpointerModule {
}
