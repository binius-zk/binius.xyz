# Binius Documentation

This repository contains two things:

- the **documentation website** for Binius, deployed at [binius.xyz](https://www.binius.xyz) and built with [Vocs](https://vocs.dev), a React-based documentation framework; and
- the **Binius64 whitepaper**, a LaTeX document in [`whitepaper/`](whitepaper/) that serves as the canonical protocol specification.

## Development Dependencies

### Website

- [Node.js](https://nodejs.org/)
- [pre-commit](https://pre-commit.com/) for git hooks

### Whitepaper

- `pdflatex` and `biber` (e.g. from a TeX Live distribution)

Build the PDF with:

```bash
cd whitepaper && make
```
