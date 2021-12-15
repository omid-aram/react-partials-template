import React, { useState, useEffect } from "react"
import { getEnumSelectData, getLookupSelectData } from "../../services/common.service"
import { MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path"


const InputSelectChangeValue = (props) => {
 
    const {changeVal, enumType, lookupType, name, label, ...rest } = props
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const { control, errors, values } = useFormContext()
    
    useEffect(() => {
        setLoading(true)
        if (enumType) {
            getEnumSelectData(enumType).then(x => {
                setData(x.data);
            })
            setLoading(false)
        } else if (lookupType) {
            getLookupSelectData(lookupType).then(x => {
                setData(x.data);
            })
            setLoading(false)
        } else {
            alert("wrong usage of dropdown")
        }

    }, [enumType, lookupType]);

    //simple name : "title" 
    //path name : "items[1].title"
    let namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
    let error = objectPath.get(errors, namePath);
    let hasError = !!error;
     let value = values ? objectPath.get(values, namePath) : null;
     const handleChange = (e) => {
        
         
        changeVal(e.target.value);
      
        // setFolderName(event.target.value);
      };
    return (<>
        <FormControl variant="outlined" style={{ width: "100%" }} size="small">
            <InputLabel error={hasError}>{label}</InputLabel>
            <Controller
                render={({ onChange, value, onBlur, name }) => (
                    <Select  onChange={(e) => {
                        onChange(e)
                      handleChange(e)
                      }} label={label}  
                      value={value ? value : ""}
                      error={hasError}>
                        <MenuItem value={null}>
                            &nbsp;
                        </MenuItem>
                        {data.map(item =>
                            <MenuItem value={item.id} key={item.id}>{item.desc}</MenuItem>
                        )}
                    </Select>
                )}
                onChange={() => console.log("hellow")}
                name={name}
                control={control}
                 defaultValue={value}
                {...rest}
            />
            {loading && (
                <i className="fa fa-spin fa-spinner" style={{ position: "absolute", top: "20px", left: "30px" }}></i>
            )}
            <FormHelperText>
                {hasError && (error.message)}
            </FormHelperText>
        </FormControl>
    </>);

}
export default InputSelectChangeValue;