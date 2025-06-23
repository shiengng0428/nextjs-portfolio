"use client"

import { toast } from "sonner"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

const RandomPassword = () => {
    const [generatedPassword, setGeneratedPassword] = useState("");
    const [form, setForm] = useState({
        length: 12,
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true,
        excludeSimilarCharacters: false,
        exclude: "",
        strict: true,
    });
    const [isSuccess, setIsSuccess] = useState(false)

    const handleChange = (key: string, value: any) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    const generatePassword = async () => {
        const res = await fetch("/api/password/random-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
        const data = await res.json()
        if (data.success) {
            setIsSuccess(true)
            setGeneratedPassword(data.generatedPassword)
        } else {
            setIsSuccess(false)
            setGeneratedPassword("Error generating password")
        }
    }

    return (
        <div className="grid w-full max-w-md gap-4 p-4 border rounded-lg">
            <div className="grid gap-2">
                <Label>Password Generated:</Label>
                <div className="flex items-center gap-2">
                    <Input
                        disabled
                        value={generatedPassword}
                        placeholder="Generated password"
                        className="flex-1"
                    />
                    {
                        !isSuccess ? <></> : <Button
                            variant="outline"
                            onClick={() => {
                                navigator.clipboard.writeText(generatedPassword)
                                toast("Password copied to clipboard!", {
                                    description: "You can now paste the password wherever you want."
                                })
                            }}
                        >
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                        </Button>
                    }
                </div>
            </div>

            <div className="grid gap-2">
                <Label>Password Length</Label>
                <Input
                    type="number"
                    min={4}
                    max={50}
                    value={form.length}
                    onChange={e => handleChange("length", Number(e.target.value))}
                />
            </div>

            {[
                { label: "Include Numbers", key: "numbers" },
                { label: "Include Symbols", key: "symbols" },
                { label: "Include Lowercase", key: "lowercase" },
                { label: "Include Uppercase", key: "uppercase" },
                { label: "Exclude Similar Characters", key: "excludeSimilarCharacters" },
                { label: "Strict Mode", key: "strict" },
            ].map(({ label, key }) => (
                <div key={key} className="flex items-center justify-between">
                    <Label>{label}</Label>
                    <Switch
                        checked={form[key as keyof typeof form] as boolean}
                        onCheckedChange={(checked: boolean) => handleChange(key, checked)}
                    />
                </div>
            ))}

            <div className="grid gap-2">
                <Label>Exclude Characters</Label>
                <Input
                    value={form.exclude}
                    onChange={e => handleChange("exclude", e.target.value)}
                    placeholder="Example: 0oO1ilI"
                />
            </div>

            <Button onClick={generatePassword}>Generate Password</Button>
        </div>
    )
}

export default RandomPassword
