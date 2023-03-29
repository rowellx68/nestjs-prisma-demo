import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { PrismaExceptionsFilter } from '@/shared/filters/prisma-exceptions.filter';
import { PrismaClient } from '@prisma/client';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();

    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.product.deleteMany();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalFilters(new PrismaExceptionsFilter());
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  describe('(GET) /products', () => {
    it('returns empty list if no products', async () => {
      const { statusCode, body } = await request(app.getHttpServer()).get(
        '/products',
      );

      expect(statusCode).toBe(200);
      expect(body).toEqual([]);
    });

    it('returns expected result with products', async () => {
      await prisma.product.create({
        data: {
          id: '5eb3f6a4-2dd0-46dd-aa8c-8a0c730d2c68',
          name: 'Raspberry & White Chocolate Blondies',
          description: 'Lorem ipsum',
          image: 'some-file.png',
          price: 25.0,
        },
      });

      const { statusCode, body } = await request(app.getHttpServer()).get(
        '/products',
      );

      expect(statusCode).toBe(200);
      expect(body).toMatchSnapshot();
    });
  });

  describe('(GET) /products/:productId', () => {
    it.each([5, 'some-id'])(
      'returns bad request if productId is not UUID',
      async (productId) => {
        const { statusCode } = await request(app.getHttpServer()).get(
          `/products/${productId}`,
        );

        expect(statusCode).toBe(400);
      },
    );

    it('returns not found if product does not exist', async () => {
      const { statusCode } = await request(app.getHttpServer()).get(
        '/products/7d9b7399-6f28-4dfd-be64-105bddda9ac8',
      );

      expect(statusCode).toBe(404);
    });

    it('returns product details', async () => {
      await prisma.product.create({
        data: {
          id: '5eb3f6a4-2dd0-46dd-aa8c-8a0c730d2c68',
          name: 'Raspberry & White Chocolate Blondies',
          description: 'Lorem ipsum',
          image: 'some-file.png',
          price: 25.0,
        },
      });

      const { statusCode, body } = await request(app.getHttpServer()).get(
        '/products/5eb3f6a4-2dd0-46dd-aa8c-8a0c730d2c68',
      );

      expect(statusCode).toBe(200);
      expect(body).toMatchSnapshot();
    });
  });
});
