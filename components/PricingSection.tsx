"use client"

import * as React from "react"
import { PricingCard, type PricingTier } from "@/components/ui/pricing-card"
import { Tab } from "@/components/ui/pricing-tab"

interface PricingSectionProps {
    title: string
    subtitle: string
    tiers: PricingTier[]
    frequencies: string[]
}

function PricingBlock({
    title,
    subtitle,
    tiers,
    frequencies,
}: PricingSectionProps) {
    const [selectedFrequency, setSelectedFrequency] = React.useState(frequencies[0])

    return (
        <section className="flex flex-col items-center gap-10 py-32 px-6 relative z-10 border-t border-white/5 bg-espresso">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_35px] opacity-[0.05] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />

            <div className="space-y-7 text-center relative z-10">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold md:text-5xl tracking-tighter-custom text-white">{title}</h1>
                    <p className="text-white/60 max-w-lg mx-auto">{subtitle}</p>
                </div>
                <div className="mx-auto flex w-fit rounded-full bg-white/5 p-1">
                    {frequencies.map((freq) => (
                        <Tab
                            key={freq}
                            text={freq}
                            selected={selectedFrequency === freq}
                            setSelected={setSelectedFrequency}
                            discount={freq === "sub"}
                        />
                    ))}
                </div>
            </div>

            <div className="grid w-full max-w-6xl gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {tiers.map((tier) => (
                    <PricingCard
                        key={tier.name}
                        tier={tier}
                        paymentFrequency={selectedFrequency}
                    />
                ))}
            </div>
        </section>
    )
}

// --- Data ---

const PAYMENT_FREQUENCIES = ["one-time", "sub"]

const TIERS = [
    {
        name: "The Starter",
        price: {
            "one-time": 48,
            "sub": 38,
        },
        description: "Perfect for the curious. 12 cans of pure focus.",
        features: [
            "12 Cans (6.8oz)",
            "Nitrogen Infused",
            "Notes: Dark Chocolate, Berry",
            "Ships within 24h",
        ],
        cta: "Secure Supply",
        popular: false,
    },
    {
        name: "The Ritual",
        price: {
            "one-time": 85,
            "sub": 68,
        },
        description: "The daily driver. 24 cans to keep you ascended.",
        features: [
            "24 Cans (Case)",
            "Nitrogen Infused",
            "Priority Shipping",
            "10% Off Merch",
        ],
        cta: "Join The Ritual",
        popular: true,
    },
    {
        name: "The God Mode",
        price: {
            "one-time": 150,
            "sub": 120,
        },
        description: "For the heavy hitter. 48 cans. Zero downtime.",
        features: [
            "48 Cans (Double Case)",
            "Nitrogen Infused",
            "Free Express Shipping",
            "Access to 'Black Card' Drops",
            "Dedicated Support",
        ],
        cta: "Enter God Mode",
        highlighted: true,
    },
]

export default function PricingSection() {
    return (
        <PricingBlock
            title="CHOOSE YOUR FUEL"
            subtitle="Subscribe and save 20%. Cancel anytime. No questions asked."
            frequencies={PAYMENT_FREQUENCIES}
            tiers={TIERS}
        />
    );
}
