/* eslint-disable @typescript-eslint/no-require-imports */
import { WebhookEvent } from '@line/bot-sdk';
import express, { Request, Response } from 'express';
const line = require('@line/bot-sdk');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Set your channel secret and access token
const config = {
    channelAccessToken: import.meta.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: import.meta.env.LINE_CHANNEL_SECRET
};

const client = new line.Client(config);

// Parse JSON body
app.use(bodyParser.json());

// Webhook endpoint to handle incoming messages
app.post('/webhook', (req: Request, res: Response) => {
    const events = req.body.events;

    Promise.all(events.map((event: WebhookEvent) => {
        if (event.type === 'message' && event.message.type === 'text') {
            // Echo the received message
            return client.replyMessage(event.replyToken, {
                type: 'text',
                text: event.message.text
            });
        }
    }))
        .then(() => res.status(200).end())
        .catch((err: Error) => {
            console.error(err);
            res.status(500).end();
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
