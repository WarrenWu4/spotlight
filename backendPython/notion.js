// import { Client } from '@notionhq/client';
const { Client } = require("@notionhq/client");

// const pageId = "a12eb5283a154f208e95fea92cb4ca64";
const apiKey = "secret_ydBzzwc6WSaHtJVngj2WSCNjL6t1yIO7DPomWY964mw";
const databaseId = "f3a7ab3548de43628a0f797145ae2573";

const notion = new Client({ auth: apiKey });

console.log("Notion API client created");

/////////////////////////////////////////////////////////////////////////////////

function getDate() {
  // Create a new Date object with the current date and time
  const currentDate = new Date();

  // Get the UTC offset in minutes for Central Standard Time
  const cstOffsetMinutes = -360; // -6 hours

  // Create a new Date object with the CST date and time
  const cstDate = new Date(currentDate.getTime() + cstOffsetMinutes * 60000);

  const year = cstDate.getFullYear();
  const month = String(cstDate.getMonth() + 1).padStart(2, "0");
  const day = String(cstDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

async function fetchNewPage() {
  const lectureTitle = "MATH 151 Lecture 5";
  const dateAttended = getDate();

  const newPage = [
    {
      Lecture: {
        title: [
          {
            type: "text",
            text: {
              content: lectureTitle,
            },
          },
        ],
      },
      "Date Attended": {
        date: {
          start: dateAttended,
        },
      },
    },
  ];

  // get transcript and summary somehow
  return newPage;
}

// dummy data
const propertiesForNewPages = [
  {
    Lecture: {
      title: [
        {
          type: "text",
          text: {
            content: "MATH 151 Lecture 4",
          },
        },
      ],
    },
    "Date Attended": {
      date: {
        start: "2023-03-23",
      },
    },
  },
];

function fetchLectureText() {
    return fetch("http://127.0.0.1:5000/lecture")
      .then((response) => response.json())
      .then((lectureData) => {
        const transcript = "In this class we will talk about addition. Addition is the process of combining two or more numbers to get a total. For example, if you have 2 apples and you add 3 more apples, you will have a total of 5 apples. The symbol for addition is the plus sign (+). When you add two numbers, the result is called the sum. For example, if you add 2 and 3, the sum is 5. The due date for the homework is next Friday. Please make sure to complete it on time";
        const summary = "This class will cover the topic of addition, which involves combining numbers to get a total, represented by the plus sign (+). The result of addition is known as the sum. An example given is adding 2 and 3 to get a sum of 5. Homework related to this topic is due next Friday and students are reminded to complete it on time";
        console.log(transcript);
        console.log(summary);
        return [transcript, summary];
      });
  }
  

// let transcript =
//   "This is a huge block of text that is the transcript of the lecture that was attended. This is a huge block of text that is the transcript of the lecture that was attended. This is a huge block of text that is the transcript of the lecture that was attended. This is a huge block of text that is the transcript of the lecture that was attended. This is a huge block of text that is the transcript of the lecture that was attended. This is a huge block of text that is the transcript of the lecture that was attended. This is a huge block of text that is the transcript of the lecture that was attended. This is a huge block of text that is the transcript of the lecture that was attended. This is a huge block of text that is the transcript of the lecture that was attended. This is a huge block of text that is the transcript of the lecture that was attended. This is a huge block of text that is the transcript of the lecture that was attended.";
// let summary = "This block just summarizes the big block of text";

// adds page to the database
async function addNotionPageToDatabase(databaseId, pageProperties) {
    console.log(pageProperties)
  const transcript = "In this class we will talk about addition. Addition is the process of combining two or more numbers to get a total. For example, if you have 2 apples and you add 3 more apples, you will have a total of 5 apples. The symbol for addition is the plus sign (+). When you add two numbers, the result is called the sum. For example, if you add 2 and 3, the sum is 5. The due date for the homework is next Friday. Please make sure to complete it on time";
//   const summary = "This class will cover the topic of addition, which involves combining numbers to get a total, represented by the plus sign (+). The result of addition is known as the sum. An example given is adding 2 and 3 to get a sum of 5. Homework related to this topic is due next Friday and students are reminded to complete it on time";
    const summary = "This class focuses on the concept of addition, which involves combining numbers to obtain a total. An example is adding 2 apples to 3 apples, resulting in 5 apples. The symbol for addition is the plus sign (+), and the result of an addition is referred to as the sum. Homework is due next Friday and timely completion is expected. For further learning, consider resources such as Khan Academy, Math.com, or educational math apps like Photomath"
  const newPage = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: pageProperties,
  });

  await notion.comments.create({
    parent: { page_id: newPage.id },
    rich_text: [
      {
        type: "text",
        text: {
          content: "Transcript\n",
        },
        annotations: {
          bold: true,
        },
      },
      {
        type: "text",
        text: {
          content: transcript,
        },
      },
    ],
  });

  await notion.comments.create({
    parent: { page_id: newPage.id },
    rich_text: [
      {
        type: "text",
        text: {
          content: "Summary\n",
        },
        annotations: {
          bold: true,
        },
      },
      {
        type: "text",
        text: {
          content: summary,
        },
      },
    ],
  });

  console.log(newPage);
}

// async function main() {
//   // Create a new database
//   const newDatabase = await notion.databases.create({
//     parent: {
//       type: "page_id",
//       page_id: pageId,
//     },
//     title: [
//       {
//         type: "text",
//         text: {
//           content: "Lectures",
//         },
//       },
//     ],
//     properties: {
//       Lecture: {
//         type: "title",
//         title: {},
//       },
//       "Date Attended": {
//         type: "date",
//         date: {},
//       },
//     },
//   });

//   // Print the new database's URL. Visit the URL in your browser to see the pages that get created in the next step.
//   console.log(newDatabase.url);

//   const databaseId = newDatabase.id;
//   // If there is no ID (if there's an error), return.
//   if (!databaseId) return;

//   console.log("Adding new pages...");
//   for (let i = 0; i < propertiesForNewPages.length; i++) {
//     // Add a few new pages to the database that was just created
//     await addNotionPageToDatabase(databaseId, propertiesForNewPages[i], transcript, summary);
//   }
// }

async function main() {
    // newPage = fetchNewPage()
    // console.log(newPage)
    await addNotionPageToDatabase(databaseId, propertiesForNewPages[0]);
    // await fetchLectureText()
}

main().catch(console.error);

console.log("Done");
