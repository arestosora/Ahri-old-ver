import { ChatInputCommand, Command } from "@sapphire/framework";
import { Time } from "@sapphire/time-utilities";
import {
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
  EmbedBuilder,
  TextChannel,
} from "discord.js";
import { Color } from "../../utils/colors/colors";
import { Bot } from "../..";

export class PurchaseCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "menu",
      fullCategory: ["shop"],
      requiredClientPermissions: ["SendMessages"],
      requiredUserPermissions: ["Administrator"],
      cooldownDelay: Time.Second * 200,
    });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand(
      (builder) =>
        builder.setName("menu").setDescription("Muestra el menú de la tienda."),
      {
        idHints: ["1134071128302817331"],
      }
    );
  }

  public override async chatInputRun(
    interaction: ChatInputCommand.Interaction
  ) {
    const embed = new EmbedBuilder()
      .setTitle("¡Bienvenido a nuestra tienda en Discord! ")
      .setThumbnail(interaction.client.user.displayAvatarURL({ extension: "jpg" }))
      // .setAuthor({
      //   name: interaction.client.user.tag,
      //   iconURL: interaction.client.user.displayAvatarURL(),
      // })
      .setFooter({
        text: "Se cumplen términos y condiciones.",
        iconURL: Bot.user.displayAvatarURL(),
      })
      .setFields([
        {
          name: "‎",
          value:
            "Si deseas realizar un pedido, simplemente haz clic en el botón de abajo y estaré encantada de atenderte. <a:purp_verified:1135277348829282334> ¡Gracias por elegirnos y esperamos brindarte una excelente experiencia de compra! <a:aestheticheart:1135277052023554188>",
        },
        {
          name: "‎",
          value:
            "Si tienes alguna pregunta o necesitas asistencia, no dudes en mencionar a uno de nuestros moderadores o enviar un mensaje en el canal de soporte. <a:blueflame:1135277150874902561> Estamos aquí para garantizar que tu experiencia de compra sea lo más placentera posible.",
        },
        {
          name: "‎",
          value:
            "¡Esperamos con ansias servirte y proporcionarte los mejores productos y servicios! ¡Haz clic en el botón y comencemos! <a:spin:1135277874350403605>",
        },
      ])
      .setColor(Color.Debug);

    const row = new ActionRowBuilder<ButtonBuilder>({
      components: [
        new ButtonBuilder({
          label: "Realizar Pedido",
          style: ButtonStyle.Success,
          customId: "shop:pedido",
          emoji: "1134181246029807637",
        }),

        new ButtonBuilder({
          label: "Precios",
          style: ButtonStyle.Primary,
          customId: "shop:precios",
          emoji: "1135058349621252106",
        })
      ],
    });

    const canala = this.container.client.channels.cache.get('1133964283764555787') as TextChannel

    await canala.send({
      embeds: [embed],
      components: [row]
    })

    return interaction.reply({
      content: 'Enviado',
      ephemeral: true,
    });
  }
}
