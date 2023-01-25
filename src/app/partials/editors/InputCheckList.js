import React, { useState, useEffect } from 'react'
import baseService from '../../services/base.service';
import { CircularProgress, FormControlLabel, Checkbox } from '@material-ui/core';


const InputCheckList = ({label,  fieldName,formMethods, optionsUrl }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const [checked, setChecked] = useState(formMethods.getValues(fieldName) || []);
    useEffect(() => {
        formMethods.register({ name: fieldName });
        setLoading(true)
        baseService.post(optionsUrl, {}).then(res => {
            setData(res.data)
            setLoading(false)
        })
    }, [])
    useEffect(() =>{
        formMethods.setValue(fieldName, checked);
    },[checked, fieldName, formMethods])

    const handleChange = (isChecked, id) => {
        if (isChecked) {
            setChecked(prev => [...prev, id])
        } else {
            setChecked(prev => prev.filter(x => x !== id))
        }

    }

    return (

        <div>
            <div className="kt-font-bold">
                {label}
            </div>
            {loading && <CircularProgress />}
            {data.map((item) => (
                <div key={item.id}>
                <FormControlLabel key={item.id}
                    control={<Checkbox checked={Boolean(checked.find(x => x === item.id))} onChange={(e) => handleChange(e.target.checked, item.id)} />}
                    label={item.name}
                />
                </div>
            ))}

        </div>

    )
}

export default InputCheckList;