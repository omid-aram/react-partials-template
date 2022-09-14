import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path";


const CustomInputHidden = (props) => {
    const { name } = props
    const { control } = useFormContext();

    return (<>
        <Controller
            as={
                <input type="hidden" />
            }
            control={control}
            name={name}
        />
    </>);

}

export default CustomInputHidden;