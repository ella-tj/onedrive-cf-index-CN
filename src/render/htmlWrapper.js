import { pink, plum } from 'color-name'
import { favicon } from './favicon'
import { userProfile } from './userProfile'

const COMMIT_HASH = '89afde99425f90047d6cde015bb90ab7d5b64b2f'

const pagination = (pIdx, attrs) => {
  const handleP = v => `onclick="handlePagination(${v})"`
  if (pIdx) {
    switch (pIdx) {
      case pIdx < 0 ? pIdx : null:
        attrs = [`class="previous" href="pagination?page=${-pIdx - 1}" ${handleP(0)}"`, `class="previous disabled"`]
        break
      case 1:
        attrs = ['class="previous disabled"', `class="next" href="pagination?page=${pIdx + 1}" ${handleP(1)}`]
        break
      default:
        attrs = [
          `class="previous" href="pagination?page=${pIdx - 1}" ${handleP(0)}`,
          `class="next" href="pagination?page=${pIdx + 1}" ${handleP(1)}`
        ]
    }
    return `${`<a ${attrs[0]}><i class="fas fa-arrow-left"></i></a>`} &nbsp;${`<a ${attrs[1]}><i class="fas fa-arrow-right"></i></a>`}`
  } else {
    return ''
  }
}

export function renderHTML(body, pLink, pIdx) {
  const getpLink = pLink ? pLink : ''
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge, chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
      <title>${userProfile.title}</title>
      <link rel="shortcut icon" type="image/png" sizes="16x16" href="${favicon}" />
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.13.1/css/all.min.css" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/gh/spencerwooo/onedrive-cf-index@${COMMIT_HASH}/themes/spencer.css" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@gh-pages/github-markdown.css" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/gh/spencerwooo/onedrive-cf-index@${COMMIT_HASH}/themes/prism-github.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/prismjs@1.17.1/prism.min.js" data-manual></script>
      <script src="https://cdn.jsdelivr.net/npm/prismjs@1.17.1/plugins/autoloader/prism-autoloader.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/medium-zoom@1.0.6/dist/medium-zoom.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/turbolinks@5.2.0/dist/turbolinks.min.js"></script>
      <style>.paginate-container a.disabled {pointer-events: none;opacity:0.5;}</style>
    </head>
    <body>
      <nav id="navbar" data-turbolinks-permanent><div class="brand">${userProfile.navTitle}</div></nav>
      ${body}
      <div class='paginate-container' style="margin-top: 0.5em">${pagination(pIdx)}</div>
      <div id="flex-container" data-turbolinks-permanent style="flex-grow: 1;"></div>
      <footer id="footer" data-turbolinks-permanent>${userProfile.footerContent}</footer>
      <script>
      Prism.highlightAll()
      mediumZoom('[data-zoomable]')
      if ('${getpLink}') {
        !window.pLink
          ? (pLink = [['${getpLink}'], 1])
          : pLink[0].length < pLink[1] + 1 && (pLink = [[...pLink[0], '${getpLink}'], pLink[1]])
        if (pLink[1] === 1) history.pushState(history.state, '', location.pathname.replace('pagination', ''))
      }      
      function handlePagination(isNext) {
        isNext ? pLink[1]++ : pLink[1]--
        addEventListener(
          'turbolinks:request-start',
          event => {
            const xhr = event.data.xhr
            xhr.setRequestHeader('pLink', pLink[0][pLink[1] -2])
            xhr.setRequestHeader('pIdx', pLink[1] + '')
          },
          { once: true }
        )
      }
      Turbolinks.start()
      </script>
    </body>
  </html>`
}
