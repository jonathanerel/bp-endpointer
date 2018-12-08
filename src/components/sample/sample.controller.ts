import { Get, Controller } from '@nestjs/common';
import { SampleStore } from './sample.store';

@Controller()
export class SampleController {
	constructor(private readonly sampleStore: SampleStore) {
	}

	@Get()
	root(): string {
		return this.sampleStore.root();
	}
}
