import supertest from 'supertest';
import app from '../src/index';
import prisma from '../src/data/fruits';
import { createFruit } from './factories/fruits-factory';

const api = supertest(app);

type Fruit = {
    name: string;
    price: number;
}

beforeEach(async () => {
    await prisma.fruit.deleteMany();
})

describe('POST /fruits', () => {
    it('should return 201 when a fruit is created', async () => {
        const fruit = { name: 'strawberry', price: 1500 };

        const { status } = await api.post('/fruits').send(fruit);

        expect(status).toBe(201);
    })

    it('should return 409 when a fruit is already created', async () => {
        const fruit = await createFruit('strawberry', 1500);
        delete fruit.id;

        const { status } = await api.post('/fruits').send(fruit);

        expect(status).toBe(409);
    })

    it('should return 422 when a fruit is already created', async () => {
        const fruit = { name: 'strawberry' };

        const { status } = await api.post('/fruits').send(fruit);

        expect(status).toBe(422);
    })
})

describe('GET /fruits', () => {
    it('should return 404 when trying to find a fruit with an id that doesnt exist', async () => {
        const { status } = await api.get('/fruits/9999');

        expect(status).toBe(404);
    })

    it('should return 400 when send an invalid id', async () => {
        const { status } = await api.get('/fruits/-1');

        expect(status).toBe(400);
    })

    it('should return one fruit when given a valid and existing id', async () => {
        const fruit = await createFruit('abacaxi', 1000);

        const { body } = await api.get(`/fruits/${fruit.id}`);

        expect(body).toEqual(fruit);
    })

    it('should return all fruits if no id is present', async () => {
        const fruit1 = await createFruit('abacaxi', 1000);
        const fruit2 = await createFruit('melão', 1170);

        const { body } = await api.get(`/fruits`);

        expect(body).toEqual([fruit1, fruit2]);
    })

    
})