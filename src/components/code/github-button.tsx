"use client"

import { Copy, Check } from "lucide-react"
import * as React from "react"
import clsx from "clsx";

export function GithubButton({
  githubUrl,
  className,
}: {
  githubUrl: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  return (
    <button
      className={clsx(
        // `hover:bg-gray-400/20 -m-1 p-1 rounded hidden sm:block`,
        className,
      )}
      onClick={() => {
        window.open(githubUrl, "_blank")
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
      }}
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  )
}
