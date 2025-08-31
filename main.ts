import * as fs from "fs"
import * as dns from "dns"
import sqlite3 from "sqlite3"
import { open } from "sqlite"

const db = await open({
    filename: "domains.db",
    driver: sqlite3.Database
})

const endings = fs.readFileSync("endings.txt", "utf-8").split("\n")
const domains = fs.readFileSync("names.txt", "utf-8").split("\n")
let output: string[] = []

const tableExists = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='domains';")
console.log(tableExists)



dns.setServers([
    "1.1.1.1",
    "8.8.8.8",
    "9.9.9.9"
])

for (const domain of domains) {
    for (const ending of endings) {
        console.log(`Checking ${domain}.${ending}`)
        try {
            await dns.promises.resolve(domain + "." + ending)
        } catch (e) {
            // Domain does not exist
            console.log(`Domain ${domain}.${ending} does not exist`)
            output.push(`${domain}.${ending}`)
            await db.run(
              `INSERT INTO domains (name, emoji, ending) VALUES (?, ?, ?)`,
              domain + "." + ending,
              domain,
              ending
            );
        }
        setTimeout(() => {}, 100)
    }
}

fs.writeFileSync("output.txt", output.join("\n"), "utf-8")



/**import list from "./list.json"
import * as fs from "fs"

let output: string[] = []

for (const emoji of list) {
    output.push(emoji.character)
}

fs.writeFileSync("names.txt", output.join("\n"), "utf-8")**/