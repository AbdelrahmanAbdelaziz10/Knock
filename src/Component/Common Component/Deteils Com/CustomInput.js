import React from 'react'

import { SlCalender } from "react-icons/sl";
function CustomInput({value,onClick}){
    return(
        <div className="input-group">
            <input type="text" className="form-control date_input" value={value} onClick={onClick} readOnly />
            <div className="input-group-append">
                <span className="input-group-text">
                    <SlCalender className='calender_icon'/>
                </span>
            </div>
        </div>
    )
}

export default CustomInput