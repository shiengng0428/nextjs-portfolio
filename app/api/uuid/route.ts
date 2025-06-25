import { NextRequest, NextResponse } from "next/server";
import { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5 } from "uuid";

const DNS_NAMESPACE = uuidv5.DNS; // or your custom namespace

export async function POST(
    req: NextRequest
) {
    console.log(req);
    let version = "v4"; // Default to v4 if not specified
    try {
        if (req.body) {
            const body = await req.json();
            version = body.version || "v4";
        }
        let uuid = "";
        switch (version) {
            case "v1":
                uuid = uuidv1();
                break;
            case "v3":
                uuid = uuidv3("example.com", DNS_NAMESPACE);
                break;
            case "v4":
                uuid = uuidv4();
                break;
            case "v5":
                uuid = uuidv5("example.com", DNS_NAMESPACE);
                break;
            default:
                return NextResponse.json(
                    { success: false, error: "Invalid UUID version" },
                    { status: 400 }
                );
        }

        return NextResponse.json({ success: true, uuid });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "UUID generation failed" },
            { status: 500 }
        );
    }
}
