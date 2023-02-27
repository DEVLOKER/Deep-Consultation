
import React from 'react'
import { FixedHeader } from 'components/header/FixedHeader'
import { HomeBackground } from 'components/background/HomeBackground'
import { ServicesList } from 'components/services/ServicesList'
import { AboutList } from 'components/about/AboutList'
import { Contact } from 'components/form/Contact'
import { Footer } from 'components/footer/Footer'


export const Home = () => {

    return (
        <>
            <FixedHeader />
            <HomeBackground />
            <ServicesList />
            <AboutList />
            <Contact />
            <Footer />
        </>
    )
}
