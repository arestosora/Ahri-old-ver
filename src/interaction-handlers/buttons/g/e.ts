import { InteractionHandler, InteractionHandlerTypes, PieceContext } from '@sapphire/framework';
import { EmbedBuilder, TextChannel, User, VoiceChannel } from 'discord.js';
import { ActionRowBuilder, ButtonInteraction, ButtonBuilder, ButtonStyle } from "discord.js";
import { Bot } from '../../..';
import { Prisma } from '../../../structures/PrismaClient';
import { Config } from '../../../config';
import { formatNumber, Color, Emojis, Log } from '../../../utils/index';

interface optionsObject {
  disabled: boolean | undefined,
  author: string | undefined
}

export const build = async (actionRowBuilder: ActionRowBuilder, options: optionsObject, data: String[] | undefined) => {
  return new Promise(resolve => {
    actionRowBuilder.addComponents(
      new ButtonBuilder()
        .setCustomId(`g:e_a_${data?.join(",")}`)
        .setLabel("Entregado")
        .setDisabled(options?.disabled)
        .setStyle(ButtonStyle.Primary)
    );
    resolve(true)
  })
};
export class ButtonHandler extends InteractionHandler {

  public constructor(ctx: PieceContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Button
    });
  }

  public override async parse(interaction: ButtonInteraction) {
    const cat: string = interaction.customId.split(/:+/g)[0];
    const id: string = interaction.customId.split(/:+/g)[1].split(/_+/g)[0];
     if (cat == __dirname.split(/\/+/g)[__dirname.split(/\/+/g).length - 1] && id == __filename.split(/\/+/g)[__filename.split(/\/+/g).length - 1].split(/\.+/g)[0]) {
  //  if (cat == __dirname.split(/\\+/g)[__dirname.split(/\\+/g).length - 1] && id == __filename.split(/\\+/g)[__filename.split(/\\+/g).length - 1].split(/\.+/g)[0]) {
      const restriction: string = interaction.customId.split(/:+/g)[1].split(/_+/g)[1];
      let permited: boolean = restriction.startsWith("a")
      if (!permited && restriction.startsWith("u")) {
        permited = (interaction.user.id == restriction.slice(1, restriction.length))
      }
      if (permited) {
        return this.some();
      } else {
        return this.none();
      }
    } else {
      return this.none();
    }
  }

  public async run(interaction: ButtonInteraction) {
    const dataArray = interaction.customId.split(/\_+/g)[2].split(/\,+/g)
    Log.info(dataArray)
    const user = await this.container.client.users.fetch(dataArray[0]) as User
    const cuentasusadas = await Prisma.pedidos.findUnique({
      where: {
        Referencia: dataArray[4]
      }
    })
    // const user = this.container.client.users.resolve(dataArray[0])
    Log.info(user.username)
    await interaction.update({
      embeds: [
        new EmbedBuilder()
          .setDescription(`Pedido de \`${user.username}\` aceptado por \`${interaction.user.username}\` y entregado ${Emojis.Success}`)
          .setAuthor({
            name: user.username,
            iconURL: user.displayAvatarURL()
          })
          .setColor(Color.Success)
          .setThumbnail(user.displayAvatarURL())
          .addFields([
            {
              name: 'Summoner Name', value: `\`${dataArray[1]}\``, inline: true
            },
            {
              name: 'Producto', value: `\`${dataArray[2]}\` RP`, inline: true
            },
            {
              name: 'Comprobante', value: `[Click aquí](${dataArray[3]})`, inline: true
            },
            {
              name: 'Cuentas Usadas', value: `\`${cuentasusadas?.Cuentas_Asignadas}\``, inline: true
            }
          ])
          .setFooter({
            text: `UserID: ${dataArray[0]} ・ Referencia: ${dataArray[4]}`
          })
          .setTimestamp()
      ],
      components: [],
      content: `Pedido entregado ${Emojis.Success}`
    })

    await Prisma.pedidos.update({
      where: {
        Referencia: dataArray[4]
      }, data: {
        Estado: 'Entregado'
      }
    })

    try {
      await user.send({
        embeds: [
          new EmbedBuilder()
            .setDescription(`Tu pedido ha sido entregado correctamente ${Emojis.Success}.\n**¡Gracias por comprar con nosotros!** ${Emojis.Love}.\nNos ayudaría mucho si pudieras dejarnos tu referencia en: <#1135618534400077906> :heart:`)
            .setColor(Color.Success)
            .setTimestamp()
            .setAuthor({
              name: Bot.user.username,
              iconURL: Bot.user.displayAvatarURL()
            })
        ]
      })
      Log.info(`Mensaje enviado a ${user.username} (${user.id})`)

    } catch (error) {
      Log.error(`Error al enviar mensaje a ${user.username} (${user.id}) \n ${error}`)
    }

    const rptotal = await Prisma.pedidos.findMany({
      where: {
        GuildID: '1133932007236309072',
      },
    });

    let sumOfNumbers = 0;

    rptotal.forEach((pedido) => {
      const parsedNumber = parseInt(pedido.Pedido);
      if (!isNaN(parsedNumber)) {
        sumOfNumbers += parsedNumber;
      }
    });

    const formattedSum = await formatNumber(sumOfNumbers);

    const entregados = await this.container.client.channels.fetch(Config.channels.Entregados) as VoiceChannel
    const rpentregado = await this.container.client.channels.fetch(Config.channels.RPTotal) as VoiceChannel
    const entregadoslogs = await this.container.client.channels.fetch(Config.channels.EntegadosLogs) as TextChannel

    const contador = await Prisma.pedidos.findMany({
      where: {
        Estado: 'Entregado'
      }
    })

    await entregados.setName(`Entregados: ${contador.length}`).catch(() => { })
    await rpentregado.setName(`RP Entregado: ${formattedSum}`).catch(() => { })
    await entregadoslogs.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`Se ha entregado el pedido de: \`${user.username}\` éxitosamente. ${Emojis.Success}`)
          .setColor(Color.Success)
      ]
    }).catch(() => { })

  }

}