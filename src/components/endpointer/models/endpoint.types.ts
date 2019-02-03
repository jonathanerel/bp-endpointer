import { EndpointDto } from './endpoint.dto';

export interface IEndpointerCache { [environmentName: string]: [EndpointDto]; }