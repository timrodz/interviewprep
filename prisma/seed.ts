import { type Question } from "@prisma/client";
import { prisma } from "../src/server/db";

const information: Pick<
  Question,
  "technology" | "title" | "approved" | "answer" | "resources"
>[] = [
  {
    technology: "javascript",
    title: "What does `Set[{}, {}, {}}]` evaluate to?",
    answer:
      "It evaluates to `Set(3) { {}, {}, {} }`. This is because Sets store unique values of any type, including references. {} is an object, and objects are references. Only primitives (numbers, strings) are values.",
    resources:
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values",
    approved: true,
  },
  {
    technology: "react",
    title: "What is a hook?",
    answer:
      "Hooks let you use different React features from your components. You can either use the built-in Hooks or combine them to build your own.",
    resources: "https://react.dev/reference/react",
    approved: true,
  },
  {
    technology: "react",
    title: "How do you add state to a component?",
    answer:
      "`useState` declares a state variable to be used directly. `useReducer` also does this, but it updates the variable with a reducer function.",
    resources:
      "https://react.dev/reference/react/useState,https://react.dev/reference/react/useReducer",
    approved: true,
  },
  {
    technology: "react",
    title: "Who created React, and when?",
    answer:
      "React was created by Meta (formerly Facebook) and released in May 29, 2013.",
    resources: "https://en.wikipedia.org/wiki/React_(software)",
    approved: false,
  },
];

async function main() {
  await prisma.question.deleteMany();
  for (const data of information) {
    await prisma.question.create({
      data: {
        ...data,
        resources: Array.isArray(data.resources)
          ? data.resources.join(",")
          : data.resources,
      },
    });
  }
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
