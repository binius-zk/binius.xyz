import { defineConfig } from "vocs";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  title: "binius.xyz",
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
            link: "/basics/arithmetization/matching",
            collapsed: true,
            items: [
              {
                text: "A Toy Example",
                link: "/basics/arithmetization/matching/example",
              },
              {
                text: "Definition of M3",
                link: "/basics/arithmetization/matching/definition",
              },
              {
                text: "Proving Collatz Orbits",
                link: "/basics/arithmetization/matching/collatz",
              },
            ],
          },
          {
            text: "M3 Examples",
            link: "/basics/arithmetization/examples",
            collapsed: true,
            items: [
              {
                text: "Lasso Lookup",
                link: "/basics/arithmetization/examples/lasso",
              },
              {
                text: "RAM",
                link: "/basics/arithmetization/examples/ram",
              },
              {
                text: "Merkle–Patricia Inclusion",
                link: "/basics/arithmetization/examples/mpt",
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
        text: "Making Transparents",
        link: "/building/transparents",
      },
      {
        text: "Collatz in Practice",
        link: "/building/collatz",
      },
      {
        text: "Proof parameters",
        link: "/building/parameters",
      },
    ],
    "/blueprint": [
      {
        text: "Blueprint",
        link: "/blueprint",
      },
      {
        text: "Overview",
        link: "/blueprint/overview",
      },
      {
        text: "Mathematizing M3 Instances",
        link: "/blueprint/mathematizing",
      },
      {
        text: "Mathematical Background",
        link: "/blueprint/background",
        collapsed: false,
        items: [
          {
            text: "Multilinear Polynomials",
            link: "/blueprint/background/multilinears",
          },
          {
            text: "The PIOP and IOP Models",
            link: "/blueprint/background/models",
          },
          {
            text: "Binary Towers",
            link: "/blueprint/background/towers",
          },
        ],
      },
      {
        text: "The Reductions",
        link: "/blueprint/reductions/",
        collapsed: false,
        items: [
          {
            text: "Background",
            link: "/blueprint/reductions/background",
          },
          {
            text: "Virtual Polynomials",
            link: "/blueprint/reductions/virtual",
            collapsed: true,
            items: [
              {
                text: "Merging",
                link: "/blueprint/reductions/virtual/merge",
              },
              {
                text: "Shifting",
                link: "/blueprint/reductions/virtual/shift",
              },
            ],
          },
          {
            text: "Zerocheck",
            link: "/blueprint/reductions/zerocheck",
            collapsed: true,
            items: [
              {
                text: "Review",
                link: "/blueprint/reductions/zerocheck/review",
              },
              {
                text: "Univariate Skip",
                link: "/blueprint/reductions/zerocheck/univariate",
              },
              {
                text: "The Rest",
                link: "/blueprint/reductions/zerocheck/rest",
              },
            ],
          },
          {
            text: "Multiset Check",
            link: "/blueprint/reductions/multiset",
          },
          {
            text: "GKR-Based Grand Product",
            link: "/blueprint/reductions/gpa",
          },
          {
            text: "Evalcheck",
            link: "/blueprint/reductions/evalcheck",
          },
        ],
      },
      {
        text: "The Cryptographic Layer",
        collapsed: false,
        link: "/blueprint/cryptography/",
        items: [
          {
            text: "Commitment",
            link: "/blueprint/cryptography/commitment",
            collapsed: true,
            items: [
              {
                text: "Error-Correcting Codes",
                link: "/blueprint/cryptography/commitment/codes",
              },
              {
                text: "The Additive NTT",
                link: "/blueprint/cryptography/commitment/additive",
              },
              {
                text: "The Procedure",
                link: "/blueprint/cryptography/commitment/procedure",
              },
              {
                text: "Batched Commitment",
                link: "/blueprint/cryptography/commitment/batched",
              },
            ],
          },
          {
            text: "Ring-Switching",
            link: "/blueprint/cryptography/switching",
            collapsed: true,
            items: [
              {
                text: "The Refinement Polynomial",
                link: "/blueprint/cryptography/switching/refinement",
              },
              {
                text: "The Tensor Algebra",
                link: "/blueprint/cryptography/switching/tensor",
              },
              {
                text: "Motivational Remarks",
                link: "/blueprint/cryptography/switching/motivation",
              },
              {
                text: "The Procedure",
                link: "/blueprint/cryptography/switching/procedure",
              },
            ],
          },
          {
            text: "Batch Evaluation",
            link: "/blueprint/cryptography/evaluation",
            collapsed: true,
            items: [
              {
                text: "Review of FRI",
                link: "/blueprint/cryptography/evaluation/fri",
              },
              {
                text: "The Procedure",
                link: "/blueprint/cryptography/evaluation/procedure",
              },
            ],
          },
        ],
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
