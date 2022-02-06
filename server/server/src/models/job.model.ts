import {belongsTo, Entity, model, property} from '@loopback/repository';
import { Client, Freelancer } from '.';

@model({settings: {strict: false}})
export class Job extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @belongsTo(() => Client)
  clientId: string;

  @belongsTo(() => Freelancer)
  freelancerId: string;

  @property({
    type: 'boolean',
    required: true,
  })
  state?: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Job>) {
    super(data);
  }
}

export interface JobRelations {
  // describe navigational properties here
}

export type JobWithRelations = Job & JobRelations;