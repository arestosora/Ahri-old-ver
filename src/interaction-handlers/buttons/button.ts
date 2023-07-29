import { InteractionHandler, InteractionHandlerTypes, PieceContext } from '@sapphire/framework';
import { EmbedBuilder, type ButtonInteraction, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import { Emojis } from '../../utils/emojis/emojis';
import { Color } from '../../utils/colors/colors';
import { prisma } from '../../structures/PrismaClient';

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
    const Guild = await prisma.config.findUnique({
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
      `Bienvenid@ al sistema de pedidos de **Riot Poins** de **${interaction.guild.name}** ${Emojis.Love}.\nSoy \`${interaction.client.user.username}\` y estaré encargada de atenderte el día de hoy.\nPrimeramente quiero que escojas que producto quieres comprar. ${Emojis.Info}`
    )
    .setColor(Color.Debug)

  const Menu = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("purchase:menu")
      .setPlaceholder("Selecciona un producto")
      .addOptions([
        {
          label: "1000 RP",
          description: "Cantidad de Riot Points a comprar.",
          value: "1000",
          emoji: '1134181246029807637'
        },
        {
          label: "5000 RP",
          description: "Cantidad de Riot Points a comprar.",
          value: "5000",
          emoji: '1134181246029807637'
        },
        {
          label: "10000 RP",
          description: "Cantidad de Riot Points a comprar.",
          value: "10000",
          emoji: '1134181246029807637'
        },
      ])
  );

  await interaction.user.createDM().then((channel) => {
    channel.send({
      embeds: [Embed],
      components: [Menu],
    });
  });

  return interaction.reply({
    content: `Revisa tus mensajes privados. ${Emojis.Success}`,
    ephemeral: true,
  });
  }
}