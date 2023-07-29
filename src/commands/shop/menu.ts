import { ChatInputCommand, Command } from "@sapphire/framework";
import { Time } from "@sapphire/time-utilities";
import {
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
  EmbedBuilder,
} from "discord.js";
import { Color } from "../../utils/colors/colors";

export class PurchaseCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "menu",
      fullCategory: ["shop"],
      requiredClientPermissions: ["SendMessages"],
      requiredUserPermissions: ["SendMessages"],
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
        iconURL: 'https://cdn3.emoji.gg/emojis/3197-arrow-right-rgb.gif',
      })
      .setFields([
        {
          name: "‎",
          value:
            "Si deseas realizar un pedido, simplemente haz clic en el botón de abajo y nuestro amable equipo de atención al cliente estará encantado de ayudarte en todo lo que necesites. ¡Gracias por elegirnos y esperamos brindarte una excelente experiencia de compra!",
        },
        {
          name: "‎",
          value:
            "Si tienes alguna pregunta o necesitas asistencia, no dudes en mencionar a uno de nuestros moderadores o enviar un mensaje en el canal de soporte. Estamos aquí para garantizar que tu experiencia de compra sea lo más placentera posible.",
        },
        {
          name: "‎",
          value:
            "¡Esperamos con ansias servirte y proporcionarte los mejores productos y servicios! ¡Haz clic en el botón y comencemos! 🛍️💖",
        },
      ])
      .setColor(Color.Debug);

    const row = new ActionRowBuilder<ButtonBuilder>({
      components: [
        new ButtonBuilder({
          label: "Realizar Pedido",
          style: ButtonStyle.Primary,
          customId: "shop:pedido",
          emoji: "1134181246029807637",
        }),
      ],
    });

    return interaction.reply({
      embeds: [embed],
      components: [row],
    });
  }
}
