import {RawCode, Pre, highlight, AnnotationHandler, HighlightedCode} from "codehike/code"
import { callout } from "./annotations/callout"
import {link} from "./annotations/link";
import {focus} from "./annotations/focus";
import React from "react";

export function MyCode({ codeblock }: { codeblock: HighlightedCode }) {
    return (
        <div>
            <Pre
                code={codeblock}
                handlers={[callout, focus, link]}
                style={{ background: "#212121", color: "#fafafa" }}
            />
        </div>
    )
}



