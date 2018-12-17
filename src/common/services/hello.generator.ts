import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloGenerator {
	generate(): string {
		return 'Hello';
	}
}
