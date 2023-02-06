/**
* InputNumber.js - 1401/11/17
*/

import React from "react"
import { InputLabel, FormControl, OutlinedInput, FormHelperText } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path"


const InputNumber = (props) => {
    const { name, label, onChange, ...rest } = props
    const { control, errors/*, values*/ } = useFormContext();

    //simple name : "title" 
    //path name : "items[1].title"
    let namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
    let error = objectPath.get(errors, namePath);
    let hasError = !!error;
    //let value = values ? objectPath.get(values, namePath) : null;

    const handleChange = (e) => {
        if (typeof (onChange) === "function") {
            onChange(e.target.value, e.currentTarget.innerText);
        }
    };

    return (<>
        <FormControl variant="outlined" style={{ width: "100%" }} size="small">
            <InputLabel error={hasError} >{label}</InputLabel>
            <Controller
                render={({ onChange, value, onBlur, name }) => (
                    <OutlinedInput
                        type="number"
                        label={label}
                        name={name}
                        value={value || ""}
                        onChange={(e) => { onChange(e); handleChange(e); }}

                        style={{ direction: "ltr" }}
                        error={hasError}
                        {...rest} />
                )}
                // as={
                //     <OutlinedInput
                //         type="number"
                //         label={label}
                //         multiline={Boolean(rows)}
                //         rows={rows || 0}
                //         error={hasError} />
                // }
                control={control}
                name={name}
                defaultValue={""}
            />
            <FormHelperText>
                {hasError && (error.message)}
            </FormHelperText>
        </FormControl>
    </>);

}

export default InputNumber;