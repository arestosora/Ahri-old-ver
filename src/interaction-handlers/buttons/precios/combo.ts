import { InteractionHandler, InteractionHandlerTypes, PieceContext } from '@sapphire/framework';
import { EmbedBuilder, type ButtonInteraction } from 'discord.js';
import { Emojis, Color } from '../../../utils/index';

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
        .setTitle(`${Emojis.Info}Estos Combos están disponibles unicamente para Colombia ${Emojis.Colombia}`)
        .setDescription(`**Nuestros combos de Artesanía Hextech y Skins** ${Emojis.Check}`)
        .setColor(Color.Main)
        .setFields([
            {
                "name": `${Emojis.Info} Combo 1`, value: `**PASE SOUL FIGHTER**${Emojis.BattlePass} \n \`2\` **Orbes** ${Emojis.Orb}\n**Cofre Hextech** ${Emojis.HextechChest}\n **$41.000 COP**`, inline: true
            },
            {
                "name": `${Emojis.Info} Combo 2`, value: `**SKIN** \`1350\` **RP** ${Emojis.Heart}\n **Cofre Artesano** ${Emojis.ArtesanChest}\n**27.000 COP**`, inline: true
            },
            {
                "name": `${Emojis.Info} Combo 3`, value: `**SKIN** \`1820\` **RP** ${Emojis.Heart}\n\`1\` **Orbe** ${Emojis.Orb}\n **Cofre Artesano &Llave** ${Emojis.ArtesanChestKey}\n **42.000 COP**`, inline: true
            }
            ,
            {
                "name": `${Emojis.Info} Combo 4`, value: `\`11\` **Cofres Maestro Artesano & Llaves** ${Emojis.ArtesanChestKey}\n **41.000 COP**`, inline: true
            },
            {
                "name": `${Emojis.Info} Combo 5`, value: `\`5\` **Cofres Maestro Artesano & Llaves**${Emojis.ArtesanChestKey} \n\`1\` **Orbe** ${Emojis.Orb} & **Cofre Hextech** ${Emojis.HextechChest}\n **27.000 COP**`, inline: true
            },
            
        ])

    await interaction.reply({
      content: '',
      embeds: [embed],
      ephemeral: true
    });
  }
}