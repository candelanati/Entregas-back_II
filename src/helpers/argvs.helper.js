import { Command } from "commander";

const argvs = new Command()

argvs.option(
    "--mode <mode>",
    "mode enviroment",
    "dev" //valor por default
)
argvs.parse()
export default argvs.opts()