import { InteractionHandler, InteractionHandlerTypes, PieceContext } from '@sapphire/framework';
import { EmbedBuilder, TextChannel } from 'discord.js';
import { ActionRowBuilder, ButtonInteraction, ButtonBuilder, ButtonStyle } from "discord.js";
import { Bot } from '../../../';
import { Color } from '../../../utils/colors/colors';
import { Emojis } from '../../../utils/emojis/emojis';

interface optionsObject {
  disabled: boolean | undefined,
  author: string | undefined
}

export const build = async (actionRowBuilder: ActionRowBuilder, options: optionsObject, data: String[] | undefined) => {
  return new Promise(resolve => {
    actionRowBuilder.addComponents(
      new ButtonBuilder()
        .setCustomId(`general:entregar_u${options.author}_${data?.join(",")}`)
        .setLabel("Entregado")
        .setDisabled(options?.disabled)
        .setStyle(ButtonStyle.Primary)
    );
    resolve(true)
  })
};
export class ButtonHandler extends InteractionHandler {
  public constructor(ctx: PieceContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Button
    });
  }

  public override async parse(interaction: ButtonInteraction) {
    const cat: string = interaction.customId.split(/:+/g)[0];
    const id: string = interaction.customId.split(/:+/g)[1].split(/_+/g)[0];
    if (cat == __dirname.split(/\\+/g)[__dirname.split(/\\+/g).length - 1] && id == __filename.split(/\\+/g)[__filename.split(/\\+/g).length - 1].split(/\.+/g)[0]) {
        return this.some();
    } else {
      return this.none();
    }
  }

  public async run(interaction: ButtonInteraction) {
    const dataArray = interaction.customId.split(/\_+/g)[2].split(/\,+/g)
    const user = this.container.client.users.cache.get(dataArray[0])

     await interaction.message.edit({
         embeds: [
             new EmbedBuilder()
             .setDescription(`Pedido de \`${user.username}\` aceptado por \`${interaction.user.username}\` y entregado ${Emojis.Success}`)
             .setAuthor({
                 name: interaction.user.username,
                 iconURL: interaction.user.displayAvatarURL()
             })
             .setColor(Color.Success)
             .setThumbnail(user.displayAvatarURL())
             .addFields([
                 {
                     name: 'Summoner Name', value: `\`${dataArray[1]}\``, inline: true
               },
                {
                    name: 'Producto', value: `\`${dataArray[2]}\``, inline: true
                 },
                 {
                     name: 'Comprobante', value: `[Click aquí](${dataArray[3]})`, inline: true
                }
            ])
           .setFooter({
              text: `UserID: ${dataArray[0]} ・ Referencia: ${dataArray[4]}`
             })
             .setTimestamp()
         ],
         components: [],
         content: `Pedido entregado ${Emojis.Success}`
    })

     await user.createDM().then(async dm => {
            return dm.send({
                embeds: [
                    new EmbedBuilder()
                    .setDescription(`Tu pedido ha sido entregado correctamente ${Emojis.Success}.\n**¡Gracias por comprar con nosotros!** ${Emojis.Love}`)
                    .setColor(Color.Success)
                    .setTimestamp()
                    .setAuthor({
                        name: Bot.user.username,
                        iconURL: Bot.user.displayAvatarURL()
                    })
                ]
            })
     })

  }
}