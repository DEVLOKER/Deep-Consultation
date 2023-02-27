import React from 'react'
import Container from 'react-bootstrap/Container'
import { ServiceCard } from 'components/services/ServiceCard'

import { services } from 'data/Services'
import styled from 'styled-components'
import { Title } from 'components/ui/Title'

export const ServicesList = () => {

    return (
        <div id="services" >
            <Title text="Services" />
            <ServicesContainer>
                {
                    services.map((service, index)=>
                        <ServiceCard key={index} image={service.image} title={service.title} detail={service.detail} />
                    )
                }
            </ServicesContainer>
        </div>
    )
}



const ServicesContainer = styled(Container)`
    & {
        display: flex;
        justify-content: space-evenly;
        align-items: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
    }
`
