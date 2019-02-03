import { Injectable } from '@nestjs/common';

import { IEndpointerCache } from './models/endpoint.types';
import { EndpointDto } from './models/endpoint.dto';

@Injectable()
export class EndpointerCache {
	private cache: IEndpointerCache;

	get(environment: string) {
		return this.cache[environment];
	}

	getAll() {
		return this.cache;
	}

	set(cache: IEndpointerCache) {
		this.cache = cache;
	}

	setEnvironment(environmentName: string, environmentCache: [EndpointDto]) {
		this.cache[environmentName] = environmentCache;
	}

	clear() {
		this.cache = undefined;
	}

	exist() {
		return !!this.cache;
	}
}