const express = require('express')
const fetch = (...args) => import("node-fetch").then(({default:fetch}) => fetch(...args))

const router = express.Router()

router.post('/api/users/register',async(req,res) => {
    console.log(req.body)
    const {first_name,last_name,email,password} = req.body


    try{
        const registerRes = await fetch(`${process.env.API_URL}/users/register`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                password
            })
        })

        const data = await registerRes.json()

        return res.status(registerRes.status).json(data)
    }catch(err){
        return res.status(500).json({
            error : "Something went wrong while registering"
        })
    }
})



module.exports = router