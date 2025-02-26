import https from "https";
import { NextResponse, type NextRequest } from "next/server";

export async function GET() {
    return NextResponse.json(
        {
            message: "OK",
        },
        { status: 200 }
    );
}

export async function POST(req: NextRequest) {
    // Now Next.js will automatically parse the body for you
    const body = await req.json();
    const event = body.events[0];

    if (event.type === "message") {
        const dataString = JSON.stringify({
            replyToken: event.replyToken,
            messages: [
                { type: "text", text: "Hello, user" },
                { type: "text", text: "May I help you?" },
            ],
        });

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
        };

        const webhookOptions = {
            hostname: "api.line.me",
            path: "/v2/bot/message/reply",
            method: "POST",
            headers,
        };

        const request = https.request(webhookOptions, (response) => {
            let data = "";
            response.on("data", (chunk) => {
                data += chunk;
            });
            response.on("end", () => {
                console.log("LINE API response:", data);
            });
        });

        request.on("error", (err) => {
            console.error("Error sending message:", err);
        });

        request.write(dataString);
        request.end();
    }

    return new NextResponse(JSON.stringify({ message: "Success" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
