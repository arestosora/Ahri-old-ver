import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import { Config } from '../../config';

cloudinary.config({ 
  cloud_name: 'deprv8mzu', 
  api_key: Config.api.Cloudinary_API_KEY, 
  api_secret: Config.api.Cloudinary_API_SECRET 
});

export async function uploadImageToCloudinary(imagePath: string): Promise<string> {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'folder_name', // Puedes especificar una carpeta para organizar tus imágenes en Cloudinary.
    });
    // result.secure_url contiene la URL pública de la imagen en Cloudinary.

    // Eliminar la imagen local después de cargarla en Cloudinary.
    fs.unlinkSync(imagePath);

    return result.secure_url;
  } catch (error) {
    console.error('Error al cargar la imagen en Cloudinary:', error);
    throw error;
  }
}
