import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, resolve, sep } from 'node:path'
import process from 'node:process'
import { chromium } from 'playwright-chromium'

const root = resolve(process.argv[2] ?? 'dist/week-01-public')
const expectedSlides = Number(process.argv[3] ?? 64)
const mime = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.ttf', 'font/ttf'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
])

function safePath(urlPath) {
  const candidate = resolve(root, `.${decodeURIComponent(urlPath)}`)
  return candidate === root || candidate.startsWith(`${root}${sep}`)
    ? candidate
    : null
}

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url ?? '/', 'http://127.0.0.1')
    let file = safePath(requestUrl.pathname)
    if (!file) {
      response.writeHead(403).end()
      return
    }
    const info = await stat(file).catch(() => null)
    if (!info || info.isDirectory()) file = join(root, 'index.html')
    const body = await readFile(file)
    response.writeHead(200, {
      'content-type': mime.get(extname(file)) ?? 'application/octet-stream',
      'cache-control': 'no-store',
    })
    response.end(body)
  } catch (error) {
    response.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' })
    response.end(String(error))
  }
})

await new Promise((resolveListen) => server.listen(0, '127.0.0.1', resolveListen))
const address = server.address()
const baseUrl = `http://127.0.0.1:${address.port}`
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } })
const failures = []

try {
  for (let slideNumber = 1; slideNumber <= expectedSlides; slideNumber += 1) {
    await page.goto(`${baseUrl}/#/${slideNumber}`, { waitUntil: 'networkidle' })
    await page.waitForSelector('.slidev-layout', { state: 'attached' })
    await page.waitForTimeout(120)
    await page.evaluate(() => {
      for (const element of document.querySelectorAll('.slidev-vclick-target')) {
        element.classList.remove('slidev-vclick-hidden')
        element.style.opacity = '1'
        element.style.visibility = 'visible'
        element.style.transform = 'none'
      }
    })

    const result = await page.evaluate((number) => {
      const layouts = [...document.querySelectorAll('.slidev-layout')]
      const layout = layouts
        .map((element) => ({ element, rect: element.getBoundingClientRect() }))
        .filter(({ rect }) => rect.width > 100 && rect.height > 100)
        .sort((a, b) => b.rect.width * b.rect.height - a.rect.width * a.rect.height)[0]
      if (!layout) return { error: 'active .slidev-layout not found' }

      const rootRect = layout.rect
      const scale = rootRect.width / 1280
      const safe = {
        left: rootRect.left + 54 * scale,
        right: rootRect.right - 54 * scale,
        top: rootRect.top + 38 * scale,
        bottom: rootRect.bottom - 54 * scale,
      }
      const selector = [
        'h1', 'h2', 'h3', 'p', 'li', 'table', 'pre', 'img', 'svg', 'blockquote',
        '.statement', '.key-line', '.warning-line', '.success-line', '.term-grid',
        '.plain-columns', '.recap-list', '.figure-caption-row', '.experiment-sequence',
      ].join(',')
      const issues = []

      for (const element of layout.element.querySelectorAll(selector)) {
        if (element.closest('[data-overflow-allow]') || element.closest('.slide-number')) continue
        const style = getComputedStyle(element)
        if (
          style.display === 'none'
          || style.visibility === 'hidden'
          || Number(style.opacity) === 0
        ) continue
        const rect = element.getBoundingClientRect()
        if (rect.width < 1 || rect.height < 1) continue
        const tolerance = 2
        const outsideSlide = (
          rect.left < rootRect.left - tolerance
          || rect.right > rootRect.right + tolerance
          || rect.top < rootRect.top - tolerance
          || rect.bottom > rootRect.bottom + tolerance
        )
        const outsideSafe = (
          rect.left < safe.left - tolerance
          || rect.right > safe.right + tolerance
          || rect.top < safe.top - tolerance
          || rect.bottom > safe.bottom + tolerance
        )
        const clipped = (
          ['hidden', 'clip'].includes(style.overflowY)
          && element.scrollHeight > element.clientHeight + 2
        ) || (
          ['hidden', 'clip'].includes(style.overflowX)
          && element.scrollWidth > element.clientWidth + 2
        )
        if (outsideSlide || outsideSafe || clipped) {
          issues.push({
            tag: element.tagName.toLowerCase(),
            text: (element.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 100),
            outsideSlide,
            outsideSafe,
            clipped,
            rect: [rect.left, rect.top, rect.right, rect.bottom].map((value) => Math.round(value)),
          })
        }
      }
      return { number, issues }
    }, slideNumber)

    if (result.error || result.issues.length > 0) failures.push(result)
  }
} finally {
  await browser.close()
  await new Promise((resolveClose) => server.close(resolveClose))
}

if (failures.length > 0) {
  console.error(JSON.stringify(failures, null, 2))
  process.exitCode = 1
} else {
  console.log(`Overflow check passed: ${expectedSlides} slides within safe bounds.`)
}
