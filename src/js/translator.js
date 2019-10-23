function cToF(celsius)
{
    let cTemp = celsius;
    let cToFahr = cTemp * 9 / 5 + 32;
    return cToFahr;
}

function fToC(fahrenheit)
{
    let fTemp = fahrenheit;
    let fToCel = (fTemp - 32) * 5 / 9;
} 

export { cToF , fToC }