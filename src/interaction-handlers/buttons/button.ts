import { InteractionHandler, InteractionHandlerTypes, PieceContext } from '@sapphire/framework';
import { EmbedBuilder, type ButtonInteraction, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Emojis, Color } from '../../utils/index';
import { Prisma } from '../../structures/PrismaClient';

export class ButtonHandler extends InteractionHandler {
  public constructor(ctx: PieceContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Button
    });
  }

  public override parse(interaction: ButtonInteraction) {
    if (interaction.customId !== 'shop:pedido') return this.none();

    return this.some();
  }

  private async PedidosActivados(interaction: ButtonInteraction) {
    const Guild = await Prisma.config.findUnique({
      where: {
        GuildID: interaction.guild.id
      }
    });

    if(Guild.Pedidos_Enabled === false){
      return interaction.reply({
        content: `Los pedidos están desactivados en este momento. ${Emojis.Error}`,
        ephemeral: true
      })
    }
  }

  public async run(interaction: ButtonInteraction) {

     if(await this.PedidosActivados(interaction)) return;
    const Embed = new EmbedBuilder()
    .setAuthor({
      name: interaction.client.user.username,
      iconURL: interaction.client.user.displayAvatarURL(),
    })
    .setDescription(
      `Bienvenid@ al sistema de pedidos de **Riot Poins** de **${interaction.guild.name}** ${Emojis.Love}.\nSoy \`${interaction.client.user.username}\`! \n**Estaré encargada de atenderte el día de hoy.**\nPrimeramente quiero que escojas que producto quieres comprar. ${Emojis.Info}`
    )
    .setColor(Color.Debug)
  
    const row = new ActionRowBuilder<StringSelectMenuBuilder>
    const options = await import('../menus/shop');
    await options.build(row, { disabled: false, author: interaction.user.id }, [])

    try {
      await interaction.user.send({
        embeds: [Embed],
        components: [row],
        
      })
    } catch (error) {
      return interaction.reply({
        content: `No he podido comunicarme contigo. **¡Por favor revisa si tienes tus mensajes privados desactivados!**. ${Emojis.Error}`,
      })
    }

  return interaction.reply({
    content: `Revisa tus mensajes privados. ${Emojis.Success}`,
    ephemeral: true,
  })
  }
}