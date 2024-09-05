export function getImageUrl (name: string): string {
  return new URL(`../assets/images/avatars/${name}`, import.meta.url).href
}
