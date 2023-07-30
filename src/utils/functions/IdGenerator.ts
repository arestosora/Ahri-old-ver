import crypto from "crypto";

export async function IDGenerator(length = 5) {
  const charset = "0123456789";
  const idArray = new Uint8Array(length);
  const randomValues = crypto.randomFillSync(idArray);

  let result = "";
  const charsetLength = charset.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = randomValues[i] % charsetLength;
    result += charset.charAt(randomIndex);
  }

  return result;
}
