import { InteractionHandler, InteractionHandlerTypes, PieceContext } from '@sapphire/framework';
import { EmbedBuilder, type ButtonInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Emojis } from '../../../utils/emojis/emojis';
import { Color } from '../../../utils/colors/colors';
import { Bot } from '../../..';

export class ButtonHandler extends InteractionHandler {
  public constructor(ctx: PieceContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Button
    });
  }

  public override parse(interaction: ButtonInteraction) {
    if (interaction.customId !== 'shop:precios') return this.none();

    return this.some();
  }

  public async run(interaction: ButtonInteraction) {

    const embed = new EmbedBuilder()
        .setDescription(`Qué precios quieres ver? ${Emojis.Love}`)
        .setColor(Color.Info)
        .setAuthor({
            name: Bot.user.username,
            iconURL: Bot.user.displayAvatarURL()
        })
        .setThumbnail(`https://media.tenor.com/23mTA_P6BFkAAAAd/ahri.gif`)


        const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder()
            .setCustomId(`shop:precios_usd`)
            .setLabel("USD")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('1135058963562500126'),

            new ButtonBuilder()
            .setCustomId(`shop:precios_cop`)
            .setLabel("COP")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('1135058936366645348'),

            new ButtonBuilder()
            .setCustomId(`shop:precios_mxn`)
            .setLabel("MXN")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('1135058951302561852'),
        )

    await interaction.reply({
      embeds: [embed],
      components: [buttons],
      ephemeral: true
    });
  }
}