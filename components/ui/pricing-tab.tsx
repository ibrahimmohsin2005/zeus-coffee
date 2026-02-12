"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
// import { Badge } from "@/components/ui/badge" // Badge logic inside tab might be redundant if we just use styled text, but let's keep it if needed.
// Actually the prompt code uses Badge.
import { Badge } from "@/components/ui/badge"

interface TabProps {
    text: string
    selected: boolean
    setSelected: (text: string) => void
    discount?: boolean
}

export function Tab({
    text,
    selected,
    setSelected,
    discount = false,
}: TabProps) {
    return (
        <button
            onClick={() => setSelected(text)}
            className={cn(
                "relative w-fit px-4 py-2 text-sm font-semibold capitalize",
                "text-white/60 transition-colors", // Adapted text color
                selected && "text-white",
                discount && "flex items-center justify-center gap-2.5"
            )}
        >
            <span className="relative z-10">{text}</span>
            {selected && (
                <motion.span
                    layoutId="tab"
                    transition={{ type: "spring", duration: 0.4 }}
                    className="absolute inset-0 z-0 rounded-full bg-white/10 shadow-sm" // Adapted active bg
                />
            )}
            {discount && (
                <Badge
                    variant="secondary"
                    className={cn(
                        "relative z-10 whitespace-nowrap shadow-none bg-condensation text-espresso hover:bg-condensation/80", // Adapted badge
                        selected && "bg-condensation"
                    )}
                >
                    Save 20%
                </Badge>
            )}
        </button>
    )
}
