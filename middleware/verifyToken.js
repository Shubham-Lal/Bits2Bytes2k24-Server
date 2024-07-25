const jwt = require('jsonwebtoken')

async function verifyToken(request, reply) {
    const authHeader = request.headers.authorization
    if (!authHeader) throw new Error('Authorization header is missing')

    const token = authHeader.split(' ')[1]
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        request.user = data
    } catch (err) {
        throw new Error('Invalid token')
    }
}

module.exports = verifyToken