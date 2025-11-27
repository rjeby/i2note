import { PrismaClient } from "./generated/prisma/client.ts";

const db = new PrismaClient();
// const prisma = new PrismaClient();

// async function main() {
//   const USER_ID = 3;

//   console.log("🔥 FULL RESET SEED FOR USER", USER_ID);

//   // ----------------- CLEAN DATABASE ------------------
//   console.log("🧨 Deleting existing data...");

//   await prisma.note.deleteMany({ where: { userId: USER_ID } });
//   await prisma.tag.deleteMany(); // removes relationships automatically

//   // ----------------- TAG POOL ------------------
//   const tagPool = ["work", "ideas", "personal", "dreams", "learning", "quotes", "projects", "finance", "health", "startup", "coding", "philosophy", "journal", "design", "goals", "random", "ai", "automation", "productivity", "habits", "business", "strategy", "focus", "architecture", "systems", "ux", "burnout", "resilience", "growth", "discipline", "writing", "creativity", "leadership", "legacy", "curiosity", "risk", "experiments", "roadmap", "emotion", "travel", "mindset", "branding", "networking", "vision", "product", "debugging", "databases", "security", "scaling", "ops", "cloud", "feedback", "refactoring", "testing"];

//   // ----------------- TITLES ------------------
//   const titles = ["Midnight thoughts", "Future version of me", "Startup brain dump", "Painful lessons", "When motivation dies", "Dream archive", "Plans that terrify me", "Unfiltered journal", "Why I started", "Failure notes", "The long game", "Life OS", "Creative chaos", "Mental reset", "Product ideas I love", "Rules for myself", "Hard truths", "Focus experiments", "What actually matters", "Thoughts on freedom", "My coding therapy", "Business scars", "Lessons from silence", "Fear inventory", "Evolution notes", "Personal strategy", "The future me deserves", "Notes from confusion", "Simplify everything", "Burn the old version", "Systems journal", "Product blueprints", "Diary of a builder", "I refuse average", "The price of comfort", "Vision draft", "Rewriting my story"];

//   // ----------------- CONTENT ------------------
//   const contents = [
//     "I keep waiting for the perfect moment that doesn’t exist.",
//     "Everything hard in life gives better rewards.",
//     "I want results, not noise.",
//     "If I don't build, I decay.",
//     "Small decisions quietly shape everything.",
//     "The future punishes hesitation.",
//     "Nobody is coming. That’s power.",
//     "Progress never feels fast.",
//     "I’m learning to disappoint people to stop disappointing myself.",
//     "Comfort is a beautiful trap.",
//     "My future self is watching.",
//     "Most of my limits exist only in my mind.",
//     "Discipline feels unfair until it pays off.",
//     "I build in silence so I can live loud.",
//     "I owe my future self more.",
//     "I’m done playing small.",
//     "Everything I want is on the other side of effort.",
//     "Fear is a signpost.",
//     "It’s okay to be misunderstood while growing.",
//     "I need courage more than clarity.",
//     "You don't rise to goals; you fall to systems.",
//     "Hard work changes identity.",
//     "Nothing changes if nothing changes.",
//     "The long road builds strength.",
//     "I prioritize impact over comfort.",
//     "I will outgrow this version of me.",
//     "Progress isn’t loud.",
//     "The grind is teaching me.",
//     "I want mastery, not mediocrity.",
//     "Time is not neutral.",
//     "I choose growth daily.",
//     "I get closer even on bad days.",
//     "I build momentum privately.",
//     "I’m not afraid of starting late.",
//     "I refuse regression.",
//     "Chaos becomes clarity eventually.",
//     "This is my chapter.",
//     "Results are delayed, not denied.",
//     "Resilience compounds.",
//     "Focus prints freedom.",
//   ];

//   // ------------- CREATE TAGS (CLEAN) -----------------
//   console.log("🏷 Creating tags...");
//   const createdTags = await prisma.tag.createMany({
//     data: tagPool.map((content) => ({ content })),
//   });

//   const tags = await prisma.tag.findMany();

//   // ----------- HELPERS -----------------
//   function random(arr) {
//     return arr[Math.floor(Math.random() * arr.length)];
//   }

//   function randomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }

//   function pickMany(arr, min = 5, max = 30) {
//     const shuffled = [...arr].sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, randomInt(min, Math.min(max, arr.length)));
//   }

//   // ------------ CREATE NOTES -----------------
//   const NOTE_COUNT = randomInt(100, 150);
//   console.log("📝 Creating", NOTE_COUNT, "notes...");

//   for (let i = 0; i < NOTE_COUNT; i++) {
//     const note = await prisma.note.create({
//       data: {
//         title: random(titles),
//         content: random(contents) + "\n\n" + random(contents) + "\n\n" + random(contents),
//         isArchived: Math.random() < 0.12,
//         userId: USER_ID,
//       },
//     });

//     const selectedTags = pickMany(tags);

//     await prisma.note.update({
//       where: { id: note.id },
//       data: {
//         tags: {
//           connect: selectedTags.map((t) => ({ id: t.id })),
//         },
//       },
//     });
//   }

//   console.log("✅ COMPLETE. All data recreated from scratch.");
//   await prisma.$disconnect();
// }

// main().catch(console.error);

export default db;
