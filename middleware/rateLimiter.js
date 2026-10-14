const rateLimiter = require("express-rate-limit")


const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: +process?.env?.RATE_LIMIT,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56,
})

module.exports = limiter