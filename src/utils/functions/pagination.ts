import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  Interaction
} from "discord.js";

export async function ButtonPages(
  interaction: any,
  pages: any[],
  time: number = 60000
) {
  if (!interaction) throw new Error("No interaction provided");
  if (!pages) throw new Error("No pages provided");
  if (!Array.isArray(pages)) throw new Error("Pages must be an array");

  if (typeof time != "number") throw new Error("Time must be a number");
  if (time < 30000) throw new Error("Time must be greater than 30 seconds");

  await interaction.deferReply();

  if (pages.length === 1) {
    const page = await interaction.editReply({ embeds: pages, components: [] });
    return page;
  }

  const prev = new ButtonBuilder()
    .setCustomId("prev")
    .setStyle(ButtonStyle.Primary)
    .setEmoji("⬅️")
    .setDisabled(true);

    const home = new ButtonBuilder()
    .setCustomId("home")
    .setStyle(ButtonStyle.Success)
    .setEmoji("🏠")
    .setDisabled(true);

    const next = new ButtonBuilder()
    .setCustomId("next")
    .setStyle(ButtonStyle.Primary)
    .setEmoji("➡️");

    const buttonRow = new ActionRowBuilder().addComponents(prev, home, next);
    let index = 0;

    const currentPage = await interaction.editReply({
        embeds: [pages[index]],
        components: [buttonRow],
        fetchReply: true
    })

    const collector = currentPage.createMessageComponentCollector({

        ComponentType: ComponentType.Button,
        time,
    });

    collector.on("collect", async (i: any) => {
        if (i.user.id !== interaction.user.id) {
            return i.reply({
                content: "No has podido interactuar con este menu.",
                ephemeral: true,
            });
        }

        await i.deferUpdate();  

        if (i.customId === "next") {
            if (index + 1 === pages.length) {
                index = 0;
            } else {
                index++;
            }
        } else if (i.customId === "prev") {
            if (index === 0) {
                index = pages.length - 1;
            } else {
                index--;
            }
        } else if (i.customId === "home") {
            index = 0;
        };

        if(index=== 0) prev.setDisabled(true);
        else prev.setDisabled(false);

        if(index === 0) home.setDisabled(true);
        else home.setDisabled(false);

        if(index === pages.length - 1) next.setDisabled(true);
        else next.setDisabled(false);

        await currentPage.edit({
            embeds: [pages[index]],
            components: [buttonRow],
        });

        collector.resetTimer();
    });

    collector.on("end",async  () => {
        await currentPage.edit({
            components: [],
            embeds: [pages[index]],
        });
    });

    return currentPage;

}