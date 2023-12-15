const express = require('express');
const fetch = (...args) => import("node-fetch").then(({default:fetch}) => fetch(...args))


const router = express.Router()

router.get('/api/users/me', async(req, res) =>{
    const {access} = req.cookies

    try{
        const apiRes = await fetch(`${process.env.API_URL}/users/me`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            }
        })

        const data = await apiRes.json()

        return res.status(apiRes.status).json(data)
    }catch(e){
        return res.status(500).json({
            error : "Something went wrong while retriving the user"
        })
    }


})

module.exports = router