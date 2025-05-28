import React, {type ReactNode} from 'react';
import DocBreadcrumbs from '@theme-original/DocBreadcrumbs';
import type DocBreadcrumbsType from '@theme/DocBreadcrumbs';
import type {WrapperProps} from '@docusaurus/types';
import AskAiButton from "../../components/CopyPageDropdown";

type Props = WrapperProps<typeof DocBreadcrumbsType>;

export default function DocBreadcrumbsWrapper(props: Props): ReactNode {
  return (
    <>
      <DocBreadcrumbs {...props} />
      <AskAiButton/>
    </>
  );
}
