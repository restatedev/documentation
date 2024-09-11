import {AnnotationHandler} from "codehike/code";
import React from "react";

export const link: AnnotationHandler = {
    name: "link",
    Inline: ({ annotation, children }) => {
        const { query } = annotation
        return <a href={query}>{children}</a>
    },
}