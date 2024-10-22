import {parseProps, Block, HighlightedCodeBlock} from "codehike/blocks"

import {
  AnnotationHandler,
  InnerLine,
  Pre,
  HighlightedCode,
} from "codehike/code"
import { pill } from "../annotations/pill"
import { ruler } from "../annotations/ruler"
import { HighCode } from "../code"
import React from "react"
import styles from "./text-and-code.module.css"

export function TextAndCode(props: unknown) {
  const { title, children, result } = parseProps(
    props,
    Block.extend({
      result: HighlightedCodeBlock,
    }),
  )

  const resultChildren = <CalloutCode code={result} />
  return (
    <div className={`ruler-group m-0 ${styles["text-and-code"]}`}>
        <div className={styles["text-and-code-content"]}>
          {children}
        </div>
        <div className={styles["text-and-code-sticker"]}>
          <CodeWithNotes
            code={result}
            notes={{
              result: { children: resultChildren },
            }}
          />
        </div>
    </div>
  )
}

export function CodeWithNotes({
  code,
  notes = {},
}: {
  code: HighlightedCode
  notes?: Record<string, { children: React.ReactNode }>
}) {
  code.annotations = code.annotations.map((a) => {
    const note = notes[a.query]
    if (!note) return a
    return {
      ...a,
      data: {
        ...a.data,
        children: note.children,
      },
    }
  })

  return <HighCode highlighted={code} />
}

function CalloutCode({ code }: { code: HighlightedCode }) {
  return (
    <Pre
      code={code}
      className="m-0 py-1 px-0 bg-transparent"
      handlers={[ruler, lineHandler, pill]}
    />
  )
}

const lineHandler: AnnotationHandler = {
  name: "line",
  Line: (props) => {
    return <InnerLine merge={props} className="px-3" />
  },
}