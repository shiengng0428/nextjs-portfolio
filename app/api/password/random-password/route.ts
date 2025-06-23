import { NextRequest, NextResponse } from "next/server";
const PasswordGenerator = require("generate-password");

export interface GeneratePasswordDto {
    length: number;
    numbers: boolean;
    symbols: boolean;
    lowercase: boolean;
    uppercase: boolean;
    excludeSimilarCharacters: boolean;
    exclude: string;
    strict: boolean;
}

export async function POST(req: NextRequest) {
    const reqBody: GeneratePasswordDto = await req.json();

    try {
        const generatedPassword = PasswordGenerator.generate(reqBody);
        if (generatedPassword.includes("undefined")) {
            return NextResponse.json({ success: false, error: "Unable to generate password" }, { status: 500 });
        }
        return NextResponse.json({ success: true, generatedPassword });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

}