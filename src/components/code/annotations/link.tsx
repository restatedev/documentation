import { AnnotationHandler } from "codehike/code"
import {Link} from "lucide-react";
import React from "react";

export const link: AnnotationHandler = {
  name: "link",
  Inline: ({ annotation, children }) => {
    const { query } = annotation

    return (
      <Link href={query} className="underline">
        {children}
      </Link>
    )
  },
}
