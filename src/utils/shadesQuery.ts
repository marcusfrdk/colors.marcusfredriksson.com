const isValidLength = (query: string): boolean => query.length % 6 === 0;

export const encodeShadesQuery = (shades: string[]): string => {
  if (!shades || !isValidLength(shades.join("").replaceAll("#", ""))) return "";
  return "&shades=" + shades.join("").replaceAll("#", "");
};

export const parseShadesQuery = (
  query?: string | string[]
): string[] | null => {
  if (!query || Array.isArray(query) || query.length !== 6 * 11) return null;
  return query.match(/.{6}/g)?.map((shade) => "#" + shade) || [];
};
