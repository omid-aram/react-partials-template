import React, { useState, useEffect } from "react"
import { InputLabel, FormControl, OutlinedInput, FormHelperText } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path";
import NumberFormat from "react-number-format";




const InputDate = (props) => {
  const { name, label, time, size, ...rest } = props
  const { control, errors } = useFormContext();


  //simple name : "title" 
  //path name : "items[1].title"
  let namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
  let error = objectPath.get(errors, namePath);
  let hasError = !!error;
  let value = values ? objectPath.get(values, namePath) : null;


  const handleChange = (event) => {
    console.log(event)

    return event[0].target.value;
  }

  return (<>

    <FormControl variant="outlined" style={{ width: "100%" }} size={size || "small"}>
      <InputLabel error={hasError} >{label}</InputLabel>
      <Controller
        as={
          <OutlinedInput
            type="text" label={label} error={hasError}
            style={{ direction: "ltr" }}
            //inputProps={ {value : value }}
            inputComponent={NumberCustom}
          />
        }
        control={control}
        name={name}
        //defaultValue={value}
        //onChange={handleChange}
        {...rest}

      />
      <FormHelperText>
        {hasError && (error.message)}
      </FormHelperText>
    </FormControl>
  </>);

}


function NumberCustom(props) {
  const { inputRef, onChange, value, ...other } = props;

  //just for init value
  const [initValue, setInitValue] = useState();
  useEffect(() => {
    setInitValue(value);
  }, [])
  console.log('val', value);

  return (
    <NumberFormat
      value={initValue}
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        setInitValue(values.value)
        onChange(values.value);
      }}
      thousandSeparator
    />
  );
}

export default InputDate;