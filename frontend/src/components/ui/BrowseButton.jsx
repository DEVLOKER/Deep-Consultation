import { RoundIcon } from 'components/ui/RoundIcon'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'

// accept='application/*, image/*' 
export const BrowseButton = forwardRef(({handleBrowse}, ref) => {

    const fileUploader = useRef()

    useImperativeHandle(ref, () => ({
        getFiles() {
            return fileUploader.current.files
        },
    }))

    return (
        <>
            <RoundIcon className="plus" action={()=> fileUploader.current.click() } />
            <input  type="file" ref={fileUploader} onChange={handleBrowse} 
                    style={{display: "none"}} multiple 
            />
        </>
    )
})
