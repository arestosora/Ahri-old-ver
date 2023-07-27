import { ChatInputCommand, Command } from "@sapphire/framework";
import { Time } from "@sapphire/time-utilities";
import { ActionRowBuilder, ButtonStyle, ButtonBuilder } from "discord.js";
import { Config } from "../../config";

export class PurchaseCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: 'pedido',
      fullCategory: ["General"],
      requiredClientPermissions: ["SendMessages"],
      requiredUserPermissions: ["SendMessages"],
      cooldownDelay: Time.Second * 200
    });
  }

  public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName("pedido").setDescription("Realiza un pedido de RP."),
      {
        idHints: ["1134071128302817331"],
      }
    );
  }

  public override async  chatInputRun(interaction: ChatInputCommand.Interaction) {
    return interaction.reply({
        content: `En desarrollo...`,
    });
  }
}