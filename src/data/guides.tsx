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
  | 'workflows'
  | 'microservices'
  | 'eventprocessing'
  | 'develop'
  | 'deploy'
  | 'operate'
  | 'java'
  | 'typescript'
  | 'rust'
  | 'go'
  | 'python';

// Add sites to this list
// prettier-ignore
const Guides: Guide[] = [
  {
    title: "Sagas",
    description: "Implementing undo operations in case of failures, to keep your system consistent.",
    preview: require('./guides/cancellation-signal-propagation.png'),
    website: '/guides/sagas',
    source: null,
    tags: ['develop', 'workflows', 'microservices'],
  },
  {
    title: 'TypeScript services on AWS Lambda',
    description: 'Deploying Restate TypeScript services to AWS Lambda via the AWS console.',
    preview: require('./guides/lambda-console-guide.png'),
    website: '/guides/lambda-ts',
    source: null,
    tags: ['deploy', 'typescript'],
  },
  {
    title: 'Restate + Kafka Quickstart',
    description:
        'A hands-on example on how to trigger a Restate service over Kafka',
    preview: require('./guides/kafka-guide.png'),
    website: '/guides/kafka-quickstart',
    source: null,
    tags: ['eventprocessing'],
  },
  {
    title: "Restate + XState",
    description:
        'Blog post on persistent serverless state machines with XState and Restate',
    preview: require('./guides/xstate-img.png'),
    website: 'https://restate.dev/blog/persistent-serverless-state-machines-with-xstate-and-restate/',
    source: 'https://github.com/restatedev/xstate/tree/main',
    tags: ['develop', 'typescript', 'microservices'],
  },
  {
    title: "Retries, Suspensions, and Timeouts",
    description:
        'Learn how retries, suspensions, and timeouts work in Restate, and how to configure them.',
    preview: require('./guides/durable-execution.png'),
    website: '/guides/retries-suspensions-timeouts',
    source: null,
    tags: ['operate'],
  },

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

  java: {
    label: translate({message: 'Java'}),
    description: translate({
      message:
          'Guides using the Java SDK.',
      id: 'showcase.tag.java.description',
    }),
    color: '#ffcfc3',
  },

  typescript: {
    label: translate({message: 'TypeScript'}),
    description: translate({
      message:
          'Guides using the TypeScript SDK.',
      id: 'showcase.tag.typescript.description',
    }),
    color: '#fff200',
  },

  go: {
    label: translate({message: 'Go'}),
    description: translate({
      message:
          'Guides using the Go SDK.',
      id: 'showcase.tag.go.description',
    }),
    color: '#aaff00',
  },

  rust: {
    label: translate({message: 'Rust'}),
    description: translate({
      message:
          'Guides using the Rust SDK.',
      id: 'showcase.tag.rust.description',
    }),
    color: '#2fff00',
  },

  python: {
    label: translate({message: 'Python'}),
    description: translate({
      message:
          'Guides using the :Python SDK.',
      id: 'showcase.tag.python.description',
    }),
    color: '#00ffa6',
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

  microservices: {
    label: translate({message: 'Microservices'}),
    description: translate({
      message:
          'Learn how to use Restate for Microservices Orchestration.',
      id: 'showcase.tag.workflows.description',
    }),
    color: '#b74f6b',
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

  develop: {
    label: translate({message: 'Develop'}),
    description: translate({
      message:
        'Learn how to implement common patterns in Restate.',
      id: 'showcase.tag.develop.description',
    }),
    color: '#fe6829',
  },

  deploy: {
    label: translate({message: 'Deploy'}),
    description: translate({
      message:
        'Learn how to deploy Restate applications.',
      id: 'showcase.tag.deploy.description',
    }),
    color: '#852b08',
  },

  operate: {
    label: translate({message: 'Operate'}),
    description: translate({
      message:
        'Learn how to operate Restate applications.',
      id: 'showcase.tag.operate.description',
    }),
    color: '#491700',
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
