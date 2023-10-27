import { Test, TestingModule } from '.pnpm/@nestjs+testing@10.0.0_@nestjs+common@10.0.0_@nestjs+core@10.0.0_@nestjs+platform-express@10.0.0/node_modules/@nestjs/testing';
import { INestApplication } from '.pnpm/@nestjs+common@10.0.0_class-transformer@0.5.1_class-validator@0.14.0_reflect-metadata@0.1.13_rxjs@7.8.1/node_modules/@nestjs/common';
import * as request from '.pnpm/@types+supertest@2.0.12/node_modules/@types/supertest';
import { AppModule } from '../src/app.module

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
