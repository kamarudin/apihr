import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ApihrDsDataSource} from '../datasources';
import {Person, PersonRelations} from '../models';



export class PersonRepository extends DefaultCrudRepository<
  Person,
  typeof Person.prototype.id,
  PersonRelations
  > {
  constructor(@inject('datasources.apihrDS') dataSource: ApihrDsDataSource) {
    super(Person, dataSource);
  }

  async findByNric(nric: string): Promise<Person[]> {
    const nricFilter = {
      where: {
        nric: nric,
      },
    };
    const foundNric = await this.find(nricFilter);
    return foundNric;
  }
}
