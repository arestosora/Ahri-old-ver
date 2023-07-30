// utils.ts

// Función para dividir un array en fragmentos más pequeños con una longitud máxima de caracteres
export function splitArray<T>(array: T[], maxLength: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += maxLength) {
      result.push(array.slice(i, i + maxLength));
    }
    return result;
  }
  
  // Función para unir varios arrays en uno solo
  export function mergeArrays<T>(arrays: T[][]): T[] {
    return ([] as T[]).concat(...arrays);
  }
  