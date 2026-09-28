function Mainerror(err, req, res, next) {
    let response = {
        stack: err.stack,
        error: err.message
    }

    return res.status(400).json(response)
}

module.exports = Mainerror