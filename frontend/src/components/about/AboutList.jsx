import { AboutCard } from 'components/about/AboutCard'
import { Title } from 'components/ui/Title'
import { abouts } from 'data/Abouts'
import React from 'react'

export const AboutList = () => {
    return (
        <div id="about" >
            <Title text="A propos" />
            {
                abouts.map((about, index)=>
                    <AboutCard key={index} image={about.image} title={about.title} detail={about.detail} index={index} />
                )
            }
        </div>
    )
}
