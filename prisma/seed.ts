import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const trayBake = await prisma.category.upsert({
    where: { id: 'f8111e2a-85f2-4705-96e0-681f9b236ce7' },
    update: {},
    create: {
      id: 'f8111e2a-85f2-4705-96e0-681f9b236ce7',
      name: 'Tray Bakes',
    },
  });

  await prisma.category.upsert({
    where: { id: '56a663d3-267c-4427-81cd-d934c7141670' },
    update: {},
    create: {
      id: '56a663d3-267c-4427-81cd-d934c7141670',
      name: 'Cakes',
    },
  });

  await prisma.category.upsert({
    where: { id: 'a9774d90-4784-4ac3-ae14-8464907f496f' },
    update: {},
    create: {
      id: 'a9774d90-4784-4ac3-ae14-8464907f496f',
      name: 'Cupcakes',
    },
  });

  await prisma.product.upsert({
    where: { id: '5eb3f6a4-2dd0-46dd-aa8c-8a0c730d2c68' },
    update: {},
    create: {
      id: '5eb3f6a4-2dd0-46dd-aa8c-8a0c730d2c68',
      name: 'Raspberry & White Chocolate Blondies',
      description: 'Lorem ipsum',
      image: 'some-file.png',
      price: 25.0,
      categories: {
        connect: [{ id: trayBake.id }],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
