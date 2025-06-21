// app/api/translate/route.ts
import { NextRequest, NextResponse } from "next/server";
const translatte = require("translatte");

export async function POST(req: NextRequest) {
    const { text, to, from } = await req.json();

    try {
        const res = await translatte(text, { to, from });
        return NextResponse.json({ success: true, translated: res.text });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}