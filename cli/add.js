import inquirer from "inquirer";
import axios from "axios";

const TYPE = {
	PROJECT: "project",
	REPO: "repo",
};

export const add = () => {
	inquirer
		.prompt({
			name: "type",
			message: "Select type",
			type: "list",
			choices: [TYPE.PROJECT, TYPE.REPO],
		})
		.then((answer) => {
			if (answer.type === TYPE.PROJECT) {
				askProject();
			} else {
				askRepo();
			}
		})
		.catch((e) => console.log(e));
};

const askProject = async () => {
	let res;

	try {
		res = await axios.get("http://localhost:8080/api/tags/projects");
	} catch (e) {
		console.log(e);
		return;
	}

	const tags = res.data.tags;
	const project = {};

	const askName = () => {
		inquirer
			.prompt({
				name: "name",
				message: "Name",
			})
			.then((answer) => {
				if (answer.name === "") {
					askName();
					return;
				}
				project.name = answer.name;
				askDesc();
			})
			.catch((e) => console.log(e));
	};

	const askDesc = () => {
		inquirer
			.prompt({ name: "desc", message: "Desc" })
			.then((answer) => {
				if (answer.desc === "") {
					askDesc();
					return;
				}
				project.desc = answer.desc;
				askPath();
			})
			.catch((e) => console.log(e));
	};

	const askPath = () => {
		inquirer
			.prompt({ name: "path", message: "Path", default: process.cwd() })
			.then((answer) => {
				project.path = answer.path;
				askTags();
			})
			.catch((e) => console.log(e));
	};

	const askTags = () => {
		inquirer
			.prompt({
				name: "tags",
				message: "Path",
				type: "checkbox",
				choices: tags.map((tag) => tag.name),
			})
			.then((answer) => {
				if (answer.tags.length === 0) {
					askTags();
					return;
				}
				project.tags = answer.tags.map((name) => {
					const match = tags.find((tag) => tag.name === name);
					return match;
				});
				askDeployed();
			})
			.catch((e) => console.log(e));
	};

	const askDeployed = () => {
		inquirer
			.prompt({
				name: "deployed",
				message: "Is deployed",
				type: "confirm",
			})
			.then((answer) => {
				project.isDeployed = answer.deployed;
				if (answer.deployed) askDeployedUrl();
				else addProject();
			})
			.catch((e) => console.log(e));
	};

	const askDeployedUrl = () => {
		inquirer
			.prompt({ name: "url", message: "Deployed link" })
			.then((answer) => {
				if (answer.url === "") {
					askDeployedUrl();
					return;
				}
				project.deployedUrl = answer.url;
				addProject();
			});
	};

	const addProject = async () => {
		const payload = {
			name: project.name,
			desc: project.desc,
			pathSource: "local",
			pathUrl: project.path,
			tags: project.tags.map((tag) => tag._id),
			isDeployed: project.isDeployed,
			deployedUrl: project.deployedUrl ? project.deployedUrl : null,
		};

		try {
			const data = await axios.post(
				"http://localhost:8080/api/projects",
				payload
			);
			console.log("Project is created");
		} catch (e) {
			console.log(e);
		}
	};

	askName();
};

const askRepo = async () => {
	let res;

	try {
		res = await axios.get("http://localhost:8080/api/tags/repos");
	} catch (e) {
		console.log(e);
		return;
	}

	const tags = res.data.tags;
	const repo = {};

	const askName = () => {
		inquirer
			.prompt({
				name: "name",
				message: "Name",
			})
			.then((answer) => {
				if (answer.name === "") {
					askName();
					return;
				}
				repo.name = answer.name;
				askDesc();
			})
			.catch((e) => console.log(e));
	};

	const askDesc = () => {
		inquirer
			.prompt({ name: "desc", message: "Desc" })
			.then((answer) => {
				if (answer.desc === "") {
					askDesc();
					return;
				}
				repo.desc = answer.desc;
				askPath();
			})
			.catch((e) => console.log(e));
	};

	const askPath = () => {
		inquirer
			.prompt({ name: "path", message: "Path", default: process.cwd() })
			.then((answer) => {
				repo.path = answer.path;
				askTags();
			})
			.catch((e) => console.log(e));
	};

	const askTags = () => {
		inquirer
			.prompt({
				name: "tags",
				message: "Path",
				type: "checkbox",
				choices: tags.map((tag) => tag.name),
			})
			.then((answer) => {
				if (answer.tags.length === 0) {
					askTags();
					return;
				}
				repo.tags = answer.tags.map((name) => {
					const match = tags.find((tag) => tag.name === name);
					return match;
				});
				addRepo();
			})
			.catch((e) => console.log(e));
	};

	const addRepo = async () => {
		const payload = {
			name: repo.name,
			desc: repo.desc,
			path: {
				source: "local",
				url: repo.path,
			},
			tags: repo.tags.map((tag) => tag._id),
		};

		try {
			const data = await axios.post(
				"http://localhost:8080/api/repos",
				payload
			);
			console.log("Repo is created");
		} catch (e) {
			console.log(e);
		}
	};

	askName();
};
