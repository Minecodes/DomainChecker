# domainchecker

## Description
Hello 👋

This is my domain checking tool written in TypeScript using Bun.
It reads domain names from `names.txt` and TLDs from `endings.txt`, checks if the domains exist using DNS resolution, and saves the available domains to `output.txt` and a SQLite database `domains.db`.
If you want to add more domain names or TLDs, simply edit the respective text files.

## Usage

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run 
```

This project was created using `bun init` in bun v1.2.20. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.