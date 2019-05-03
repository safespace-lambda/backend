const express = require('express');

const router = express();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

router.use(express.json());

router.post('/', (req, res) => {
        const { body, from, to } = req.body;
        client.messages.create({
            body: body,
            from: from,
            to: to
        })
        .then (message => {
            console.log(message.sid);
            res.json({message : "message successfully sent"})
        })
        .catch(err => {
            res.status(500).json({err});
        })

})

module.exports = router;