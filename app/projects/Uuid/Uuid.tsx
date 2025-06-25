"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"

enum UuidType {
    V1 = "v1",
    V3 = "v3",
    V4 = "v4",
    V5 = "v5",
}

const Uuid = () => {
    const [uuidType, setUuidType] = useState<UuidType>(UuidType.V4)
    const [uuid, setUuid] = useState("")

    useEffect(() => {
        if (!uuid) {
            generateUuid()
        }
    }, [uuidType]) // Regenerate UUID when uuidType changes

    const generateUuid = async () => {
        try {
            const res = await fetch(`/api/uuid`, {
                method: "POST",
                body: JSON.stringify({ version: uuidType }),
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            console.log("Generated UUID:", data)
            if (data.success) setUuid(data.uuid)
        } catch (error) {
            console.error("Failed to fetch UUID", error)
        }
    }

    return (
        <div className="flex flex-col gap-4 max-w-lg w-full">
            <RadioGroup
                value={uuidType}
                onValueChange={(val: UuidType) => setUuidType(val)}
                className="flex flex-row gap-6"
            >
                {Object.values(UuidType).map((type) => (
                    <div key={type} className="flex items-center gap-2">
                        <RadioGroupItem value={type} id={`uuid-${type}`} />
                        <Label htmlFor={`uuid-${type}`}>{type.toUpperCase()}</Label>
                    </div>
                ))}
            </RadioGroup>

            <div className="flex items-center gap-2">
                <Input
                    className="flex-grow"
                    type="text"
                    placeholder="UUID"
                    value={uuid}
                    onChange={(e) => setUuid(e.target.value)}
                />
                <Button
                    type="button"
                    variant="outline"
                    onClick={generateUuid}
                >
                    Generate
                </Button>
            </div>
        </div>
    )
}

export default Uuid
