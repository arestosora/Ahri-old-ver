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
        .setTitle('<a:pinkwarn:1134704471637770300> Estos Combos están disponibles unicamente para Colombia :flag_co:')
        .setDescription('**Nuestros combos de Artesanía Hextech y Skins** <:price:1135058349621252106>')
        .setColor(Colors.Aqua)
        .setFields([
            {
                "name": "<:ChannelInfo:1134760898045681754> Combo 1", value: '**PASE SOUL FIGHTER**<:soulfightereventpass:1136127461562781817> \n \`2\` **Orbes** <:soulfighterorb:1136127437659455569>\n**Cofre Hextech** <:cofre:1136127499680624684>\n **$41.000 COP**', inline: true
            },
            {
                "name": "<:ChannelInfo:1134760898045681754> Combo 2", value: '**SKIN** \`1350\` **RP** <a:aestheticheart:1135277052023554188>\n **Cofre Artesano** <:artesan2:1136127584921460757>\n**27.000 COP**', inline: true
            },
            {
                "name": "<:ChannelInfo:1134760898045681754> Combo 3", value: '**SKIN** \`1820\` **RP** <a:aestheticheart:1135277052023554188>\n\`1\` **Orbe** <:soulfighterorb:1136127437659455569>\n **Cofre Artesano &Llave** <:artesan:1136127811078332578>\n **42.000 COP**', inline: true
            }
            ,
            {
                "name": "<:ChannelInfo:1134760898045681754> Combo 4", value: '\`11\` **Cofres Maestro Artesano & Llaves** <:artesan:1136127811078332578>\n **41.000 COP**', inline: true
            },
            {
                "name": "<:ChannelInfo:1134760898045681754> Combo 5", value: '\`5\` **Cofres Maestro Artesano & Llaves**<:artesan2:1136127584921460757> \n\`1\` **Orbe** <:soulfighterorb:1136127437659455569> & **Cofre Hextech** <:cofre:1136127499680624684>\n **27.000 COP**', inline: true
            },
            
        ])

    await interaction.reply({
      content: '',
      embeds: [embed],
      ephemeral: true
    });
  }
}