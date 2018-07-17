"use strict"

module.exports = ({title, style, script, reactDom, data}) => `
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
      <script>
        window.DATA=${JSON.stringify(data)}
      </script>
      <script src="${script}"></script>
    </body>
  </html>
`