import { InteractionHandler, InteractionHandlerTypes, PieceContext } from "@sapphire/framework";
import { StringSelectMenuInteraction, EmbedBuilder, MessageCollector, ActionRowBuilder, ButtonBuilder,StringSelectMenuBuilder } from "discord.js";
import { Color, Emojis, IDGenerator, shortenURL, Log } from "../../utils/index";
import { Bot } from "../..";

interface optionsObject {
  disabled: boolean | undefined;
  author: string | undefined;
}

export const build = async (
  actionRowBuilder: ActionRowBuilder,
  options: optionsObject,
  data: String[] | undefined
) => {
  return new Promise((resolve) => {
    actionRowBuilder.addComponents(
      new StringSelectMenuBuilder()
        .setCustomId(`menus:shop_a_${data?.join(",")}`)
        .setPlaceholder(
          options.disabled ? "Menú no disponible" : "Seleccione una opción"
        )
        .setDisabled(options.disabled)
        .setOptions(
          {
            label: "765 RP",
            emoji: "1134181246029807637",
            value: "765:HIM",
          },
          {
            label: "1530 RP",
            emoji: "1134181246029807637",
            value: "1530:HIM",
          },
          {
            label: "2295 RP",
            emoji: "1134181246029807637",
            value: "2295:HIM",
          },
          {
            label: "3060 RP",
            emoji: "1134181246029807637",
            value: "3060:HIM",
          },
          {
            label: "3825 RP",
            emoji: "1134181246029807637",
            value: "3825:HIM",
          },
          {
            label: "4590 RP",
            emoji: "1134181246029807637",
            value: "4590:HIM",
          },
          {
            label: "5355 RP",
            emoji: "1134181246029807637",
            value: "5355:HIM",
          },
          {
            label: "6120 RP",
            emoji: "1134181246029807637",
            value: "6120:HIM",
          },
          {
            label: "6885 RP",
            emoji: "1134181246029807637",
            value: "6885:HIM",
          },
          {
            label: "7650 RP",
            emoji: "1134181246029807637",
            value: "7650:HIM",
          },
          {
            label: "8415 RP",
            emoji: "1134181246029807637",
            value: "8415:HIM",
          },
          {
            label: "9180 RP",
            emoji: "1134181246029807637",
            value: "9180:HIM",
          },
          {
            label: "9945 RP",
            emoji: "1134181246029807637",
            value: "9945:HIM",
          },
          {
            label: "10710 RP",
            emoji: "1134181246029807637",
            value: "10710:HIM",
          },
          {
            label: "11475 RP",
            emoji: "1134181246029807637",
            value: "11475:HIM",
          },
          {
            label: "12240 RP",
            emoji: "1134181246029807637",
            value: "12240:HIM",
          },
          {
            label: "13005 RP",
            emoji: "1134181246029807637",
            value: "13005:HIM",
          },
          {
            label: "13770 RP",
            emoji: "1134181246029807637",
            value: "13770:HIM",
          },
           {
             label: "Combo Skins & Botin Hextech 1",
             emoji: "1135684868701949962",
             value: "custom1:HIM",
           },
           {
            label: "Combo Skins & Botin Hextech 2",
            emoji: "1135684868701949962",
            value: "custom2:HIM",
          },
          {
            label: "Combo Skins & Botin Hextech 3",
            emoji: "1135684868701949962",
            value: "custom3:HIM",
          },
          {
            label: "Combo Skins & Botin Hextech 4",
            emoji: "1135684868701949962",
            value: "custom4:HIM",
          },
          {
            label: "Combo Skins & Botin Hextech 5",
            emoji: "1135684868701949962",
            value: "custom5:HIM",
          },
        )
    );
    resolve(true);
  });
};
export class ShopMenuHandler extends InteractionHandler {
  public constructor(ctx: PieceContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.SelectMenu,
    });
  }

  public override async parse(interaction: StringSelectMenuInteraction) {
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


  public async run(interaction: StringSelectMenuInteraction) {
    try {
      const UniqueID = await IDGenerator(5);
      const data = interaction.customId
        .split(/_+/g)
        [interaction.customId.split(/_+/g).length - 1].split(/,+/g);
      const user = data[0];

      let selectedOption = interaction.values[0];

      // Reemplazamos las variables por valores
      selectedOption = selectedOption
        .replace(":HIM", user)
        .replace("ME", interaction.user.id);

      // Declaramos los argumentos
      let args: any[] = selectedOption.split(/:+/g);

      // Subdividimos los argumentos en más arrays
      for (let i = 0; i < args.length; i++) {
        args[i] = [...args[i].split(/&+/g)];
      }

      // Declaramos la opción como el argumento [0][0]
      const opcion = args[0][0];

      switch (opcion) {
        case "765":
          await interaction.update({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: this.container.client.user.username,
                  iconURL: this.container.client.user.displayAvatarURL(),
                })
                .setDescription(
                  "Has seleccionado el paquete de `765` **RP**. Ahora por favor escribe tu nombre de invocador."
                )
                .setColor(Color.Success),
            ],
            components: [],
          });

          break;

        case "1530":
          await interaction.update({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: this.container.client.user.username,
                  iconURL: this.container.client.user.displayAvatarURL(),
                })
                .setDescription(
                  "Has seleccionado el paquete de `1530` **RP**. Ahora por favor escribe tu nombre de invocador."
                )
                .setColor(Color.Success),
            ],
            components: [],
          });

          break;

        case "2295":
          await interaction.update({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: this.container.client.user.username,
                  iconURL: this.container.client.user.displayAvatarURL(),
                })
                .setDescription(
                  "Has seleccionado el paquete de `2295` **RP**. Ahora por favor escribe tu nombre de invocador."
                )
                .setColor(Color.Success),
            ],
            components: [],
          });

          break;

        case "3060":
          await interaction.update({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: this.container.client.user.username,
                  iconURL: this.container.client.user.displayAvatarURL(),
                })
                .setDescription(
                  "Has seleccionado el paquete de `3060` **RP**. Ahora por favor escribe tu nombre de invocador."
                )
                .setColor(Color.Success),
            ],
            components: [],
          });

          break;

        case "3825":
          await interaction.update({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: this.container.client.user.username,
                  iconURL: this.container.client.user.displayAvatarURL(),
                })
                .setDescription(
                  "Has seleccionado el paquete de `3825` **RP**. Ahora por favor escribe tu nombre de invocador."
                )
                .setColor(Color.Success),
            ],
            components: [],
          });

          break;

        case "4590":
          await interaction.update({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: this.container.client.user.username,
                  iconURL: this.container.client.user.displayAvatarURL(),
                })
                .setDescription(
                  "Has seleccionado el paquete de `4590` **RP**. Ahora por favor escribe tu nombre de invocador."
                )
                .setColor(Color.Success),
            ],
            components: [],
          });

          break;

        case "5355":
          await interaction.update({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: this.container.client.user.username,
                  iconURL: this.container.client.user.displayAvatarURL(),
                })
                .setDescription(
                  "Has seleccionado el paquete de `5355` **RP**. Ahora por favor escribe tu nombre de invocador."
                )
                .setColor(Color.Success),
            ],
            components: [],
          });

          break;

        case "6120":
          await interaction.update({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: this.container.client.user.username,
                  iconURL: this.container.client.user.displayAvatarURL(),
                })
                .setDescription(
                  "Has seleccionado el paquete de `6120` **RP**. Ahora por favor escribe tu nombre de invocador."
                )
                .setColor(Color.Success),
            ],
            components: [],
          });

          break;

        case "6885":
          await interaction.update({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: this.container.client.user.username,
                  iconURL: this.container.client.user.displayAvatarURL(),
                })
                .setDescription(
                  "Has seleccionado el paquete de `6885` **RP**. Ahora por favor escribe tu nombre de invocador."
                )
                .setColor(Color.Success),
            ],
            components: [],
          });

          break;

        case "7650":
          await interaction.update({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: this.container.client.user.username,
                  iconURL: this.container.client.user.displayAvatarURL(),
                })
                .setDescription(
                  "Has seleccionado el paquete de `7650` **RP**. Ahora por favor escribe tu nombre de invocador."
                )
                .setColor(Color.Success),
            ],
            components: [],
          });

          break;

        case "8415":
          await interaction.update({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: this.container.client.user.username,
                  iconURL: this.container.client.user.displayAvatarURL(),
                })
                .setDescription(
                  "Has seleccionado el paquete de `8415` **RP**. Ahora por favor escribe tu nombre de invocador."
                )
                .setColor(Color.Success),
            ],
            components: [],
          });

          break;

        case "9180":
          await interaction.update({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: this.container.client.user.username,
                  iconURL: this.container.client.user.displayAvatarURL(),
                })
                .setDescription(
                  "Has seleccionado el paquete de `9180` **RP**. Ahora por favor escribe tu nombre de invocador."
                )
                .setColor(Color.Success),
            ],
            components: [],
          });

          break;

        case "9180":
          await interaction.update({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: this.container.client.user.username,
                  iconURL: this.container.client.user.displayAvatarURL(),
                })
                .setDescription(
                  "Has seleccionado el paquete de `9180` **RP**. Ahora por favor escribe tu nombre de invocador."
                )
                .setColor(Color.Success),
            ],
            components: [],
          });

          break;

        case "9945":
          await interaction.update({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: this.container.client.user.username,
                  iconURL: this.container.client.user.displayAvatarURL(),
                })
                .setDescription(
                  "Has seleccionado el paquete de `9945` **RP**. Ahora por favor escribe tu nombre de invocador."
                )
                .setColor(Color.Success),
            ],
            components: [],
          });

          break;

        case "10710":
          await interaction.update({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: this.container.client.user.username,
                  iconURL: this.container.client.user.displayAvatarURL(),
                })
                .setDescription(
                  "Has seleccionado el paquete de `10710` **RP**. Ahora por favor escribe tu nombre de invocador."
                )
                .setColor(Color.Success),
            ],
            components: [],
          });

          break;

        case "11475":
          await interaction.update({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: this.container.client.user.username,
                  iconURL: this.container.client.user.displayAvatarURL(),
                })
                .setDescription(
                  "Has seleccionado el paquete de `11475` **RP**. Ahora por favor escribe tu nombre de invocador."
                )
                .setColor(Color.Success),
            ],
            components: [],
          });

          break;

        case "12240":
          await interaction.update({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: this.container.client.user.username,
                  iconURL: this.container.client.user.displayAvatarURL(),
                })
                .setDescription(
                  "Has seleccionado el paquete de `12240` **RP**. Ahora por favor escribe tu nombre de invocador."
                )
                .setColor(Color.Success),
            ],
            components: [],
          });

          break;

        case "13005":
          await interaction.update({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: this.container.client.user.username,
                  iconURL: this.container.client.user.displayAvatarURL(),
                })
                .setDescription(
                  "Has seleccionado el paquete de `13005` **RP**. Ahora por favor escribe tu nombre de invocador."
                )
                .setColor(Color.Success),
            ],
            components: [],
          });

          break;

        case "13770":
          await interaction.update({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: this.container.client.user.username,
                  iconURL: this.container.client.user.displayAvatarURL(),
                })
                .setDescription(
                  "Has seleccionado el paquete de `13770` **RP**. Ahora por favor escribe tu nombre de invocador."
                )
                .setColor(Color.Success),
            ],
            components: [],
          });

          break;

          case "custom1":
            await interaction.update({
              embeds: [
                new EmbedBuilder()
                  .setAuthor({
                    name: this.container.client.user.username,
                    iconURL: this.container.client.user.displayAvatarURL(),
                  })
                  .setDescription(
                    "Has seleccionado el `Combo 1`. Ahora por favor escribe tu nombre de invocador."
                  )
                  .setColor(Color.Success),
              ],
              components: [],
            });
  
            break;

            case "custom2":
              await interaction.update({
                embeds: [
                  new EmbedBuilder()
                    .setAuthor({
                      name: this.container.client.user.username,
                      iconURL: this.container.client.user.displayAvatarURL(),
                    })
                    .setDescription(
                      "Has seleccionado el paquete `Combo 2`. Ahora por favor escribe tu nombre de invocador."
                    )
                    .setColor(Color.Success),
                ],
                components: [],
              });
    
              break;

              case "custom3":
                await interaction.update({
                  embeds: [
                    new EmbedBuilder()
                      .setAuthor({
                        name: this.container.client.user.username,
                        iconURL: this.container.client.user.displayAvatarURL(),
                      })
                      .setDescription(
                        "Has seleccionado el paquete `Combo 3`. Ahora por favor escribe tu nombre de invocador."
                      )
                      .setColor(Color.Success),
                  ],
                  components: [],
                });
      
                break;

                case "custom4":
                  await interaction.update({
                    embeds: [
                      new EmbedBuilder()
                        .setAuthor({
                          name: this.container.client.user.username,
                          iconURL: this.container.client.user.displayAvatarURL(),
                        })
                        .setDescription(
                          "Has seleccionado el paquete `Combo 4`. Ahora por favor escribe tu nombre de invocador."
                        )
                        .setColor(Color.Success),
                    ],
                    components: [],
                  });
        
                  break;

                  case "custom5":
                    await interaction.update({
                      embeds: [
                        new EmbedBuilder()
                          .setAuthor({
                            name: this.container.client.user.username,
                            iconURL: this.container.client.user.displayAvatarURL(),
                          })
                          .setDescription(
                            "Has seleccionado el paquete `Combo 5`. Ahora por favor escribe tu nombre de invocador."
                          )
                          .setColor(Color.Success),
                      ],
                      components: [],
                    });
          
                    break;

      }

      const nameCollector = new MessageCollector(interaction.channel, {
        filter: (msg) => msg.author.id === interaction.user.id,
        max: 1,
        time: 80000,
      });

      let name = "";
      nameCollector.on("collect", (message) => {
        name = message.content;
      });

      nameCollector.on("end", async (collected, reason) => {
        if (reason === "time") {
          interaction.channel.send({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: `${Bot.user.username}`,
                  iconURL: Bot.user.displayAvatarURL(),
                })
                .setColor(Color.Error)
                .setDescription(
                  `Se ha acabado el tiempo para responder. Inténtalo de nuevo.`
                ),
            ],
          });
        } else {
          if (name.length > 16) {
            await interaction.channel.send({
              embeds: [
                new EmbedBuilder()
                  .setAuthor({
                    name: `${Bot.user.username}`,
                    iconURL: Bot.user.displayAvatarURL(),
                  })
                  .setColor(Color.Error)
                  .setDescription(
                    `${Emojis.Error} El nombre de invocador no puede tener más de 16 caracteres. Inténtalo de nuevo.`
                  ),
              ],
            });
            return;
          }
          const NameEmbed = new EmbedBuilder()
            .setAuthor({
              name: `${interaction.user.username}`,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setDescription(
              `Perfecto, tu nombre de invocador es \`${name}\`. Ahora, envía el comprobante de pago como una imagen. ${Emojis.Success}\nRecuerda que puedes pagar por **Nequi** <:nequi:1134763235522924596>, **Bancolombia** <:bancolombia:1134763479925010518> o por **PayPal** <:paypal:1134763669855678546>.\nPuedes revisar los precios en: <#1133964283764555787>.`
            )
            .setColor(Color.Success);

          await interaction.channel.send({
            embeds: [NameEmbed],
          });

          const imageCollector = new MessageCollector(interaction.channel, {
            filter: (msg) =>
              msg.author.id === interaction.user.id && msg.attachments.size > 0,
            max: 1
          });

          imageCollector.on("collect", async (message) => {
            const attachment = message.attachments.first();
            const attachmentURL = attachment?.url;
            const attachmentName = attachment?.name;
            const attachmentExtension = attachmentName?.split(/\.+/g)[1];

            if (
              attachmentExtension !== "png" &&
              attachmentExtension !== "jpg" &&
              attachmentExtension !== "jpeg"
            ) {
              interaction.channel.send({
                embeds: [
                  new EmbedBuilder()
                    .setColor(Color.Error)
                    .setAuthor({
                      name: `${Bot.user.username}`,
                      iconURL: Bot.user.displayAvatarURL(),
                    })
                    .setDescription(
                      `${Emojis.Error} El archivo enviado no es una imagen. Inténtalo de nuevo.`
                    ),
                ],
              });
            } else {
               await shortenURL(attachmentURL).then(async (shortURL) =>{
                  const AttachmentEmbed = new EmbedBuilder()
                  .setTitle("¡Resumen de tu pedido! " + Emojis.Warning)
                  .setAuthor({
                    name: `${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL(),
                  })
                  .addFields(
                    {
                      name: "Nombre de invocador",
                      value: `\`${name}\``,
                      inline: true,
                    },
                    {
                      name: "Producto",
                      value: `\`${selectedOption}\` RP`,
                      inline: true,
                    },
                    {
                      name: 'Comprobante', value: `[Click aquí](${shortURL})`, inline: true
                    }
  
                  )
                  .setDescription(
                    `Por favor corrobora que esta información es correcta, ya que es la que se enviará para que procesen tu pedido.`
                  )
                  .setColor(Color.Success)
                  .setImage(attachmentURL);
  
                const botone = new ActionRowBuilder<ButtonBuilder>();
                const module1 = await import(
                  "../../interaction-handlers/buttons/g/c"
                );
                const module2 = await import(
                  "../../interaction-handlers/buttons/g/a"
                );
                
                await module1.build(
                  botone,
                  { disabled: false, author: interaction.user.id },
                  []
                );
                await module2.build(botone, { disabled: false, author: interaction.user.id }, [`${interaction.user.id}`,`${name}`, `${selectedOption}`, `${shortURL}`, `${UniqueID}`]
                );
  
                await interaction.channel.send({
                  embeds: [AttachmentEmbed],
                  components: [botone],
                });
               }).catch((error) => {
                Log.error('Error al acortar la URL:', error);
              });
            }
          });
        }
      });
    } catch (error) {
      Log.error(error);
      return interaction.channel.send({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: `${Bot.user.username}`,
              iconURL: Bot.user.displayAvatarURL(),
            })
            .setColor(Color.Error)
            .setDescription(
              `${Emojis.Error} Ha ocurrido un error al realizar tu pedido, inténtalo de nuevo. En caso de que el error persista, contacta con los administradores.`
            ),
        ],
      });
    }
  }


}        