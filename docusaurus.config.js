// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const variableInjector = require('./src/plugins/variable-injector')

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
  favicon: '/img/logo_only.png',

  // Set the production url of your site here
  url: 'https://docs.restate.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

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
          remarkPlugins: [
            [
              variableInjector, // replaces eg VAR::RESTATE_DIST_VERSION with config strings
              {
                replacements: {
                  RESTATE_DIST_VERSION: '0.1.7',
                  TYPESCRIPT_SDK_VERSION: '1.0.33',
                  TOUR_VERSION: 'v0.0.1',
                  LAMBDA_GREETER_VERSION: 'v0.0.4'
                },
              }
            ]
          ],
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
            href: 'https://discord.gg/skW3AZ6uGd',
            html: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"25\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"  viewBox=\"0 0 127.14 96.36\"><g id=\"图层_2\" data-name=\"图层 2\"><g id=\"Discord_Logos\" data-name=\"Discord Logos\"><g id=\"Discord_Logo_-_Large_-_White\" data-name=\"Discord Logo - Large - White\"><path d=\"M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z\"/></g></g></g></svg>",
            position: 'right',
          },
          {
            href: 'https://restate.discourse.group/',
            html: "<svg xmlns=\"http://www.w3.org/2000/svg\"  width=\"23\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-linejoin=\"round\"  viewBox=\"0 0 24 24\" id=\"discourse\"><path d=\"M0.506,24c-0.133,0-0.26-0.053-0.354-0.146C0.059,23.76,0.006,23.633,0.006,23.5L0,11.799C0,5.293,5.427,0,12.098,0C18.661,0.001,24,5.382,24,11.996c0,6.614-5.34,11.995-11.902,11.995L0.506,24L0.506,24z M12.096,1.001c-2.926,0-5.699,1.125-7.81,3.167C2.167,6.219,1,8.929,1,11.799L1.006,23l11.092-0.009C18.109,22.99,23,18.058,23,11.996S18.109,1.001,12.098,1.001C12.097,1.001,12.097,1.001,12.096,1.001z M5.043,19.482c-0.136,0-0.268-0.055-0.363-0.156c-0.123-0.131-0.168-0.318-0.115-0.49l1.115-3.655C5.188,14.199,4.928,13.104,4.928,12c0-3.899,3.172-7.071,7.071-7.071S19.07,8.101,19.07,12s-3.172,7.071-7.071,7.071c-0.979,0-1.957-0.205-2.841-0.594l-3.995,0.99C5.123,19.477,5.083,19.482,5.043,19.482z M11.999,5.929c-3.348,0-6.071,2.724-6.071,6.071c0,1.01,0.252,2.01,0.729,2.894c0.064,0.118,0.078,0.256,0.039,0.384l-0.918,3.007l3.309-0.82c0.11-0.028,0.229-0.016,0.334,0.033c0.805,0.38,1.673,0.573,2.578,0.573c3.348,0,6.071-2.724,6.071-6.071S15.347,5.929,11.999,5.929z\"></path></svg>",
            position: 'right',
          },
          {
            href: 'https://twitter.com/restatedev',
            html: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-twitter\"><path d=\"M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z\"></path></svg>",
            position: 'right',
          },
          {
            href: 'https://github.com/restatedev',
            html: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-github\"><path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\"></path></svg>",
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Restate',
            items: [
              {
                href: 'https://restate.dev',
                label: 'Home',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/skW3AZ6uGd',
              },
              {
                label: 'Discourse',
                href: 'https://restate.discourse.group/',
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
        additionalLanguages: ['protobuf', 'log'],
        magicComments: [
          // Remember to extend the default highlight class name as well!
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' },
          },
          {
            className: 'bad-code-block',
            line: 'bad-code',
            block: { start: 'bad-code-start', end: 'bad-code-end' },
          },
          {
            className: 'good-code-block',
            line: 'good-code',
            block: { start: 'good-code-start', end: 'good-code-end' },
          },
        ],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
    }),
  themes: ["docusaurus-json-schema-plugin"],
  plugins: [
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        indexBlog: false,
      },
    ]
  ]
};

module.exports = config;
