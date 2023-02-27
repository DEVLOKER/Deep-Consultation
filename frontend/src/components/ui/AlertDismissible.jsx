import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { alertStatus } from 'constant'


export const AlertDismissible = ({ type, title, content }) => {

    const [show, setShow] = useState(true)

    useEffect(()=>{
        setTimeout(() => {
            setShow(false)
        }, 4000)
    }, [])

    return (
        <Alert show={show} variant={alertStatus[type]} onClose={() => setShow(false)} dismissible>
            {
                title && (
                    <>
                        <Alert.Heading>
                            <Alert.Link href="#">{title || `Message`}</Alert.Link> 
                        </Alert.Heading>
                        <hr />
                    </>
                )
            }
            <div>
                { 
                typeof content === "object"?
                    <ul>
                        {
                            Object.keys(content).map((key, i) => 
                                <li key={i}>
                                    {content[key]}
                                </li>
                            )
                        }
                    </ul>
                :content 
                }
            </div>
        </Alert>
    )
}
