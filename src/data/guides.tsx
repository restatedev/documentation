/* eslint-disable global-require */

import {translate} from '@docusaurus/Translate';
import {sortBy} from '@site/src/utils/jsUtils';

/*
 * ADD YOUR GUIDE TO THE LEARN SECTION
 *
 *
 * Instructions for maintainers:
 * - Add the site in the json array below
 * - `title` is the guide's title (no need for the "Docs" suffix)
 * - A short (≤120 characters) description of the guide
 * - Use relevant tags to categorize the guide (see available tags below)
 * - Add a local image preview (decent image/screenshot of the guide)
 * - The image MUST be added to the GitHub repository, and use `require("img")`
 * - The image has to have minimum width 640 and an aspect of no wider than 2:1
 * - If the guide has source code related to it, add a source link.
 * - Resize images: node admin/scripts/resizeImage.js
 * - Run optimizt manually (see resize image script comment)
 *
 */

// LIST OF AVAILABLE TAGS
// Available tags to assign to a guide
// Please choose all tags that you think might apply.
// Don't add new tags without checking whether this fits the page structure.
export type TagType =
  | 'favorite'
  | 'tipsntricks'
  | 'devex'
  | 'workflows'
  | 'eventprocessing'
  | 'deployment'
  | 'basics'
  | 'intermediate'
  | 'advanced'
  | 'java'
  | 'typescript'
  | 'blog'
  | 'tutorial'
  | 'video'
  | 'pattern'
  | 'example';

// Add sites to this list
// prettier-ignore
const Guides: Guide[] = [
  {
    title: 'Quickstart',
    description: 'Get started with Restate in minutes',
    preview: require('./guides/observability.jpeg'),
    website: '/quickstart',
    source: null,
    tags: ['favorite', 'tutorial', 'basics', 'java', 'typescript'],
  },
  {
    title: 'Tour of Restate',
    description: 'Develop an end-to-end Restate application, covering all the essentials.',
    preview: require('../../static/img/tour-of-restate-diagram-handler.png'),
    website: '/tour',
    source: null,
    tags: ['favorite', 'tutorial', 'basics', 'java', 'typescript'],
  },
  {
    title: 'Restate on AWS Lambda via AWS console',
    description: 'Deploying Restate services to AWS Lambda via the AWS console.',
    preview: require('./guides/lambda-console-guide.png'),
    website: '/guides/lambda_deployment',
    source: 'https://github.com/restatedev/examples/tree/main/typescript/hello-world-lambda',
    tags: ['basics', 'deployment', 'typescript'],
  },
  {
    title: 'Kafka Event Processing with Restate',
    description:
        'A hands-on example on how to trigger a Restate service over Kafka',
    preview: require('./guides/kakfa-guide.png'),
    website: 'https://restate.dev/blog/restate--kafka-event-driven-apps-where-event-driven-is-an-implementation-detail/',
    source: null,
    tags: ['eventprocessing', 'basics'],
  },
  {
    title: "Graceful cancellations",
    description: "With graceful cancellations, you can stop service invocations and workflows while keeping the overall application state consistent.",
    preview: require('./guides/cancellation-signal-propagation.png'),
    website: 'https://restate.dev/blog/graceful-cancellations-how-to-keep-your-application-and-workflow-state-consistent/',
    source: 'https://github.com/restatedev/examples/blob/main/typescript/patterns/src/compensations.ts',
    tags: ['deployment', 'basics'],
  },
  {
    title: 'Restate + Kubernetes',
    description:
        'Find out how to deploy Restate applications on Kubernetes',
    preview: require('./guides/kubernetes.png'),
    website: '/guides/kubernetes',
    source: 'https://github.com/algolia/docsearch/tree/main/packages/website',
    tags: ['deployment', 'basics'],
  }

  // Add new guides in alphabetical order!
];

export type Guide = {
  title: string;
  description: string;
  preview: string | null; // null = use our serverless screenshot service
  website: string;
  source: string | null;
  tags: TagType[];
};

export type Tag = {
  label: string;
  description: string;
  color: string;
};

export const Tags: {[type in TagType]: Tag} = {
  favorite: {
    label: translate({message: 'Starters'}),
    description: translate({
      message:
        'Our favorite Restate guides that you must absolutely check out!',
      id: 'showcase.tag.favorite.description',
    }),
    color: '#e9669e',
  },

  tipsntricks: {
    label: translate({message: 'Tips & Tricks'}),
    description: translate({
      message: 'Useful tips and tricks to make working with Restate easy!',
      id: 'showcase.tag.tipsntricks.description',
    }),
    color: '#39ca30',
  },

  devex: {
    label: translate({message: 'Developer Experience'}),
    description: translate({
      message: 'Learn how to get the best developer experience when working with Restate!',
      id: 'showcase.tag.devex.description',
    }),
    color: '#dfd545',
  },

  workflows: {
    label: translate({message: 'Workflows'}),
    description: translate({
      message:
        'Learn how to write resilient workflows with Restate.',
      id: 'showcase.tag.workflows.description',
    }),
    color: '#a44fb7',
  },

  eventprocessing: {
    label: translate({message: 'Event Processing'}),
    description: translate({
      message:
        'Learn how to process events with Restate.',
      id: 'showcase.tag.eventprocessing.description',
    }),
    color: '#127f82',
  },

  deployment: {
    label: translate({message: 'Deployment'}),
    description: translate({
      message:
        'Learn how to deploy Restate applications.',
      id: 'showcase.tag.deployment.description',
    }),
    color: '#fe6829',
  },

  basics: {
    label: translate({message: 'Basics'}),
    description: translate({
      message:
        'Guides on basic topics.',
      id: 'showcase.tag.basics.description',
    }),
    color: '#8c2f00',
  },

  intermediate: {
    label: translate({message: 'Intermediate'}),
    description: translate({
      message: 'Guides on intermediate topics.',
      id: 'showcase.tag.intermediate.description',
    }),
    color: '#4267b2', // Facebook blue
  },

  advanced: {
    label: translate({message: 'Advanced'}),
    description: translate({
      message:
        'Guides on advanced topics.',
      id: 'showcase.tag.advanced.description',
    }),
    color: '#14cfc3',
  },

  java: {
    label: translate({message: 'Java SDK'}),
    description: translate({
      message:
        'Guides using the Java SDK.',
      id: 'showcase.tag.java.description',
    }),
    color: '#ffcfc3',
  },

  typescript: {
    label: translate({message: 'TypeScript SDK'}),
    description: translate({
      message:
        'Guides using the TypeScript SDK.',
      id: 'showcase.tag.typescript.description',
    }),
    color: '#fff200',
  },

  blog: {
    label: translate({message: 'Blog'}),
    description: translate({
      message:
        'Tutorial-like blog posts.',
      id: 'showcase.tag.blog.description',
    }),
    color: '#89da26',
  },

  tutorial: {
    label: translate({message: 'Tutorial'}),
    description: translate({
      message:
        'Tutorials to get you started smoothly.',
      id: 'showcase.tag.tutorial.description',
    }),
    color: '#ff0000',
  },

  video: {
    label: translate({message: 'Video'}),
    description: translate({
      message:
        'Restate videos on all sorts of topics.',
      id: 'showcase.tag.video.description',
    }),
    color: '#205d14',
  },

  pattern: {
    label: translate({message: 'Pattern'}),
    description: translate({
      message:
        'Common patterns to help you speed up your development.',
      id: 'showcase.tag.pattern.description',
    }),
    color: '#2c2681',
  },

  example: {
    label: translate({message: 'Example'}),
    description: translate({
      message:
        'Find out how to implement common use cases.',
      id: 'showcase.tag.example.description',
    }),
    color: '#c80adc',
  },
};

export const TagList = Object.keys(Tags) as TagType[];
function sortGuides() {
  let result = Guides;
  // Sort by site name
  result = sortBy(result, (user) => user.title.toLowerCase());
  // Sort by favorite tag, favorites first
  result = sortBy(result, (user) => !user.tags.includes('favorite'));
  return result;
}

export const sortedGuides = sortGuides();
