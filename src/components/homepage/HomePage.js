import React from 'react'
import Hero from './components/Hero';
import Layout from '../Layout';
const HomePage = () => {
  return (
    <div> 
        <Layout title="Auth Site | Home" content="Home page"/>
        <Hero />
    </div>
  )
}

export default HomePage
