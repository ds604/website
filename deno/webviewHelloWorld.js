//deno run --allow-env --allow-write --allow-read --allow-plugin --allow-net --unstable -A https://ds604.neocities.org/deno/webviewHelloWorld.js

// Importing the webview library
import { WebView } from "https://deno.land/x/webview/mod.ts";
// Creating an HTML page
let html = `
    <html>
        <body>
            <h1>Hello World! How are you?</h1>
        </body>
        <script>
        	console.log('hello world!')
        </script>
    </html>
`;
// Creating and configuring the webview
const webview = new WebView({
    title: "Deno Webview Example",
    url: `data:text/html,${encodeURIComponent(html)}`,
    //url: "https://picsum.photos/200/300",
    width: 800,
    height: 600,
    resizable: true,
    debug: true,
    frameless: false
});
// Running the webview
webview.run();
