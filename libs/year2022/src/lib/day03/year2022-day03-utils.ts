export function getPriority(itemType: string): number {
  const itemTypeCharCode = itemType.charCodeAt(0);

  if (
    "a".charCodeAt(0) <= itemTypeCharCode &&
    itemTypeCharCode <= "z".charCodeAt(0)
  ) {
    return itemType.charCodeAt(0) - "a".charCodeAt(0) + 1;
  }

  if (
    "A".charCodeAt(0) <= itemTypeCharCode &&
    itemTypeCharCode <= "Z".charCodeAt(0)
  ) {
    return itemType.charCodeAt(0) - "A".charCodeAt(0) + 27;
  }

  throw new Error();
}
