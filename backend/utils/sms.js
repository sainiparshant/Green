const accountSid =  process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Ahoy 👋',
        messagingServiceSid: process.env.TWILIO_SERVICE_ID,
        to: '+918059668053'
    })
    .then(message => console.log(message.sid));