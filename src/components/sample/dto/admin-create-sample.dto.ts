import { ApiModelProperty } from '@nestjs/swagger';

export class AdminCreateSameDto {
	@ApiModelProperty()
	readonly name: string;

	@ApiModelProperty()
	readonly content: string;
}