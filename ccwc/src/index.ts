#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs";

const program = new Command();

program.name("ccwc");

program
  .argument("[file]")
  .description(
    `Print newline, word, and byte counts for each FILE, and a total line if more than one FILE is specified. 
A word is a non-zero-length sequence of characters delimited by white space.

The options below may be used to select which counts are printed, always in the following order: newline,
word, character, byte.

Coding Challenge from:　https://codingchallenges.fyi/challenges/challenge-wc/
`
  )
  .option("-c --bytes", "print the byte counts")
  .option("-l, --lines", "print the newline counts")
  .option("-w, --words", "print the word counts")
  .option("-m, --chars", "print the character counts")
  .action((file, options) => {
    const processContent = (content: string) => {
      const numLines = content.split("\n").filter((line) => line !== "").length;
      const numWords = content
        .split(/\s+/)
        .filter((word) => word !== "").length;
      const numChars = content.length;
      const size = Buffer.byteLength(content, "utf-8");

      if (options.bytes) {
        console.log(size, file || "");
      } else if (options.lines) {
        console.log(numLines, file || "");
      } else if (options.words) {
        console.log(numWords, file || "");
      } else if (options.chars) {
        console.log(numChars, file || "");
      } else {
        console.log(numLines, numWords, size, file || "");
      }
    };

    if (file) {
      // If a file is provided, read the file
      const content = fs.readFileSync(file, "utf-8");
      processContent(content);
    } else {
      // If no file is provided, read from stdin
      let stdin = "";

      process.stdin.on("readable", () => {
        let chunk = process.stdin.read();
        if (chunk !== null) {
          stdin += chunk;
        }
      });

      process.stdin.on("end", () => {
        processContent(stdin);
      });
    }
  });

program.parse(process.argv);
