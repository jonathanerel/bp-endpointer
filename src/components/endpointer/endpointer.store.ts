import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { groupBy, map, mapValues } from 'lodash';

import { EndpointDto } from './models/endpoint.dto';
import { Endpoint } from './models/endpoint.schema';

@Injectable()
export class EndpointerStore {
	constructor(@InjectModel('Endpoint') private readonly endpointModel: Model<Endpoint>) {
	}

	async get(environment: string, expand: boolean): Promise<{ [environmentName: string]: [EndpointDto] } | [EndpointDto]> {
		const endpoints = await this.endpointModel.find(environment ? { environment } : {}).exec();
		if (environment) {
			return EndpointerStore.mapEndpointsToDto(endpoints);
		} else {
			if (expand) {
				return mapValues(groupBy(endpoints, 'environment'), environmentEndpoints => EndpointerStore.mapEndpointsToDto(environmentEndpoints));
			} else {
				return map(endpoints, 'environment');
			}
		}
	}

	private static mapEndpointsToDto(endpoints: [Endpoint]): [EndpointDto] {
		return map(endpoints, (endpoint => new EndpointDto(endpoint)));
	}

	async addEndpoint(environment: string, endpoint: EndpointDto): Promise<EndpointDto> {
		const newEndpoint = { ...endpoint, environment };
		const possibleExistingEndpoint = { environment, name: endpoint.name };
		return new EndpointDto(await this.endpointModel.findOneAndUpdate(possibleExistingEndpoint, newEndpoint, { upsert: true, new: true }));
	}

	async removeEndpoint(environment: string, name: string): Promise<boolean> {
		return !!await this.endpointModel.findOneAndDelete({ environment, name });
	}

	clearCache(): void {
	}
}
