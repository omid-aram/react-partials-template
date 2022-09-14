import React, { useState } from "react"
import { FormControl, FormHelperText, OutlinedInput } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import ModalSelector from "../ModalSelector";
import objectPath from "object-path"
import InputHidden from "./InputHidden";
import baseService from "../../services/base.service";

const InputModalCustom = (props) => {
    const { onChange, singleSelect, searchForm, url, column, modalSize, hiddenInputName, textInputName, selectKey, selectLabel, label, ...rest } = props
    let inputText = textInputName;
    const { control, errors, setValue } = useFormContext();
    const [showModal, setShowModal] = useState();
    let namePath = textInputName.replace(/\[(\w+)\]/g, '.$1')
    let error = objectPath.get(errors, namePath);
    let hasError = !!error;

    const confirmHandler = (data) => {
        hasError = !!error;
        let f = {};
        f.BankId = data[selectKey];
        baseService.post('/Common/GetLastContraDate', f).then(res => {
            if (res.succeed) {
                res.describe = `مغایرت گیری برای تفصیلی ${data.DES_ID} تا تاریخ ${res.data.froM_DATE_PERSIAN} انجام شده است`
                props.onChange(res)
            }
            else {

            }

        });


        if (singleSelect) {
            setValue(hiddenInputName, data[selectKey]);
            setValue(inputText, data[selectLabel]);
        }
        else {
            setValue(hiddenInputName, data);
            setValue(inputText, data);
        }
    }

    const openModalHandler = () => {
        setShowModal(true);
    }


    return (<>
        <InputHidden name={hiddenInputName} />
        <FormControl variant="outlined" style={{ width: "100%" }} size="small">
            <Controller
                as={
                    <OutlinedInput
                        placeholder={label}
                        className='dropbtn'
                        readOnly
                        onClick={() => openModalHandler()}
                        type="text"
                        label={label}
                        error={hasError} />
                }
                control={control}
                name={textInputName}
                {...rest}
            />
            <FormHelperText>
                {hasError && (error.message)}
            </FormHelperText>
        </FormControl>


        {showModal &&
            <ModalSelector
                classes={modalSize == "small" ? "" : "modal-90w"}
                singleSelect={singleSelect}
                isShow={showModal}
                columns={column}
                searchForm={searchForm}
                keyColumn={selectKey}
                // size="xl"
                title={" انتخاب " + label}
                onDismiss={() => setShowModal(false)}
                onConfirm={confirmHandler}
                url={url}
            />
        }

    </>);

}

export default InputModalCustom;