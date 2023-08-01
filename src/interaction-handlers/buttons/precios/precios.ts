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
    .setFields([
      {
        name: ':flag_co:・Colombia', value: '<:nequi:1134763235522924596> **Nequi:** 3015077533\n<:bancolombia:1134763479925010518> **Bancolombia:** Próximamente.', inline: true
      },
      {
        name: ':flag_mx:・México', value: '<:azteca:1135804159501815859> **Banco Azteca:** Próximamente.', inline: true
      },
      {
        name: ':flag_us:・Internacional', value: '<:paypal:1134763669855678546> **Paypal:** Próximamente.\n<:binance:1135310399084965923> **Binance:** Próximamente.', inline: true
      }
    ])
        .setColor(Color.Info)
        .setAuthor({
            name: Bot.user.username,
            iconURL: Bot.user.displayAvatarURL()
        })
        .setImage(`https://i.imgur.com/vjwjRUF.jpg`)

    await interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
}