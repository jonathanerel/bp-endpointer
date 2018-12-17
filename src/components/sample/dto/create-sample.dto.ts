import { ApiModelProperty } from '@nestjs/swagger';

export class 	CreateSameDto {
	@ApiModelProperty()
	readonly name: string;

	@ApiModelProperty()
	readonly content: string;
}