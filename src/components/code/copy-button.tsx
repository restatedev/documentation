"use client"

import { Copy, Check } from "lucide-react"
import * as React from "react"
import clsx from "clsx";

export function CopyButton({
  text,
  githubUrl,
  className,
}: {
  text: string,
  githubUrl?: string,
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  return (
      <div className={clsx(
        // `hover:bg-gray-400/20 -m-1 p-1 rounded hidden sm:block`,
        className
    )}>
        {(githubUrl) ? <a
          href={githubUrl}
          className="ch-code-github-button"
          target="_blank"
          rel="noopener noreferrer"

          aria-label="Open GitHub link"
      >
        <img width={16} src={"/img/github.svg"}/>
      </a> : null}
      <button
          className="ch-code-copy-button"
          onClick={() => {
            navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 1200)
          }}
          aria-label="Copy to clipboard"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>

  )
}
