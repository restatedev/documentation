import React, {useState} from 'react';
import styles from './terminal.module.css';
import tabStyles from "./code-styling.module.css"
import {Block, HighlightedCodeBlock, parseProps} from "codehike/blocks";
import {HighCode} from "./code";
import {z} from "zod";
import Tabs from "@theme/Tabs";
import clsx from "clsx";
import TabItem from "@theme/TabItem";

const Schema = Block.extend({
    command: HighlightedCodeBlock,
    output: HighlightedCodeBlock
})

export function Terminal(props: unknown) {
  const { command, output } = parseProps(props, Schema)
  return ( TerminalView(command, output) );
}

export function TerminalView(command, output, isTab?, expanded?) {
    const [isOpen, setIsOpen] = useState(expanded ?? false);

    return (
        <div className={clsx(styles.terminal, (!isTab) ? styles.terminalBorder : null)}>
            <div className={styles.terminalCommand}
                 style={{
                     display: 'flex',
                     // alignItems: 'center',
                     backgroundColor: 'white',
                     width: '100%'
                 }}>
                <span
                    onClick={() => setIsOpen(!isOpen)}
                    className={styles.terminalArrow}>
                    {isOpen ? '▼' : '▶'}
                </span>
                <div style={{ flexGrow: 1, display: 'flex' }}>
                    <HighCode
                        noBorder={true}
                        highlighted={command}
                        isTab={isTab ?? false}
                        style={{ flexGrow: 1 }}
                    />
                </div>
            </div>
            {isOpen && (
                <HighCode
                    noBorder={true}
                    noCopyButton={true}
                    highlighted={output}
                    className={styles.terminalOutput}
                />
            )}
        </div>
    );
}


const TerminalWithTabsSchema = Block.extend({groupId: z.optional(z.string()), terminals: z.array(Schema)})

export function TerminalWithTabs(props: unknown) {
    const {groupId, terminals} = parseProps(props, TerminalWithTabsSchema)
    return (

        <Tabs className={clsx(tabStyles.codetablist, "ch-codetablist")} {...(groupId ? { groupId, queryString: true } : {})}>
            {terminals.map((tab, i) => (
                <TabItem className={clsx(tabStyles.codetab)} label={tab.command.meta} value={tab.command.meta} >
                    {TerminalView(tab.command, tab.output, true)}
                </TabItem>
            ))}
        </Tabs>
    )
}