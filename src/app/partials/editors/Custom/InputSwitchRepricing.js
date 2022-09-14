import React, { useState , useEffect} from "react"
import {FormControl, FormHelperText, FormControlLabel } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path"
import { Switch } from "@material-ui/core";
import { passIdsActions } from "../../../store/ducks/passIds.duck";
import { useDispatch } from 'react-redux';


const InputSwitchRepricing = (props) => {
    const { name, label, ...rest } = props
    const { control, errors, setValue } = useFormContext();

    //simple name : "title" 
    //path name : "items[1].title"
    let namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
    let error = objectPath.get(errors, namePath);
    let hasError = !!error;

    const dispatch = useDispatch();

    const handleChange = (event) => {
        
//redux
        dispatch(passIdsActions.fetchAdjChk(event.target.checked));
        setValue(namePath, event.target.checked);
    };


    return (<>
        <FormControl variant="outlined" style={{ width: "100%" }} size="small">
            <Controller
                as={
                    <FormControlLabel
                        control={
                            <Switch onChange={handleChange} name={name} />
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

export default InputSwitchRepricing;