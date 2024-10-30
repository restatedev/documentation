// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer").themes.github;
const darkCodeTheme = require("prism-react-renderer").themes.dracula;
const variableInjector = require("./src/plugins/variable-injector");
const variablesReplacements = require("./restate.config.json");
const codeLoaderPlugin = require("./src/plugins/code-loader");

import { remarkCodeHike, recmaCodeHike } from "codehike/mdx"

/** @type {import('codehike/mdx').CodeHikeConfig} */
const chConfig = {
  components: { code: "Code" },
  syntaxHighlighting: {
    theme: "github-light",
  },
}

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
  favicon: "/img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.restate.dev",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "restatedev", // Usually your GitHub org/user name.
  projectName: "documentation", // Usually your repo name.

  // plugins: ['docusaurus-tailwindcss-loader'],

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
          beforeDefaultRemarkPlugins: [
            [
              codeLoaderPlugin,
              {
                codeSnippets: {},
              },
            ],
            [
              variableInjector, // replaces eg VAR::RESTATE_VERSION with config strings
              {
                replacements: variablesReplacements,
              },
            ],
            [remarkCodeHike, chConfig],
          ],
          remarkPlugins: [],
          recmaPlugins: [[recmaCodeHike, chConfig]],
          routeBasePath: "/", // Set this value to '/'.
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        theme: {
          customCss: [
            require.resolve("./src/css/custom.css"),
            require.resolve("./src/css/new-design.css"),
            require.resolve("./src/css/codehike-styling.css"),
          ],
        },
      }),
    ],
    redocusaurus,
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      image: "img/restate-og.png",
      navbar: {
        title: "",
        logo: {
          alt: "Restate Logo",
          src: "img/restate.svg",
          href: "https://restate.dev",
          target: "_self",
        },
        items: [
          {
            to: "https://restate.dev/get-restate/",
            label: "Get Restate",
            position: "right",
          },
          {
            href: "https://discord.gg/skW3AZ6uGd",
            html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.98 5.16936C18.0694 3.63186 15.0469 3.37123 14.9175 3.36186C14.7169 3.34498 14.5256 3.45748 14.4431 3.64311C14.4356 3.65436 14.37 3.80623 14.2969 4.04248C15.5606 4.25623 17.1131 4.68561 18.5175 5.55748C18.7425 5.69623 18.8119 5.99248 18.6731 6.21748C18.5813 6.36561 18.4256 6.44623 18.2644 6.44623C18.1781 6.44623 18.09 6.42186 18.0113 6.37311C15.5963 4.87498 12.5813 4.79998 12 4.79998C11.4188 4.79998 8.4019 4.87498 5.98877 6.37311C5.76377 6.51373 5.46752 6.44436 5.32877 6.21936C5.18815 5.99248 5.25752 5.69811 5.48252 5.55748C6.8869 4.68748 8.4394 4.25623 9.70315 4.04436C9.63002 3.80623 9.5644 3.65623 9.55877 3.64311C9.4744 3.45748 9.28502 3.34123 9.08252 3.36186C8.95315 3.37123 5.93065 3.63186 3.99377 5.18998C2.98315 6.12561 0.960022 11.5931 0.960022 16.32C0.960022 16.4044 0.982522 16.485 1.02377 16.5581C2.41877 19.0106 6.2269 19.6519 7.09502 19.68C7.09877 19.68 7.1044 19.68 7.11002 19.68C7.26377 19.68 7.40815 19.6069 7.49815 19.4831L8.37565 18.2756C6.00752 17.6644 4.79815 16.6256 4.72877 16.5637C4.53002 16.3894 4.51127 16.0856 4.68752 15.8869C4.8619 15.6881 5.16565 15.6694 5.3644 15.8437C5.39252 15.87 7.62002 17.76 12 17.76C16.3875 17.76 18.615 15.8625 18.6375 15.8437C18.8363 15.6712 19.1381 15.6881 19.3144 15.8887C19.4888 16.0875 19.47 16.3894 19.2713 16.5637C19.2019 16.6256 17.9925 17.6644 15.6244 18.2756L16.5019 19.4831C16.5919 19.6069 16.7363 19.68 16.89 19.68C16.8956 19.68 16.9013 19.68 16.905 19.68C17.7731 19.6519 21.5813 19.0106 22.9763 16.5581C23.0175 16.485 23.04 16.4044 23.04 16.32C23.04 11.5931 21.0169 6.12561 19.98 5.16936ZM8.88002 14.4C7.9519 14.4 7.20002 13.5412 7.20002 12.48C7.20002 11.4187 7.9519 10.56 8.88002 10.56C9.80815 10.56 10.56 11.4187 10.56 12.48C10.56 13.5412 9.80815 14.4 8.88002 14.4ZM15.12 14.4C14.1919 14.4 13.44 13.5412 13.44 12.48C13.44 11.4187 14.1919 10.56 15.12 10.56C16.0481 10.56 16.8 11.4187 16.8 12.48C16.8 13.5412 16.0481 14.4 15.12 14.4Z" fill="#393D7A"/>
            </svg>
            `,
            position: "right",
          },
          {
            href: "https://twitter.com/restatedev",
            html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_998_21597)">
            <path d="M2.18182 0C0.976364 0 0 0.976364 0 2.18182V21.8182C0 23.0236 0.976364 24 2.18182 24H21.8182C23.0236 24 24 23.0236 24 21.8182V2.18182C24 0.976364 23.0236 0 21.8182 0H2.18182ZM5.07102 5.45455H10.1016L13.0376 9.65199L16.6705 5.45455H18.2536L13.7493 10.6705L19.2592 18.5455H14.2287L10.9709 13.8878L6.94815 18.5455H5.33949L10.255 12.8672L5.07102 5.45455ZM7.50426 6.74574L14.8722 17.2479H16.8239L9.45384 6.74574H7.50426Z" fill="#393D7A"/>
            </g>
            <defs>
            <clipPath id="clip0_998_21597">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
            </svg>`,
            position: "right",
          },
          {
            href: "https://github.com/restatedev/restate",
            html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_998_21595)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9642 0C5.34833 0 0 5.38776 0 12.0531C0 17.3811 3.42686 21.8912 8.18082 23.4874C8.77518 23.6074 8.9929 23.2281 8.9929 22.909C8.9929 22.6296 8.97331 21.6718 8.97331 20.6738C5.64514 21.3923 4.95208 19.237 4.95208 19.237C4.41722 17.8401 3.62473 17.4811 3.62473 17.4811C2.53543 16.7427 3.70408 16.7427 3.70408 16.7427C4.91241 16.8225 5.54645 17.9799 5.54645 17.9799C6.61592 19.8157 8.33926 19.297 9.03257 18.9776C9.13151 18.1993 9.44865 17.6606 9.78539 17.3613C7.13094 17.0819 4.33812 16.0442 4.33812 11.4144C4.33812 10.0974 4.81322 9.01984 5.56604 8.1818C5.44727 7.88253 5.03118 6.64506 5.68506 4.98882C5.68506 4.98882 6.69527 4.66947 8.97306 6.22604C9.94827 5.9622 10.954 5.82799 11.9642 5.82686C12.9744 5.82686 14.0042 5.96669 14.9552 6.22604C17.2332 4.66947 18.2434 4.98882 18.2434 4.98882C18.8973 6.64506 18.481 7.88253 18.3622 8.1818C19.1349 9.01984 19.5904 10.0974 19.5904 11.4144C19.5904 16.0442 16.7976 17.0618 14.1233 17.3613C14.5592 17.7404 14.9353 18.4587 14.9353 19.5962C14.9353 21.2126 14.9158 22.5098 14.9158 22.9087C14.9158 23.2281 15.1337 23.6074 15.7278 23.4877C20.4818 21.8909 23.9087 17.3811 23.9087 12.0531C23.9282 5.38776 18.5603 0 11.9642 0Z" fill="#393D7A"/>
            </g>
            <defs>
            <clipPath id="clip0_998_21595">
            <rect width="24" height="23.5102" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            `,
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
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Restate Software, Inc. Built with Docusaurus.`,
      },
      // prism: {
      //   theme: lightCodeTheme,
      //   darkTheme: darkCodeTheme,
      //   additionalLanguages: [
      //     "protobuf",
      //     "log",
      //     "java",
      //     "kotlin",
      //     "scala",
      //     "bash",
      //     "json",
      //     "toml",
      //   ], // adding scala to fix redoc from breaking (https://github.com/PrismJS/prism/issues/3458)
      //   magicComments: [
      //     // Remember to extend the default highlight class name as well!
      //     {
      //       className: "theme-code-block-highlighted-line",
      //       line: "highlight-next-line",
      //       block: { start: "highlight-start", end: "highlight-end" },
      //     },
      //     {
      //       className: "bad-code-block",
      //       line: "bad-code",
      //       block: { start: "bad-code-start", end: "bad-code-end" },
      //     },
      //     {
      //       className: "good-code-block",
      //       line: "good-code",
      //       block: { start: "good-code-start", end: "good-code-end" },
      //     },
      //   ],
      // },
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
  themes: ["docusaurus-json-schema-plugin", "mdx-v2"],
  scripts: ["/js/store-query-parameter.js"],
};

module.exports = config;
