export const getStringSizeInBytes = (str) => {
    const encoder = new TextEncoder();
    const encodedString = encoder.encode(str);
    return Number(encodedString.length);
}