import { InteractionHandler, InteractionHandlerTypes, PieceContext } from '@sapphire/framework';
import { EmbedBuilder, type ButtonInteraction } from 'discord.js';
import { Emojis, Color } from '../../../utils/index';
import { Bot } from '../../..';
import { Config } from '../../../config';

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
        name: `${Emojis.Colombia}・Colombia`, value: `${Emojis.Nequi} **Nequi:** \`3015077533\`\n${Emojis.Bancolombia} **Bancolombia:** Próximamente.\n${Emojis.Price} **Otros Bancos(PSE):** [Click Aquí](https://bit.ly/RPHUBPSE)`, inline: true
      },
      {
        name: `${Emojis.Mexico}・México`, value: `${Emojis.BancoAzteca} **Banco Azteca:** \`4027665836297219\`.`, inline: true
      },
      {
        name: `${Emojis.USA}・Internacional`, value: `${Emojis.Paypal} **Paypal:** Próximamente.\n${Emojis.Binance} **Binance:** Próximamente.`, inline: true
      }
    ])
        .setColor(Color.Info)
        .setAuthor({
            name: Bot.user.username,
            iconURL: Bot.user.displayAvatarURL()
        })
        .setImage(Config.images.Precios)

    await interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
}