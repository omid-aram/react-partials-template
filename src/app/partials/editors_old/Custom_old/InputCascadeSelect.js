import React, { useState, useEffect } from 'react'
import { MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@material-ui/core"
import { Col } from "react-bootstrap";
import { getSelectDataWithUrl } from "../../../services/common.service"
import baseService from '../../../services/base.service';
import { Controller, useFormContext } from 'react-hook-form';
import objectPath from "object-path"

const InputCascadeSelect = (props) => {
    const { firstName, secondName, colSize, firstController, firstAction, secondController, secondAction, firstLabel, secondLabel, ...rest } = props
    const [FirstDrpId, setFirstDrpId] = useState('')
    const [FirstDrpData, setFirstDrpData] = useState([])
    const [SecondDrpId, setSecondDrpId] = useState('')
    const [SecondDrpData, setSecondDrpData] = useState([])
    const { control, errors, values, getValues } = useFormContext()

    let firstNamePath = firstName.replace(/\[(\w+)\]/g, '.$1')
    let secondNamePath = secondName.replace(/\[(\w+)\]/g, '.$1')

    let firstDrperror = objectPath.get(errors, firstNamePath);
    let firstHasError = !!firstDrperror;

    let secDrperror = objectPath.get(errors, secondNamePath);
    let sectHasError = !!secDrperror;

    let firstValue = getValues(firstNamePath) == null || getValues(firstNamePath) == undefined ? '' : getValues(firstNamePath);
    let secondValue = getValues(secondNamePath) == null || getValues(secondNamePath) == undefined ? '' : getValues(secondNamePath);

    useEffect(() => {
        if (firstValue != '' && secondValue != '') {
            getSelectDataWithUrl("/" + firstController + "/" + firstAction).then(x => {
                setFirstDrpData(x.data);
            })

            baseService.post("/" + secondController + "/" + secondAction, { SId: firstValue }).then(x => {
                setSecondDrpData(x.data)
            });

        }
        else {
            getSelectDataWithUrl("/" + firstController + "/" + firstAction).then(x => {
                setFirstDrpData(x.data);
            })
        }
    }, []);


    const ChangeFirstDrp = (e) => {
        debugger;
        setFirstDrpId(e)
        if (e != "") {
            baseService.post("/" + secondController + "/" + secondAction, { SId: e }).then(x => {
                setSecondDrpData(x.data)
            });
        }
        else {
            setSecondDrpData([])
        }
    }

    const ChangeSecondDrp = (e) => {
        setSecondDrpId(e)
    }

    return (<>
        <Col sm={colSize}>
            <FormControl variant="outlined" style={{ width: "100%" }} size="small">
                <InputLabel error={firstHasError}>{firstLabel}</InputLabel>
                <Controller
                    as={
                        <Select name={firstName}
                            value={FirstDrpId} label={firstLabel} size="small" error={firstHasError}>
                            <MenuItem value="">
                                <em>انتخاب کنید ...</em>
                            </MenuItem>
                            {FirstDrpData.map(item =>
                                <MenuItem value={item.id} key={item.id}>{item.desc}</MenuItem>
                            )}
                        </Select>
                    }
                    onChange={e => {
                        ChangeFirstDrp(e[0].target.value)
                        return e[0].target.value
                    }}
                    name={firstName}
                    control={control}
                    defaultValue={firstValue}
                    {...rest}
                />
                <FormHelperText>
                    {firstHasError && (firstDrperror.message)}
                </FormHelperText>
            </FormControl>
        </Col>
        <Col sm={colSize}>
            <FormControl variant="outlined" style={{ width: "100%" }} size="small">
                <InputLabel error={sectHasError}>{secondLabel}</InputLabel>
                <Controller
                    as={
                        <Select name={secondName} value={SecondDrpId} label={secondLabel} size="small" error={sectHasError}>
                            <MenuItem value="">
                                <em>انتخاب کنید ...</em>
                            </MenuItem>
                            {SecondDrpData.map(item =>
                                <MenuItem value={item.id} key={item.id}>{item.desc}</MenuItem>
                            )}
                        </Select>
                    }
                    onChange={e => {
                        ChangeSecondDrp(e[0].target.value)
                        return e[0].target.value
                    }}
                    name={secondName}
                    control={control}
                    defaultValue={secondValue}
                    {...rest}
                />
                <FormHelperText>
                    {sectHasError && (secDrperror.message)}
                </FormHelperText>
            </FormControl>
        </Col>
    </>);

}


export default InputCascadeSelect;










// import React, { useState, useEffect } from "react"
// import { getSelectDataWithUrl } from "../../../services/common.service"
// import { MenuItem, Select, InputLabel, FormControl } from "@material-ui/core"

// const InputCascadeSelect = (props) => {

//     const { controller, action, label } = props
//     const [data, setData] = useState([])
//     const [selectedValue, setselectedValue] = useState('');
//     const [cascadeData, setcascadeData] = useState()
//     useEffect(() => {
//         getSelectDataWithUrl(controller, action).then(x => {
//             setData(x.data);
//         })
//     });




//     const handleChange = (event) => {
//         setselectedValue(event.target.value);


//     };


//     return (<>

//         <FormControl variant="outlined" style={{ width: "100%" }} size="small">
//             <InputLabel>{label}</InputLabel>
//             <Select value={selectedValue} onChange={handleChange} label={label} size="small">
//                 <MenuItem value="">
//                     <em>انتخاب کنید ...</em>
//                 </MenuItem>
//                 {data.map(item =>
//                     <MenuItem value={item.id} key={item.id}>{item.desc}</MenuItem>
//                 )}
//             </Select>
//         </FormControl>
//     </>);

// }


// export default InputCascadeSelect;