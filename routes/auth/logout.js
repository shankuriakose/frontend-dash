const express = require('express');
const cookie = require('cookie');

const router = express.Router()

router.get('/api/users/logout', (req, res) => {
    res.setHeader("Set-Cookie", [
        cookie.serialize('access', '', {
            maxAge: new Date(0),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/api/',
            sameSite:'strict',
        }),
        cookie.serialize('refresh', '', {
            maxAge: new Date(0),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/api/',
            sameSite:'strict',
        }),
    ])

    return res.status(200).json({ success: 'Logged out successfully' })
})


module.exports = router;