import { formatNumber } from "./functions/formatNumber";
import { drawTextOnImage } from "./functions/drawText";
import { IDGenerator } from "./functions/IdGenerator";
import { ButtonPages } from "./functions/pagination";
import { shortenURL } from "./functions/shortenURL";
import { Emojis } from "./emojis/emojis";
import { Color } from "./colors/colors";
import { uploadImageToCloudinary } from "./functions/cloudinary";
import Logger from "./log/logger";
const Log = new Logger();

export { shortenURL, formatNumber, IDGenerator, ButtonPages, Emojis, Color, Log, drawTextOnImage, uploadImageToCloudinary }