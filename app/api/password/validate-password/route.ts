import { NextRequest, NextResponse } from "next/server";
const PasswordValidator = require("validate-password");

export interface ValidatePasswordOptionDto {
    lowercase: boolean;
    uppercase: boolean;
    specialCharacters: boolean;
    numbers: boolean;
    minLength: number;
    maxLength: number;
}

export interface ValidatePasswordResultDto {
    isValid: boolean;
    validationMessage: string;
}

export async function POST(req: NextRequest) {
    const { password, validatePasswordDto } = await req.json();

    try {
        const { lowercase, uppercase, specialCharacters, numbers, minLength, maxLength } = validatePasswordDto;
        const options = {
            enforce: { lowercase, uppercase, specialCharacters, numbers },
            minLength, maxLength
        };

        const passwordValidator = new PasswordValidator(options);

        const result: ValidatePasswordResultDto = passwordValidator.checkPassword(password);

        if (!result.isValid) {
            throw new Error(result.validationMessage);
        }
        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
