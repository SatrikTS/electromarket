/**
 * Обрезка строк
 * @param originalString
 * @param length
 */
export const truncateString = (originalString: string, length: number) => {
  if (originalString?.length > length) {
    return originalString.slice(0, length) + '...';
  } else {
    return originalString;
  }
}
