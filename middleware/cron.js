const CronJob = require('../lib/cron.js').CronJob;
const { findAndSend } = require('../sms/sms.js');

console.log('Before job instantiation');
const job = new CronJob('2 * * * * *', findAndSend());
console.log('After job instantiation');
job.start();
