import React, { useState, useEffect } from "react"
//import { getEnumSelectData, getLookupSelectData } from "../../services/common.service"
import { MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path"
import baseService from "../../services/base.service"


const InputSelectApiChangeValue = (props) => {

  const { changeVal, txnCodes, readUrl, defultValues, param, valueField, textField, options, name, label, placeholder, ...rest } = props
  const [data, setData] = useState(options)
  const [loading, setLoading] = useState(false);
  const { control, errors/*, values*/ } = useFormContext()
  const noChache = true;// they dont like cache

  const handleChange = (e) => {
    changeVal(e.target.value, e.currentTarget.innerText);
  };

  //simple name : "title" 
  //path name : "items[1].title"
  let namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
  let error = objectPath.get(errors, namePath);
  let hasError = !!error;
  //let firstValue = values ? objectPath.get(values, namePath) : null;


  useEffect(() => {
    setLoading(true);

    if (!options) { // not local


      let cacheKey = readUrl + JSON.stringify(param)
      let dataFromCache = getStorage(cacheKey);
      if (dataFromCache && !noChache) {
        setData(dataFromCache);

      } else {

        setLoading(true);
        baseService.post(readUrl, { txnCodes: txnCodes }).then(x => {
          setData(x.data);
          setLoading(false);
          setStorage(cacheKey, x);

        })
      }
    }
  }, [param]);

  return (<>
    <FormControl variant="outlined" style={{ width: "100%" }} size="small">
      <InputLabel error={hasError}>{label}</InputLabel>
      <Controller
        render={({ onChange, value, onBlur, name }) => (
          <Select
            onChange={(e) => { handleChange(e) }}
            label={label}
            size="small"
            defaultValue={value}
          >

            {placeholder ?
              <MenuItem value="" disabled>
                {placeholder}
              </MenuItem>
              :
              <MenuItem value="" style={{ height: '5px' }}>
                &nbsp;
              </MenuItem>
            }

            {data && data.map(item =>
              <MenuItem value={item[valueField]} key={item[valueField]} defaultValue={item[valueField]}>{item[textField]}</MenuItem>

            )}
          </Select>
        )}
        name={name}
        control={control}
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
export default InputSelectApiChangeValue;


export function setStorage(key, value, expires) {
  if (expires === undefined || expires === null) {
    expires = 24 * 60 * 60; // default: seconds for 1 day
  }
  const now = Date.now(); //millisecs since epoch time, lets deal only with integer
  const schedule = now + expires * 1000;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    localStorage.setItem(key + "_expiresIn", schedule);
  } catch (e) {
    console.log(
      "setStorage: Error setting key [" +
      key +
      "] in localStorage: " +
      JSON.stringify(e)
    );
    return false;
  }
  return true;
}
export function getStorage(key) {
  const now = Date.now(); //epoch time, lets deal only with integer
  // set expiration for storage
  let expiresIn = localStorage.getItem(key + "_expiresIn");
  if (expiresIn === undefined || expiresIn === null) {
    expiresIn = 0;
  }
  expiresIn = Math.abs(expiresIn);
  if (expiresIn < now) {
    // Expired
    removeStorage(key);
    return null;
  } else {
    try {
      let value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.log(
        "getStorage: Error reading key [" +
        key +
        "] from localStorage: " +
        JSON.stringify(e)
      );
      return null;
    }
  }
}

export function removeStorage(key) {
  try {
    localStorage.setItem(key, "");
    localStorage.setItem(key + "_expiresIn", "");
  } catch (e) {
    console.log(
      "removeStorage: Error removing key [" +
      key +
      "] from localStorage: " +
      JSON.stringify(e)
    );
    return false;
  }
  return true;
}
