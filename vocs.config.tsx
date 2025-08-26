import { defineConfig } from 'vocs'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export default defineConfig({
  title: 'binius.xyz',
  head() {
    return (
      <>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"></link>
        <script dangerouslySetInnerHTML={{ __html: `
          if (location.pathname !== '/') {
            document.documentElement.style.opacity = '0';
            document.addEventListener('DOMContentLoaded', () => {
              document.documentElement.style.opacity = '1';
              document.documentElement.style.transition = 'opacity 0.1s';
            });
          }
        `}} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TV9S6QP84Y"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-TV9S6QP84Y');
        `}} />
        <link href="/favicon-light.png" rel="icon" media="(prefers-color-scheme: light)" />
        <link href="/favicon-dark.png" rel="icon" media="(prefers-color-scheme: dark)" />
      </>
    )
  },
  logoUrl: {
    light: '/logo-light.svg',
    dark: '/logo-dark.svg',
  },
  ogImageUrl: 'https://www.binius.xyz/x-logo.png',
  markdown: {
    remarkPlugins: [
      remarkMath,
    ],
    rehypePlugins: [
      rehypeKatex,
    ]
  },
  topNav: [
    {
      text: 'Basics',
      link: '/basics',
      match: '/basics'
    },
    {
      text: 'Building',
      link: '/building',
      match: '/building'
    },
    {
      text: 'Blueprint',
      link: '/blueprint',
      match: '/blueprint'
    },
    {
      text: 'Benchmarks',
      link: '/benchmarks',
      match: '/benchmarks'
    },
  ],
  sidebar: {
    "/basics": [
      {
        text: "Basics",
        link: "/basics",
      },
      {
        text: "Overview",
        link: "/basics/overview",
      },
      {
        text: 'Binius\'s Arithmetization',
        collapsed: false,
        link: '/basics/arithmetization/',
        items: [
          {
            text: "Background",
            link: "/basics/arithmetization/background"
          },
          {
            text: "Data Types",
            link: "/basics/arithmetization/types"
          },
          {
            text: "Multi-Multiset Matching",
            link: "/basics/arithmetization/m3",
            collapsed: true,
            items: [
              {
                text: "A Toy Example",
                link: "/basics/arithmetization/m3/example"
              },
              {
                text: "Definition of M3",
                link: "/basics/arithmetization/m3/definition"
              },
              {
                text: "Proving Collatz Orbits",
                link: "/basics/arithmetization/m3/collatz"
              },
              {
                text: "Lasso Lookup",
                link: "/basics/arithmetization/m3/lasso"
              },
            ]
          },
          {
            text: "Merkle–Patricia Inclusion",
            link: "/basics/arithmetization/mpt",
            collapsed: true,
            items: [
              {
                text: "Review of MPT Task",
                link: "/basics/arithmetization/mpt/review"
              },
              {
                text: "Informal Explanation",
                link: "/basics/arithmetization/mpt/sketch"
              },
              {
                text: "Our MPT Construction",
                link: "/basics/arithmetization/mpt/construction"
              },
              {
                text: "State Forking",
                link: "/basics/arithmetization/mpt/forking"
              },
            ]
          },
        ],
      },
      {
        text: "Further Resources",
        link: "/basics/resources",
        collapsed: false,
        items: [
          {
            text: "Blog Posts",
            link: "/basics/resources/posts",
          },
          {
            text: "Talks and Lectures",
            link: "/basics/resources/talks",
          },
          {
            text: "External Resources",
            link: "/basics/resources/external",
          },    
        ]
      }
    ],
    "/building": [
      {
        text: "Building",
        link: "/building",
      },
      {
        text: "Constraint Systems",
        link: "/building/constraints",
      },
      {
        text: "Bitwise Constraints",
        link: "/building/bitwise",
      },
      {
        text: "The Basic Pattern",
        link: "/building/pattern",
        collapsed: false,
        items: [
          {
            text: "Declaring Columns",
            link: "/building/pattern/declaring",
          },
          {
            text: "Populating Columns",
            link: "/building/pattern/populating",
          },
          {
            text: "Constraining Columns",
            link: "/building/pattern/constraining",
          },
        ],
      },
      {
        text: "A Lookup Construction",
        link: "/building/lookup",
        collapsed: false,
        items: [
          {
            text: "Gadget Design",
            link: "/building/lookup/gadget",
          },
          {
            text: "Creating Components",
            link: "/building/lookup/components",
          },
          {
            text: "Example Application",
            link: "/building/lookup/application",
          },
        ],
      },
      {
        text: "Making Transparents",
        link: "/building/transparents",
      },
      {
        text: "Collatz in Practice",
        link: "/building/collatz",
      },
    ],
    "/blueprint": [
      {
        text: "Blueprint",
        link: "/blueprint",
      },
      {
        text: "Math Background",
        link: "/blueprint/math",
        collapsed: false,
        items: [
          {
            text: "Binary Fields",
            link: "/blueprint/math/fields",
          },
          {
            text: "Multilinear Polynomials",
            link: "/blueprint/math/multilinears"
          },
          {
            text: "The Sumcheck",
            link: "/blueprint/math/sumcheck",
          }
        ],
      },
      {
        text: "Constraint Systems",
        link: "/blueprint/constraints",
      },
      {
        text: "Oblong Multilinears",
        link: "/blueprint/oblong",
        collapsed: false,
        items: [
          {
            text: "Univariate Skip",
            link: "/blueprint/oblong/univariate"
          },
        ]
      },
      {
        text: "The Shift Reduction",
        link: "/blueprint/shifts",
        collapsed: false,
        items: [
          {
            text: "The Shift Indicators",
            link: "/blueprint/shifts/indicators",
            collapsed: true,
            items: [
              {
                text: "Logical Shifts",
                link: "/blueprint/shifts/indicators/logical"
              },
              {
                text: "Arithmetic Shifts",
                link: "/blueprint/shifts/indicators/arithmetic"
              },
            ]
          },
          {
            text: "Implementation Considerations",
            link: "/blueprint/shifts/implementation",
          }
        ],
      },
      {
        text: 'Integer Multiplication',
        link: '/blueprint/multiplication/',
      },
      {
        text: 'Polynomial Commitment',
        link: '/blueprint/commitment/',
      },
    ],
    "/benchmarks": [
      {
        text: "Benchmarks",
        link: "/benchmarks",
      }
    ]
  },
})
