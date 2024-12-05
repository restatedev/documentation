import { AnnotationHandler, InnerLine } from "codehike/code"

export const mark: AnnotationHandler = {
  name: "mark",
  Line: ({ annotation, ...props }) => {
    const color = getColor(annotation)
    return (
      <div
        style={{
          borderLeft:  annotation && `solid 2px ${color}`,
          backgroundColor: annotation && `rgb(from ${color} r g b / 0.08)`,
        }}
        className="flex"
      >
        <InnerLine merge={props} className="px-2 flex-1" />
      </div>
    )
  },
  Inline: ({ annotation, children }) => {
    const color = getColor(annotation)
    return (
      <span
        style={{
          backgroundColor: `rgb(from ${color} r g b / 0.08)`,
        }}
        className="rounded px-0.5 py-0 -mx-0.5"
      >
        {children}
      </span>
    )
  },
}

function getColor(annotation?: { query?: string }) {
    const n = Number(annotation?.query || "0") % colors.length
    return colors[n] || annotation?.query
}

const colors = [
    "#4552CC",
    "#22c55e",
    "#14b8a6",
    "#0ea5e9",
    "#8b5cf6",
    "#d946ef",
    "#ec4899",
]
