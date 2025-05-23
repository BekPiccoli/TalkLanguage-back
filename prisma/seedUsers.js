import { PrismaClient, Level } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seedUsers(count) {
  const users = [];

  const levels = Object.values(Level);
  const languages = ['Inglês', 'Espanhol'];
  const regions = ['Brasil', 'Argentina', 'Canadá', 'Estados Unidos', 'México', 'Portugal'];

  for (let i = 0; i < count; i++) {
    users.push({
      email: faker.internet.email().toLowerCase(),
      name: faker.person.fullName(),
      password: faker.internet.password({ length: 10 }),
      age: faker.number.int({ min: 12, max: 80 }),
      primaryLanguage: faker.helpers.arrayElement(languages),
      dailyGoal: faker.number.int({ min: 1, max: 5 }),
      streak: faker.number.int({ min: 0, max: 365 }),
      lastLogin: faker.date.recent({ days: 30 }),
      level: faker.helpers.arrayElement(levels),
      purpose: faker.lorem.sentence(),
      region: faker.helpers.arrayElement(regions)
    });
  }

  console.log(`Criando ${count} usuários...`);
  await prisma.user.createMany({ data: users });
  console.log(`✅ ${count} usuários criados com sucesso.`);
}

async function main() {
  try {
    await seedUsers(1500);
  } catch (err) {
    console.error('Erro ao criar usuários:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
