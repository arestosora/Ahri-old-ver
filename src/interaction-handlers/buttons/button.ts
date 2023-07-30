import { InteractionHandler, InteractionHandlerTypes, PieceContext } from '@sapphire/framework';
import { EmbedBuilder, type ButtonInteraction, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Emojis } from '../../utils/emojis/emojis';
import { Color } from '../../utils/colors/colors';
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

  await interaction.user.createDM().then((channel) => {
    channel.send({
      embeds: [Embed],
      components: [row],
    });
  });

  return interaction.reply({
    content: `Revisa tus mensajes privados. ${Emojis.Success}`,
    ephemeral: true,
  });
  }
}