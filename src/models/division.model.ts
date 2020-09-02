import {Entity, model, property} from '@loopback/repository';

@model()
export class Division extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;


  constructor(data?: Partial<Division>) {
    super(data);
  }
}

export interface DivisionRelations {
  // describe navigational properties here
}

export type DivisionWithRelations = Division & DivisionRelations;
