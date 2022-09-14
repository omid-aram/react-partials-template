import React, { useEffect, useState } from "react"
import { InputLabel, FormControl, OutlinedInput, FormHelperText } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path";
import DatePicker from "react-datepicker2";
import moment from "moment-jalaali"
import { toPersianDateTime } from "../../utils/helper";



const InputDate = (props) => {
    const { name, label, time,...rest } = props
    const { control, errors } = useFormContext();


    //simple name : "title" 
    //path name : "items[1].title"
    let namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
    let error = objectPath.get(errors, namePath);
    let hasError = !!error;
    //let value = values ? objectPath.get(values, namePath) : null;
    //let persianValue = value ? moment(value) : null;


    // const handleInnerChange = (event) => {
    //     console.log(event)
    //     return event[0].target.value.gVal;
    // }

    return (<>

        <FormControl variant="outlined" style={{ width: "100%" }} size="small">
            <InputLabel error={hasError} >{label}</InputLabel>
            <Controller
                // render={({ onChange, value }) => (
                //     <OutlinedInput
                //         type="text" label={label} error={hasError}
                //         style={{ direction: "ltr" }}
                //         inputProps={{ showTime: (time == true), onValueChange: onChange }}
                //         inputComponent={DatePickerCustom}
                //     />)}
                as={
                    <OutlinedInput
                        type="text" label={label} error={hasError}
                        style={{ direction: "ltr" }}
                        inputProps={{ showTime: (time == true) }}
                        inputComponent={DatePickerCustom}
                    />
                }
                control={control}
                name={name}
                defaultValue={''}
                //onChange={handleInnerChange}
                {...rest}

            />
            <FormHelperText>
                {hasError && (error.message)}
            </FormHelperText>
        </FormControl>
    </>);

}


function DatePickerCustom(props) {
    const { inputRef, onChange, showTime, value } = props;

    //just for init value
    const [initValue, setInitValue] = useState();
    useEffect(() =>{
        setInitValue(value ? moment(value) : null);
    },[value])
   
    return (
        <DatePicker
            value={initValue}
            timePicker={showTime}
            isGregorian={false}
            ref={r => inputRef(r != null ? r.input : null)}
            onChange={(val) => {
                if(!val){
                    return;
                }
                let jVal = val.format('jYYYY/jM/jD');
                let gVal = val.format('YYYY/M/D HH:mm:ss');
                
                onChange(gVal);
                //older version
                // onChange({
                //     target: {
                //         name: "main input", // no matter only one here
                //         value: { jVal, gVal },
                //     },
                // });
            }}
        />

    );
}

export default InputDate;