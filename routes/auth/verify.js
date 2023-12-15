const express = require('express');
const fetch = (...args) => import("node-fetch").then(({default:fetch}) => fetch(...args))


const router = express.Router()

router.get('/api/users/verify', async(req, res) =>{
    const {access} = req.cookies

    const body = JSON.stringify({
        token: access
    })

    console.log(body)

    try{
        const apiRes = await fetch(`${process.env.API_URL}/users/token/verify/`,{
            method: 'POST',
            headers: {
                accept : 'application/json',
                'Content-Type': 'application/json',
            },
            body,
        })

        const data = await apiRes.json()

        return res.status(apiRes.status).json(data)
    }catch(e){
        return res.status(500).json({
            error : "Something went wrong while veryfying the user login status",
        })
    }


})

module.exports = router