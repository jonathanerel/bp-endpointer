import { ApiModelProperty } from '@nestjs/swagger';

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