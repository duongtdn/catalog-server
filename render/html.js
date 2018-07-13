"use strict"

module.exports = ({title, style, script, reactDom}) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>
      <style>${style}</style>
    </head>
    <body>
      <div id="root">${ reactDom }</div>
      <script src="./${script}"></script>
    </body>
  </html>
`