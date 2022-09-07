module.exports = (message, status) => {
    const serverError = new Error(message)
    serverError.status = status
    return serverError
}
