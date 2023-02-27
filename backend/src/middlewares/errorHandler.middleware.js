

const ErrorFormatter = (err) => {

    // if (err.name === "ValidationError") 
    // return Object.values(err.errors).map(value => value.message)
    
    if (err.name === "ValidationError") {
        let errors = {}
        Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message
        })
        return errors
    }
    
    if(err.message) return err.message

    return err || 'Quelque chose s\'est mal passé'
}

const ErrorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || 500
    let errMsg = ErrorFormatter(err)
    
    res.status(errStatus).json({
        // success: false,
        // status: "failure",
        message: errMsg,
        // time: new Date().toISOString().replace('T', ' ').substring(0, 19),
        // stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}

module.exports = ErrorHandler


/*
1xx: informational responses
2xx: successful responses
3xx: redirection messages
4xx: client error responses
5xx: server error responses
*/