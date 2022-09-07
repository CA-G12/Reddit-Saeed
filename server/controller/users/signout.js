module.exports = (req, res) => {
    res.clearCookie('token').status(302).redirect('/')
}
