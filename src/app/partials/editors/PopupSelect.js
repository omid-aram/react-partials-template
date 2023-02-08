/**
* PopupSelect.js - 1401/11/19
*/

import React, { useState, useEffect } from "react"
import { OutlinedInput, InputLabel, InputAdornment, IconButton, Icon, FormControl, FormHelperText } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path"
import baseService from "../../services/base.service"
//import baseService2 from "../../services/base.service2"


const PopupSelect = (props) => {
    const { name, label, apiUrl, apiFilter, valueField, textField, onChange, style, readOnly, inputProps, ...rest } = props

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const { control, errors, getValues } = useFormContext();

    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [displayText, setDisplayText] = useState();

    const namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
    const error = objectPath.get(errors, namePath);
    const hasError = !!error;

    useEffect(() => {
        let isMounted = true;

        const val = getValues(namePath);
        //const item = data.length > 0 ? data.find(x => (x[valueField || 'id'] || '').toString() === val.toString()) : null;

        if (!val) {
            setLoading(true);

            const payload = JSON.parse(apiFilter || "{}");
            payload[valueField || "id"] = val;

            baseService.post(apiUrl, payload)
                .then(res => {
                    if (!isMounted) return;

                    setData(res.data);
                })
                .catch()
                .finally(() => isMounted && setLoading(false));
        }

        const cleanUp = () => {
            isMounted = false;
        };

        return cleanUp;

    }, [apiUrl, apiFilter, valueField, getValues, namePath]);

    const handleChange = (e) => {
        if (typeof (onChange) === "function") {
            onChange(e.target.value);
        }
    };    

    const fillDisplayText = (val) => {
        //debugger;
        let result = "";

        if (val === undefined || val === null) return result;

        const item = data.length > 0 ? data.find(x => (x[valueField || 'id'] || '').toString() === val.toString()) : null;

        if (item) {
            const words = textField ? textField.split(' ') : [];
            for (let i = 0; i < words.length; i++) {
                let word = words[i];

                if (word[0] === '@') {
                    const indexOfSecondSign = word.indexOf('@', 1);//میتونه @ انتهایی هم داشته باشه. برای حالتی که نمیخوایم فاصله داشته باشیم بعدش
                    word = item[word.substring(1, indexOfSecondSign < 0 ? undefined : indexOfSecondSign)] + (indexOfSecondSign < 0 ? "" : word.substring(indexOfSecondSign + 1));
                } else if (words.length === 1) {
                    //میخوام اگه فقط یک فیلد منظورش باشه لازم نباشه حتما @ بذاره
                    word = item[word];
                }
                result += word + ' ';
            }
        }

        return result.trim();
    }

    const search = (text) => {

    }
    
    return (<>
        <FormControl variant="outlined" style={{ width: "100%" }} size="small">
            <InputLabel error={hasError} >{label}</InputLabel>
            <Controller
                render={({ onChange, value, onBlur, name }) => (
                    <>
                        <input type="hidden" name={name} value={value || ""} onChange={(e) => { onChange(e); fillDisplayText(e.target.value); }} />
                        <OutlinedInput
                            type="text"
                            label={label}
                            //name={`${name}_InnerText`}
                            value={(isInitialLoad ? fillDisplayText(value) : displayText) || ""}
                            onChange={(e) => { setIsInitialLoad(false); setDisplayText(e.target.value); }}

                            style={{ ...style }}
                            inputProps={{ readOnly: readOnly ? "true" : null, ...inputProps }}
                            error={hasError}
                            //onInput={(e) => { }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        color="primary"
                                        aria-label="انتخاب"
                                        onClick={() => { alert("sadsadfa") }}
                                        edge="end"
                                    >
                                        <Icon className="fa fa-search" />
                                    </IconButton>
                                </InputAdornment>
                            }
                            {...rest} />
                    </>
                )}
                control={control}
                name={name}
                defaultValue={""}
            />
            {loading && (
                <i className="fa fa-spin fa-spinner" style={{ position: "absolute", top: "12px", left: "30px" }}></i>
            )}
            <FormHelperText>
                {hasError && (error.message)}
            </FormHelperText>
        </FormControl>
    </>);
}

export default PopupSelect;