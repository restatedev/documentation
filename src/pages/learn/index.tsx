import React, {useState, useMemo, useEffect} from 'react';
import clsx from 'clsx';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Translate, {translate} from '@docusaurus/Translate';
import {useHistory, useLocation} from '@docusaurus/router';
import {usePluralForm} from '@docusaurus/theme-common';

import Layout from '@theme/Layout';
import {
  sortedGuides,
  Tags,
  TagList,
  type Guide,
  type TagType,
} from '../../data/guides';
import Heading from '@theme/Heading';
import GuideTagSelect, {
  readSearchTags,
} from './_components/GuideTagSelect';
import GuideFilterToggle, {
  type Operator,
  readOperator,
} from './_components/GuideFilterToggle';
import GuideCard from './_components/GuideCard';
import GuideToolTip from './_components/GuideTooltip';

import styles from './styles.module.css';

const TITLE = translate({message: 'Learn Restate'});
const DESCRIPTION = translate({
  message: 'Explore tutorial-like guides on diverse topics',
});

type UserState = {
  scrollTopPosition: number;
  focusedElementId: string | undefined;
};

function restoreUserState(userState: UserState | null) {
  const {scrollTopPosition, focusedElementId} = userState ?? {
    scrollTopPosition: 0,
    focusedElementId: undefined,
  };
  document.getElementById(focusedElementId)?.focus();
  window.scrollTo({top: scrollTopPosition});
}

export function prepareUserState(): UserState | undefined {
  if (ExecutionEnvironment.canUseDOM) {
    return {
      scrollTopPosition: window.scrollY,
      focusedElementId: document.activeElement?.id,
    };
  }

  return undefined;
}

const SearchNameQueryKey = 'name';

function readSearchName(search: string) {
  return new URLSearchParams(search).get(SearchNameQueryKey);
}

function filterGuides(
  guides: Guide[],
  selectedTags: TagType[],
  operator: Operator,
  searchName: string | null,
) {
  if (searchName) {
    // eslint-disable-next-line no-param-reassign
    guides = guides.filter((guide) =>
      guide.title.toLowerCase().includes(searchName.toLowerCase()),
    );
  }
  if (selectedTags.length === 0) {
    return guides;
  }
  return guides.filter((guide) => {
    if (guide.tags.length === 0) {
      return false;
    }
    if (operator === 'AND') {
      return selectedTags.every((tag) => guide.tags.includes(tag));
    }
    return selectedTags.some((tag) => guide.tags.includes(tag));
  });
}

function useFilteredGuides() {
  const location = useLocation<UserState>();
  const [operator, setOperator] = useState<Operator>('OR');
  // On SSR / first mount (hydration) no tag is selected
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [searchName, setSearchName] = useState<string | null>(null);
  // Sync tags from QS to state (delayed on purpose to avoid SSR/Client
  // hydration mismatch)
  useEffect(() => {
    setSelectedTags(readSearchTags(location.search));
    setOperator(readOperator(location.search));
    setSearchName(readSearchName(location.search));
    restoreUserState(location.state);
  }, [location]);

  return useMemo(
    () => filterGuides(sortedGuides, selectedTags, operator, searchName),
    [selectedTags, operator, searchName],
  );
}

function LearnCenterHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">💡{TITLE}</Heading>
      <p>{DESCRIPTION}</p>
    </section>
  );
}

function useSiteCountPlural() {
  const {selectMessage} = usePluralForm();
  return (sitesCount: number) =>
    selectMessage(
      sitesCount,
      translate(
        {
          id: 'guide.filters.resultCount',
          description:
            'Pluralized label for the number of guides found on the learning center.',
          message: '1 guide|{sitesCount} guides',
        },
        {sitesCount},
      ),
    );
}

function GuideFilters() {
  const filteredGuides = useFilteredGuides();
  const siteCountPlural = useSiteCountPlural();
  return (
    <section className="container margin-top--l margin-bottom--lg">
      <div className={clsx('margin-bottom--sm', styles.filterCheckbox)}>
        <div>
          <Heading as="h2">
            <Translate id="guide.filters.title">Filters</Translate>
          </Heading>
          <span>{siteCountPlural(filteredGuides.length)}</span>
        </div>
        <GuideFilterToggle />
      </div>
      <ul className={clsx('clean-list', styles.checkboxList)}>
        {TagList.map((tag, i) => {
          const {label, description, color} = Tags[tag];
          const id = `guide_checkbox_id_${tag}`;

          return (
            <li key={i} className={styles.checkboxListItem}>
              <GuideToolTip
                id={id}
                text={description}
                anchorEl="#__docusaurus">
                <GuideTagSelect
                  tag={tag}
                  id={id}
                  label={label}
                  icon={
                    tag === 'favorite' ? (<a>  🚀</a>) : (
                      <span
                        style={{
                          backgroundColor: color,
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          marginLeft: 8,
                        }}
                      />
                    )
                  }
                />
              </GuideToolTip>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const favoriteGuides = sortedGuides.filter((guide) =>
  guide.tags.includes('favorite'),
);
const otherGuides = sortedGuides.filter(
  (guide) => !guide.tags.includes('favorite'),
);

function SearchBar() {
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = useState<string | null>(null);
  useEffect(() => {
    setValue(readSearchName(location.search));
  }, [location]);
  return (
    <div className={styles.searchContainer}>
      <input
        id="searchbar"
        placeholder={translate({
          message: '🔍 Search for guide...',
          id: 'guide.searchBar.placeholder',
        })}
        value={value ?? undefined}
        onInput={(e) => {
          setValue(e.currentTarget.value);
          const newSearch = new URLSearchParams(location.search);
          newSearch.delete(SearchNameQueryKey);
          if (e.currentTarget.value) {
            newSearch.set(SearchNameQueryKey, e.currentTarget.value);
          }
          history.push({
            ...location,
            search: newSearch.toString(),
            state: prepareUserState(),
          });
          setTimeout(() => {
            document.getElementById('searchbar')?.focus();
          }, 0);
        }}
      />
    </div>
  );
}

function GuideCards() {
  const filteredGuides = useFilteredGuides();

  if (filteredGuides.length === 0) {
    return (
      <section className="margin-top--lg margin-bottom--xl">
        <div className="container padding-vert--md text--center">
          <Heading as="h2">
            <Translate id="guide.usersList.noResult">No result</Translate>
          </Heading>
        </div>
      </section>
    );
  }

  return (
    <section className="margin-top--lg margin-bottom--xl">
      {filteredGuides.length === sortedGuides.length ? (
        <>
          <div className={styles.guideFavorite}>
            <div className="container">
              <div
                className={clsx(
                  'margin-bottom--md',
                  styles.guideFavoriteHeader,
                )}>
                <Heading as="h2">
                  <Translate id="guide.favoritesList.title">
                    🚀 First time here?
                  </Translate>
                </Heading>
              </div>
              <ul
                className={clsx(
                  'container',
                  'clean-list',
                  styles.guideList,
                )}>
                {favoriteGuides.map((guide) => (
                  <GuideCard key={guide.title} guide={guide} />
                ))}
              </ul>
            </div>
          </div>
          <div className="container margin-top--lg">
            <Heading as="h2" className={styles.guideHeader}>
              <Translate id="guide.usersList.allUsers">All guides</Translate>
            </Heading>
            <ul className={clsx('clean-list', styles.guideList)}>
              {otherGuides.map((guide) => (
                <GuideCard key={guide.title} guide={guide} />
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="container">
          <div
            className={clsx('margin-bottom--md', styles.guideFavoriteHeader)}
          />
          <ul className={clsx('clean-list', styles.guideList)}>
            {filteredGuides.map((guide) => (
              <GuideCard key={guide.title} guide={guide} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default function LearnCenter(): JSX.Element {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <LearnCenterHeader />
        <GuideFilters />
        <div
          style={{display: 'flex', marginLeft: 'auto'}}
          className="container">
          <SearchBar />
        </div>
        <GuideCards />
      </main>
    </Layout>
  );
}
