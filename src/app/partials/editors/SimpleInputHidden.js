import React from "react"
import { Controller } from "react-hook-form"

const SimpleInputHidden = (props) => {
    const { name, value } = props
    
    return (<>
    
        <Controller
            as={
                <input type="hidden" />
            }
           
            name={name}
            //value={value}
            defaultValue={value || null}
        />
    </>);

}

export default SimpleInputHidden;