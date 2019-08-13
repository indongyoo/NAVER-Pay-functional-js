export const main = ({title = '', body = '', script = ''}) => `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="/css/style.css">
    <script src="/lib/velocity.js"></script>
  </head>
  <body>
    ${body}
    ${script}
  </body>
  </html>
`;

const Layout = { main };

export default Layout;