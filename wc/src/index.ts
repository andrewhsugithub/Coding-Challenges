#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs";

const program = new Command();

program.name("wc").description("simulate wc command in linux");

program
  .command("wc <file>")
  .description(
    `Print  newline,  word,  and byte counts for each FILE, and a total line if more than one FILE is specified.  A
word is a non-zero-length sequence of characters delimited by white space.

With no FILE, or when FILE is -, read standard input.

The options below may be used to select which counts are printed, always  in  the  following  order:  newline,
word, character, byte, maximum line length.`
  )
  .option("-c --bytes", "print the byte counts")
  .option("-m, --chars", "print the character counts")
  .option("-l, --lines", "print the newline counts")
  .option("-L, --max-line-length", "print the length of the longest line")
  .option("-w, --words", "print the word counts")
  .action((file, options) => {
    if (options.bytes) {
      console.log(fs.statSync(file).size, file);
    }
    if (options.chars) {
      console.log(fs.readFileSync(file, "utf-8").length, file);
    }
    if (options.lines) {
      console.log(
        fs
          .readFileSync(file, "utf-8")
          .split("\n")
          .filter((line) => line !== "").length,
        file
      );
    }
    if (options.words) {
      console.log(
        fs
          .readFileSync(file, "utf-8")
          .split(/\s+/)
          .filter((word) => word !== "").length,
        file
      );
    }
    if (options.maxLineLength) {
      console.log(
        Math.max(
          ...fs
            .readFileSync(file, "utf-8")
            .split("\n")
            .filter((line) => line !== "\n")
            .map((line) => line.length - 1)
        ),
        file
      );
    }
  });

program.parse();
