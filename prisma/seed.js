import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function clearDatabase() {
  console.log("Limpando banco de dados...");
  await prisma.progress.deleteMany({});
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
          { type: "VOCABULARIO", content: "Qual é a forma correta do verbo 'to be' para 'He'?", options: ["is", "are", "am"], correctAnswer: "is" },
          { type: "VOCABULARIO", content: "Qual é a forma correta do verbo 'to be' para 'We'?", options: ["is", "are", "am"], correctAnswer: "are" },
          { type: "VOCABULARIO", content: "Qual é a forma correta do verbo 'to be' para 'You' no singular?", options: ["is", "are", "am"], correctAnswer: "are" },
          { type: "VOCABULARIO", content: "Qual é a forma correta do verbo 'to be' para 'It'?", options: ["am", "is", "are"], correctAnswer: "is" },
          { type: "VOCABULARIO", content: "Qual é a forma correta do verbo 'to be' para 'You' no plural?", options: ["is", "are", "am"], correctAnswer: "are" },
          { type: "VOCABULARIO", content: "Complete: 'I ___ a teacher.'", options: ["am", "is", "are"], correctAnswer: "am" },
          { type: "VOCABULARIO", content: "Complete: 'She ___ happy.'", options: ["am", "is", "are"], correctAnswer: "is" },
          { type: "VOCABULARIO", content: "Complete: 'We ___ friends.'", options: ["is", "are", "am"], correctAnswer: "are" },
          { type: "VOCABULARIO", content: "Complete: 'They ___ at home.'", options: ["is", "are", "am"], correctAnswer: "are" }
        ]
      },
      { groupName: "Animais", exercises: [
          { type: "VOCABULARIO", content: "Como se chama este animal? 🐶", options: ["Dog", "Cat", "Bird"], correctAnswer: "Dog" },
          { type: "VOCABULARIO", content: "Qual é o nome deste animal? 🐱", options: ["Dog", "Cat", "Elephant"], correctAnswer: "Cat" },
          { type: "VOCABULARIO", content: "Como se chama este animal? 🐘", options: ["Elephant", "Lion", "Tiger"], correctAnswer: "Elephant" },
          { type: "VOCABULARIO", content: "Qual é o nome deste animal? 🦁", options: ["Lion", "Bear", "Snake"], correctAnswer: "Lion" },
          { type: "VOCABULARIO", content: "Como se chama este animal? 🐍", options: ["Rabbit", "Snake", "Horse"], correctAnswer: "Snake" },
          { type: "VOCABULARIO", content: "Qual é o nome deste animal? 🦒", options: ["Giraffe", "Cow", "Monkey"], correctAnswer: "Giraffe" },
          { type: "VOCABULARIO", content: "Como se chama este animal? 🐦", options: ["Bird", "Fish", "Dog"], correctAnswer: "Bird" },
          { type: "VOCABULARIO", content: "Qual é o nome deste animal? 🐟", options: ["Fish", "Horse", "Turtle"], correctAnswer: "Fish" },
          { type: "VOCABULARIO", content: "Como se chama este animal? 🦓", options: ["Zebra", "Tiger", "Elephant"], correctAnswer: "Zebra" },
          { type: "VOCABULARIO", content: "Qual é o nome deste animal? 🦜", options: ["Parrot", "Snake", "Cat"], correctAnswer: "Parrot" },
          { type: "VOCABULARIO", content: "Como se chama este animal? 🐄", options: ["Cow", "Lion", "Rabbit"], correctAnswer: "Cow" },
          { type: "VOCABULARIO", content: "Qual é o nome deste animal? 🐇", options: ["Rabbit", "Horse", "Bear"], correctAnswer: "Rabbit" }
        ]
      },
      { groupName: "Cores", exercises: [
          { type: "VOCABULARIO", content: "Qual é a cor da maçã verde?", options: ["Green", "Red", "Blue"], correctAnswer: "Green" },
          { type: "VOCABULARIO", content: "Qual é a cor do céu em um dia ensolarado?", options: ["Blue", "Yellow", "Purple"], correctAnswer: "Blue" },
          { type: "VOCABULARIO", content: "Qual é a cor do fogo?", options: ["Red", "Blue", "Green"], correctAnswer: "Red" },
          { type: "VOCABULARIO", content: "Qual é a cor do sol?", options: ["Yellow", "Green", "Blue"], correctAnswer: "Yellow" },
          { type: "VOCABULARIO", content: "Qual é a cor da neve?", options: ["White", "Black", "Pink"], correctAnswer: "White" },
          { type: "VOCABULARIO", content: "Qual é a cor de uma laranja?", options: ["Orange", "Purple", "Brown"], correctAnswer: "Orange" },
          { type: "VOCABULARIO", content: "Qual é a cor de um corvo?", options: ["Black", "White", "Grey"], correctAnswer: "Black" },
          { type: "VOCABULARIO", content: "Qual é a cor de uma banana madura?", options: ["Yellow", "Green", "Red"], correctAnswer: "Yellow" },
          { type: "VOCABULARIO", content: "Qual é a cor do morango?", options: ["Red", "Blue", "Yellow"], correctAnswer: "Red" },
          { type: "VOCABULARIO", content: "Qual é a cor do chocolate?", options: ["Brown", "Purple", "Pink"], correctAnswer: "Brown" },
          { type: "VOCABULARIO", content: "Qual é a cor da grama?", options: ["Green", "Orange", "Blue"], correctAnswer: "Green" },
          { type: "VOCABULARIO", content: "Qual é a cor de uma berinjela?", options: ["Purple", "Black", "Red"], correctAnswer: "Purple" }  
        ]
      },
      { groupName: "Present Simple", exercises: [
          { type: "COMPREENSAO_ESCRITA", content: "Complete: She ____ to school every day.", options: ["go", "goes", "going"], correctAnswer: "goes" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: They ____ at home on Sundays.", options: ["stay", "stays", "staying"], correctAnswer: "stay" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: He ____ his homework every night.", options: ["does", "do", "doing"], correctAnswer: "does" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: I ____ breakfast at 7 AM.", options: ["have", "has", "having"], correctAnswer: "have" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: She always ____ TV in the evening.", options: ["watches", "watch", "watching"], correctAnswer: "watches" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: We ____ to the gym twice a week.", options: ["go", "goes", "going"], correctAnswer: "go" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: He ____ football on Saturdays.", options: ["plays", "play", "playing"], correctAnswer: "plays" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: They ____ coffee every morning.", options: ["drink", "drinks", "drinking"], correctAnswer: "drink" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: She ____ a book before bed.", options: ["reads", "read", "reading"], correctAnswer: "reads" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: You ____ to music on your phone.", options: ["listen", "listens", "listening"], correctAnswer: "listen" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: He ____ his car on Sundays.", options: ["washes", "wash", "washing"], correctAnswer: "washes" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: We ____ dinner at 7 PM.", options: ["eat", "eats", "eating"], correctAnswer: "eat" }
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
          { type: "COMPREENSAO_ESCRITA", content: "Complete: Ellos ____ en el parque.", options: ["corren", "corro", "corre"], correctAnswer: "corren" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: Tú ____ la televisión por la noche.", options: ["miras", "mira", "miramos"], correctAnswer: "miras" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: Nosotros ____ comida italiana los domingos.", options: ["comemos", "come", "comer"], correctAnswer: "comemos" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: Ella ____ temprano todos los días.", options: ["se levanta", "me levanto", "nos levantamos"], correctAnswer: "se levanta" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: Yo ____ un libro interesante.", options: ["leo", "lees", "leemos"], correctAnswer: "leo" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: Vosotros ____ mucho en clase.", options: ["habláis", "hablo", "habla"], correctAnswer: "habláis" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: Él ____ la verdad.", options: ["dice", "digo", "dicen"], correctAnswer: "dice" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: Nosotros ____ música todos los días.", options: ["escuchamos", "escucha", "escuchan"], correctAnswer: "escuchamos" },
          { type: "COMPREENSAO_ESCRITA", content: "Complete: Tú ____ a tu abuela los fines de semana.", options: ["visitas", "visito", "visita"], correctAnswer: "visitas" }
        ]
      },
      { groupName: "Comida e Bebida", exercises: [
          { type: "VOCABULARIO", content: "Como se diz 'Maça' em espanhol?", options: ["Manzana", "Banana", "Uva"], correctAnswer: "Manzana" },
          { type: "VOCABULARIO", content: "Como se diz 'Pão' em espanhol?", options: ["Pan", "Carne", "Leche"], correctAnswer: "Pan" },
          { type: "VOCABULARIO", content: "Como se diz 'Água' em espanhol?", options: ["Agua", "Vino", "Leche"], correctAnswer: "Agua" },
          { type: "VOCABULARIO", content: "Como se diz 'Carne' em espanhol?", options: ["Carne", "Pescado", "Fruta"], correctAnswer: "Carne" },
          { type: "VOCABULARIO", content: "Como se diz 'Leite' em espanhol?", options: ["Leche", "Jugo", "Cerveza"], correctAnswer: "Leche" },
          { type: "VOCABULARIO", content: "Como se diz 'Uva' em espanhol?", options: ["Uva", "Manzana", "Naranja"], correctAnswer: "Uva" },
          { type: "VOCABULARIO", content: "Como se diz 'Peixe' em espanhol?", options: ["Pescado", "Carne", "Pan"], correctAnswer: "Pescado" },
          { type: "VOCABULARIO", content: "Como se diz 'Queijo' em espanhol?", options: ["Queso", "Pan", "Jugo"], correctAnswer: "Queso" },
          { type: "VOCABULARIO", content: "Como se diz 'Suco' em espanhol?", options: ["Jugo", "Cerveza", "Vino"], correctAnswer: "Jugo" },
          { type: "VOCABULARIO", content: "Como se diz 'Cerveja' em espanhol?", options: ["Cerveza", "Agua", "Jugo"], correctAnswer: "Cerveza" },
          { type: "VOCABULARIO", content: "Como se diz 'Batata' em espanhol?", options: ["Patata", "Pan", "Fruta"], correctAnswer: "Patata" },
          { type: "VOCABULARIO", content: "Como se diz 'Vinho' em espanhol?", options: ["Vino", "Leche", "Jugo"], correctAnswer: "Vino" }
        ]
      },
      { groupName: "Cores", exercises: [
          { type: "VOCABULARIO", content: "Qual é a cor de uma banana madura?", options: ["Amarillo", "Rojo", "Verde"], correctAnswer: "Amarillo" },
          { type: "VOCABULARIO", content: "Qual é a cor do tomate?", options: ["Rojo", "Blanco", "Negro"], correctAnswer: "Rojo" },
          { type: "VOCABULARIO", content: "Qual é a cor do céu?", options: ["Azul", "Rojo", "Negro"], correctAnswer: "Azul" },
          { type: "VOCABULARIO", content: "Qual é a cor da neve?", options: ["Blanco", "Gris", "Amarillo"], correctAnswer: "Blanco" },
          { type: "VOCABULARIO", content: "Qual é a cor de uma laranja?", options: ["Naranja", "Rojo", "Verde"], correctAnswer: "Naranja" },
          { type: "VOCABULARIO", content: "Qual é a cor de um corvo?", options: ["Negro", "Blanco", "Azul"], correctAnswer: "Negro" },
          { type: "VOCABULARIO", content: "Qual é a cor do chocolate?", options: ["Marrón", "Rojo", "Amarillo"], correctAnswer: "Marrón" },
          { type: "VOCABULARIO", content: "Qual é a cor de uma maçã verde?", options: ["Verde", "Amarillo", "Negro"], correctAnswer: "Verde" },
          { type: "VOCABULARIO", content: "Qual é a cor de uma rosa?", options: ["Rosa", "Negro", "Blanco"], correctAnswer: "Rosa" },
          { type: "VOCABULARIO", content: "Qual é a cor da uva roxa?", options: ["Morado", "Amarillo", "Azul"], correctAnswer: "Morado" },
          { type: "VOCABULARIO", content: "Qual é a cor de uma zebra?", options: ["Blanco y Negro", "Rojo y Azul", "Amarillo y Verde"], correctAnswer: "Blanco y Negro" },
          { type: "VOCABULARIO", content: "Qual é a cor do sol?", options: ["Amarillo", "Marrón", "Verde"], correctAnswer: "Amarillo" }
        ]
      },
      { groupName: "Animais", exercises: [
          { type: "VOCABULARIO", content: "Como se chama este animal? 🐱", options: ["Gato", "Perro", "Pájaro"], correctAnswer: "Gato" },
          { type: "VOCABULARIO", content: "Como se diz 'Cachorro' em espanhol?", options: ["Perro", "Gato", "Elefante"], correctAnswer: "Perro" },
          { type: "VOCABULARIO", content: "Como se chama este animal? 🐦", options: ["Pájaro", "Elefante", "León"], correctAnswer: "Pájaro" },
          { type: "VOCABULARIO", content: "Como se chama este animal? 🐘", options: ["Elefante", "León", "Tigre"], correctAnswer: "Elefante" },
          { type: "VOCABULARIO", content: "Como se diz 'Leão' em espanhol?", options: ["León", "Lobo", "Caballo"], correctAnswer: "León" },
          { type: "VOCABULARIO", content: "Como se chama este animal? 🐎", options: ["Caballo", "Vaca", "Zorro"], correctAnswer: "Caballo" },
          { type: "VOCABULARIO", content: "Como se diz 'Macaco' em espanhol?", options: ["Mono", "Tigre", "Pez"], correctAnswer: "Mono" },
          { type: "VOCABULARIO", content: "Como se chama este animal? 🐄", options: ["Vaca", "Oveja", "Zorro"], correctAnswer: "Vaca" },
          { type: "VOCABULARIO", content: "Como se diz 'Tigre' em espanhol?", options: ["Tigre", "León", "Perro"], correctAnswer: "Tigre" },
          { type: "VOCABULARIO", content: "Como se chama este animal? 🐺", options: ["Lobo", "Caballo", "Mono"], correctAnswer: "Lobo" },
          { type: "VOCABULARIO", content: "Como se chama este animal? 🦓", options: ["Cebra", "Vaca", "Elefante"], correctAnswer: "Cebra" },
          { type: "VOCABULARIO", content: "Como se diz 'Pato' em espanhol?", options: ["Pato", "Ganso", "Paloma"], correctAnswer: "Pato" }
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