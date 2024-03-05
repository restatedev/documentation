// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer").themes.github;
const darkCodeTheme = require("prism-react-renderer").themes.dracula;
const variableInjector = require("./src/plugins/variable-injector");
const variablesReplacements = require("./restate.config.json");

const redocusaurus = [
  "redocusaurus",
  {
    config: "redocly.yaml",
    specs: [
      {
        id: "admin-rest-api",
        spec: "static/schemas/openapi-admin.json",
      },
    ],
  },
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Restate documentation",
  tagline: "Distributed application development made simple",
  favicon: "/img/logo_only.png",

  // Set the production url of your site here
  url: "https://docs.restate.dev",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "restatedev", // Usually your GitHub org/user name.
  projectName: "documentation", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          remarkPlugins: [
            [
              variableInjector, // replaces eg VAR::RESTATE_VERSION with config strings
              {
                replacements: variablesReplacements,
              },
            ],
          ],
          routeBasePath: "/", // Set this value to '/'.
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: false,
        pages: {
          path: 'src/pages',
          routeBasePath: '',
          include: ['**/*.{js,jsx,ts,tsx,md,mdx}'],
          exclude: [
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
          ],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
    redocusaurus,
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
      },
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      image: "img/restate-og.png",
      navbar: {
        title: "",
        logo: {
          alt: "Restate Logo",
          src: "img/restate.png",
          href: "https://restate.dev",
          target: "_self",
        },
        items: [
          {to: '/', label: 'Build', position: 'left'},
          {to: 'learn', label: 'Learn', position: 'left'},
          {
            href: "/services/sdk/overview?sdk=ts",
            label: "TypeScript SDK",
            position: "right",
          },
          {
            to: "/services/sdk/overview?sdk=java",
            label: "Java SDK",
            position: "right",
          },
          {
            to: "https://restate.dev/get-restate/",
            label: "Get Restate",
            position: "right",
          },
          {
            href: "https://discord.gg/skW3AZ6uGd",
            html: '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"  viewBox="0 0 127.14 96.36"><g id="图层_2" data-name="图层 2"><g id="Discord_Logos" data-name="Discord Logos"><g id="Discord_Logo_-_Large_-_White" data-name="Discord Logo - Large - White"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/></g></g></g></svg>',
            position: "right",
          },
          {
            href: "https://twitter.com/restatedev",
            html: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>',
            position: "right",
          },
          {
            href: "https://github.com/restatedev/restate",
            html: '<svg width="24" height="24" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/></svg>',
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Restate",
            items: [
              {
                href: "https://restate.dev",
                label: "Home",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.gg/skW3AZ6uGd",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/restatedev",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/restatedev",
              },
              {
                label: "JavaDocs",
                href: "https://javadoc.io/doc/dev.restate",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Restate Software, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["protobuf", "log", "java", "kotlin", "scala"], // adding scala to fix redoc from breaking (https://github.com/PrismJS/prism/issues/3458)
        magicComments: [
          // Remember to extend the default highlight class name as well!
          {
            className: "theme-code-block-highlighted-line",
            line: "highlight-next-line",
            block: { start: "highlight-start", end: "highlight-end" },
          },
          {
            className: "bad-code-block",
            line: "bad-code",
            block: { start: "bad-code-start", end: "bad-code-end" },
          },
          {
            className: "good-code-block",
            line: "good-code",
            block: { start: "good-code-start", end: "good-code-end" },
          },
        ],
      },
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "RP49KQ6X9M",

        // Public API key: it is safe to commit it
        apiKey: "33c78d1addd7dcc9b6544b95fe1f9da4",

        indexName: "restate",

        contextualSearch: true,

        // Optional: Algolia search parameters
        searchParameters: {},
      },
    },
  themes: ["docusaurus-json-schema-plugin"],
  scripts: ["/js/store-query-parameter.js"],
};

module.exports = config;
