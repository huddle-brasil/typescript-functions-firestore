
export const generateRandomNumber = (minValue, maxValue, integerValue = true): number => {
    let randomNumber: number = Math.random() * (maxValue - minValue) + minValue
    if (randomNumber === maxValue) randomNumber = generateRandomNumber(minValue, maxValue, false)
    if (integerValue) randomNumber = Math.trunc(randomNumber)
    return randomNumber
}