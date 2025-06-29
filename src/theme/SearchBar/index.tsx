import React, {type ReactNode} from 'react';
import SearchBar from '@theme-original/SearchBar';
import type SearchBarType from '@theme/SearchBar';
import type {WrapperProps} from '@docusaurus/types';
import AiSearch from "../../components/AiSearch";

type Props = WrapperProps<typeof SearchBarType>;

export default function SearchBarWrapper(props: Props): ReactNode {
  return (
  <>
    <div className={"inline-block padding-right--md"} style={{ verticalAlign: "middle" }}>
      <SearchBar {...props} />
    </div>
    <div className={"inline-block"}>
      <AiSearch/>
    </div>
  </>

  );
}
