# Memorium

## Winner of ‘Best Voice Experience for Amazon Alexa’ at Treehacks 2018

## Inspiration
- When it comes to mental health, being honest is the first step towards personal growth, and that honesty has to first start with yourself. Memorium is built around that belief. Candid thoughts for the sake of self-reflection and personal growth—this is the platform that Memorium endeavors to create for its users.

## What it does
Memorium is an Alexa skill that revolutionizes the way you remember the past by enabling you to have a conversation with yourself. Not only are you able to share your stories with Alexa, but you are also able to listen to your past memories that Alexa has stored. Memorium is designed so that you can reflect upon your memories and track your personal mental growth. Moreover, Memorium performs sentiment analyses on each memory and categorizes it based on an overall sentiment value. So if you are ever feeling down, you can ask Memorium for a happy memory to cheer you up.

## How we built it
- The backend is implemented as a serverless function in AWS Lambda, with databases handled by AWS DynamoDB, and logging in AWS Cloudwatch.
- The textual analysis is handled by Microsoft Cognitive Services.

## Challenges we ran into
- Just three days ago, Amazon implemented a cutting edge “phrase slot,” a major driver of our project. With the ability to retrieve longer raw phrases instead of individual words, we would be able to use these longer phrases for sentiment analysis with Microsoft Azure’s Text Analystics API. However, as this is not a possibility as of right now (though it may be in the near future), we spent a lot of time considering how to build around this limitation in order to perform sentiment analyses from limited data.
- Minor bugs in open-source code, which we hope to fix when we’re done hacking.
- Overall limitations of text analytics on small amounts of data (short texts).

## Accomplishments that we're proud of
- Implementing Microsoft Azure’s Text Analytics API into an Alexa Skill input to determine the sentiment value of a user’s memory, despite Alexa’s lack of support for phrases.
- A natural and clear conversation with Memorium.
- A well-implemented voice interface, featuring the ability to repeat messages, reprompt the user, and provide help messages at every stage.
- Privately and securely storing the memories of any individual Alexa user in Amazon DynamoDB and categorizing them according to sentiment value.
- No hard-coded data. It’s all from using the device.

## What we learned
- We learned how to work around Alexa’s user input limitations and how to create natural conversations between Alexa and a user.
- Most importantly, we learned how to divide tasks among our team and how to play to everyone’s strengths.

## What's next for Memorium:
Memorium is a versatile technology that can be expanded to have many applications. For instance:
- As there is an improved raw speech-to-text data feature from Alexa on the horizon, we want to be the first to use this feature to change the way memories are shared. With this feature, we would be able to fully implement Memorium as a categorized repository of memories. With this addition, we hope to use new textual analysis APIs to create vector embeddings of sentences, so we can pull even more information from what users say. This will make conversations more natural, memory storage even better, and sentiment analysis more accurate.
- The concept of retrieving information from a memory repository is the foundation of Memorium, and it is tailored specifically for the purpose of allowing users to “journal” their memories and reflect on them. We see potential for this technology in the professional health industry, as therapists may utilize Memorium to inspire candor, self-awareness, and personal growth in their patients.
- One tentative idea is the possibility of storing a user’s memory as an audio file and then giving the option of replaying the memory in the user’s own voice. By doing this, we are not only storing the user’s words, but we are also keeping the emotional significance, as everyone has a unique way of sharing memories.
Overall, Memorium has the potential to have a positive impact on mental health and change the way memories are kept.
