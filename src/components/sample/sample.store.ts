import { Injectable } from '@nestjs/common';
import { HelloGenerator } from '../../common/hello.generator';

@Injectable()
export class SampleStore {
	constructor(private readonly helloGenerator: HelloGenerator) {
	}

	root(): string {
		return `${this.helloGenerator.generate()} World!`;
	}
}
