import React from 'react';
import "./Hero.css";

const Hero = () => {
  return (
    <div className='header flex flex-col' id = "header">

        <div className='container flex'>
            <div className='header-content'>
                <h2 className='text-uppercase text-white op-07 fw-6 ls-2'>scocial media, branding, design</h2>
                <h1 className='text-white fw-6 header-title'>LOGO <span className='text-brown'>is a complete community building</span> soultion for, YOU</h1>
                <div className='btn-groups flex'>
                  <button type = "button" className='btn-item bg-brown fw-4 ls-2'>Know More</button>
                  <button type = "button" className='btn-item bg-dark fw-4 ls-2'>Contact Us</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero