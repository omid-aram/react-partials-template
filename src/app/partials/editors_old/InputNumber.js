import React from "react"
import { InputLabel, FormControl, OutlinedInput, FormHelperText } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path"


const InputNumber = (props) => {
    const { name, label, rows, ...rest } = props
    const { control, errors, values } = useFormContext();

    //simple name : "title" 
    //path name : "items[1].title"
    let namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
    let error = objectPath.get(errors, namePath);
    let hasError = !!error;
    //let value = values ? objectPath.get(values, namePath) : null;

    return (<>
        <FormControl variant="outlined" style={{ width: "100%" }} size="small">
            <InputLabel error={hasError} >{label}</InputLabel>
            <Controller
                as={
                    <OutlinedInput
                        type="number"
                        label={label}
                        multiline={Boolean(rows)}
                        rows={rows || 0}
                        error={hasError} />
                }
                control={control}
                name={name}
                //defaultValue={value || ''}
                {...rest}
            />
            <FormHelperText>
                {hasError && (error.message)}
            </FormHelperText>
        </FormControl>
    </>);

}

export default InputNumber;