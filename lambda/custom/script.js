const AWS = require('aws');

var docClient = new AWS.DynamoDB.DocumentClient();

const data = {
  "user-id": "someUserID",
  "session-id": "someSessionID",
  "info": {
    "date":
    "name":
    "eventtype":
    "place":
    "sentiment":
    "rating":
  }
};
