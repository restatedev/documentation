import React from 'react';
import styles from './terminal.module.css';
import {Block, HighlightedCodeBlock, parseProps} from "codehike/blocks";
import {HighCode} from "./code";
import {HighlightedCode} from "codehike/code";

const Schema = Block.extend({ command: HighlightedCodeBlock, output: HighlightedCodeBlock })
export function Terminal(props: unknown) {
  const { command, output } = parseProps(props, Schema)

  return ( TerminalView(command, output) );
}

export function TerminalView(command, output) {
    return (
        <div className={styles.terminal}>
            <HighCode noBorder={true} highlighted={command} className={styles.terminalCommand}/>
            <HighCode noBorder={true} noCopyButton={true} highlighted={output} className={styles.terminalOutput}/>
        </div>
    );
}