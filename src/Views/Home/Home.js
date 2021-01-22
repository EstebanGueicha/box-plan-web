import React from 'react'
import { Banner } from './Banner'
import { Main } from './Main'
import { Header } from '../../Components/Header'
import './Home.scss'

export const Home = () => {
  return (
    <div className='home-container'>
      <Header />
      <div className='wrapper'>
        <section className='section parallax bg1'>
          <Banner />
        </section>
        <section className='section static'>
          <Main />
        </section>
      </div>
    </div>
  )
}
