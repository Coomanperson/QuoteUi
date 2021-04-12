
export const ValidateQuoteRequest = (ages, currency, startDate, endDate) => {
    let cleanedAges = ages.split(',').map(Number).filter(value => new RegExp(/\d+/).test(value));
    var dirtyAges = ages.split(',')
    let validationErrors = [];

    if(dirtyAges.length > cleanedAges.length)
        validationErrors.push('1 or more ages were invalid.')

    if(cleanedAges.length === 0) 
        validationErrors.push('Ages must be numbers in a comma seperated list.')
    
    if(cleanedAges.length && cleanedAges[0] < 18) 
        validationErrors.push('The age of the first person in the trip must be 18 or older.')
    
    if(cleanedAges.length && cleanedAges.some(value => (value < 18 || value > 70)))
        validationErrors.push('The ages of all occupants must be between 18 and 70.')
    
    if(!new RegExp(/^[a-z]{3}$/i).test(currency)) 
        validationErrors.push('Currency code must be in valid ISO 4217 format.')

    if(startDate > endDate)
        validationErrors.push("End date cannot be before start date.")

    if(validationErrors.length) {
        let validationMessage = ""
        for(let i = 0; i < validationErrors.length; i++){
            validationMessage += validationErrors[i] + ' \n'
        }
        alert(validationMessage);
        return false;
    }

    return true;
}