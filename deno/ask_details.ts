// deno run ask_details.ts "John Bull" 53 "7676254544212"
interface PersonDetails {
  name: string;
  age: number;
  phone: string;
}

function getDetails(details: any[]): PersonDetails {
  return {name: details[0], age: details[1], phone: details[2]}
}

console.log(getDetails(Deno.args))
