import { InteractionHandler, InteractionHandlerTypes, PieceContext } from '@sapphire/framework';
import { EmbedBuilder, Emoji, TextChannel, User } from 'discord.js';
import { ActionRowBuilder, ButtonInteraction, ButtonBuilder, ButtonStyle } from "discord.js";
import { Color, Emojis, Log } from "../../../utils/index";
import { Prisma } from "../../../structures/PrismaClient";
import { Bot } from "../../..";

interface optionsObject {
  disabled: boolean | undefined,
  author: string | undefined
}
interface Cuenta {
  id: number;
  nickname: string;
  username: string;
  password: string;
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
    const user = await this.container.client.users.fetch(dataArray[0]) as User

    const botone = new ActionRowBuilder<ButtonBuilder>
    const module1 = await import('./e')
    const module2 = await import('./w')
    await module1.build(botone, { disabled: false, author: interaction.user.id }, dataArray)
    await module2.build(botone, { disabled: false, author: interaction.user.id }, dataArray)

    async function asignarRPs(RP_Pedido, cuentas) {
      const custompedido = dataArray[2].toLowerCase();
      const customPrefixes = ["custom", "orb", "skin"];
      let RP_Pedido_Modificado = customPrefixes.some(prefix => custompedido.startsWith(prefix)) ? 2295 : parseInt(custompedido);
    
      switch (custompedido) {
        case "custom1":
          RP_Pedido_Modificado = 2295;
          break;
        case "custom2":
          RP_Pedido_Modificado = 1540;
          break;
        case "custom3":
          RP_Pedido_Modificado = 3000;
          break;
        case "custom4":
          RP_Pedido_Modificado = 2500;
          break;
        case "custom5":
          RP_Pedido_Modificado = 1530;
          break;
        default: 
          // En caso de que el custompedido no coincida con ninguno de los casos anteriores, mantiene el valor actual de RP_Pedido_Modificado
          break;
      }
    
      let cuentasAsignadas = [];
      let RPsAsignados = 0;
      let i = 0;
    
      if (customPrefixes.some(prefix => custompedido.startsWith(prefix))) {
        const cuentasCombos = await Prisma.cuentas_Combos.findMany({
          where: {
            Estado: 'Disponible'
          },
          orderBy: {
            RPDisponibles: 'asc'
          }
        });
    
        while (RPsAsignados < RP_Pedido_Modificado && i < cuentasCombos.length) {
          const cuenta = cuentasCombos[i];
          const RPsDisponibles = cuenta.RPDisponibles;
          const RPsAsignar = Math.min(RPsDisponibles, RP_Pedido_Modificado - RPsAsignados);
    
          cuentasAsignadas.push({
            Nickname: cuenta.Nickname,
            Username: cuenta.Username,
            Password: cuenta.Password,
            RPsAsignados: RPsAsignar
          });
    
          RPsAsignados += RPsAsignar;
    
          await Prisma.cuentas_Combos.update({
            where: { Username: cuenta.Username },
            data: { RPDisponibles: RPsDisponibles - RPsAsignar },
          });
    
          if (RPsDisponibles - RPsAsignar === 0) {
            await Prisma.cuentas_Combos.update({
              where: { Username: cuenta.Username },
              data: { Estado: 'No Disponible' },
            });
          }
    
          i++;
        }
      } else {
        while (RPsAsignados < RP_Pedido_Modificado && i < cuentas.length) {
          const cuenta = cuentas[i];
          const RPsDisponibles = cuenta.RPDisponibles;
          const RPsAsignar = Math.min(RPsDisponibles, RP_Pedido_Modificado - RPsAsignados);
    
          cuentasAsignadas.push({
            Nickname: cuenta.Nickname,
            Username: cuenta.Username,
            Password: cuenta.Password,
            RPsAsignados: RPsAsignar
          });
    
          RPsAsignados += RPsAsignar;
    
          await Prisma.cuentas.update({
            where: { Username: cuenta.Username },
            data: { RPDisponibles: RPsDisponibles - RPsAsignar },
          });
    
          if (RPsDisponibles - RPsAsignar === 0) {
            await Prisma.cuentas.update({
              where: { Username: cuenta.Username },
              data: { Estado: 'No Disponible' },
            });
          }
    
          i++;
        }
      }
    
      console.table(cuentasAsignadas);
      return cuentasAsignadas;
    }
    
    // Uso de la función con el valor RP_Pedido y cuentas que has proporcionado:
    const custompedido = dataArray[2];
    const RP_Pedido = parseInt(custompedido);

    const cuentas = await Prisma.cuentas.findMany({
      where: {
        Estado: 'Disponible'
      },
      orderBy: {
        RPDisponibles: 'asc'
      }
    });

    const cuentasAsignadas = await asignarRPs(RP_Pedido, cuentas);

    if (cuentasAsignadas.length === 0) return;

    const nicknamesAsignados = cuentasAsignadas.map(cuenta => cuenta.Nickname).join(', ');

    await Prisma.pedidos.create({
      data: {
        Referencia: dataArray[4],
        SN: dataArray[1],
        UserID: dataArray[0],
        Pedido: `${dataArray[2]}`,
        Cuentas_Asignadas: nicknamesAsignados,
        Comprobante: `${dataArray[3]}`,
      }
    })

    const usuario = await Prisma.users.findUnique({
      where: {
        UserID: dataArray[0]
      }
    })

    if (!usuario) {
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

    const embed = new EmbedBuilder()
      .setDescription(`Pedido de \`${user.username}\` aceptado por \`${interaction.user.username}\` ${Emojis.Success}`)
      .setAuthor({
        name: user.username,
        iconURL: user.displayAvatarURL()
      })
      .setColor(Color.Info)
      .setThumbnail(user.displayAvatarURL())
      .addFields([
        {
          name: 'Summoner Name',
          value: `\`${dataArray[1]}\``,
          inline: true
        },
        {
          name: 'Producto',
          value: `\`${dataArray[2]}\` RP`,
          inline: true
        },
        {
          name: 'Comprobante',
          value: `[Click aquí](${dataArray[3]})`,
          inline: true
        }
      ])
      .setFooter({
        text: `UserID: ${dataArray[0]} ・ Referencia: ${dataArray[4]}`
      });

    // Crear un field por cada cuenta asignada
    cuentasAsignadas.forEach((cuenta, index) => {
      embed.addFields({
        name: `Cuenta Asignada ${index + 1}`,
        value: `**Nickname:** \`${cuenta.Nickname}\`, \n**Username:** \`${cuenta.Username}\`, \n**Password:** ||\`${cuenta.Password}\`|| \n**RP Asignado:** \`${cuenta.RPsAsignados}\``,
        inline: true
      });
    });

    await interaction.update({
      components: [botone],
      embeds: [embed],
      content: `Pedido por entregar ${Emojis.Loading}`
    });

    await user.createDM().then(async dm => {
      return dm.send({
        embeds: [
          new EmbedBuilder()
            .setDescription(`Tu pedido ha sido aceptado ${Emojis.Success}. Recibirás una solicitud de amistad en **League of Legends** por las cuentas: \`${nicknamesAsignados}\`. ${Emojis.Info}\n**Nota:** Recibirás una confirmación en este chat una vez se haya entregado tu pedido. ${Emojis.Love}`)
            .setColor(Color.Info)
            .setFooter({
              text: `Referencia: ${dataArray[4]}`
            })
            .setTimestamp()
        ]
      });
    });
  }
}