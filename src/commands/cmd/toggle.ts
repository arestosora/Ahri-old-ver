import { ChatInputCommand, Command } from "@sapphire/framework";
import { Prisma } from "../../structures/PrismaClient";
import { Emojis } from "../../utils/index";

export class PurchaseCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "toggle",
      fullCategory: ["cmd"],
      requiredClientPermissions: ["SendMessages"],
      requiredUserPermissions: ["Administrator"],
    });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand(
      (builder) =>
        builder.setName("toggle").setDescription("Activa o desactiva los pedidos"),
      {
        idHints: [""],
      }
    );
  }

  public override async chatInputRun(interaction: ChatInputCommand.Interaction) {

    const pedidos = await Prisma.config.findUnique({
        where: {
            GuildID: interaction.guild.id
        }
    })

    if(pedidos.Pedidos_Enabled === true){
        await Prisma.config.update({
            where: {
                GuildID: interaction.guild.id
            },
            data: {
                Pedidos_Enabled: false
            }
        })
    } else {
        await Prisma.config.update({
            where: {
                GuildID: interaction.guild.id
            },
            data: {
                Pedidos_Enabled: true
            }
        })
    }

    await interaction.reply({
        content: `Los pedidos han sido ${pedidos.Pedidos_Enabled === true ? 'desactivados' : 'activados'} ${Emojis.Success}`,
        ephemeral: true
    })
  }
}
