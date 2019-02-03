import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EndpointerStore } from './endpointer.store';
import { EndpointerRouter } from './endpointer.router';
import { EndpointSchema } from './models/endpoint.schema';
import { EndpointerCache } from './endpointer-cache.service';
import { EndpointerController } from './endpointer.controller';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Endpoint', schema: EndpointSchema }])],
	controllers: [EndpointerRouter],
	providers: [EndpointerStore, EndpointerCache, EndpointerController],
})
export class EndpointerModule {
}
