"use client"

import { useEffect, useMemo, useState } from "react"
import { Loader2, ArrowLeftRight } from "lucide-react"

import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type Language = {
    id: number
    name: string
    native_name: string
    code: string
}

const InputTextArea = ({
    inputText,
    setInputText,
}: {
    inputText: string
    setInputText: (text: string) => void
}) => (
    <div>
        <Label htmlFor="inputText">Text to Translate</Label>
        <br />
        <Textarea
            id="inputText"
            placeholder="Enter your text..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="h-[150px]"
        />
    </div>
)

const OutputTextArea = ({
    outputText,
    isLoading,
}: {
    outputText: string
    isLoading: boolean
}) => (
    <div>
        <Label htmlFor="outputText">Translated Text</Label>
        <br />
        <Textarea
            id="outputText"
            readOnly
            value={isLoading ? "Translating..." : outputText}
            className="h-[150px]"
        />
    </div>
)

const Language = () => {
    const [languages, setLanguages] = useState<Language[]>([])
    const [fromLang, setFromLang] = useState("en")
    const [toLang, setToLang] = useState("zh")
    const [inputText, setInputText] = useState("")
    const [outputText, setOutputText] = useState("")
    const [isTranslating, setIsTranslating] = useState(false)

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const res = await fetch("/api/translate", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })
                const data = await res.json()
                if (data.success) setLanguages(data.languages)
            } catch (err) {
                console.error("Failed to fetch languages", err)
            }
        }

        fetchLanguages()
    }, [])

    useEffect(() => {
        if (!inputText.trim() || !toLang || !fromLang) return

        const delay = setTimeout(async () => {
            setIsTranslating(true)
            try {
                const res = await fetch("/api/translate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: inputText, to: toLang, from: fromLang }),
                })

                const data = await res.json()
                if (data.success) {
                    setOutputText(data.translated)
                } else {
                    console.error(data.error)
                    setOutputText("")
                }
            } catch (error) {
                console.error("Translation error:", error)
                setOutputText("")
            } finally {
                setIsTranslating(false)
            }
        }, 600)

        return () => clearTimeout(delay)
    }, [inputText, fromLang, toLang])

    const languageOptions = useMemo(
        () =>
            languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                    {lang.name} ({lang.native_name})
                </SelectItem>
            )),
        [languages]
    )

    const swapLanguages = () => {
        setFromLang(toLang)
        setToLang(fromLang)
    }

    return (
        <div className="max-w-xl mx-auto p-4 space-y-4">
            <div className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-5">
                    <Label htmlFor="from">From</Label>
                    <br />
                    <Select value={fromLang} onValueChange={setFromLang}>
                        <SelectTrigger id="from">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>{languageOptions}</SelectContent>
                    </Select>
                </div>

                <div className="col-span-2 flex justify-center items-center">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={swapLanguages}
                        className="mt-6"
                        aria-label="Swap languages"
                    >
                        <ArrowLeftRight className="h-5 w-5" />
                    </Button>
                </div>

                <div className="col-span-5">
                    <Label htmlFor="to">To</Label>
                    <br />
                    <Select value={toLang} onValueChange={setToLang}>
                        <SelectTrigger id="to">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>{languageOptions}</SelectContent>
                    </Select>
                </div>
            </div>

            <InputTextArea inputText={inputText} setInputText={setInputText} />
            <OutputTextArea outputText={outputText} isLoading={isTranslating} />
        </div>
    )
}

export default Language
