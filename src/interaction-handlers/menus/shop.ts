import { InteractionHandler, InteractionHandlerTypes, PieceContext } from "@sapphire/framework";
import { StringSelectMenuInteraction, Message, EmbedBuilder, MessageCollector, ActionRowBuilder, ButtonBuilder } from "discord.js";
import { Color } from "../../utils/colors/colors";
import { IDGenerator } from "../../utils/functions/IdGenerator";
import { Log } from "../../utils/log";
import { Emojis } from "../../utils/emojis/emojis";
import { Bot } from "../..";
import { shortenURL } from "../../utils/url/url";

export class ShopMenuHandler extends InteractionHandler {
  public constructor(ctx: PieceContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.SelectMenu,
    });
  }

  public override parse(interaction: StringSelectMenuInteraction) {
    if (interaction.customId !== "purchase:menu") return this.none();
    return this.some();
  }

  public async run(interaction: StringSelectMenuInteraction) {
    try {
      const UniqueID = await IDGenerator(7);
      const selectedOption = interaction.values[0];
      const ResponseEmbed = new EmbedBuilder()
        .setAuthor({
          name: `${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setDescription(
          `Has seleccionado el paquete de \`${selectedOption}\` RP. Ahora por favor escribe tu nombre de invocador.`
        )
        .setColor(Color.Success);
    
      await interaction.update({
        embeds: [ResponseEmbed],
        components: [],
      });
  
      const nameCollector = new MessageCollector(interaction.channel, {
        filter: (msg) => msg.author.id === interaction.user.id,
        max: 1,
        time: 80000,
      });
  
      let name = "";
      nameCollector.on("collect", (message) => {
        name = message.content;
      });
  
      nameCollector.on("end", async (collected, reason) => {
        if (reason === "time") {
          interaction.channel.send({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: `${Bot.user.username}`,
                  iconURL: Bot.user.displayAvatarURL(),
                })
                .setColor(Color.Error)
                .setDescription(
                  `Se ha acabado el tiempo para responder. Inténtalo de nuevo.`
                ),
            ],
          });
        } else {
          const NameEmbed = new EmbedBuilder()
            .setAuthor({
              name: `${interaction.user.username}`,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setDescription(
              `Perfecto, tu nombre de invocador es \`${name}\`. Ahora, envía el comprobante de pago como una imagen. ${Emojis.Success}\nRecuerda que puedes pagar por **Nequi** <:nequi:1134763235522924596>, **Bancolombia** <:bancolombia:1134763479925010518> o por **PayPal** <:paypal:1134763669855678546>.`
            )
            .setColor(Color.Success);
  
          await interaction.channel.send({
            embeds: [NameEmbed],
          });
  
          const imageCollector = new MessageCollector(interaction.channel, {
            filter: (msg) =>
              msg.author.id === interaction.user.id && msg.attachments.size > 0,
            max: 1,
            time: 20000,
          });
  
          imageCollector.on("collect", async (message) => {
  
            const attachment = message.attachments.first();
            const attachmentURL = attachment?.url;
            const attachmentName = attachment?.name;
            const attachmentExtension = attachmentName?.split(/\.+/g)[1];
  
            if (
              attachmentExtension !== "png" &&
              attachmentExtension !== "jpg" &&
              attachmentExtension !== "jpeg"
            ) {
              interaction.channel.send({
                embeds: [
                  new EmbedBuilder()
                    .setColor(Color.Error)
                    .setAuthor({
                      name: `${Bot.user.username}`,
                      iconURL: Bot.user.displayAvatarURL(),
                    })
                    .setDescription(
                      `${Emojis.Error} El archivo enviado no es una imagen. Inténtalo de nuevo.`
                    ),
                ],
              });
            } else {
              const ShortenedURL = await shortenURL(attachmentURL);
              const AttachmentEmbed = new EmbedBuilder()
                .setTitle("¡Resumen de tu pedido! " + Emojis.Warning)
                .setAuthor({
                  name: `${interaction.user.username}`,
                  iconURL: interaction.user.displayAvatarURL(),
                })
                .addFields(
                  {
                    name: "Nombre de invocador",
                    value: `\`${name}\``,
                    inline: true,
                  },
                  {
                    name: "Producto",
                    value: `\`${selectedOption}\` RP`,
                    inline: true,
                  },
                  {
                    name: "Comprobante",
                    value: `[Comprobante de Pago](${ShortenedURL})`,
                    inline: true,
                  }
                )
                .setDescription(
                  `Por favor corrobora que esta información es correcta, ya que es la que se enviará para que procesen tu pedido.`
                )
                .setColor(Color.Success)
                .setImage(attachmentURL)

              const botone = new ActionRowBuilder<ButtonBuilder>();
              const module1 = await import("../../interaction-handlers/buttons/general/cancel");
              const module2 = await import("../../interaction-handlers/buttons/general/accept");
              await module1.build(botone, { disabled: false, author: interaction.user.id },[]);
              await module2.build(
                botone,
                { disabled: false, author: interaction.user.id },
                [
                  `${interaction.user.id}`,
                  `${name}`,
                  `${selectedOption}`,
                  `${ShortenedURL}`,
                  `${UniqueID}`
                ]
              );
  
              await interaction.channel.send({
                embeds: [AttachmentEmbed],
                components: [botone],
              });
            }
          });
        }
      });
    } catch (error) {
      Log.error(error);
      return interaction.channel.send({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: `${Bot.user.username}`,
              iconURL: Bot.user.displayAvatarURL(),
            })
            .setColor(Color.Error)
            .setDescription(`${Emojis.Error} Ha ocurrido un error al realizar tu pedido, inténtalo de nuevo. En caso de que el error persista, contacta con los administradores.`)
        ]
      });
    }
  }
}