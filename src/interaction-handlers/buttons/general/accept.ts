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
        .setCustomId(`general:accept_u${options.author}_${data?.join(",")}`)
        .setLabel("Confirmar Pedido")
        .setDisabled(options?.disabled)
        .setStyle(ButtonStyle.Success)
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
    const confirmed = new EmbedBuilder()
    .setDescription(`Tu pedido ha sido enviado a revisión, recibirás una confirmación en este chat en breves. ${Emojis.Info}`)
    .setColor(Color.Success)

    await interaction.message.edit({embeds: [confirmed], components: []})

    const botone = new ActionRowBuilder<ButtonBuilder>
    const channel = Bot.channels.cache.get("1134356455110213823") as TextChannel
    const module1 = await import('./acceptadmin')
    const module2 = await import('./canceladmin')
    await module1.build(botone, {disabled: false, author: interaction.user.id}, dataArray)
    await module2.build(botone, {disabled: false, author: interaction.user.id}, dataArray)

    return channel.send({
        components: [botone],
        embeds: [
            new EmbedBuilder()
            .setAuthor({
                name: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL()
            })
            .setColor(Color.Debug)
            .setThumbnail(interaction.user.displayAvatarURL())
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
                text: `UserID: ${dataArray[0]}`
            })
            .setTimestamp()
        ],
        content: '@'
    })
  }
}