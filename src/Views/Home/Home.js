import React, { useState } from 'react'
import './Home.scss'
import { Banner } from './Banner'
import { Main } from './Main'
import { Header } from '../../Components/Header'
import { Toaster } from '../../Components/Toaster'

export const Home = () => {
  const [show, setShow] = useState(false)
  return (
    <div className='home-container'>
      <Header />
      <div className='wrapper'>
        <section className='section parallax bg1'>
          <Banner />
        </section>
        <section className='section static'>
          <Main show={show} setShow={setShow} />
        </section>
      </div>
      <Toaster show={show} setShow={setShow} />
    </div>
  )
}
