require('dotenv').config();
const cron = require('node-cron');
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const client = require('twilio')(accountSid, authToken);
const sms = require('../sms/smsHelper.js');

const findAndSend = async () => {
  const mapedData = await sms.find();

  mapedData.map(data => {
    client.messages
      .create({
        body: data.body,
        from: '+15038556132',
        to: process.env.TEST_CELL
      })
      .then(message => console.log(message.sid));
  });
};

cron.schedule('* * * * *', function() {
  findAndSend();
});
