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
                if (response.statusCode !== 200) {
                    console.error(`Error from LINE API: ${response.statusCode} - ${data}`);
                    return NextResponse.json(
                        { message: "Error sending message to LINE API" },
                        { status: 500 }
                    );
                }
            });
        });

        request.on("error", (err) => {
            console.error("Error sending message:", err);
            return NextResponse.json(
                { message: "Error sending message to LINE API" },
                { status: 500 }
            );
        });

        request.write(dataString);
        request.end();

        // Return a response only after processing is complete
        return NextResponse.json(
            {
                message: "OK",
            },
            { status: 200 }
        );
    }

    return NextResponse.json(
        { message: "Invalid event type" },
        { status: 400 }
    );
}
