import { NextRequest, NextResponse } from "next/server";
const ISO6391 = require("iso-639-1");

export async function GET() {
    const languageCodes = ISO6391.getAllCodes();
    console.log("Language Codes:", languageCodes);
    const languages = languageCodes.map((code: any, index: number) => ({
        id: index + 1,
        code,
        name: ISO6391.getName(code),
        native_name: ISO6391.getNativeName(code),
    }));

    return NextResponse.json({ success: true, languages });
}