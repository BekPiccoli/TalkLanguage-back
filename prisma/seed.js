import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function clearDatabase() {
  console.log("Limpando banco de dados...");
  await prisma.exercise.deleteMany({});
  await prisma.exerciseGroup.deleteMany({});
  console.log("Banco de dados limpo.");
}


async function main() {
  await clearDatabase();
  try {
    // Criar grupos de exercícios para Inglês
    const englishGroupsData = [
      { name: "Verbo To Be", language: "Inglês", description: "Exercícios sobre o verbo to be" },
      { name: "Animais", language: "Inglês", description: "Vocabulário sobre nomes de animais" },
      { name: "Cores", language: "Inglês", description: "Vocabulário sobre cores" },
      { name: "Present Simple", language: "Inglês", description: "Conjugação no presente simples" },
    ];

    await prisma.exerciseGroup.createMany({ data: englishGroupsData });

    // Recuperar IDs dos grupos criados para Inglês
    const englishGroupIds = await prisma.exerciseGroup.findMany({
      where: { language: "Inglês" }
    });

    // Criar exercícios para os grupos de Inglês
    const englishExercisesData = [
      { groupName: "Verbo To Be", exercises: [
          { type: "VOCABULARIO", content: "Qual é a forma correta do verbo 'to be' para 'I'?", options: ["am", "is", "are"], correctAnswer: "am" },
          { type: "VOCABULARIO", content: "Qual é a forma correta do verbo 'to be' para 'They'?", options: ["is", "are", "am"], correctAnswer: "are" },
          { type: "VOCABULARIO", content: "Qual é a forma correta do verbo 'to be' para 'She'?", options: ["am", "is", "are"], correctAnswer: "is" },
        ]
      },
      { groupName: "Animais", exercises: [
          { type: "VOCABULARIO", content: "Como se chama este animal? 🐶", options: ["Dog", "Cat", "Bird"], correctAnswer: "Dog" },
          { type: "VOCABULARIO", content: "Qual é o nome deste animal? 🐱", options: ["Dog", "Cat", "Elephant"], correctAnswer: "Cat" },
          { type: "VOCABULARIO", content: "Como se chama este animal? 🐘", options: ["Elephant", "Lion", "Tiger"], correctAnswer: "Elephant" },
        ]
      },
      { groupName: "Cores", exercises: [
          { type: "VOCABULARIO", content: "Qual é a cor da maçã verde?", options: ["Green", "Red", "Blue"], correctAnswer: "Green" },
          { type: "VOCABULARIO", content: "Qual é a cor do céu em um dia ensolarado?", options: ["Blue", "Yellow", "Purple"], correctAnswer: "Blue" },
          { type: "VOCABULARIO", content: "Qual é a cor do fogo?", options: ["Red", "Blue", "Green"], correctAnswer: "Red" },
        ]
      },
      { groupName: "Present Simple", exercises: [
          { type: "COMPREENSAO_ESCRITA", content: "Complete: She ____ to school every day.", options: ["go", "goes", "going"], correctAnswer: "goes" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: They ____ at home on Sundays.", options: ["stay", "stays", "staying"], correctAnswer: "stay" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: He ____ his homework every night.", options: ["does", "do", "doing"], correctAnswer: "does" },
        ]
      },
    ];

    for (const group of englishExercisesData) {
      const groupId = englishGroupIds.find(g => g.name === group.groupName)?.id;
      if (groupId) {
        await prisma.exercise.createMany({
          data: group.exercises.map(exercise => ({
            ...exercise,
            exerciseGroupId: groupId
          }))
        });
      }
    }

    // Repetir o processo para Espanhol
    const spanishGroupsData = [
      { name: "Presente dos Verbos", language: "Espanhol", description: "Conjugação de verbos no presente" },
      { name: "Comida e Bebida", language: "Espanhol", description: "Vocabulário sobre comida e bebida" },
      { name: "Cores", language: "Espanhol", description: "Vocabulário sobre cores" },
      { name: "Animais", language: "Espanhol", description: "Vocabulário sobre animais em espanhol" },
    ];

    await prisma.exerciseGroup.createMany({ data: spanishGroupsData });

    const spanishGroupIds = await prisma.exerciseGroup.findMany({
      where: { language: "Espanhol" }
    });

    const spanishExercisesData = [
      { groupName: "Presente dos Verbos", exercises: [
          { type: "COMPREENSAO_ESCRITA", content: "Complete: Yo ____ en casa.", options: ["vivo", "vive", "vivir"], correctAnswer: "vivo" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: Nosotros ____ a la escuela todos los dias.", options: ["vamos", "va", "van"], correctAnswer: "vamos" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: Él ____ una carta.", options: ["escribe", "escribo", "escribimos"], correctAnswer: "escribe" },
        ]
      },
      { groupName: "Comida e Bebida", exercises: [
          { type: "VOCABULARIO", content: "Como se diz 'apple' em espanhol?", options: ["Manzana", "Banana", "Uva"], correctAnswer: "Manzana" },
          { type: "VOCABULARIO", content: "Como se diz 'bread' em espanhol?", options: ["Pan", "Carne", "Leche"], correctAnswer: "Pan" },
          { type: "VOCABULARIO", content: "Como se diz 'water' em espanhol?", options: ["Agua", "Vino", "Leche"], correctAnswer: "Agua" },
        ]
      },
      { groupName: "Cores", exercises: [
          { type: "VOCABULARIO", content: "Qual é a cor de uma banana madura?", options: ["Amarillo", "Rojo", "Verde"], correctAnswer: "Amarillo" },
          { type: "VOCABULARIO", content: "Qual é a cor do tomate?", options: ["Rojo", "Blanco", "Negro"], correctAnswer: "Rojo" },
          { type: "VOCABULARIO", content: "Qual é a cor do céu?", options: ["Azul", "Rojo", "Negro"], correctAnswer: "Azul" },
        ]
      },
      { groupName: "Animais", exercises: [
          { type: "VOCABULARIO", content: "Como se chama este animal? 🐱", options: ["Gato", "Perro", "Pájaro"], correctAnswer: "Gato" },
          { type: "VOCABULARIO", content: "Como se diz 'dog' em espanhol?", options: ["Perro", "Gato", "Elefante"], correctAnswer: "Perro" },
          { type: "VOCABULARIO", content: "Como se chama este animal? 🐦", options: ["Pájaro", "Elefante", "León"], correctAnswer: "Pájaro" },
        ]
      },
    ];

    for (const group of spanishExercisesData) {
      const groupId = spanishGroupIds.find(g => g.name === group.groupName)?.id;
      if (groupId) {
        await prisma.exercise.createMany({
          data: group.exercises.map(exercise => ({
            ...exercise,
            exerciseGroupId: groupId
          }))
        });
      }
    }
  } catch (error) {
    console.error("Erro ao criar exercícios:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
