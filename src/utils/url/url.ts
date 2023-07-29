import axios from 'axios';

export async function shortenURL(longURL: string): Promise<string> {
  const apiUrl = `https://is.gd/create.php?format=json&url=${encodeURIComponent(longURL)}`;

  try {
    const response = await axios.get(apiUrl);
    if (response.data && response.data.shorturl) {
      return response.data.shorturl;
    } else {
      throw new Error('Se ha fallado al acortar la URL');
    }
  } catch (error) {
    throw new Error('Se ha fallado al hacer fetch de la API');
  }
}
