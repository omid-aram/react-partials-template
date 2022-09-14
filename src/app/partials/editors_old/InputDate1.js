import React, { useEffect, useState } from "react"
import { InputLabel, FormControl, OutlinedInput, FormHelperText } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path";
import DatePicker from "react-datepicker2";
import moment from "moment-jalaali"
import { setDate } from "date-fns";
import { useDispatch } from "react-redux";
import { customActions } from "../../store/ducks/custom.duck";

const InputDate1 = (props) => {
    const { name, label, time, onChange, ...rest } = props
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
    //     props.onChange(event);
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
                        id={name}

                    />
                }
                control={control}
                name={name}
                //defaultValue={''}                
                {...rest}

            />
            <FormHelperText>
                {hasError && (error.message)}
            </FormHelperText>
        </FormControl>
    </>);

}


function DatePickerCustom(props) {
    const { inputRef, onChange, showTime, value, onConfirm, ...rest } = props;
    const [date, setDate] = useState()
    //just for init value
    const dispatch = useDispatch();
    const [initValue, setInitValue] = useState();
    useEffect(() => {
        setInitValue(value ? moment(value) : null);
    }, [])
    console.log(initValue)
    return (
        <DatePicker
            value={initValue}
            timePicker={showTime}
            isGregorian={false}
            ref={r => inputRef(r != null ? r.input : null)}
            onChange={(val) => {
                if (!val) {
                    return;
                }
                let jVal = val.format('jYYYY/jM/jD');
                let gVal = val.format('YYYY/MM/DD HH:mm:ss');
                let gVal1 = val.format('jYYYYjMMjDD');
                setDate(val.format('YYYY/MM/DD HH:mm:ss'))
                console.log("gVal", val.format('jYYYYjMMjDD'))

                if (props.name == "froM_DATE")
                    dispatch(customActions.setFromDate(gVal1))
                else if (props.name == "tO_DATE")
                    dispatch(customActions.setToDate(gVal1))

                console.log('name', props.name);
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

export default InputDate1;