/**
* InputSelect.js - 1402/01/26
*/

import React, { useState, useEffect } from "react"
import { getEnumSelectData, getLookupSelectData } from "../../services/common.service"
import { MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@material-ui/core"
import { Radio, RadioGroup, FormControlLabel, FormLabel } from '@material-ui/core';
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path"
import baseService from "../../services/base.service"
//import baseService2 from "../../services/base.service2"


const InputSelect = (props) => {
    const {
        type, /* select or radio */
        items, enumType, lookupType, apiUrl, /* one of this */
        apiFilter, valueField, textField, readOnly,
        name, label, placeholder, onChange, ...rest } = props;

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const { control, errors/*, values*/ } = useFormContext();

    const namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
    const error = objectPath.get(errors, namePath);
    const hasError = !!error;

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        const createItem = (item) => {
            const val = item[valueField || 'id'];
            let text = textField ? "" : item['desc'];

            if (textField) {
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
                    text += word + ' ';
                }
            }

            return {
                id: val,
                desc: (text || "").trim()
            }
        }

        if (items) {
            setData(items.map(r => createItem(r)));
            setLoading(false);
        } else if (enumType) {
            getEnumSelectData(enumType).then(x => {
                if (!isMounted) return;

                setData(x.data.map(r => createItem(r)));
            })
                .finally(() => isMounted && setLoading(false));
        } else if (lookupType) {
            getLookupSelectData(lookupType).then(x => {
                if (!isMounted) return;

                setData(x.data.map(r => createItem(r)));
            })
                .finally(() => isMounted && setLoading(false));
        } else if (apiUrl) {
            baseService.post(apiUrl, JSON.parse(apiFilter || "{}"))
                .then(res => {
                    if (!isMounted) return;

                    setData(res.data.map(r => createItem(r)));
                })
                .catch()
                .finally(() => isMounted && setLoading(false));
        } else {
            setData([]);
            setLoading(false);
            console.error(`${name}: صحیح تعریف نشده است`);
        }

        const cleanUp = () => {
            isMounted = false;
        };

        return cleanUp;

    }, [items, enumType, lookupType, apiUrl, apiFilter, textField, valueField, name]);

    const handleChange = (e) => {
        if (typeof (onChange) === "function") {
            onChange(e.target.value, e.currentTarget.innerText);
        }
    };

    const radioStyle = {
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "4px",
        margin: "-3px 0 6px 0",
        borderColor: "rgba(0, 0, 0, 0.23)",
    };

    const radioLegendStyle = {
        marginRight: "6px",
        fontSize: "0.75em",
        width: "auto",
        padding: "0 5px",
    }

    return (<>
        <FormControl variant="outlined" style={{ width: "100%", ...(type === "radio" ? radioStyle : {}) }} size="small" component={type === "radio" ? "fieldset" : undefined}>
            {(!type || type === "select") &&
                <InputLabel error={hasError}>{label}</InputLabel>
            }
            {type === "radio" &&
                <FormLabel component="legend" style={radioLegendStyle}>{label}</FormLabel>
            }
            <Controller
                render={({ onChange, value, onBlur, name }) => (
                    <>
                        {(!type || type === "select") &&
                            <Select
                                onChange={(e) => { onChange(e); handleChange(e); }}
                                label={label}
                                size="small"
                                //defaultValue={value}
                                name={name}
                                value={value && data && data.some(x => x.id.toString() === value.toString()) ? (value || '') : ''}
                                {...rest}
                            >

                                {!readOnly &&
                                    (placeholder ?
                                        <MenuItem value="" disabled>
                                            {placeholder}
                                        </MenuItem>
                                        :
                                        <MenuItem value="" style={{ height: '5px' }}>
                                            &nbsp;
                                        </MenuItem>
                                    )
                                }

                                {data && data.map(item =>
                                    (!readOnly || (value !== null && value !== undefined && item.id.toString() === value.toString())) &&
                                    (<MenuItem value={item.id || ''} key={item.id}>{item.desc}</MenuItem>)
                                )}
                            </Select>
                        }
                        {type === "radio" &&
                            <RadioGroup
                                onChange={(e) => { onChange(e); handleChange(e); }}
                                label={label}
                                name={name}
                                value={value && data && data.some(x => x.id.toString() === value.toString()) ? (value.toString() || '') : ''}
                                {...rest}
                            >
                                {data && data.map(item =>
                                    //(!readOnly || (!value) || (item.id.toString() === value.toString())) &&
                                    (<FormControlLabel
                                        value={item.id.toString() || ''}
                                        key={item.id}
                                        control={<Radio color="primary" value={item.id.toString() || ''} style={{ padding: "3px" }} disabled={(readOnly && (value === null || value === undefined || item.id.toString() !== value.toString()))} />}
                                        label={item.desc}
                                        style={{ marginRight: "6px", marginLeft: "6px" }}
                                    />)
                                )}
                            </RadioGroup>
                        }
                    </>
                )}

                // as={
                //     <Select label={label} size="small" error={hasError}>
                //         <MenuItem value={null}>
                //             &nbsp;
                //         </MenuItem>
                //         {data.map(item =>
                //             <MenuItem value={item.id || ''} key={item.id}>{item.desc}</MenuItem>
                //             //<MenuItem value={item.id || ''}   defaultValue={item.id} key={item.id}>{item.desc}</MenuItem>
                //         )}
                //     </Select>
                // }
                name={name}
                control={control}
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

export default InputSelect;