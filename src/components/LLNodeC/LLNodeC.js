import './LLNodeC.css'
import React from 'react'
export const LLNodeC=(props)=>{
    const {
        pointedBy,
        value
    } = props
    return (
        <div className={`llNode ${pointedBy}`}>
            <span>{value}</span>
        </div>
    )
}