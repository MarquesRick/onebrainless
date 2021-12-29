export default function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function replaceToComma(string: string) {
  return string.replaceAll('|', ', ');
}
