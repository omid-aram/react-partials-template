import React, { useState, useEffect } from "react"
import { getEnumSelectData, getLookupSelectData, getSelectDataWithId, getSelectDataWithUrl } from "../../services/common.service"
import { MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path"


const InputSelect = (props) => {
    //type : 1 ==> enumType
    //type : 2 ==> lookupType
    //type : 3 ==> getData From url
    //type : 4 ==> getData From url with Id
    const { type, enumType, controller, action, id, lookupType, name, label, ...rest } = props
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const { control, errors, values } = useFormContext()
    useEffect(() => {
        setLoading(true)
        if (type == "1") {
            getEnumSelectData(enumType).then(x => {
                setData(x.data);
            })
            setLoading(false)
        } else if (type == "2") {
            getLookupSelectData(lookupType).then(x => {
                setData(x.data);
            })
            setLoading(false)
        }
        else if (type == "4") {
            getSelectDataWithId("/" + controller + "/" + action, id).then(x => {
                setData(x.data);
            })
            setLoading(false)
        }
        else if (controller && action) {
            getSelectDataWithUrl("/" + controller + "/" + action).then(x => {
                setData(x.data);
            })
            setLoading(false)
        }
        else {
            alert("wrong usage of dropdown")
            setLoading(false)
        }

    }, [enumType, lookupType]);

    //simple name : "title" 
    //path name : "items[1].title"
    let namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
    let error = objectPath.get(errors, namePath);
    let hasError = !!error;
    //debugger;
    //let value = values ? objectPath.get(values, namePath) : null;

    return (<>
        <FormControl variant="outlined" style={{ width: "100%" }} size="small">
            <InputLabel error={hasError}>{label}</InputLabel>
            <Controller
                as={
                    <Select label={label} size="small" error={hasError}>
                        <MenuItem value={null}>
                            &nbsp;
                        </MenuItem>
                        {data.map(item =>
                            <MenuItem value={item.id} key={item.id}>{item.desc}</MenuItem>
                        )}
                    </Select>
                }
                name={name}
                control={control}
                //defaultValue={value}
                {...rest}
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