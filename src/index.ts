import { Config } from "./config";
import { Client } from "./structures/Client";

const Bot = new Client();
Bot.login(Config.Token);

export { Bot };