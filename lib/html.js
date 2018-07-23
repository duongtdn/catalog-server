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
        .cursor-pointer {
          cursor: pointer;
        }
        .no-outline {
          outline: none;
        }
      </style>
      <link href='https://fonts.googleapis.com/css?family=Caveat' rel='stylesheet'>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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