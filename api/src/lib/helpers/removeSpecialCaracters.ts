export function removeSpecialCaracters(value: string) {
  if (value) {
    return value.replace(/\D/g, '').trim();
  }
  return undefined;
}
