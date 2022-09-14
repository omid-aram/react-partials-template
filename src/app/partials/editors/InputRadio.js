import React from "react"
import { FormHelperText, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core"
import objectPath from "object-path";
import { Controller, useFormContext } from "react-hook-form"

const RadioMapper = (props) => {
    return (
        props.items.map((item, i) =>
            (<FormControlLabel
                key={i}
                place={item.place}
                value={item.value}
                control={<Radio />}
                label={item.label} />)
        )
    )
}

const InputRadio = (props) => {
    const { name = "", label, items, ...rest } = props
    const { control, errors, values } = useFormContext();

    let namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
    let error = objectPath.get(errors, namePath);
    let hasError = !!error;
    let value = values ? objectPath.get(values, namePath) : '';

    // console.log("inputradio",props);
    return (<>

        <FormControl error={hasError} component="fieldset" variant="outlined" style={{ width: "100%" }} size="small">
            <FormLabel error={hasError} component="legend">{label}</FormLabel>
            <Controller
                as={
                    <RadioGroup value={value} defaultValue={value} row aria-label={name} name={name}>
                        <RadioMapper items={items} value={value} />
                    </RadioGroup>
                }
                control={control}
                name={name}
                defaultValue={value || ''}
                {...rest}
            />
            <FormHelperText>
                {hasError && (error.message)}
            </FormHelperText>
        </FormControl>
    </>)
}

export default InputRadio;