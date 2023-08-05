import "dotenv/config";

export const Config = {
    Token: process.env.TOKEN,
    channels: {
        Pedidos: process.env.PEDIDOS_CHANNEL,
        EntegadosLogs: process.env.ENTREGADOS_CHANNEL,
        Menu: process.env.MENU_CHANNEL,
        Entregados: process.env.ENTREGADOS_VOICE_CHANNEL,
        RPTotal: process.env.RPTOTAL_VOICE_CHANNEL
    },
    images: {
        Precios: process.env.PRECIOSIMG
    }
}