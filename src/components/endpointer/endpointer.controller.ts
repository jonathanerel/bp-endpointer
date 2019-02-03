import { map, keys } from 'lodash';
import { Injectable } from '@nestjs/common';

import { EndpointDto } from './models/endpoint.dto';
import { EndpointerStore } from './endpointer.store';
import { EndpointerCache } from './endpointer-cache.service';

@Injectable()
export class EndpointerController {
	constructor(private readonly endpointerStore: EndpointerStore, private readonly endpointerCache: EndpointerCache) {
	}

	async get(environment: string, expand: boolean): Promise<{ [environmentName: string]: [EndpointDto] } | [EndpointDto]> {
		if (environment && this.endpointerCache.get(environment)) {
			return this.endpointerCache.get(environment);
		}

		if (!environment && this.endpointerCache.exist()) {
			if (expand) {
				return this.endpointerCache.getAll();
			} else {
				return EndpointerController.collapseEndpoints(this.endpointerCache.getAll());
			}
		}

		await this.updateCache(environment);

		return this.get(environment, expand);
	}

	async addEndpoint(environment: string, endpoint: EndpointDto): Promise<EndpointDto> {
		const newEndpoint = await this.endpointerStore.addEndpoint(environment, endpoint);
		await this.updateCache(environment);
		return newEndpoint;
	}

	async removeEndpoint(environment: string, name: string): Promise<boolean> {
		const removeStatus = this.endpointerStore.removeEndpoint(environment, name);
		await this.updateCache(environment);
		return removeStatus;
	}

	clearCache(): void {
		this.endpointerCache.clear();
	}

	private async updateCache(environment: string) {
		const endpoints = await this.endpointerStore.get(environment);

		if (environment) {
			this.endpointerCache.setEnvironment(environment, endpoints[environment]);
		} else {
			this.endpointerCache.set(endpoints);
		}
	}

	private static collapseEndpoints(endpoints) {
		return keys(endpoints);
	}
}