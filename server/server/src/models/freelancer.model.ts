import {Entity, hasMany, model, property} from '@loopback/repository';
import { Job } from '.';

@model({settings: {strict: false}})
export class Freelancer extends Entity {
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
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Freelancer>) {
    super(data);
  }
}

export interface FreelancerRelations {
  // describe navigational properties here
}

export type FreelancerWithRelations = Freelancer & FreelancerRelations;
