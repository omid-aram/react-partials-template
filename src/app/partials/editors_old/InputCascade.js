import React, { useState, useEffect } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { getSelectDataWithUrl } from "../../services/common.service"
import { MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@material-ui/core"
import { Col } from "react-bootstrap"
import baseService from '../../services/base.service'
import objectPath from "object-path"

const InputCascade = (props) => {
    const { firstDrpName, firstLblName, colSize, secDrpName, secLblName, firstUrl, secUrl, ...rest } = props
    const [FirstDrpData, setFirstDrpData] = useState([])
    const [SecondDrpData, setSecondDrpData] = useState([])

    const [FirstDrpValue, setFirstDrpValue] = useState(0)
    const [SecDrpValue, setSecDrpValue] = useState(0)

    const { control, setValue, errors, getValues } = useFormContext()



    let firstNamePath = firstDrpName.replace(/\[(\w+)\]/g, '.$1')
    let secondNamePath = secDrpName.replace(/\[(\w+)\]/g, '.$1')
    let firsterror = objectPath.get(errors, firstNamePath);
    let secerror = objectPath.get(errors, secondNamePath);

    let firstHasError = !!firsterror;
    let secHasError = !!secerror;

    let firstDefaultValue = getValues(firstNamePath);
    let secondDefaultValue = getValues(secondNamePath);


    useEffect(() => {

        getSelectDataWithUrl(firstUrl).then(x => {

            setFirstDrpData(x.data);
        })

        getSelectDataWithUrl(secUrl).then(x => {

            setSecondDrpData(x.data);
        })
    }, []);


    const handleFirstChange = (event) => {

        setFirstDrpValue(event.target.value)
        setValue(firstNamePath, event.target.value)

        setSecDrpValue(0);
        setValue(secondNamePath, null)

        baseService.post(secUrl, { SId: event.target.value }).then(x => {
            setSecondDrpData(x.data)
        });

    };

    const handleSecChange = (event) => {
        setSecDrpValue(event.target.value);
        setValue(secondNamePath, event.target.value)
    };

    return (<>

        <Col sm={colSize}>
            <FormControl variant="outlined" style={{ width: "100%" }} size="small">
                <Controller
                    {...rest}
                    control={control}
                    name={firstNamePath}
                    render={({ field }) => (
                        <Select
                            {...field}
                            error={firstHasError}
                            onChange={(e) => handleFirstChange(e)}
                            name={firstNamePath}
                            value={FirstDrpValue}
                            label={firstLblName}
                            variant="outlined"
                            style={{ width: "100%" }}
                            size="small"
                        >
                            <MenuItem value="">
                                <em>انتخاب کنید ...</em>
                            </MenuItem>
                            {FirstDrpData.map(item =>
                                <MenuItem value={item.id} key={item.id}>{item.desc}</MenuItem>
                            )}

                        </Select>
                    )}
                />
                <FormHelperText>
                    {firstHasError && (firsterror.message)}
                </FormHelperText>

            </FormControl>
        </Col>
        <Col sm={colSize}>
            <FormControl variant="outlined" style={{ width: "100%" }} size="small">
                <Controller
                    {...rest}
                    control={control}
                    name={secondNamePath}
                    render={({ field }) => (
                        <Select
                            {...field}
                            error={secHasError}
                            onChange={(e) => handleSecChange(e)}
                            name={secondNamePath}
                            value={SecDrpValue}
                            label={secLblName}
                            variant="outlined"
                            style={{ width: "100%" }}
                            size="small"
                        >
                            <MenuItem value="">
                                <em>انتخاب کنید ...</em>
                            </MenuItem>
                            {SecondDrpData.map(item =>
                                <MenuItem value={item.id} key={item.id}>{item.desc}</MenuItem>
                            )}

                        </Select>
                    )}
                />
                <FormHelperText>
                    {secHasError && (secerror.message)}
                </FormHelperText>
            </FormControl>
        </Col>
        {/* <Controller
                    as={
                        <input type="hidden" />
                    }
                    control={control}
                    name={firstNamePath}
                    {...rest}
                />
                <InputLabel error={firstHasError}>{firstLblName}</InputLabel>
                <Select
                    error={firstHasError}
                    onChange={handleFirstChange}
                    name={firstNamePath}
                    value={FirstDrpValue}
                    label={firstLblName}
                    variant="outlined"
                    style={{ width: "100%" }}
                    size="small">
                    <MenuItem value="">
                        <em>انتخاب کنید ...</em>
                    </MenuItem>
                    {FirstDrpData.map(item =>
                        <MenuItem value={item.id} key={item.id}>{item.desc}</MenuItem>
                    )}
                </Select> */}


        {/* <Col sm={colSize}>
            <FormControl variant="outlined" style={{ width: "100%" }} size="small">

                <Controller
                    as={
                        <input type="hidden" />
                    }
                    control={control}
                    name={secondNamePath}
                    {...rest}
                />
                <InputLabel error={secHasError}>{secLblName}</InputLabel>
                <Select
                    error={secHasError}
                    onChange={handleSecChange}
                    name="secSelect"
                    value={SecDrpValue}
                    label={secLblName}
                    variant="outlined"
                    style={{ width: "100%" }}
                    size="small">
                    <MenuItem value="">
                        <em>انتخاب کنید ...</em>
                    </MenuItem>
                    {SecondDrpData.map(item =>
                        <MenuItem value={item.id} key={item.id}>{item.desc}</MenuItem>
                    )}
                </Select>
                <FormHelperText>
                    {secHasError && (secerror.message)}
                </FormHelperText>
            </FormControl>
        </Col>*/}
    </>);

}

export default InputCascade;