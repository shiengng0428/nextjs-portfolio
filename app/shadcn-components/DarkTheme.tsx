// components/ThemeToggle.tsx
"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Prevent hydration mismatch
    if (!mounted) return null

    const isDark = resolvedTheme === "dark"

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative"
        >
            <Sun
                className={`h-[1.2rem] w-[1.2rem] transition-transform duration-300 ease-in-out ${isDark ? "scale-0 rotate-90" : "scale-100 rotate-0 text-black"
                    }`}
            />
            <Moon
                className={`absolute h-[1.2rem] w-[1.2rem] transition-transform duration-300 ease-in-out ${isDark ? "scale-100 rotate-0 text-white" : "scale-0 rotate-90"
                    }`}
            />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
