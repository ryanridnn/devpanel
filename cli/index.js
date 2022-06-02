#!/usr/bin/env node

import { Command } from "commander";
import { exec } from "child_process";
import axios from "axios";
import open from "open";

import { add } from "./add.js";

const program = new Command();

program
	.name("devpanel")
	.description("Your developer journey friend")
	.version("0.1");

program.command("start").action(() => {
	exec("yarn run start", (err, stdout, stderr) => {});
	console.log("Server has started");
	open("http://localhost:8080");
});

program.command("add").action(() => {
	add();
});

program.parse();
