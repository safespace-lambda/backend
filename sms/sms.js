require('dotenv').config();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TEST_AUTH;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+15038556132',
    to: '+19142995078'
  })
  .then(message => console.log(message.sid));
