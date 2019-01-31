import { Body, Delete, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { ApiImplicitParam, ApiImplicitQuery, ApiCreatedResponse } from '@nestjs/swagger';

import { EndpointDto } from './models/endpoint.dto';
import { EndpointerStore } from './endpointer.store';
import { Router } from '../../../../nestjs-extensions';

@Router()
export class EndpointerRouter {
	constructor(private readonly endpointerStore: EndpointerStore) {
	}

	@Get()
	@ApiImplicitQuery({
		name: 'environment',
		description: 'Endpoints environment',
		required: false,
		type: String,
	})
	@ApiImplicitQuery({
		name: 'expand',
		description: 'Determines whether to return all the data of each environment or just the names',
		required: false,
		type: Boolean,
	})
	async get(@Query('environment') environment: string, @Query('expand') expand: boolean = false)
		: Promise<{ [environmentName: string]: [EndpointDto] } | [EndpointDto]> {
		return await this.endpointerStore.get(environment, expand);
	}

	@Post(':environment')
	@ApiCreatedResponse({ description: 'Successfully added the endpoint to the environment' })
	async addEndpoint(@Param('environment') environment: string, @Body() endpoint: EndpointDto): Promise<EndpointDto> {
		return this.endpointerStore.addEndpoint(environment, endpoint);
	}

	@Delete(':environment/:endpointName')
	async removeEndpoint(@Param('environment') environment: string, @Param('endpointName') endpointName: string): Promise<boolean> {
		return this.endpointerStore.removeEndpoint(environment, endpointName);
	}

	@Post('clear-cache')
	@HttpCode(204)
	clearCache(): void {
		this.endpointerStore.clearCache();
	}
}
