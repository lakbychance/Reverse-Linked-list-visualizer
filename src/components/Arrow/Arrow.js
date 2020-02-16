import React from 'react'
import './Arrow.css'
export const Arrow=(props)=>{
    const {direction} = props
    const arrowRect = <div className={direction}></div>
    return (
        <div className="arrowContainer">
            {direction==="right"?<><hr/>{arrowRect}</>:<>{arrowRect}<hr/></>}
        </div>
    )
}