export const formSelectCreateLabel = (label) => 'Dodaj: ' + label;

export const validationMessages = {
  min: (num) => `Minialna długość: ${num}`,
  max: (num) => `Maksymalna długość: ${num}`,
  required: 'Wymagane',
  email: 'Niepoprawny e-mail',
};

const getRegonSum = (regon, weights) =>
  weights.reduce((acc, cur, i) => acc + parseInt(regon[i]) * cur, 0);

export const regonValidation = (regon) => {
  if (regon.length !== 14 && regon.length !== 9) {
    return false;
  }

  const shortRegonWeights = [8, 9, 2, 3, 4, 5, 6, 7];
  const shortRegonSum = getRegonSum(regon, shortRegonWeights);
  const shortRegonControlSum =
    shortRegonSum % 11 === 10 ? 0 : shortRegonSum % 11;
  const shortRegonIsValid =
    shortRegonControlSum === parseInt(regon[shortRegonWeights.length]);

  if (regon.length === 14 && shortRegonIsValid) {
    const longRegonWeights = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8];
    const longRegonSum = getRegonSum(regon, longRegonWeights);
    const longRegonControlSum =
      longRegonSum % 11 === 10 ? 0 : shortRegonSum % 11;
    const longRegonIsValid =
      longRegonControlSum === parseInt(regon[longRegonWeights.length]);

    return longRegonIsValid;
  }

  return shortRegonIsValid;
};
