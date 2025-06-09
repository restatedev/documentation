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
        className
    )}>
          {(githubUrl) ? <a
              href={githubUrl}
              className="ch-code-github-button"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub link"
          >
              <img src="/img/github.svg" height={18} alt="GitHub" className="github-open-link" color={"#57606a"} />
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
          {copied ? <Check size={18} color={"#57606a"} /> : <Copy size={18} color={"#57606a"} />}
        </button>
      </div>

  )
}
