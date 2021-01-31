//deno run -Ar --unstable https://raw.githubusercontent.com/ds604/website/master/deno/local.ts
import { Webview } from "https://deno.land/x/webview/mod.ts";

const html = `
  <html>
  <body>
    <h1>Hello from deno v${Deno.version.deno}</h1>
  </body>
  </html>
`;

const webview = new Webview(
  { url: `data:text/html,${encodeURIComponent(html)}` },
);
await webview.run();
