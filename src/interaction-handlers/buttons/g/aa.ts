import { InteractionHandler, InteractionHandlerTypes, PieceContext } from '@sapphire/framework';
import { EmbedBuilder, Emoji, TextChannel } from 'discord.js';
import { ActionRowBuilder, ButtonInteraction, ButtonBuilder, ButtonStyle } from "discord.js";
import { Color, Emojis } from "../../../utils/index";
import { Prisma } from "../../../structures/PrismaClient";
import { Bot } from "../../..";

interface optionsObject {
  disabled: boolean | undefined,
  author: string | undefined
}

export const build = async (actionRowBuilder: ActionRowBuilder, options: optionsObject, data: String[] | undefined) => {
  return new Promise(resolve => {
    actionRowBuilder.addComponents(
      new ButtonBuilder()
        .setCustomId(`g:aa_a_${data?.join(",")}`)
        .setLabel("Confirmar Pedido")
        .setDisabled(options?.disabled)
        .setStyle(ButtonStyle.Success)
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
      // if (cat == __dirname.split(/\\+/g)[__dirname.split(/\\+/g).length - 1] && id == __filename.split(/\\+/g)[__filename.split(/\\+/g).length - 1].split(/\.+/g)[0]) {
      const restriction: string = interaction.customId.split(/:+/g)[1].split(/_+/g)[1];
      let permited: boolean = restriction.startsWith("a")
      if (!permited && restriction.startsWith("u")) {
        permited = (interaction.user.id == restriction.slice(1, restriction.length))
      }
      if (permited) {
        return this.some();
      } else {
        let embed = new EmbedBuilder()
          .setDescription('test')
          .setColor("#ed4245")
        await interaction.reply({ embeds: [embed] })
        return this.none();
      }
    } else {
      return this.none();
    }
  }

  public async run(interaction: ButtonInteraction) {
    const dataArray = interaction.customId.split(/\_+/g)[2].split(/\,+/g)
    const user = this.container.client.users.cache.get(dataArray[0])

    const botone = new ActionRowBuilder<ButtonBuilder>
    const module1 = await import('./e')
    const module2 = await import('./w')
    await module1.build(botone, { disabled: false, author: interaction.user.id }, dataArray)
    await module2.build(botone, { disabled: false, author: interaction.user.id }, dataArray)

     await interaction.message.edit({
        components: [botone],
         embeds: [
             new EmbedBuilder()
             .setDescription(`Pedido de \`${user.username}\` aceptado por \`${interaction.user.username}\` ${Emojis.Success}`)
             .setAuthor({
                 name: interaction.user.username,
                 iconURL: interaction.user.displayAvatarURL()
             })
             .setColor(Color.Info)
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
                }
            ])
           .setFooter({
            text: `UserID: ${dataArray[0]} ・ Referencia: ${dataArray[4]}`
             })
         ],
         content: `Pedido por entregar ${Emojis.Loading}`
        })

        await Prisma.pedidos.create({
            data: {
                Referencia: dataArray[4],
                SN: dataArray[1],
                UserID: dataArray[0],
                Pedido: `${dataArray[2]}`,
                Comprobante: `${dataArray[3]}`,
            }
        })

        const usuario = await Prisma.users.findUnique({
            where: {
              UserID: dataArray[0]
            }
        })

        if(!usuario){
            await Prisma.users.create({
                data: {
                    UserID: dataArray[0]
                }
            })
        } else {
          await Prisma.$queryRaw`UPDATE Users
          SET Pedidos = Pedidos + 1,
              updatedAt = NOW(3)
          WHERE UserID = ${dataArray[0]}`
        }

     await user.createDM().then(async dm => {
            return dm.send({
                embeds: [
                    new EmbedBuilder()
                    .setDescription(`Tu pedido ha sido aceptado ${Emojis.Success}. Recibirás una solicitud de amistad en **League of Legends**. ${Emojis.Info}\n**Nota:** Recibirás una confirmación en este chat una vez se haya entregado tu pedido. ${Emojis.Love}`)
                    .setColor(Color.Info)
                    .setFooter({
                        text: `Referencia: ${dataArray[4]}`
                    })
                    .setTimestamp()
                ]
            })
     })
  }
}