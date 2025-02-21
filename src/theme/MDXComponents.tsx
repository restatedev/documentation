import { useMDXComponents } from "@mdx-js/react";
import { Code, CodeWithTabs } from "../components/code/code";
import { Scrollycoding } from "../components/code/scrollycoding";
import OriginalMDXComponents from "@theme-original/MDXComponents";

const MDXComponents = {
  ...OriginalMDXComponents,
  Code,
  Scrollycoding,
};

export default MDXComponents;
export { useMDXComponents };
