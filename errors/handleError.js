
/**
 * This function is generate formated errors for user validation.
 * @param {Object} err Take the error object
 * @returns {Object} Error Message Object
 */
const handleUserError = (err) =>{

    const error = {name: '', email: '', password: ''}

    

    if(err.message.includes('User validation failed')){
     Object.values(err.errors).forEach(property =>{
        error[property.path] = property.properties.message;

     })
    }
    return error;
}

module.exports = {handleUserError}