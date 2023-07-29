import { InteractionHandler, InteractionHandlerTypes, PieceContext } from '@sapphire/framework';
import { EmbedBuilder } from 'discord.js';
import { ActionRowBuilder, ButtonInteraction, ButtonBuilder, ButtonStyle } from "discord.js";
import { Color } from '../../../utils/colors/colors';
import { Bot } from '../../..';
import { Emojis } from '../../../utils/emojis/emojis';

interface optionsObject {
  disabled: boolean | undefined,
  author: string | undefined
}

export const build = async (actionRowBuilder: ActionRowBuilder, options: optionsObject, data: String[] | undefined) => {
  return new Promise(resolve => {
    actionRowBuilder.addComponents(
      new ButtonBuilder()
        .setCustomId(`general:cancel_u${options.author}_${data?.join(",")}`)
        .setLabel("Cancelar Pedido")
        .setDisabled(options?.disabled)
        .setStyle(ButtonStyle.Danger)
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
    const cancelembed = new EmbedBuilder()
    .setAuthor({
        name: Bot.user.username,
        iconURL: Bot.user.displayAvatarURL()
    })
    .setDescription(`¡Pedido cancelado éxitosamente! ${Emojis.Info}`)
    .setColor(Color.Error)
    await interaction.message.edit({embeds: [cancelembed], components: []})
  }
}