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
    if (interaction.customId !== 'shop:combos') return this.none();

    return this.some();
  }

  public async run(interaction: ButtonInteraction) {

    const embed = new EmbedBuilder()
        .setDescription('**Nuestros combos de Artesanía Hextech y Skins** <:price:1135058349621252106>')
        .setColor(Colors.DarkVividPink)
        .setFields([
            {
                "name": "Combo 1", value: '<a:arrow:1135684369625923685> PASE SOUL FIGHTER + \`2\` Orbes + Cofre Hextech = **$41.000 COP**'
            },
            {
                "name": "Combo 2", value: '<a:arrow:1135684369625923685> SKIN \`1350\` RP + Cofre Artesano = **27.000 COP**'
            },
            {
                "name": "Combo 3", value: '<a:arrow:1135684369625923685> SKIN \`1820\` RP + \`1\` Orbe + Cofre Artesano + Llave = **42.000 COP**'
            }
            ,
            {
                "name": "Combo 4", value: '<a:arrow:1135684369625923685> \`11\` Cofres Maestro Artesano + Llaves = **41.000 COP**'
            },
            {
                "name": "Combo 5", value: '<a:arrow:1135684369625923685> \`5\` Cofres Maestro Artesano + Llaves \`(5)\` + \`1\` Orbe + Cofre Hextech = **27.000 COP**'
            },
            
        ])

    await interaction.reply({
      content: '',
      embeds: [embed],
      ephemeral: true
    });
  }
}