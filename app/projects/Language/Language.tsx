"use client"

import React, { useEffect, useState, useMemo } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Language = {
    id: number
    name: string
    native_name: string
    code: string
}

const Language = () => {
    const [languages, setLanguage] = useState<Language[]>([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        const fetchLanguage = async () => {
            try {
                const res = await fetch("/api/language", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })
                const data = await res.json()
                if (data.success) setLanguage(data.languages)
            } catch (err) {
                console.error("Failed to fetch countries", err)
            }
        }

        fetchLanguage()
    }, [])

    // Wildcard-style filtering
    const filteredLanguages = useMemo(() => {
        const query = search.trim().toLowerCase()
        if (!query) return languages

        return languages.filter((l) =>
            `${l.name} ${l.native_name} ${l.code}`.toLowerCase().includes(query)
        )
    }, [search, languages])

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-4">
            <div className="text-sm text-muted-foreground space-y-2">
                <p>
                    This project uses the <code>iso-639-1</code> package to manage standardized two-letter language codes
                    (like <code>en</code> for English or <code>zh</code> for Chinese).
                    It's helpful for converting codes to readable language names in dropdowns or translators.
                    <br />
                    <br />
                    You can find it here:{" "}
                    <a
                        href="https://www.npmjs.com/package/iso-639-1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                    >
                        https://www.npmjs.com/package/iso-639-1
                    </a>
                </p>
                <p>To install the package, use one of the following commands:</p>

                <pre className="bg-muted rounded-md p-3 overflow-x-auto text-sm">
                    <code>
                        {`# NPM\nnpm install iso-639-1\n\n# PNPM\npnpm add iso-639-1\n\n# Yarn\nyarn add iso-639-1`}
                    </code>
                </pre>
            </div>


            <div>
                <Label htmlFor="search">Search</Label>
                <Input
                    id="search"
                    placeholder="Search by name, native name, or code..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mt-1"
                />
            </div>

            <Table>
                <TableCaption>A list of your countries.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Native Name</TableHead>
                        <TableHead className="text-right">Code</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredLanguages.map((language) => (
                        <TableRow key={language.id}>
                            <TableCell className="font-medium">{language.id}</TableCell>
                            <TableCell>{language.name}</TableCell>
                            <TableCell>{language.native_name}</TableCell>
                            <TableCell className="text-right">{language.code}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">{filteredLanguages.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default Language
