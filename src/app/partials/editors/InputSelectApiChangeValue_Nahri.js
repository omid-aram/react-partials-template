import React, { useState, useEffect , useMemo } from "react"
import { getEnumSelectData, getLookupSelectData } from "../../services/common.service"
import { MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path"
import baseService from "../../services/base.service"
import { connect } from "react-redux"


const InputSelectApiChangeValue = (props) => {

  const { changeVal, txnCodes, readUrl, defultValues, param, valueField, textField, options, name, label, placeholder, editDataValue, ...rest } = props
  const [data, setData] = useState(options)
  //const [selectedValue, setSelectedValue] = useState(options)
  const [loading, setLoading] = useState(false);
  const { control, errors, values } = useFormContext()
  const noChache = true;// they dont like cache
  const handleChange = (e) => {

    changeVal(e.target.value);

    // setFolderName(event.target.value);
  };
  useEffect(() => {
    setLoading(true)

    if (!options) { // not local


      let cacheKey = readUrl + JSON.stringify(param)
      let dataFromCache = getStorage(cacheKey);
      if (dataFromCache && !noChache) {
        setData(dataFromCache);

      } else {
        //  var pp = param && param.map(x => {
        //   return x[] =editDataValue[namePath] 
        //  })
        if (param) {
          //console.log("editDataValue" , editDataValue)
          for (var key in param) {
            if (param.hasOwnProperty(key)) {
              param[key] = editDataValue[Object.keys(key)];
            }
          }

          //console.log("paramparamparam" , param)
        }

        setLoading(true);
        baseService.post(readUrl, param).then(x => {
          setData(x.data);
          // console.log("x.data",x.data)
          // console.log("x.datsssa",x.data[0][valueField])
          setLoading(false);
          setStorage(cacheKey, x);
          //console.log('data', x.data);
          //window.c=x.data[0][valueField]
          // if (x.data && x.data[0])
          //   setSelectedValue(x.data[0][valueField]);
        })
      }
    }
  }, [param /*,changeVal*/]);

  //simple name : "title" 
  //path name : "items[1].title"
  let namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
  let error = objectPath.get(errors, namePath);
  let hasError = !!error;
  let value = values ? objectPath.get(values, namePath) : null;
const foo =  useMemo(() => (
  <>
  {data && data.length > 0 ? 
  <FormControl variant="outlined" style={{ width: "100%" }} size="small">
{/* {console.log("selectedValue",selectedValue)} */}
  <InputLabel error={hasError}>{label}</InputLabel>
  <Controller
    //   as={
    //     <Select label={label}  error={hasError}>
    //         <MenuItem value={null}>
    //             &nbsp;
    //         </MenuItem>
    //         {data && data.map(item =>
    //             <MenuItem value={item[valueField]} key={item[valueField]}>{item[textField]}</MenuItem>
    //         )}
    //     </Select>
    // }
    // name={name}
    // control={control}
    //  defaultValue={editDataValue !== null && editDataValue[namePath] ?  editDataValue[namePath] : null }
    // {...rest}
    render={({ onChange, value, onBlur, name }) => (
     
      <Select onChange={(e) => {

        handleChange(e)
      }} label={label} size="small"   >

        {placeholder ?
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
          :
          <MenuItem value="" style={{ height: '5px' }}>
            &nbsp;
          </MenuItem>
        }
        {/* {console.log("window.a",window.c)} */}
        {data && data.map(item =>

          <MenuItem value={item[valueField]} key={item[valueField]}>{item[textField]}</MenuItem>

        )}
      </Select>
    )}
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
  : <p>ddd</p>}
  </>
  ),[data /*, selectedValue*/])
  return (<>
  {foo}
    
  </>);

}

const mapStateToProps = state => {
  return {
    editDataValue: state.passIds.editData,

  };
};
export default connect(mapStateToProps)(InputSelectApiChangeValue);

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
