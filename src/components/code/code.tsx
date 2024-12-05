import {
    AnnotationHandler,
    HighlightedCode,
    Inline,
    Pre,
} from "codehike/code"
import { CopyButton } from "./copy-button"
import { fold } from "./annotations/fold"
import { link } from "./annotations/link"
import { lineNumbers } from "./annotations/line-numbers"
import { CodeIcon } from "./annotations/icons"
import { collapse } from "./annotations/collapse"
import { callout } from "./annotations/callout"
import { mark } from "./annotations/mark"
import { pill } from "./annotations/pill"
import { ruler } from "./annotations/ruler"
import { wordWrap } from "./annotations/word-wrap"
import { tokenTransitions } from "./annotations/token-transitions"
import { focus } from "./annotations/focus"
import { diff } from "./annotations/diff"
import { tooltip } from "./annotations/tooltip"
// @ts-ignore
import Tabs from '@theme/Tabs';
// @ts-ignore
import TabItem from '@theme/TabItem';
import React from "react"
import {Block, HighlightedCodeBlock, parseProps} from "codehike/blocks";
import {z} from "zod"
import styles from "./code-styling.module.css"
import clsx from "clsx";
import {GithubButton} from "./github-button";

export function InlineCode({ codeblock }: { codeblock: HighlightedCode }) {
  return (
      <Inline
          code={codeblock}
          style={codeblock.style}
          className="selection:bg-editor-selectionBackground"
      />
  )
}

export function Code({
                             codeblock,
                             ...rest
                           }: {
  codeblock: HighlightedCode
  className?: string
  style?: React.CSSProperties
  extraHandlers?: AnnotationHandler[]
}) {
  return <HighCode highlighted={codeblock} {...rest} />
}

export function HighCode({
                           highlighted,
                           isTab,
                           noBorder,
                           noCopyButton,
                           githubLink,
                           className,
                           style,
                           extraHandlers = [],
                         }: {
  highlighted: HighlightedCode
  isTab?: boolean
  noBorder?: boolean
  noCopyButton?: boolean
  githubLink?: string
  className?: string
  style?: React.CSSProperties
  extraHandlers?: AnnotationHandler[]
}) {
  const { title, flags } = extractFlags(highlighted)
  const h = { ...highlighted, meta: title }

  const handlers = [
    ...extraHandlers,
    mark,
    tooltip,
    pill,
    fold,
    link,
    focus,
    ruler,
    flags.includes("a") && tokenTransitions,
    flags.includes("n") && lineNumbers,
    diff,
    ...collapse,
    flags.includes("w") && wordWrap,
    callout,
  ].filter(Boolean) as AnnotationHandler[]

  const pre = (
      <Pre
          code={h}
          handlers={handlers}
      />
  )

  if (title && !isTab) {
    return (
        <div
            className={clsx(
                className,
            )}
            style={
              {
                ...style,
              } as any
            }
        >
            <div className="ch-codeblock">
                <div className="ch-code-wrapper ch-code">
                    <div className={styles.codeFileName}>
                        <CodeIcon title={title}/>
                        <span className={styles.codeFileNameTitle}>{title}</span>
                    </div>
                    {(!noCopyButton) ? <CopyButton text={h.code} className="ch-code-button"/>: null}
                    {(!noCopyButton) ? <GithubButton githubUrl={githubLink} className="ch-code-button"/>: null}
                    {pre}
                </div>
            </div>
        </div>
    )
  } else {
      return (
          <div
              className={className}
              style={
              {
                ...style,
              } as any
            }
        >
            <div className={clsx("ch-codeblock", (isTab || noBorder) ? "no-border" : undefined)}>
                <div className="ch-code-wrapper ch-code">
                    {(!noCopyButton) ? <CopyButton text={h.code} className="ch-code-button" />: null}
                  {pre}
                </div>
            </div>
        </div>
    )
  }
}

export function extractFlags(codeblock: HighlightedCode) {
  const flags =
      codeblock.meta.split(" ").filter((flag) => flag.startsWith("-"))[0] ?? ""
  const title =
      codeblock.meta === flags
          ? ""
          : codeblock.meta.replace(" " + flags, "").trim()
  return { title, flags: flags.slice(1).split("") }
}


const Schema = Block.extend({ groupId: z.optional(z.string()), tabs: z.array(HighlightedCodeBlock) })
export function CodeWithTabs(props: unknown) {
    const { groupId, tabs } = parseProps(props, Schema)
    return <CodeTabs groupId={groupId} tabs={tabs} />
}

export function CodeTabs(props: { groupId?: string, tabs: HighlightedCode[] }) {
    const { groupId, tabs } = props
    return (

        <Tabs className={clsx(styles.codetablist, "ch-codetablist")} {...(groupId ? { groupId, queryString: true } : {})}>
            {tabs.map((tab, i) => (
                <TabItem className={clsx(styles.codetab)} label={tab.meta} value={tab.meta} >
                    <HighCode isTab={true} highlighted={tab}/>
                </TabItem>
                ))}
        </Tabs>
    )
}


