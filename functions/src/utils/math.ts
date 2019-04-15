
export const generateRandomNumber = (minValue, maxValue, integerValue = true): number => {
    let randomNumber: number = Math.random() * (maxValue - minValue + 1) + minValue
    if (randomNumber === maxValue) randomNumber = generateRandomNumber(minValue, maxValue, false)
    if (integerValue) randomNumber = Math.trunc(randomNumber)
    return randomNumber
}

export const generateRandomEquation = (qtIncognitos = 3, operators = ["+", "-", "*", "/"]): string => {
    let equation = ""

    for (let i = 0; i < qtIncognitos; i++) {
        if (i > 0) equation += " "
        equation += String.fromCharCode(97 + i)
        if (i < qtIncognitos-1) equation +=  " " + operators[generateRandomNumber(0, operators.length-1)]
    }

    return equation
}