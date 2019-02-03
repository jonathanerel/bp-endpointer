import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class EndpointDto {
	@ApiModelProperty()
	readonly name: string;

	@ApiModelProperty()
	readonly url: string;

	constructor({ name, url }: EndpointDto) {
		this.url = url;
		this.name = name;
	}
}

export class GetEndpointsDto {
	@Transform(endpointDto => {
		try{
			return JSON.parse(endpointDto);
		}
		catch (e) {
			return endpointDto;
		}
	})
	@IsOptional()
	@IsBoolean()
	@ApiModelProperty({
		description: 'Determines whether to return all the data of each environment or just the names',
		required: false,
		default: true,
		type: Boolean,
	})
	readonly expand: boolean;

	@IsString()
	@IsOptional()
	@ApiModelProperty({
		description: 'Endpoints environment',
		required: false,
		type: String,
	})
	readonly environment: string;
}