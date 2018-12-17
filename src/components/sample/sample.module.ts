import { Module } from '@nestjs/common';

import { SampleStore } from './sample.store';
import { SampleController } from './sample.controller';
import { HelloGenerator } from '../../common/services/hello.generator';

@Module({
	imports: [],
	controllers: [SampleController],
	providers: [SampleStore, HelloGenerator],
})
export class SampleModule {
}
