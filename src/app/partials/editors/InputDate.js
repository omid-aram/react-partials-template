/**
* InputDate.js - 1402/02/04
*/

import React from "react"
import { InputLabel, FormControl, OutlinedInput, FormHelperText } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path";
import DatePicker from "react-datepicker2";
import moment from "moment-jalaali"

const InputDate = (props) => {
    const { name, label, time, onChange, style, readOnly, inputProps, ...rest } = props
    const { control, errors } = useFormContext();


    let namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
    let error = objectPath.get(errors, namePath);
    let hasError = !!error;

    return (<>
        <FormControl variant="outlined" style={{ width: "100%" }} size="small">
            <InputLabel error={hasError} >{label}</InputLabel>
            <Controller
                render={({ onChange, value, onBlur, name }) => (
                    <OutlinedInput
                        type="text"
                        label={label}
                        name={name}
                        value={value ? (!readOnly ? value : moment(value).format('jYYYY/jM/jD')) : ""}
                        onChange={(gVal/*, jVal*/) => { onChange(gVal/*, jVal*/); }}

                        error={hasError}
                        style={{ direction: "ltr", ...style }}
                        inputProps={{ showTime: !readOnly ? (time === true) : undefined, readOnly: readOnly ? true : null, ...inputProps }}
                        inputComponent={!readOnly ? DatePickerCustom : undefined}
                        {...rest} />
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

}


function DatePickerCustom(props) {
    const { inputRef, onChange, showTime, value } = props;

    //just for init value
    // const [initValue, setInitValue] = useState();
    // useEffect(() => {
    //     setInitValue(value ? moment(value, 'YYYY/M/D HH:mm:ss') : null);
    // }, [value])

    return (
        <DatePicker
            //value={initValue}
            value={value ? moment(value, 'YYYY/M/D HH:mm:ss') : null}
            timePicker={showTime}
            isGregorian={false}
            setTodayOnBlur={false}
            ref={r => inputRef(r != null ? r.input : null)}
            onChange={(val) => {
                //if (!val) { return; }
                const gVal = val ? val.format('YYYY/M/D HH:mm:ss') : '';
                //const jVal = val ? val.format('jYYYY/jM/jD') : '';

                onChange(gVal/*, jVal*/);
            }}
        />

    );
}

export default InputDate;