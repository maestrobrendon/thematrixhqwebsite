"use client"

import type { ServiceEntry } from "@/lib/data/services"

interface ProofStripProps {
  service: ServiceEntry
}

export function ProofStrip({ service }: ProofStripProps) {
  return (
    <div
      className="w-full flex justify-center items-center py-5 px-6"
      style={{ backgroundColor: "#142B22", borderTop: "1px solid #1A332A", borderBottom: "1px solid #1A332A" }}
    >
      <p
        className="text-center text-sm font-medium leading-snug"
        style={{ color: "#8CA89A", maxWidth: 640 }}
      >
        <span
          className="inline-block w-2 h-2 rounded-full mr-3 align-middle"
          style={{ backgroundColor: "#D6FF5C" }}
        />
        {service.proofStrip}
      </p>
    </div>
  )
}
