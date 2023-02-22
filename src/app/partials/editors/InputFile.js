/**
* InputText.js - 1401/12/03
*/

import React, { useState, forwardRef, useImperativeHandle } from "react"
import { InputLabel, FormControl, OutlinedInput, FormHelperText, InputAdornment, IconButton, makeStyles } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path";
import { useRef } from "react";
import DeleteIcon from '@material-ui/icons/Delete';

//برای اینکه بعضی جاها لازم دارم از بیرون خالی کردن فایل رو صدا  بزنم از این روش استفاده شده
//forwardRef https://stackoverflow.com/questions/37949981/call-child-method-from-parent
const InputFile = forwardRef((props, ref) => {
    const { name, label, onChange, style, readOnly, inputProps, ...rest } = props
    const { control, errors, setValue } = useFormContext();

    let namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
    let error = objectPath.get(errors, namePath);
    let hasError = !!error;

    const classes = useStyle();
    const inputFile = useRef(null)

    const [file, setFile] = useState();
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const handleChange = (e) => {
        if (typeof (onChange) === "function") {
            onChange(e.target.files[0], e.currentTarget.innerText);
        }
    };

    const clickHandler = () => {
        inputFile.current.click();
    }

    const removeHandler = (e) => {
        e.stopPropagation();
        setFile(null);
        setValue(name, null);
    }

    useImperativeHandle(ref, () => ({
        clear() {
            removeHandler();
        }
    }));

    return (<>
        <FormControl variant="outlined" style={{ width: "100%" }} size="small">
            <InputLabel error={hasError} >{label}</InputLabel>
            <Controller
                render={({ onChange, value, onBlur, name }) => (
                    <>
                        <OutlinedInput
                            type="text"
                            label={label}
                            name={name}
                            value={(isInitialLoad ? value : (file ? file.name : "")) || "برای انتخاب فایل کلیک کنید"}
                            readOnly={true}
                            onClick={clickHandler}

                            className={classes.fileName}
                            style={{ ...style }}
                            inputProps={{ ...inputProps }}
                            error={hasError}
                            {...rest}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        style={{ display: (isInitialLoad || file) ? "" : "none" }}
                                        color="primary"
                                        aria-label="انتخاب"
                                        onClick={(e) => removeHandler(e)}
                                        edge="end"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />

                        <input
                            type="file"
                            ref={inputFile}
                            style={{ display: "none" }}
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setIsInitialLoad(false);
                                    setFile(e.target.files[0]);
                                    setValue(name, e.target.files[0])
                                }
                                handleChange(e);
                            }} />
                    </>
                )}
                control={control}
                name={name}
                defaultValue={""}
            />
            <FormHelperText>
                {hasError && (error.message)}
            </FormHelperText>
        </FormControl>
    </>);

})

const useStyle = makeStyles({
    fileName: {
        "& input": {
            cursor: "pointer",
        }
    }
})

export default InputFile;