'use strict';

const Alexa = require(`alexa-sdk`);
const request = require(`request-promise`);
const AWS = require(`aws-sdk`);

exports.handler = function(event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.registerHandlers(
    handlers,
    QuestionOneHandlers,
    QuestionTwoHandlers,
    QuestionThreeHandlers,
    QuestionFourHandlers,
    QuestionFiveHandlers,
    QuestionSixHandlers,
    nonIntentHandlers);
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

const handlers = {
  'LaunchRequest': function () {
    this.emit(':askHandler',
      `Hi there. I'm memorium. Do you want to talk or listen.`,
      `Feel free to ask for help if you need it.`
    );
  },
  'StoreMemoryIntent': function () {
    this.handler.state = states.Q1MODE;
    this.emit(':askHandler',
      `I'm going to ask you about a memory. First, when did the memory happen?`,
      `When did the memory happen?`
    );
  },
  'GetPersonalMemoryIntent': function () {
    this.handler.state = states.MEMORYMODE;
    this.emit(':askHandler',
      `Do you want a happy or sad memory?`
    );
  },
  'GetPersonalHappyMemoryIntent': function () {
    this.emit(':tell',
      `This is a happy memory.`
    );
  },
  'GetPersonalSadMemoryIntent': function () {
    this.emit(':tell',
      `This is a sad memory.`
    );
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
      `HELP DIALOGUE HERE!`,
      `REPEAT HELP DIALOGUE HERE!`
    );
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'Unhandled': function () {
    this.emit(':askHandler', `Sorry, it's kinda loud in here. Did you want to talk or listen?`);
  }
};

const MemoryHandlers = Alexa.CreateStateHandler(states.MEMORYMODE, {
  'QuestionOneIntent': function () {
    this.attributes.date = this.event.request.intent.slots.date.value;
    if (this.attributes.date) {
      this.handler.state = states.Q2MODE;
      this.emit(':askHandler',
        `Great, so it happened on ${this.attributes.date}. Now who were you with?`,
        `Who were you with when this happened?`
      );
    } else {
      this.emit(':askHandler',
        `Sorry, I didn't catch that. When did it happen?`
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
      `Hi, I'm roots. Do you want to talk or listen?`,
      `Feel free to ask for help if you need it.`
    );
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'Unhandled': function () {
    this.emit(':askHandler', `Sorry, I didn't catch that. Do you want to try again?`);
  }
})

const QuestionOneHandlers = Alexa.CreateStateHandler(states.Q1MODE, {
  'QuestionOneIntent': function () {
    this.attributes.date = this.event.request.intent.slots.date.value;
    if (this.attributes.date) {
      this.handler.state = states.Q2MODE;
      this.emit(':askHandler',
        `Great, so it happened on ${this.attributes.date}. Now who were you with?`,
        `Who were you with when this happened?`
      );
    } else {
      this.emit(':askHandler',
        `Sorry, I didn't catch that. When did it happen?`
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
      `Hi, I'm roots. Do you want to talk or listen?`,
      `Feel free to ask for help if you need it.`
    );
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'Unhandled': function () {
    this.emit(':askHandler', `Sorry, I didn't catch that. Do you want to try again?`);
  }
});

const QuestionTwoHandlers = Alexa.CreateStateHandler(states.Q2MODE, {
  'QuestionTwoIntent': function () {
    this.attributes.name = this.event.request.intent.slots.name.value;
    if (this.attributes.name) {
      this.handler.state = states.Q3MODE;
      this.emit(':askHandler',
        `Cool, so ${this.attributes.name} was there. Now what were you doing?`
      );
    } else {
      this.emit(':askHandler',
        `Sorry, I didn't catch that. Who were you with?`
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
      `Hi, I'm roots. Do you want to talk or listen?`,
      `Feel free to ask for help if you need it.`
    );
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'Unhandled': function () {
    this.emit(':askHandler', `Sorry, I didn't catch that. Do you want to try again?`);
  }
});

const QuestionThreeHandlers = Alexa.CreateStateHandler(states.Q3MODE, {
  'QuestionThreeIntent': function () {
    this.attributes.eventtype = this.event.request.intent.slots.eventtype.value;
    if (this.attributes.eventtype) {
      this.handler.state = states.Q4MODE;
      this.emit(':askHandler',
        `So you were at a ${this.attributes.eventtype}. Now where did this happen?`
      );
    } else {
      this.emit(':askHandler',
        `Sorry, I didn't catch that. What did you do?`
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
      `Hi, I'm roots. Do you want to talk or listen?`,
      `Feel free to ask for help if you need it.`
    );
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'Unhandled': function () {
    this.emit(':askHandler', `Sorry, I didn't catch that. Do you want to try again?`);
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
        `Got it, the ${this.attributes.eventtype} happened in ${this.attributes.place}. Now just tell me about what happened. Feel free to say anything.`
      );
    } else {
      this.emit(':askHandler',
        `Sorry, I didn't catch that. Where did this happen?`
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
      `Hi, I'm roots. Do you want to talk or listen?`,
      `Feel free to ask for help if you need it.`
    );
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'Unhandled': function () {
    this.emit(':askHandler', `Sorry, I didn't catch that. Do you want to try again?`);
  }
});

const QuestionFiveHandlers = Alexa.CreateStateHandler(states.Q5MODE, {
  'Phrase': function () {
    const options = {
      method: 'POST',
      uri: 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment',
      headers: {
        'Ocp-Apim-Subscription-Key': 'TOKEN'
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
          responseText = `To me, that sounds like a good experience! How would you rate it?`;
        } else if (this.attributes.average == 0.5) {
          responseText = `To me, that sounds like it was ok. How would you rate it?`;
        } else {
          responseText = `To me, that sounds like a tough time. How would you rate it?`;
        }
        this.emit(':askHandler', responseText);
      }).catch(() => {
        this.emit(':tell', `Classic tree hacks, something went wrong with our API... Let us try to fix it!`);
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
      `Hi, I'm roots. Do you want to talk or listen?`,
      `Feel free to ask for help if you need it.`
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

      const params = {
        TableName: "Memoriam",
        Item: {
          "user-id": data.userId,
          "session-id": data.sessionId,
          "info": data.info
        }
      };

      docClient.put(params, (err, returnData) => {
        if (err) {
          console.log(JSON.stringify(err, null, 2));
          this.response.speak(`Some error occurred storing your data. That's hackathons for you...`);
          this.emit(':responseReady');
        } else {
          console.log('Successful put.');
          this.response.speak(`Thanks for chatting. I've remembered your memory, and you might hear it later if you ask for a memory...`);
          this.emit(':responseReady');
        }
      });
    } else {
      this.emit(':askHandler',
        `Sorry, I didn't catch that. How would you rate it?`
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
      `Hi, I'm roots. Do you want to talk or listen?`,
      `Feel free to ask for help if you need it.`
    );
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak(`Thanks for chatting with me.`);
    this.emit(':responseReady');
  },
  'Unhandled': function () {
    this.emit(':askHandler', `Sorry, I didn't catch that. Do you want to try again?`);
  }
});

const nonIntentHandlers = {
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
};
