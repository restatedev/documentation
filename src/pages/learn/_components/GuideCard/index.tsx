import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import {
  Tags,
  TagList,
  type TagType,
  type Guide,
  type Tag,
} from '@site/src/data/guides';
import {sortBy} from '@site/src/utils/jsUtils';
import Heading from '@theme/Heading';
import Tooltip from '../GuideTooltip';
import styles from './styles.module.css';
import IdealImage from "@docusaurus/plugin-ideal-image/lib/theme/IdealImage";

const TagComp = React.forwardRef<HTMLLIElement, Tag>(
  ({label, color, description}, ref) => (
    <li ref={ref} className={styles.tag} title={description}>
      <span className={styles.textLabel}>{label.toLowerCase()}</span>
      <span className={styles.colorLabel} style={{backgroundColor: color}} />
    </li>
  ),
);

function GuideCardTag({tags}: {tags: TagType[]}) {
  const tagObjects = tags.map((tag) => ({tag, ...Tags[tag]}));

  // Keep same order for all tags
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    TagList.indexOf(tagObject.tag),
  );

  return (
    <>
      {tagObjectsSorted.map((tagObject, index) => {
        const id = `guide_card_tag_${tagObject.tag}`;

        return (
          <Tooltip
            key={index}
            text={tagObject.description}
            anchorEl="#__docusaurus"
            id={id}>
            <TagComp key={index} {...tagObject} />
          </Tooltip>
        );
      })}
    </>
  );
}

function getCardImage(guide: Guide): string {
  return (guide.preview);
}

function GuideCard({guide}: {guide: Guide}) {
  const image = getCardImage(guide);
  return (
    <li key={guide.title} className="card shadow--md">
      <div className={clsx('card__image', styles.guideCardImage)}>
        <IdealImage img={image} alt={guide.title} />
      </div>
      <div className="card__body">
        <div className={clsx(styles.guideCardHeader)}>
          <Heading as="h4" className={styles.guideCardTitle}>
            <Link href={guide.website} className={styles.guideCardLink}>
              {guide.title}
            </Link>
          </Heading>
          {guide.tags.includes('favorite') && (
              <a>🚀</a>
          )}
          {guide.source && (
            <Link
              href={guide.source}
              className={clsx(
                'button button--secondary button--sm',
                styles.guideCardSrcBtn,
              )}>
              <Translate id="guide.card.sourceLink">source</Translate>
            </Link>
          )}
        </div>
        <p className={styles.guideCardBody}>{guide.description}</p>
      </div>
      <ul className={clsx('card__footer', styles.cardFooter)}>
        <GuideCardTag tags={guide.tags} />
      </ul>
    </li>
  );
}

export default React.memo(GuideCard);
