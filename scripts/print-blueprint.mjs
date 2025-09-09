#!/usr/bin/env node
/*
  Print Blueprint pages to a single PDF using headless Chrome (Puppeteer).
  - Serves docs/dist on a local HTTP server so absolute asset paths work.
  - Prints each Blueprint page with print CSS and background graphics.
  - Merges all page PDFs into one using pdf-lib.

  Usage:
    node scripts/print-blueprint.mjs [output.pdf]
    OUTPUT=./binius-blueprint.pdf npm run pdf:chrome
*/

import http from 'node:http'
import { createReadStream, existsSync, lstatSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { promises as fsp } from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import mimeTypes from 'mime-types'
import puppeteer from 'puppeteer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'docs', 'dist')

const outPath = process.argv[2] || process.env.OUTPUT || path.join(rootDir, 'binius-blueprint.pdf')

const pages = [
  'blueprint/index.html',
  'blueprint/overview/index.html',

  'blueprint/math/index.html',
  'blueprint/math/fields/index.html',
  'blueprint/math/multilinears/index.html',
  'blueprint/math/sumcheck/index.html',
  'blueprint/math/oblong/index.html',

  'blueprint/constraints/index.html',
  'blueprint/constraints/introduction/index.html',
  'blueprint/constraints/indices/index.html',
  'blueprint/constraints/arrays/index.html',
  'blueprint/constraints/ands/index.html',
  'blueprint/constraints/muls/index.html',

  'blueprint/backend/index.html',
  'blueprint/backend/shifts/index.html',
  'blueprint/backend/shifts/polynomials/index.html',
  'blueprint/backend/shifts/logical/index.html',
  'blueprint/backend/shifts/arithmetic/index.html',
  'blueprint/backend/ands/index.html',
  'blueprint/backend/ands/rijndael/index.html',
  'blueprint/backend/ands/univariate/index.html',
  'blueprint/backend/ands/implementation/index.html',
  'blueprint/backend/muls/index.html',
  'blueprint/backend/muls/multiplying/index.html',
  'blueprint/backend/muls/exponentiating/index.html',
  'blueprint/backend/muls/combined/index.html',
  'blueprint/backend/reduction/index.html',
  'blueprint/backend/reduction/mathematizing/index.html',
  'blueprint/backend/reduction/sumchecks/index.html',
  'blueprint/backend/reduction/implementation/index.html',

  'blueprint/commitment/index.html',
]

function resolveDist(p) {
  const abs = path.join(distDir, p)
  if (existsSync(abs)) return abs
  // If path is a directory, try index.html
  const idx = path.join(distDir, p, 'index.html')
  if (existsSync(idx)) return idx
  return abs
}

function contentType(filePath) {
  return mimeTypes.lookup(filePath) || 'application/octet-stream'
}

function createStaticServer(root) {
  const server = http.createServer((req, res) => {
    // Normalize URL, strip query/hash
    const url = new URL(req.url, 'http://127.0.0.1')
    let reqPath = decodeURIComponent(url.pathname)

    // Map "/" -> "/index.html"
    if (reqPath.endsWith('/')) reqPath += 'index.html'
    const filePath = path.join(root, reqPath)

    // Security: ensure path stays within root
    const rel = path.relative(root, filePath)
    if (rel.startsWith('..')) {
      res.writeHead(403)
      res.end('Forbidden')
      return
    }

    // If not found, try directory index
    let servePath = filePath
    if (!existsSync(servePath)) {
      const alt = path.join(root, reqPath, 'index.html')
      if (existsSync(alt)) servePath = alt
    }

    if (!existsSync(servePath)) {
      res.writeHead(404)
      res.end('Not found')
      return
    }

    const type = contentType(servePath)
    res.writeHead(200, { 'Content-Type': type })
    createReadStream(servePath).pipe(res)
  })

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address()
      resolve({ server, port })
    })
  })
}

async function main() {
  if (!existsSync(distDir)) {
    console.error(`[pdf:chrome] Build output not found at ${distDir}. Run: npm run build`)
    process.exit(1)
  }

  // Filter to existing pages
  const inputs = pages
    .map((p) => (existsSync(resolveDist(p)) ? p : null))
    .filter(Boolean)
  if (inputs.length === 0) {
    console.error('[pdf:chrome] No Blueprint pages found to print.')
    process.exit(1)
  }

  const { server, port } = await createStaticServer(distDir)
  const baseUrl = `http://127.0.0.1:${port}`
  console.log(`[pdf:chrome] Serving ${distDir} at ${baseUrl}`)

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--allow-file-access-from-files',
    ],
  })

  try {
    // Stitch content into one printable page to preserve link annotations
    const page = await browser.newPage()
    await page.emulateMediaType('print')
    const sections = []

    // Build mapping from site path -> section anchor id
    const pathToSection = {}
    const toSectionId = (routePath) => 'sec-' + routePath.replace(/^\//, '').replace(/\/$/, '').replace(/[^\w-]+/g, '-')
    inputs.forEach((rel) => {
      const route = rel.replace(/index\.html$/, '')
      const path1 = '/' + route.replace(/^\/?/, '') // ensure leading slash
      const path2 = path1.endsWith('/') ? path1.slice(0, -1) : path1 + '/'
      const id = toSectionId(route)
      pathToSection[path1] = id
      pathToSection[path2] = id
    })

    for (let i = 0; i < inputs.length; i++) {
      const rel = inputs[i]
      const route = rel.replace(/index\.html$/, '')
      const url = `${baseUrl}/${route.replace(/^\//, '')}`
      console.log(`[pdf:chrome] Rendering (${i + 1}/${inputs.length}): ${url}`)

      await page.goto(url, { waitUntil: 'networkidle0', timeout: 120000 })
      try {
        await page.evaluate(() => document.fonts && document.fonts.ready)
      } catch {}

      const sectionId = toSectionId(route)
      const data = await page.evaluate((mapping, sectionId) => {
        const root = document.querySelector('.vocs_Content') || document.querySelector('#app') || document.body
        const clone = root.cloneNode(true)

        // Rewrite internal links to stitched in-document anchors, keep externals clickable
        const anchors = clone.querySelectorAll('a[href]')
        anchors.forEach((a) => {
          const href = a.getAttribute('href') || ''
          let isExternal = /^https?:/i.test(href)
          try {
            const abs = new URL(a.href, location.href)
            // Treat same-origin and root-relative as internal
            if (abs.origin === location.origin) isExternal = false
            // If internal, remap to our section anchor if we know the path
            if (!isExternal) {
              const targetPath = abs.pathname
              const targetSection = mapping[targetPath]
              if (targetSection) {
                a.setAttribute('href', `#${targetSection}`)
                a.setAttribute('data-internal', 'true')
                return
              }
            }
          } catch {}
          // If we got here and it's clearly internal but unmapped, render as plain text
          if (!isExternal || href.startsWith('/') || href.startsWith('#') || href.startsWith('.')) {
            const span = document.createElement('span')
            span.innerHTML = a.innerHTML
            a.replaceWith(span)
          }
        })

        // Whitelist important diagrams so they are kept in minimal print
        clone.querySelectorAll('img').forEach((img) => {
          // Make image src absolute so it still loads in the stitched page
          try { img.setAttribute('src', img.src) } catch {}
          const src = img.getAttribute('src') || ''
          const alt = (img.getAttribute('alt') || '').toLowerCase()
          if (src.includes('/diagram.svg') || src.includes('/protocol.svg') || /diagram/.test(alt)) {
            img.setAttribute('data-keep-image', 'true')
            if (!img.hasAttribute('style')) img.setAttribute('style', 'width:100%;height:auto')
          }
        })

        // Remove the page's own H1 to avoid duplicate titles when stitching
        const existingH1 = clone.querySelector('h1, .vocs_H1')
        if (existingH1) existingH1.remove()

        const h1 = document.querySelector('h1, .vocs_H1')
        const title = h1 ? h1.textContent.trim() : (document.title || '').replace(/ – binius\.xyz$/, '')
        return { title, html: clone.innerHTML, sectionId }
      }, pathToSection, sectionId)
      sections.push(data)
    }

    const katexCssHref = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css'
    const minimalCss = `
         html, body { background: #fff !important; color: #000 !important; }
         * { box-shadow: none !important; text-shadow: none !important; }
         a { color: #000 !important; text-decoration: underline !important; }
         /* Style internal links with solid underline */
         a[data-internal="true"] { text-decoration: underline !important; color: #000 !important; }
         img, svg { display: none !important; }
         img[data-keep-image="true"], svg[data-keep-image="true"] { display: block !important; margin: 10pt 0 !important; }
         /* Code cleanup */
         pre, code, [class*="Code"], [class*="CodeBlock"], [class*="CodeInline"], [class*="Pre"] {
           background: none !important;
           border: 0 !important;
           box-shadow: none !important;
           color: #000 !important;
         }
         pre { padding: 0 !important; margin: 8pt 0 !important; white-space: pre-wrap !important; }
         code { padding: 0 !important; }
         /* Hide code block toolbars/copy buttons/line numbers shells */
         [class*="Copy"], [class*="Toolbar"], [class*="Actions"], [class*="Header"], [class*="LineNumbers"],
         button[title*="Copy" i], [aria-label*="copy" i] { display: none !important; }
         /* Headings */
         h1, h2, h3, h4, h5, h6 { color: #000 !important; }
         h1 { font-size: 24pt !important; line-height: 1.2 !important; font-weight: 700 !important; margin: 0 0 10pt 0 !important; }
         h2 { font-size: 16pt !important; line-height: 1.3 !important; font-weight: 700 !important; margin: 14pt 0 6pt 0 !important; }
         @page { margin: 20mm 18mm; }
    `

    const html = `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <base href="${baseUrl}/" />
          <link rel="stylesheet" href="${katexCssHref}" />
          <style>${minimalCss}</style>
        </head>
        <body>
          ${sections.map((s, idx) => `
            <section id="${s.sectionId}">
              ${idx === 0 ? '' : '<div style="page-break-before: always"></div>'}
              ${s.title ? `<h1>${escapeHtml(s.title)}</h1>` : ''}
              <div class="content">${s.html}</div>
            </section>
          `).join('\n')}
        </body>
      </html>`

    const printPage = await browser.newPage()
    await printPage.setContent(html, { waitUntil: 'load' })
    await printPage.emulateMediaType('print')
    await printPage.pdf({
      path: outPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '18mm', right: '18mm' },
      preferCSSPageSize: true,
    })
    console.log(`[pdf:chrome] Done: ${outPath}`)
  } finally {
    await browser.close().catch(() => {})
    server.close()
  }
}

function escapeHtml(s) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

main().catch((err) => {
  console.error('[pdf:chrome] Failed:', err)
  process.exit(1)
})
