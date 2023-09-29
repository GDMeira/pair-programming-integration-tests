import prisma from "../data/fruits";
import { FruitInput } from "../services/fruits-service";

export type Fruit = {
  id: number,
  name: string,
  price: number
}

async function getFruits() {
  return await prisma.fruit.findMany();
}

async function getSpecificFruit(id: number) {
  return await prisma.fruit.findUnique({
    where: {id}
  });
}

async function getSpecificFruitByName(name: string) {
  return await prisma.fruit.findFirst({
    where: {name}
  });
}

async function insertFruit(fruit: FruitInput) {
  return await prisma.fruit.create({
    data: fruit
  })
}

const fruitsRepository = {
  getFruits,
  getSpecificFruit,
  getSpecificFruitByName,
  insertFruit
}

export default fruitsRepository;