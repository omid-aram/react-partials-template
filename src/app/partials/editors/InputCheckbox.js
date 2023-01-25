import React from "react"
import { /*InputLabel, FormControl,*/ FormHelperText, FormControlLabel, Checkbox } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path"
//import { Switch } from "@material-ui/core";


const InputCheckbox = (props) => {
    const { name, label, ...rest } = props
    const { control, errors, values } = useFormContext();

    //simple name : "title" 
    //path name : "items[1].title"
    let namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
    let error = objectPath.get(errors, namePath);
    let hasError = !!error;
    let value = values ? objectPath.get(values, namePath) : false;
    return (<>
        <Controller
            render={({ onChange, value}) => (
                <FormControlLabel
                    control={
                        <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} />
                    }
                    label={label}
                />
            )}
            control={control}
            name={name}
            defaultValue={value}
            {...rest}
        />
        <FormHelperText>
            {hasError && (error.message)}
        </FormHelperText>
    </>);

}

export default InputCheckbox;