export const toCapitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const getNameInitials = (name, surname) => `${name[0]}${surname[0]}`;
