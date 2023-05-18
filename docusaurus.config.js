// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const redocusaurus = [
  'redocusaurus',
  {
    config: 'redocly.yaml',
    specs: [
      {
        id: 'meta-rest-api',
        spec: 'static/schemas/openapi-meta.json',
      },
    ]
  },
]

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Restate documentation',
  tagline: 'Distributed application development made simple',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://restate.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'restatedev', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Set this value to '/'.
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
         },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
    redocusaurus
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '',
        logo: {
          alt: 'Restate Logo',
          src: 'img/restate.png',
        },
        items: [
          {
            position: 'left',
            label: 'Get started',
            to: '/get-started'
          },
          {
            position: 'left',
            label: 'Tutorials',
            to: '/category/tutorials'
          },
          {
            position: 'left',
            label: 'Docs',
            to: '/'
          },
          {
            href: 'https://github.com/restatedev/restate-dist',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting started',
                to: '/get-started',
              },
              {
                label: 'Tutorial',
                to: '/category/tutorials',
              },
              {
                label: 'Documentation',
                to: '/',
              },
              {
                label: 'Examples',
                to: '/examples',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/restatedev',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/restatedev',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/restatedev/restate-dist',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Restate Software, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        magicComments: [
          // Remember to extend the default highlight class name as well!
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: {start: 'highlight-start', end: 'highlight-end'},
          },
          {
            className: 'bad-code-block',
            line: 'bad-code',
            block: {start: 'bad-code-start', end: 'bad-code-end'},
          },
          {
            className: 'good-code-block',
            line: 'good-code',
            block: {start: 'good-code-start', end: 'good-code-end'},
          },
        ],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
    }),
    themes: ["docusaurus-json-schema-plugin"]
};

module.exports = config;
