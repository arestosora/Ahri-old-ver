import { InteractionHandler, InteractionHandlerTypes, PieceContext } from '@sapphire/framework';
import { EmbedBuilder, type ButtonInteraction, Colors } from 'discord.js';

export class ButtonHandler extends InteractionHandler {
  public constructor(ctx: PieceContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Button
    });
  }

  public override parse(interaction: ButtonInteraction) {
    if (interaction.customId !== 'shop:precios_usd') return this.none();

    return this.some();
  }

  public async run(interaction: ButtonInteraction) {

    const embed = new EmbedBuilder()
        .setDescription('Estas viendo los precios en USD.')
        .setColor(Colors.Red)
        // .setImage('https://media.tenor.com/23mTA_P6BFkAAAAd/ahri.gif')
        .setThumbnail('https://media.tenor.com/23mTA_P6BFkAAAAd/ahri.gif')

    await interaction.reply({
      content: '',
      embeds: [embed],
      ephemeral: true
    });
  }
}