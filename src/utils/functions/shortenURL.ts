import TinyURL from "tinyurl";

export async function shortenURL(url: string) {
    return new Promise((resolve, reject) => {
      TinyURL.shorten(url, (res) => {
        if (res.startsWith('Error:')) {
          reject(new Error(res));
        } else {
          resolve(res);
        }
      });
    });
  }