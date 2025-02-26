import { NextResponse } from 'next/server';

const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN || 'RyrozkcGnn2S/lOsSfcVniY8qCDRL41RmuIH/hZNm06W3ylh8Zm491vdvKJBJUycpR4g7C96eVEc9PFh4pc47sgxIEKJjOpk5aE+RZBtdVmqPPK1T2kVx1zaYBmn/bcl6ZCb4j4IGZ7zAVewnu2ZvAdB04t89/1O/w1cDnyilFU=';

export async function GET() {
    return NextResponse.json(
        {
            message: "OK",
        },
        { status: 200 }
    );
}

async function replyMessage(replyToken: string, message: string) {
    const url = 'https://api.line.me/v2/bot/message/reply';

    const body = JSON.stringify({
        replyToken,
        messages: [{ type: 'text', text: message }],
    });

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
        },
        body,
    });

    return response.json();
}

export async function POST(req: Request) {
    const body = JSON.parse(JSON.stringify(await req.json()));

    const events = body.events || [];

    for (const event of events) {
        if (event.type === 'message' && event.message.type === 'text') {
            const replyToken = event.replyToken;
            const userMessage = event.message.text;
            const botReply = `You said: ${userMessage}`;
            await replyMessage(replyToken, botReply);
        }
    }

    return new Response(JSON.stringify({ message: 'OK', events: events }), { status: 200 });
}
