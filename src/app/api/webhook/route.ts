import { NextResponse } from 'next/server';
import { handleReplyText } from './handleReplyText';
import type { BotReply } from './type';

const LINE_ACCESS_TOKEN = process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN;

export async function GET() {
    return NextResponse.json(
        {
            message: "OK",
        },
        { status: 200 }
    );
}

async function replyMessage(
    replyToken: string,
    reply: BotReply,
) {
    const url = 'https://api.line.me/v2/bot/message/reply';
    const body = JSON.stringify({
        replyToken,
        messages: [{ type: 'textV2', text: `Whiskey: ${reply.text}`, substitution: reply.substitution }],
    });

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
        },
        body,
    });

    return await response.json();
}

export async function POST(req: Request) {
    const body = JSON.parse(JSON.stringify(await req.json()));

    const events = body.events || [];

    for (const event of events) {
        if (event.type === 'message' && event.message.type === 'text') {
            const replyToken = event.replyToken;
            const userMessage = event.message.text;
            const botReply = handleReplyText(userMessage);
            await replyMessage(replyToken, botReply);
        }
    }

    return new Response(JSON.stringify({ message: 'OK', events: events }), { status: 200 });
}
