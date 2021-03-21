/**
 * Sets default text for adding new items to select field
 * @param {string} label New item's type
 */
export const getSelectCreateLabel = (label) => 'Dodaj: ' + label;

export const validationMessages = {
  min: (num) => `Minialna długość: ${num}`,
  max: (num) => `Maksymalna długość: ${num}`,
  required: 'Wymagane',
  email: 'Niepoprawny e-mail',
  incorrectFormat: 'Niepoprawny format',
};

const isCorrectNipOrRegon = (nipOrRegon, weights) => {
  const sum = weights.reduce(
    (acc, cur, i) => acc + parseInt(nipOrRegon[i]) * cur,
    0,
  );

  if (sum === 0) {
    return false;
  }

  const controlSum = sum % 11 === 10 ? 0 : sum % 11;
  return controlSum === parseInt(nipOrRegon[weights.length]);
};

/**
 * Checks if given regon number is valid.
 * @param {string} regon
 */
export const validateRegon = (regon) => {
  if (regon.length !== 14 && regon.length !== 9) {
    return false;
  }

  const shortRegonWeights = [8, 9, 2, 3, 4, 5, 6, 7];
  const shortRegonIsValid = isCorrectNipOrRegon(regon, shortRegonWeights);

  if (regon.length === 14 && shortRegonIsValid) {
    const longRegonWeights = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8];
    const longRegonIsValid = isCorrectNipOrRegon(regon, longRegonWeights);
    return longRegonIsValid;
  }

  return shortRegonIsValid;
};

/**
 * Checks if given nip number is valid.
 * @param {string} nip
 */
export const validateNip = (nip) => {
  if (nip.length !== 10) {
    return false;
  }
  const nipWeights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  return isCorrectNipOrRegon(nip, nipWeights);
};
