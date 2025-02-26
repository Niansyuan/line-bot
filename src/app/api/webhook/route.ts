import https from "https";
import { NextResponse, type NextRequest } from "next/server";

export const config = {
    api: {
        bodyParser: false, // line middleware 內會去轉換 req.body，因此這邊不需要再進行 bodyParser
    },
}

export async function GET() {
    return NextResponse.json(
        {
            message: "OK",
        },
        { status: 200 }
    );
}

export async function POST(req: NextRequest) {
    // @ts-expect-error events
    const events = req?.body?.events || [];
    const event = events[0];

    if (!events.length) {
        return NextResponse.json(
            {
                message: "No event data",
                test: process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN
            },
            { status: 400 }
        );
    }

    if (event && event.type === "message") {
        const dataString = JSON.stringify({
            replyToken: event.replyToken,
            messages: [
                { type: "text", text: "Hello, user" },
                { type: "text", text: "May I help you?" },
            ],
        });

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN}`,
        };

        const webhookOptions = {
            hostname: "api.line.me",
            path: "/v2/bot/message/reply",
            method: "POST",
            headers,
            body: dataString,
        };
        try {
            const responseBody = await new Promise((resolve, reject) => {
                const request = https.request(webhookOptions, (response) => {
                    let data = "";

                    response.on("data", (chunk) => {
                        data += chunk;
                    });

                    response.on("end", () => {
                        if (response.statusCode === 200) {
                            resolve({ message: "OK" });
                        } else {
                            console.error(`Error from LINE API: ${response.statusCode} - ${data}`);
                            reject({ message: "Error sending message to LINE API", details: data });
                        }
                    });
                });

                request.on("error", (err) => {
                    console.error("Error sending message:", err);
                    reject({ message: "Error sending message to LINE API", details: err.message });
                });

                request.write(dataString);
                request.end();
            });

            return NextResponse.json(responseBody, { status: 200 });
        } catch (error) {
            return NextResponse.json(error, { status: 500 });
        }
    }
}
