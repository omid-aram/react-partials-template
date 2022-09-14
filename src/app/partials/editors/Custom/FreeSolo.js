
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import objectPath from "object-path";
import { InputLabel, FormControl, FormHelperText } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form"

const FreeSolo = (props) => {
    const { label, name, ...rest } = props
    const { control, errors, values } = useFormContext()

    let namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
    let error = objectPath.get(errors, namePath);
    let hasError = !!error;
    let value = values ? objectPath.get(values, namePath) : undefined;

    return (
        <FormControl variant="outlined" style={{ width: "100%" }} size="small">
            <InputLabel error={hasError}>{label}</InputLabel>
            <Controller
                as={
                    <Autocomplete
                        id="tags-filled"
                        defaultValue={value}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="filled"
                                label={label}
                                placeholder={label}
                            />
                        )}
                    />
                }
                name={name}
                control={control}
                {...rest}
            />
             <FormHelperText>
                {hasError && (error.message)}
            </FormHelperText>
        </FormControl>
    );
}

export default FreeSolo;