import { defineConfig } from "vocs";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  title: "binius.xyz",
  globalStyles: "docs/styles.css",
  frontmatter: {
    content: {
      width: "70ch", // Default is 70ch, increase to make content wider
    },
  },
  vite: {
    plugins: [
      {
        name: "disable-llms",
        enforce: "pre",
        configResolved(config) {
          // Filter out the llms plugin to avoid build errors
          const filteredPlugins = config.plugins.filter(
            (p) => p.name !== "llms",
          );
          // @ts-ignore - we need to override readonly property
          config.plugins = filteredPlugins;
        },
      },
    ],
  },
  head() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
        ></link>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (location.pathname !== '/') {
            document.documentElement.style.opacity = '0';
            document.addEventListener('DOMContentLoaded', () => {
              document.documentElement.style.opacity = '1';
              document.documentElement.style.transition = 'opacity 0.1s';
            });
          }
        `,
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-TV9S6QP84Y"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-TV9S6QP84Y');
        `,
          }}
        />
        <link
          href="/favicon-light.png"
          rel="icon"
          media="(prefers-color-scheme: light)"
        />
        <link
          href="/favicon-dark.png"
          rel="icon"
          media="(prefers-color-scheme: dark)"
        />
      </>
    );
  },
  logoUrl: {
    light: "/logo-light.svg",
    dark: "/logo-dark.svg",
  },
  ogImageUrl: "https://www.binius.xyz/x-logo.png",
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  topNav: [
    {
      text: "Basics",
      link: "/basics",
      match: "/basics",
    },
    {
      text: "Building",
      link: "/building",
      match: "/building",
    },
    {
      text: "Blueprint",
      link: "/blueprint",
      match: "/blueprint",
    },
    {
      text: "Benchmarks",
      link: "/benchmarks",
      match: "/benchmarks",
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
        text: "Binius's Arithmetization",
        collapsed: false,
        link: "/basics/arithmetization/",
        items: [
          {
            text: "Background",
            link: "/basics/arithmetization/background",
          },
          {
            text: "Data Types",
            link: "/basics/arithmetization/types",
          },
          {
            text: "Multi-Multiset Matching",
            link: "/basics/arithmetization/m3",
            collapsed: true,
            items: [
              {
                text: "A Toy Example",
                link: "/basics/arithmetization/m3/example",
              },
              {
                text: "Definition of M3",
                link: "/basics/arithmetization/m3/definition",
              },
              {
                text: "Proving Collatz Orbits",
                link: "/basics/arithmetization/m3/collatz",
              },
              {
                text: "Lasso Lookup",
                link: "/basics/arithmetization/m3/lasso",
              },
            ],
          },
          {
            text: "Merkle–Patricia Inclusion",
            link: "/basics/arithmetization/mpt",
            collapsed: true,
            items: [
              {
                text: "Review of MPT Task",
                link: "/basics/arithmetization/mpt/review",
              },
              {
                text: "Informal Explanation",
                link: "/basics/arithmetization/mpt/sketch",
              },
              {
                text: "Our MPT Construction",
                link: "/basics/arithmetization/mpt/construction",
              },
              {
                text: "State Forking",
                link: "/basics/arithmetization/mpt/forking",
              },
            ],
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
        ],
      },
    ],
    "/building": [
      {
        text: "Building with Binius64",
        link: "/building",
      },
      {
        text: "Theory and Foundations",
        link: "/building/theory",
      },
      {
        text: "Constraints and Shifted Indices",
        link: "/building/constraints",
      },
      {
        text: "Non-Deterministic Witnesses",
        link: "/building/nondeterministic",
      },
      {
        text: "Control Flow Patterns",
        link: "/building/control-flow",
      },
      {
        text: "Practical Tutorial",
        link: "/building/tutorial",
        collapsed: false,
        items: [
          {
            text: "Building First Circuits",
            link: "/building/tutorial",
          },
          {
            text: "Common Operations",
            link: "/building/tutorial/operations",
          },
          {
            text: "Proving and Verifying",
            link: "/building/tutorial/proving",
          },
          {
            text: "Circuit Composition",
            link: "/building/tutorial/composition",
          },
        ],
      },
      {
        text: "Appendix",
        link: "/building/appendix",
        collapsed: false,
        items: [
          {
            text: "Addition Implementation",
            link: "/building/appendix/addition",
          },
          {
            text: "Equality Check",
            link: "/building/appendix/equality",
          },
          {
            text: "Bit Extraction",
            link: "/building/appendix/bit-extraction",
          },
          {
            text: "SHA-256 Sigma",
            link: "/building/appendix/sha256-sigma",
          },
        ],
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
            link: "/blueprint/math/multilinears",
          },
          {
            text: "The Sumcheck",
            link: "/blueprint/math/sumcheck",
          },
          {
            text: "Oblong-Multilinearization",
            link: "/blueprint/math/oblong"
          },
        ],
      },
      {
        text: "Constraint Systems",
        link: "/blueprint/constraints",
        collapsed: false,
        items: [
          {
            text: "Introduction",
            link: "/blueprint/constraints/introduction",
          },
          {
            text: "Shifted Value Indices",
            link: "/blueprint/constraints/indices",
          },
          {
            text: "Constraint Arrays",
            link: "/blueprint/constraints/arrays",
          },
          {
            text: "AND Constraints",
            link: "/blueprint/constraints/ands",
          },
          {
            text: "MUL Constraints",
            link: "/blueprint/constraints/muls",
          },
        ],
      },
      {
        text: 'The Backend',
        link: '/blueprint/backend/',
        collapsed: false,
        items: [
          {
            text: "The Shift Indicators",
            link: "/blueprint/backend/shifts",
            collapsed: true,
            items: [
              {
                text: "Shifted Witness Polynomials",
                link: "/blueprint/backend/shifts/polynomials"
              },
              {
                text: "Logical Shifts",
                link: "/blueprint/backend/shifts/logical"
              },
              {
                text: "Arithmetic Shifts",
                link: "/blueprint/backend/shifts/arithmetic"
              },
            ],
          },
          {
            text: "The AND Reduction",
            link: "/blueprint/backend/ands",
            collapsed: false,
            items: [
              {
                text: "The Rijndael Field",
                link: "/blueprint/backend/ands/rijndael"
              },
              {
                text: "The Univariate Skip",
                link: "/blueprint/backend/ands/univariate"
              },
              {
                text: "The Rijndael Zerocheck",
                link: "/blueprint/backend/ands/implementation"
              },
            ],
          },
          {
            text: 'The MUL Reduction',
            link: '/blueprint/backend/muls',
            collapsed: false,
            items: [
              {
                text: "Multiplying in the Exponent",
                link: "/blueprint/backend/muls/multiplying"
              },
              {
                text: "Exponentiating Multilinears",
                link: "/blueprint/backend/muls/exponentiating"
              },
              {
                text: "Combined Protocol",
                link: "/blueprint/backend/muls/combined"
              }
            ]
          },
          {
            text: "The Shift Reduction",
            link: "/blueprint/backend/reduction",
            collapsed: false,
            items: [
              {
                text: "Mathematizing Constraint Arrays",
                link: "/blueprint/backend/reduction/mathematizing"
              },
              {
                text: "The Sumchecks",
                link: "/blueprint/backend/reduction/sumchecks"
              },
              {
                text: "Prover Implementation",
                link: "/blueprint/backend/reduction/implementation"
              }
            ]
          },
            ]
      },
      {
        text: "Polynomial Commitment",
        link: "/blueprint/commitment/",
      },
    ],
    "/benchmarks": [
      {
        text: "Benchmarks",
        link: "/benchmarks",
      },
    ],
  },
});
