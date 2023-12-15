const express = require('express');
const cookie = require('cookie');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.post('/api/users/login', async (req, res) => {
    console.log('Received login request:', req.body);
    const { email, password } = req.body;

    const body = JSON.stringify({
        email,
        password,
    });

    try {
        const apiRes = await fetch(`${process.env.API_URL}/users/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        });

        const data = await apiRes.json();

        if (apiRes.status === 200) {
            res.setHeader('Set-Cookie', [
                cookie.serialize('access', data.access, {
                    maxAge: 60 * 30,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    path: '/api/',
                    sameSite: 'strict',
                }),
                cookie.serialize('refresh', data.refresh, {
                    maxAge: 60 * 60 * 24,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    path: '/api/',
                    sameSite: 'strict',
                }),
            ]);

            return res.status(200).json({ success: 'Logged in successfully' });
        } else {
            return res.status(apiRes.status).json(data);
        }
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({
            error: 'Something went wrong while logging in',
        });
    }
});

module.exports = router;
