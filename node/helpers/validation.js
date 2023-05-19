


export const isNumber = (string) => {
    console.log(string)
    const pattern = /^\d+\.?\d*$/;
    return pattern.test(string);  // returns a boolean
}