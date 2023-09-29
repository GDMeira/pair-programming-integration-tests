import prisma from "../../src/data/fruits";

export async function createFruit(name: string, price: number)  {
    return await prisma.fruit.create({
        data: {
            name,
            price
        }
    })
}