import { renderFile, configure } from "https://deno.land/x/eta@v1.11.0/mod.ts"

// const viewPath = `${Deno.cwd()}/views/`
// const viewPath = `./views/`

// // Set Eta's configuration
// configure({
//   // This tells Eta to look for templates
//   // In the /views directory
//   views: viewPath
// })

// Eta assumes the .eta extension if you don't specify an extension
// You could also write renderFile("template.eta"),
// renderFile("/template"), etc.

let templateResult = await renderFile("./views/template.eta", { food: "cake" })

console.log(templateResult)
/*
My favorite food is cake
<footer>This is a footer!</footer>
*/
