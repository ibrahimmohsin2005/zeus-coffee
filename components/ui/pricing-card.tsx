"use client"

import * as React from "react"
import { BadgeCheck, ArrowRight } from "lucide-react"
import NumberFlow from "@number-flow/react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export interface PricingTier {
    name: string
    price: Record<string, number | string>
    description: string
    features: string[]
    cta: string
    highlighted?: boolean
    popular?: boolean
}

interface PricingCardProps {
    tier: PricingTier
    paymentFrequency: string
}

export function PricingCard({ tier, paymentFrequency }: PricingCardProps) {
    const price = tier.price[paymentFrequency]
    const isHighlighted = tier.highlighted
    const isPopular = tier.popular

    return (
        <Card
            className={cn(
                "relative flex flex-col gap-8 overflow-hidden p-6 border-white/10",
                isHighlighted
                    ? "bg-white text-espresso" // Inverted for highlight
                    : "bg-espresso-light text-white",
                isPopular && "ring-2 ring-condensation" // Zeus accent
            )}
        >
            {isHighlighted && <HighlightedBackground />}
            {isPopular && <PopularBackground />}

            <h2 className="flex items-center gap-3 text-xl font-medium capitalize">
                {tier.name}
                {isPopular && (
                    <Badge variant="secondary" className="mt-1 z-10 bg-condensation text-espresso hover:bg-condensation/80">
                        🔥 Most Popular
                    </Badge>
                )}
            </h2>

            <div className="relative h-12">
                {typeof price === "number" ? (
                    <>
                        <NumberFlow
                            format={{
                                style: "currency",
                                currency: "USD",
                                trailingZeroDisplay: "stripIfInteger",
                            }}
                            value={price}
                            className="text-4xl font-medium tracking-tighter-custom"
                        />
                        <p className={cn("-mt-2 text-xs", isHighlighted ? "text-espresso/60" : "text-white/40")}>
                            Per shipment
                        </p>
                    </>
                ) : (
                    <h1 className="text-4xl font-medium tracking-tighter-custom">{price}</h1>
                )}
            </div>

            <div className="flex-1 space-y-2">
                <h3 className="text-sm font-medium">{tier.description}</h3>
                <ul className="space-y-2">
                    {tier.features.map((feature, index) => (
                        <li
                            key={index}
                            className={cn(
                                "flex items-center gap-2 text-sm font-medium",
                                isHighlighted ? "text-espresso/80" : "text-white/60"
                            )}
                        >
                            <BadgeCheck className="h-4 w-4" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <Button
                variant={isHighlighted ? "default" : "secondary"} // Swap variants
                className={cn("w-full cursor-pointer", isHighlighted ? "bg-espresso text-white hover:bg-espresso/90" : "bg-white text-espresso hover:bg-white/90")}
            >
                {tier.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </Card>
    )
}

const HighlightedBackground = () => (
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:45px_45px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20 pointer-events-none" />
)

const PopularBackground = () => (
    // Adapted gradient to condensation blue
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(165,210,235,0.15),rgba(255,255,255,0))] pointer-events-none" />
)
