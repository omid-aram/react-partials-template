import React, { useState, useEffect } from "react"
import { FormControl, FormHelperText, FormControlLabel } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path"
import { Switch } from "@material-ui/core";
import { passIdsActions } from "../../../store/ducks/passIds.duck";
import { useDispatch } from 'react-redux';


const InputSwitchPrice = (props) => {
    const { name, checked, label, ...rest } = props
    const { control, errors, setValue } = useFormContext();
    const [isChecked, setIsChecked] = useState(checked);
    //simple name : "title" 
    //path name : "items[1].title"
    let namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
    let error = objectPath.get(errors, namePath);
    let hasError = !!error;

    const dispatch = useDispatch();
    setValue(namePath, isChecked);
    dispatch(passIdsActions.fetchCertificateNo(isChecked));

    const handleChange = (event) => {     
        //redux
        setIsChecked(event.target.checked)
        dispatch(passIdsActions.fetchCertificateNo(event.target.checked));
        setValue(namePath, event.target.checked);
    };



    return (<>
        <FormControl variant="outlined" style={{ width: "100%" }} size="small">
            <Controller
                as={
                    <FormControlLabel
                        control={
                            <Switch checked={isChecked} onChange={handleChange} name={name} />
                        }
                        label={label}
                    />
                }
                control={control}
                name={name}
                {...rest}
            />
            <FormHelperText>
                {hasError && (error.message)}
            </FormHelperText>
        </FormControl>
    </>);


}

export default InputSwitchPrice;