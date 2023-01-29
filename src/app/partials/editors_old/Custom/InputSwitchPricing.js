import React, { useState } from "react"
import { FormControl, FormHelperText, FormControlLabel } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path"
import { Switch } from "@material-ui/core";


const InputSwitchPricing = (props) => {
    const { name, def, label, ...rest } = props
    const { control, errors, setValue } = useFormContext();
    const [defaultVal, setDefaultVal] = useState({...props.def /*!= true ? false : true*/});
    // setDefaultVal(def);
    //simple name : "title" 
    //path name : "items[1].title"


    React.useEffect(() => {
        setDefaultVal(props.def  /*!= true ? false : true*/);
    }, [props.def])
  

    let namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
    let error = objectPath.get(errors, namePath);
    let hasError = !!error;


    const handleChange = (event) => {

        //redux
        setDefaultVal(event.target.checked)
        setValue(namePath, event.target.checked);
    };

    return (<>
        <FormControl variant="outlined" style={{ width: "100%" }} size="small">
            <Controller
                as={
                    <FormControlLabel
                        control={
                            <Switch checked={defaultVal} onChange={handleChange} name={name} />
                        }
                        label={label}
                    />
                }
                control={control}
                name={name}
                defaultValue={false}
                {...rest}
            />
            <FormHelperText>
                {hasError && (error.message)}
            </FormHelperText>
        </FormControl>
    </>);


}

export default InputSwitchPricing;