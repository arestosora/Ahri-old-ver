import { Listener } from "@sapphire/framework";
import { Client } from "discord.js";
import { Log } from "../../utils/index";

export class ReadyListener extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      once: true,
    });
  }

  public async run(client: Client) {
    return Log.start(`Logged in as ${client.user.tag}`);
  }
}
