import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'apihrDS',
  connector: 'mysql',
  url: 'mysql://apihr:P@ssw0rd@127.0.0.1/apihr',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: ''
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ApihrDsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'apihrDS';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.apihrDS', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
