import { ApiImplicitQuery, ApiCreatedResponse } from '@nestjs/swagger';
import { Body, Delete, Get, HttpCode, Param, Post, Query } from '@nestjs/common';

import { EndpointDto, GetEndpointsDto } from './models/endpoint.dto';
import { Router } from '../../../../nestjs-extensions';
import { IEndpointerCache } from './models/endpoint.types';
import { EndpointerController } from './endpointer.controller';

@Router()
export class EndpointerRouter {
	constructor(private readonly endpointerController: EndpointerController) {
	}

	@Get()
	async get(@Query() { expand, environment }: GetEndpointsDto)
		: Promise<IEndpointerCache | [EndpointDto]> {
		return await this.endpointerController.get(environment, expand);
	}

	@Post(':environment')
	@ApiCreatedResponse({ description: 'Successfully added the endpoint to the environment' })
	async addEndpoint(@Param('environment') environment: string, @Body() endpoint: EndpointDto): Promise<EndpointDto> {
		return this.endpointerController.addEndpoint(environment, endpoint);
	}

	@Delete(':environment/:endpointName')
	async removeEndpoint(@Param('environment') environment: string, @Param('endpointName') endpointName: string): Promise<boolean> {
		return this.endpointerController.removeEndpoint(environment, endpointName);
	}

	@Post('clear-cache')
	@HttpCode(204)
	clearCache(): void {
		this.endpointerController.clearCache();
	}
}
