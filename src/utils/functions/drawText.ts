import { createCanvas, loadImage, registerFont } from 'canvas';
import path from 'path';

interface TextOnImageOptions {
  text: string;
  fontSize: number;
  fontColor: string;
  x: number;
  y: number;
}

export async function drawTextOnImage(imageURL: string, options: TextOnImageOptions): Promise<string> {
  const { text, fontSize, fontColor, x, y } = options;
  
  // Registra la fuente que deseas utilizar para el texto.
  const fontPath = path.join(__dirname, 'fonts', 'arial.ttf');
  registerFont(fontPath, { family: 'Arial' });

  // Carga la imagen desde la URL.
  const image = await loadImage(imageURL);

  // Establece el tamaño del canvas para que coincida con el de la imagen.
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');

  // Dibuja la imagen en el canvas.
  ctx.drawImage(image, 0, 0, image.width, image.height);

  // Establece las propiedades de estilo del texto.
  ctx.fillStyle = fontColor;
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = 'center';
  
  // Dibuja el texto en el canvas.
  ctx.fillText(text, x, y);

  // Convierte el canvas a una URL de imagen y devuelve la URL resultante.
  return canvas.toDataURL();
}

