// app/api/translate/route.ts
import { NextRequest, NextResponse } from "next/server";
const translatte = require("translatte");
const ISO6391 = require("iso-639-1");


export async function POST(req: NextRequest) {
    const { text, to, from } = await req.json();

    try {
        const res = await translatte(text, { to, from });
        return NextResponse.json({ success: true, translated: res.text });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    const languageCodes = ISO6391.getAllCodes();
    console.log("Available language codes:", languageCodes);
    const languages = languageCodes.map((code: any, index: number) => ({
        id: index + 1,
        code,
        name: ISO6391.getName(code),
        native_name: ISO6391.getNativeName(code),
    }));

    return NextResponse.json({ success: true, languages });
}