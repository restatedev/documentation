import {parseProps, Block, HighlightedCodeBlock} from "codehike/blocks"

import {
  AnnotationHandler,
  InnerLine,
  Pre,
  HighlightedCode,
} from "codehike/code"
import { pill } from "../annotations/pill"
import { ruler } from "../annotations/ruler"
import {CodeTabs, HighCode} from "../code"
import React from "react"
// @ts-ignore
import styles from "./text-and-code.module.css"
import {z} from "zod";

export function TextAndCode(props: unknown) {
  const { title, children, groupId, result, tabs} = parseProps(
    props,
    Block.extend({
      groupId: z.optional(z.string()),
      result: z.optional(HighlightedCodeBlock),
      tabs: z.optional(z.array(HighlightedCodeBlock)),
    }),
  )

  return (
    <div className={`ruler-group m-0 ${styles["text-and-code"]}`}>
        <div className={styles["text-and-code-content"]}>
          {children}
        </div>
        <div className={styles["text-and-code-sticker"]}>
          { (result) ?
              <CodeWithNotes
                  code={result}
                  notes={{
                    result: { children: <CalloutCode code={result} /> },
                  }}
              /> :
              <CodeTabs groupId={groupId} tabs={tabs} className={""}/>
          }
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