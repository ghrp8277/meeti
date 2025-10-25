import { DataSource } from 'typeorm';
import {
  CategorySeed,
  TosSeed,
  TosGroupSeed,
  TosGroupMapperSeed,
} from './seeds';
import * as entities from '../entities';

async function runSeeds() {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: 'dev.sqlite',
    entities: Object.values(entities),
    synchronize: true,
    logging: true,
  });

  try {
    await dataSource.initialize();
    console.log('데이터베이스 연결 성공');

    const categorySeed = new CategorySeed();
    await categorySeed.run(dataSource);

    const tosGroupSeed = new TosGroupSeed();
    await tosGroupSeed.run(dataSource);

    const tosSeed = new TosSeed();
    await tosSeed.run(dataSource);

    const tosGroupMapperSeed = new TosGroupMapperSeed();
    await tosGroupMapperSeed.run(dataSource);

    console.log('시드 데이터 생성 완료');
  } catch (error) {
    console.error('시드 데이터 생성 실패:', error);
  } finally {
    await dataSource.destroy();
  }
}

runSeeds();
