"use client"

import React, { use, useEffect, useState } from "react"

const ValidatePassword = () => {
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<{ isValid: boolean; message: string } | null>(null)
    const [isValidating, setIsValidating] = useState(false);

    const [options, setOptions] = useState({
        lowercase: true,
        uppercase: true,
        specialCharacters: true,
        numbers: true,
        minLength: 8,
        maxLength: 10,
    })

    const handleToggle = (field: keyof typeof options) => {
        setOptions(prev => ({ ...prev, [field]: !prev[field] }))
    }

    const handleLengthChange = (field: "minLength" | "maxLength", value: number) => {
        setOptions(prev => ({ ...prev, [field]: value }))
    }

    useEffect(() => {
        if (!password.trim()) return;

        const delay = setTimeout(async () => {
            setIsValidating(true);
        })
    })

    const handleSubmit = async () => {
        setIsLoading(true)
        setResult(null)

        try {
            const res = await fetch("/api/password/validate-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password, validatePasswordDto: options }),
            })

            const data = await res.json()

            if (data.success) {
                setResult({ isValid: true, message: "✅ Password is valid!" })
            } else {
                setResult({ isValid: false, message: data.error })
            }
        } catch (err) {
            setResult({ isValid: false, message: "❌ Something went wrong." })
        }

        setIsLoading(false)
    }

    return (
        <div className="p-4 max-w-lg mx-auto space-y-6 border rounded-lg shadow">
            <h2 className="text-xl font-semibold">🔐 Password Validator</h2>

            <div className="space-y-2">
                <label className="block font-medium">Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {(["lowercase", "uppercase", "specialCharacters", "numbers"] as const).map(key => (
                    <label key={key} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={options[key]}
                            onChange={() => handleToggle(key)}
                        />
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
                {
                    ["minLength", "maxLength"].map((requirement: any) => (
                        <div>
                            <label className="block">{requirement === "minLength" ? "Minimum Length" : "Maximum Length"}:</label>
                            <input
                                type="number"
                                min={1}
                                value={options.minLength}
                                onChange={e => handleLengthChange(requirement, parseInt(e.target.value))}
                                className="w-full border px-2 py-1 rounded"
                            />
                        </div>
                    ))
                }
            </div>

            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {isLoading ? "Validating..." : "Validate"}
            </button>

            {result && (
                <p className={`font-medium ${result.isValid ? "text-green-600" : "text-red-600"}`}>
                    {result.message}
                </p>
            )}
        </div>
    )
}

export default ValidatePassword
