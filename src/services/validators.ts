export const deleteWrongWords = (text: string) => text.replace(/(\S{13,})/g, '')
