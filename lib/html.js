"use strict"

module.exports = ({title, style, script, reactDom, data}) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>
      <style>
        html { 
          background: linear-gradient(to bottom right, #f1f1f1  0%, #ddffff  100%); 
          background-attachment:fixed;
          height:100%;
        }
        .sg-content {
          max-width: 1180px;
          margin: auto;
        }
      </style>
      <link rel="stylesheet" href="${style}"> 
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