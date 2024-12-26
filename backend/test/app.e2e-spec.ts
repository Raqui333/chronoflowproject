import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let test_user_id;

  const new_user = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    password: 'password123',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );

    await app.init();
  });

  describe('/users', () => {
    it('/ (POST) should add a user to database', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(new_user)
        .expect(201);

      test_user_id = response.body.user_id;

      expect(response.body.message).toEqual('User successfully created!');
    });

    it('/ (GET) should return all users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].password).not.toBeDefined();
    });

    it('/:id (GET) should return one user', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/${test_user_id}`)
        .expect(200);

      expect(response.body.id).toEqual(test_user_id);
      expect(response.body.password).not.toBeDefined();
    });

    it('/:id (PATCH) should updates one user data', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/users/${test_user_id}`)
        .send({ username: 'johndoe123' })
        .expect(200);

      expect(response.body.message).toEqual('User successfully updated!');
    });

    it('/:id (DELETE) should delete one user from database', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/users/${test_user_id}`)
        .expect(200);

      expect(response.body.id).toEqual(test_user_id);
      expect(response.body.password).not.toBeDefined();
    });
  });
});
