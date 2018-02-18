'use strict';

const Alexa = require(`alexa-sdk`);
const request = require(`request-promise`);
const AWS = require(`aws-sdk`);

exports.handler = function (event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.registerHandlers(
    Handlers,
    MemoryHandlers,
    QuestionOneHandlers,
    QuestionTwoHandlers,
    QuestionThreeHandlers,
    QuestionFourHandlers,
    QuestionFiveHandlers,
    QuestionSixHandlers,
    NonIntentHandlers
  );
  alexa.execute();
};

const states = {
  MEMORYMODE: '_MEMORYMODE',
  Q1MODE: '_Q1MODE',
  Q2MODE: '_Q2MODE',
  Q3MODE: '_Q3MODE',
  Q4MODE: '_Q4MODE',
  Q5MODE: '_Q5MODE',
  Q6MODE: '_Q6MODE',
};

const Handlers = {
  'LaunchRequest': function () {
    this.emit(':askHandler',
      `Hi there. I am memorium. Do you want to share a memory, or listen to a memory.`,
      `Sorry, it’s loud in here. Would you like to share a memory, or listen to a memory.`
    );
  },
  'StoreMemoryIntent': function () {
    this.handler.state = states.Q1MODE;
    this.emit(':askHandler',
      `Tell me about it. When did it happen?`,
      `Sorry, there is a lot of background noise. Can you tell me when the memory took place?`
    );
  },
  'GetPersonalMemoryIntent': function () {
    this.handler.state = states.MEMORYMODE;
    this.emit(':askHandler',
      `Do you want to hear a happy memory, or a sad one?`,
      `Sorry, there is a lot of background noise. Did you want a happy memory or a sad one?`
    );
  },
  'GetPersonalHappyMemoryIntent': function () {
    this.emit(':retrieveMemory', "Memoriam");
  },
  'GetPersonalSadMemoryIntent': function () {
    this.emit(':retrieveMemory', "MemoriamSad");
  },
  'SessionEndedRequest': function () {
    console.log('Session ended with reason: ' + this.event.request.reason);
  },
  'AMAZON.RepeatIntent': function () {
    this.emit(':repeatHandler');
  },
  'AMAZON.StopIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':askHandler',
      `Hi, I am Memorium. I hold your personal memories, and on days when you are feeling nostalgic,
      I can tell you memories from the past.
      For example, I can tell you a happy memory if you are feeling down.
      You can add a memory, where I will ask you questions about your day,
      or you can pull a happy or sad memory from the past. Now, please respond with either share, or listen. `,
      `My bad. Could you repeat if you would like to share or listen to a memory?`
    );
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'Unhandled': function () {
    this.emit(':askHandler',
      `Sorry, I didn’t catch that. Can you tell me if you want to share or listen?`,
      `Sorry, I don’t understand. Would you like to share a memory or listen to a memory?`
    );
  }
};

const MemoryHandlers = Alexa.CreateStateHandler(states.MEMORYMODE, {
  'GetPersonalHappyMemoryIntent': function () {
    this.emit(':retrieveMemory', "Memoriam");
  },
  'GetPersonalSadMemoryIntent': function () {
    this.emit(':retrieveMemory', "MemoriamSad");
  },
  'AMAZON.RepeatIntent': function () {
    this.emit(':repeatHandler');
  },
  'AMAZON.StopIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':askHandler',
      `Want a happy memory or sad one?`,
      `Sorry, I didn’t hear what you said because the room is pretty noisy right now. Was that happy or sad?`
    );
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'Unhandled': function () {
    this.emit(':askHandler',
      `I’m sorry, I didn’t hear you. Could you repeat that?`,
      `Sorry, your voice was muffled. Was that happy or sad?`
    );
  }
});

const QuestionOneHandlers = Alexa.CreateStateHandler(states.Q1MODE, {
  'QuestionOneIntent': function () {
    this.attributes.date = this.event.request.intent.slots.date.value;
    if (this.attributes.date) {
      this.handler.state = states.Q2MODE;
      this.emit(':askHandler',
        `Oh, so were you with anyone?`,
        `I’m sorry, I didn’t hear you clearly. Who did you go with?`
      );
    } else {
      this.emitWithState('Unhandled');
    }
  },
  'AMAZON.RepeatIntent': function () {
    this.emit(':repeatHandler');
  },
  'AMAZON.StopIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':askHandler',
      `Please respond with the date of the memory.`,
      `Sorry, I didn’t hear what you said because the room is pretty noisy right now. What was the date again?`
    );
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'Unhandled': function () {
    this.emit(':askHandler',
      `I’m sorry, I didn’t hear you. Could you repeat the date?`,
      `Sorry, your voice was muffled. What was the date of the memory?`
    );
  }
});

const QuestionTwoHandlers = Alexa.CreateStateHandler(states.Q2MODE, {
  'QuestionTwoIntent': function () {
    this.attributes.name = this.event.request.intent.slots.name.value;
    if (this.attributes.name) {
      this.handler.state = states.Q3MODE;
      this.emit(':askHandler',
        `What sort of thing did you go to?`,
        `Sorry, I couldn’t make out what you said. What event did you go to?`
      );
    } else {
      this.emitWithState('Unhandled');
    }
  },
  'AMAZON.RepeatIntent': function () {
    this.emit(':repeatHandler');
  },
  'AMAZON.StopIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':askHandler',
      `Please let me know if you were alone or if you went with anyone.`,
      `I’m sorry, your voice cut off in the middle. Did you go with anyone?`
    );
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'Unhandled': function () {
    this.emit(':askHandler',
      `Sorry, I didn’t catch that. Can you tell me if you went with anyone?`,
      `Repeat that, please? Were you with anyone?`
    );
  }
});

const QuestionThreeHandlers = Alexa.CreateStateHandler(states.Q3MODE, {
  'QuestionThreeIntent': function () {
    this.attributes.eventtype = this.event.request.intent.slots.eventtype.value;
    if (this.attributes.eventtype) {
      this.handler.state = states.Q4MODE;
      this.emit(':askHandler',
        `Oh, so you were at a ${this.attributes.eventtype}! Where was it?`,
        `It’s kind of loud in here. Where did you go?`
      );
    } else {
      this.emitWithState('Unhandled');
    }
  },
  'AMAZON.RepeatIntent': function () {
    this.emit(':repeatHandler');
  },
  'AMAZON.StopIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':askHandler',
      `Please tell me the type of event you went to.`,
      `Sorry, I didn’t quite hear what you said. What did you go to, again?`
    );
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'Unhandled': function () {
    this.emit(':askHandler',
      `I’m sorry, I didn’t catch that. Can you tell me what event you went to?`,
      `My bad, please repeat that. What event were you at?`
    );
  }
});

const QuestionFourHandlers = Alexa.CreateStateHandler(states.Q4MODE, {
  'QuestionFourIntent': function () {
    if (this.event.request.intent.slots.city.value) {
      this.attributes.place = this.event.request.intent.slots.city.value;
    } else if (this.event.request.intent.slots.business.value) {
      this.attributes.place = this.event.request.intent.slots.business.value;
    } else if (this.event.request.intent.slots.businesstype.value) {
      this.attributes.place = this.event.request.intent.slots.businesstype.value;
    } else if (this.event.request.intent.slots.landmark.value) {
      this.attributes.place = this.event.request.intent.slots.landmark.value;
    } else if (this.event.request.intent.slots.country.value) {
      this.attributes.place = this.event.request.intent.slots.country.value;
    } else if (this.event.request.intent.slots.civicstructure.value) {
      this.attributes.place = this.event.request.intent.slots.civicstructure.value;
    }

    if (this.attributes.place) {
      this.handler.state = states.Q5MODE;
      this.emit(':askHandler',
        `${this.attributes.place} is nice. How was it? What did you do?`,
        `Sorry, I couldn’t hear you. Could you tell me how it was?`
      );
    } else {
      this.emitWithState('Unhandled');
    }
  },
  'AMAZON.RepeatIntent': function () {
    this.emit(':repeatHandler');
  },
  'AMAZON.StopIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':askHandler',
      `Please give me a location.`,
      `There’s a lot of background noise right now. Could you tell me where it was?`
    );
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'Unhandled': function () {
    this.emit(':askHandler',
      `Sorry, I don’t understand. Could you tell me the place again?`,
      `Wait, could you remind me where you went?`
    );
  }
});

const QuestionFiveHandlers = Alexa.CreateStateHandler(states.Q5MODE, {
  'Phrase': function () {
    const options = {
      method: 'POST',
      uri: 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment',
      headers: {
        'Ocp-Apim-Subscription-Key': '16871037656a414b9eb9a8a65945547b'
      },
      body: {
        documents: [
          {
            language: 'en',
            id: 'eventtype',
            text: `${this.attributes.eventtype}`
          },
          {
            language: 'en',
            id: 'place',
            text: `${this.attributes.place}`
          }
        ]
      },
      json: true
    };

    request(options)
      .then((response) => {
        this.handler.state = states.Q6MODE;
        let responseText;
        const scoreReduce = (total, nextObject) => total + nextObject.score;
        this.attributes.average = response.documents.reduce(scoreReduce, 0) / response.documents.length;
        if (this.attributes.average > 0.5) {
          responseText = `To me, that sounds like a good experience! How would you rate it from one to five stars?`;
        } else if (this.attributes.average === 0.5) {
          responseText = `To me, that sounds just ok. How would you rate it from one to five stars?`;
        } else {
          responseText = `To me, that sounds like a tough time. How would you rate it from one to five stars?`;
        }
        this.emit(':askHandler', responseText);
      }).catch(() => {
        this.emit(':tell', `Classic tree hacks, something went wrong with an API call... Let us try to fix it!`);
      });
  },
  'AMAZON.RepeatIntent': function () {
    this.emit(':repeatHandler');
  },
  'AMAZON.StopIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':askHandler',
      `Tell me anything you want.`,
      `It’s noisy in here. Can you repeat what you did?`
    );
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'Unhandled': function () {
    this.emitWithState('Phrase');
  }
});

const QuestionSixHandlers = Alexa.CreateStateHandler(states.Q6MODE, {
  'QuestionSixIntent': function () {
    this.attributes.rating = this.event.request.intent.slots.rating.value;
    if (this.attributes.rating) {
      let docClient = new AWS.DynamoDB.DocumentClient();

      const data = {
        "userId": this.event.context.System.user.userId,
        "sessionId": this.event.session.sessionId,
        "info": {
          "date": this.attributes.date,
          "name": this.attributes.name,
          "eventtype": this.attributes.eventtype,
          "place": this.attributes.place,
          "sentiment": this.attributes.average,
          "rating": this.attributes.rating
        }
      };

      const happy = (this.attributes.average > 0.5);

      const tableName = happy ? "Memoriam" : "MemoriamSad";

      const params = {
        TableName: tableName,
        Item: {
          "user-id": data.userId,
          "session-id": data.sessionId,
          "info": data.info
        }
      };

      docClient.put(params, (err, returnData) => {
        if (err) {
          console.log(JSON.stringify(err, null, 2));
          this.response.speak(`Some error occurred storing your memory. That's tree hacks for you... We're looking into it!`);
          this.emit(':responseReady');
        } else {
          console.log('Successful put.');
          this.response.speak(`Thanks for chatting. I've stored your memory, and you might hear it if you come back at some later date...`);
          this.emit(':responseReady');
        }
      });
    } else {
      this.emit(':askHandler',
        `Sorry, I didn't catch that. How would you rate it?`,
        `I’m sorry, your voice was muffled. What was the rating again?`
      );
    }
  },
  'AMAZON.RepeatIntent': function () {
    this.emit(':repeatHandler');
  },
  'AMAZON.StopIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':askHandler',
      `You can just give me a number from one to five.`,
      `Oops, I missed that. Could you tell me what rating you said?`
    );
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'Unhandled': function () {
    this.emit(':askHandler',
      `Sorry, I didn’t catch that. Could you remind me what was the rating?`,
      `I’m sorry, your voice was muffled. What was the rating again?`
    );
  }
});

const NonIntentHandlers = {
  ':askHandler': function askHandler(speechOutput, repromptSpeech) {
    if (speechOutput && repromptSpeech) {
      this.attributes.speechOutput = speechOutput;
      this.attributes.repromptSpeech = repromptSpeech;
    } else if (speechOutput) {
      this.attributes.speechOutput = speechOutput;
      this.attributes.repromptSpeech = speechOutput;
    } else {
      this.emitWithState('Unhandled');
    }
    this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
  },
  ':repeatHandler': function repeatHandler() {
    if (this.attributes.speechOutput && this.attributes.repromptSpeech) {
      this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    } else {
      this.emitWithState('Unhandled');
    }
  },
  ':retrieveMemory': function retrieveMemory(tableName) {
    var docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
      TableName : tableName,
      KeyConditionExpression: "#ui = :thing",
      ExpressionAttributeNames: {
        "#ui": "user-id"
      },
      ExpressionAttributeValues: {
        ":thing": this.event.context.System.user.userId
      }
    };

    docClient.query(params, (err, data) => {
      if (err) {
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        this.emit(':tell', `There was a problem retrieving your data. That's hackathons for you! We're working on it now.`);
      } else {
        console.log("Query succeeded.");
        if (data.Items.length === 0) {
          this.emit(':askHandler',
            `We don't have any memories stored for you yet; how about you tell me one?`,
            `Would you like to store your first memory?`
          );
        } else {
          const randomMemory = data.Items[Math.floor(Math.random()*data.Items.length)].info;
          this.emit(':tellWithCard',
            `Do you remember that time, on ${randomMemory.date} when you and ${randomMemory.name} went to ${randomMemory.place} for a ${randomMemory.eventtype}?
            You gave the memory a rating of ${randomMemory.rating}.`,
            `Your memory`,
            `Do you remember that time, on ${randomMemory.date} when you and ${randomMemory.name} went to ${randomMemory.place} for a ${randomMemory.eventtype}?
            You gave the memory a rating of ${randomMemory.rating}.`
          );
        }
      }
    });
  }
};
