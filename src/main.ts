import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const options = new DocumentBuilder()
		.setTitle('Endpointer')
		.setDescription('Nest.js microservice to contain dictionary of the microserivces endpoints, environment based')
		.setVersion('0.0.0')
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);
	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		transform: true,
	}));

	await app.listen(3000);
}

bootstrap();
