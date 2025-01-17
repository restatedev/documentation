/* eslint-disable global-require */

import {translate} from '@docusaurus/Translate';
import {sortBy} from '@site/src/utils/jsUtils';

// LIST OF AVAILABLE TAGS
// Available tags to assign to a guide
// Please choose all tags that you think might apply.
// Don't add new tags without checking whether this fits the page structure.
export type TagType =
  // Add this back at a later point in time where we have many guides
  // | 'favorite'
  | 'patterns'
  | 'operations'
  | 'integrations'
  | 'development'
  | 'deployment'
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
    tags: ['patterns'],
  },
  {
    title: 'TypeScript services on AWS Lambda',
    description: 'Deploying Restate TypeScript services to AWS Lambda via the AWS console.',
    preview: require('./guides/lambda-console-guide.png'),
    website: '/guides/lambda-ts',
    source: null,
    tags: ['deployment', 'typescript'],
  },
  {
    title: 'Restate + Kafka Quickstart',
    description:
        'A hands-on example on how to trigger a Restate service over Kafka',
    preview: require('./guides/kafka-guide.png'),
    website: '/guides/kafka-quickstart',
    source: null,
    tags: ['integrations'],
  },
  {
    title: "Restate + XState",
    description:
        'Blog post on persistent serverless state machines with XState and Restate',
    preview: require('./guides/xstate-img.png'),
    website: 'https://restate.dev/blog/persistent-serverless-state-machines-with-xstate-and-restate/',
    source: 'https://github.com/restatedev/xstate/tree/main',
    tags: ['integrations', 'typescript'],
  },
  {
    title: "Parallelizing work",
    description: 'Execute a list of tasks in parallel and then gather their result.',
    preview: require('./guides/parallelizework.png'),
    website: '/guides/parallelizing-work',
    source: null,
    tags: ['patterns', 'typescript'],
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
  // Add this back at a later point in time where we have many guides
  // favorite: {
  //   label: translate({message: 'Favorites'}),
  //   description: translate({
  //     message:
  //       'Our favorite Restate guides that you must absolutely check out!',
  //     id: 'showcase.tag.favorite.description',
  //   }),
  //   color: '#e9669e',
  // },

  java: {
    label: translate({message: 'Java/Kotlin'}),
    description: translate({
      message:
          'Guides using the Java/Kotlin SDK.',
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

  patterns: {
    label: translate({message: 'Patterns & Use Cases'}),
    description: translate({
      message:
          'Learn how to implement common patterns and use cases in Restate.',
      id: 'showcase.tag.patterns.description',
    }),
    color: '#fe6829',
  },

  integrations: {
    label: translate({message: 'Integrations'}),
    description: translate({
      message:
          'Learn how to integrate Restate with other tools.',
      id: 'showcase.tag.integrations.description',
    }),
    color: '#127f82',
  },

  development: {
    label: translate({message: 'Development'}),
    description: translate({
      message:
        'Learn how to develop Restate applications.',
      id: 'showcase.tag.development.description',
    }),
    color: '#852b08',
  },

  deployment: {
    label: translate({message: 'Deployment'}),
    description: translate({
      message:
        'Learn how to deploy Restate applications.',
      id: 'showcase.tag.deployment.description',
    }),
    color: '#852b08',
  },

  operations: {
    label: translate({message: 'Operations'}),
    description: translate({
      message:
          'Learn how to configure, manage and operate Restate.',
      id: 'showcase.tag.operations.description',
    }),
    color: '#b74f6b',
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
