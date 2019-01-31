import {Document, Schema} from 'mongoose';

export const EndpointSchema = new Schema({
	environment: String,
	name: String,
	url: String,
});

export interface Endpoint extends Document {
	readonly environment: string;
	readonly name: string;
	readonly url: string;
}