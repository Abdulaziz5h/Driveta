export const validatorPositive = value => {
    if (value >= 0) {
        return true;
    }
    return false;
};

export const validatorPassword = password => {
    /* eslint-disable no-useless-escape */
    const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
    /* eslint-enable no-useless-escape */
    const validPassword = regExp.test(password);
    return validPassword;
};

export const validatorCreditCard = creditnum => {
    /* eslint-disable no-useless-escape */
    const cRegExp = /^(?:3[47][0-9]{13})$/;
    /* eslint-enable no-useless-escape */
    const validCreditCard = cRegExp.test(creditnum);
    return validCreditCard;
};

export const validatorTimeValidator = val => {
    if (val === undefined || val === null || val.length === 0) {
        return true;
    }
    /* eslint-disable no-useless-escape */
    const re = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    /* eslint-enable no-useless-escape */
    return re.test(val);
};

export const validatorUrlValidator = val => {
    if (val === undefined || val === null || val.length === 0) {
        return true;
    }
    /* eslint-disable no-useless-escape */
    const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    /* eslint-enable no-useless-escape */
    return re.test(val);
};
export const validatorPhone = val => {
    if (val === undefined || val === null || val.length === 0) {
        return true;
    }
    // const re = /^(\+\d{0,1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/igm;
    const re = /^[0-9]+$/igm
    return re.test(val);
};

export const validatorMobile = val => {
    if (val === undefined || val === null || val.length === 0) {
        return true;
    }
    const re = /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im;
    return re.test(val);
};

export const validatorUserNameValidator = val => {
    if (val === undefined || val === null || val.length === 0) {
      return true
    }
    /* eslint-disable no-useless-escape */
    const re = /^[A-Za-z][A-Za-z0-9_]{5,29}$/
    /* eslint-enable no-useless-escape */
    return re.test(val)
}
  
export const validatorEnglishLetters = val => {
  const englishLetterWOSpaces =  /^[a-zA-Z0-9]+$/.test(val)
  return englishLetterWOSpaces;
}


export const validatorNoSpaces = val => {
  const noSpaces = /^\S*$/.test(val)
  return noSpaces
}