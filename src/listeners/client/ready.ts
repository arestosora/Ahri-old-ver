import { Listener } from "@sapphire/framework";
import { Client } from "discord.js";
import { Log } from "../../utils/log/index";

export class ReadyListener extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      once: true,
    });
  }

  public async run(client: Client) {
    return Log.success(`Logged in as ${client.user.tag}`);
  }
}