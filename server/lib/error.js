
// Error handling function
const handleErrors = (err) => {
    const errors = {
        message: [],
        status: 400
    };

    // For Joi validation
    if(err.details) {
        err.details.forEach(error => {
            errors.message.push(error.message);
        });
    }
    else if(err.message) {
        errors.message.push(err.message);
    }
    else {
        errors.status = 500,
        errors.message.push('Internal Server Error');
    }

    return errors;
}

module.exports = {handleErrors};