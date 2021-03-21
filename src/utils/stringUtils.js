export const toCapitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const getNameInitials = (name, surname) => `${name[0]}${surname[0]}`;

/**
 * Removes white spaces from the given string
 * @param {string} string
 */
export const removeWhiteSpaces = (string) => string.replace(/ +/g, '');

/**
 * Removes specified char from the given string
 * @param {string} string
 * @param {char} char char to remove from string
 */
export const removeChar = (string, char) => {
  const pattern = new RegExp(char, 'g');
  return string.replace(pattern, '');
};
