## Inspiration
We all struggle to pay attention during long monotonous lectures (411). It is just too easy to find something more entertaining on the phone. This issue is especially prominent among high schoolers and middle schoolers. Spotlight aspires to help educators identify and reach kids who need more engagement. 
## What it does
Spotlight is a powerful tool designed to illuminate the key points in any lecture. Spotlight does all of the following:
- Tracks your attention during lectures and gives you feedback
- Records lecture audio and compiles it into structured and annotated notes about the subject
- Tracks important due dates mentioned during the lecture
- Connects to your Notion Calendar and Notes for easy integration
- Recommend online resources relevant to the lecture!
## How we built it
Spotlight is a tool leveraging Computer Vision (CV) to monitor facial cues like eye movement and direction, ensuring attentiveness during lectures. It penalizes lack of attention or phone usage. Additionally, it records and analyzes lecture audio, transcribing it and sending the text to GPT-4 for summarization. The custom GPT-4 generates lecture summaries and recommends relevant online resources. This summarized output is formatted for easy integration into Notion via its API. Summarized content is stored for later study. Our front end uses Tailwind, Vercel, and Vite. Our backend utilizes Flask to send data and requests within the program. 
## Challenges we ran into
- Mismatched versions caused merging code to be unrealistic within the small time frame provided. Thus we had to demo each feature separately to exhibit functionality. 
- It was difficult to capture accurate audio data and transfer that into a readable format. 
- It was difficult interacting with the openAI API, as well as acquiring a token needed for use. 
## Accomplishments that we're proud of
Each promised function works independently, showing that we were able to solve the problems that we set out to address. Given more time, we surely could have reconciled our version differences and produced a full stack, original product that would provide actual value to any educators who utilized them. 
## What we learned
We learned that more consistent and constant commits and pulls help find issues such as version differences earlier in the project, thus being able to address them in the foundations of the codebase. 
## What's next for Spotlight
Given more time, we would be able to provide a full-featured experience for our customers. The next feature that we would have implemented given time was to use the Notion API integration with Google Calendar to create reminders on the calendar for events as they are recognized during the lecture. We also would have worked to identify what was being said at the times when the student was paying attention and have a separate Notion table for that content. This would allow the student to go back later and refresh, as well as find further reading if they don't understand. 
