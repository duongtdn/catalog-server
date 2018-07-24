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

        /* embed style for login form */
        .loginform-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .loginform-panel {
          position: relative;
          max-width: 400px;
          top: 10%;
          margin: auto;
          padding-bottom: 30px !important;
        }
        .loginform-oauth {
          margin-top: 16px;
          margin-bottom: 16px;
        }
        .loginform-break {
          position: relative;
          top: -30px;
          text-align: center;
        }
        .loginform-label-or {
          padding: 8px;
        }
        .loginform-box1 {
        }
        .loginform-email {
          display: inline-block !important;
          width: calc(100% - 50px) !important;
          outline: none;
        }
        .loginform-btn {
          width: 40.5px;
          height: 38px;
          padding-left: 0;
          padding-right: 0;
        }
        .loginform-btn:focus {
          outline: none;
        }
        .loginform-btn-large {
          width: 50.5px;
          height: 48px;
        }
        .loginform-btn-large:focus {
          outline: none;
        }
        .signupform-email {
          display: inline-block;
          width: 100%;
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