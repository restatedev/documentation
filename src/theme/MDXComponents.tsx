import { useMDXComponents } from '@mdx-js/react';
import {Code, CodeWithTabs} from "../components/code/code"
import {Scrollycoding} from "../components/code/scrollycoding";


const MDXComponents = {
  // Define your custom MDX components here
  Code,
  CodeWithTabs,
  Scrollycoding
};

export default MDXComponents;
export { useMDXComponents };