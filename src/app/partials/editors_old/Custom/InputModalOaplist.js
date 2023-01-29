import React, { useState } from "react"
import { FormControl, FormHelperText, FormLabel, OutlinedInput } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import Button from '@material-ui/core/Button';
import { Row, Col } from "react-bootstrap";
import ModalSelector from "../../ModalSelector";
import InputText from "./../InputText";
import objectPath from "object-path"
import InputHidden from "./../InputHidden";
import { snackbarActions } from "../../../store/ducks/snackbar.duck";
import { useDispatch } from 'react-redux';
import { passIdsActions } from "../../../store/ducks/passIds.duck";

const InputModalOaplist = (props) => {
    const { url, column, name, titleName, selectKey,selectUnique,checkunique, selectLabel, label, ...rest } = props

    const { control, errors, setValue, getValues } = useFormContext();
    const drpName = titleName
    const [showModal, setShowModal] = useState();
    const [list_no_label, setlist_no_label] = useState("");
    const [mali_code_label, setmali_code_label] = useState("");
    const [po_sub_title1_label, setpo_sub_title1_label] = useState("");
    let namePath = drpName.replace(/\[(\w+)\]/g, '.$1')
    let error = objectPath.get(errors, namePath);
    let hasError = !!error;

    const searchForm = (
        <>
            <Row>
                <Col md={4}>
                    <InputText
                        name="term"
                        label="شماره یا عنوان"
                    />
                </Col>
                <Col sm={2}>
                    <Button variant="outline-primary" type="submit">جستجو</Button>
                </Col>
            </Row>
        </>
    );

    const dispatch = useDispatch();

    const confirmHandler = (data) => {
       // console.log("datadatadata",data)
        if(data == undefined){
            dispatch(snackbarActions.error("لطفا اطلاعات موردنظر خود را انتخاب کنید."));
            return false;
        }
        dispatch(passIdsActions.fetchDataOrder(data));
        setmali_code_label(data.MALI_CODE)
        setlist_no_label(data.LIST_NO)
        setpo_sub_title1_label(data.PO_SUB_TITLE1)

        
        // console.log()
        hasError = !!error;

        setValue("PO_MALI_CODE",data.MALI_CODE)
        setValue("LIST_NO",data.LIST_NO)
        setValue("PO_TITLE",data.PO_SUB_TITLE1)


        setValue(name, data[selectKey]);
        setValue(drpName, data[selectLabel])
    }

    const openModalHandler = () => {
        setShowModal(true);
    }


    return (<>
        <InputHidden name={name} />
        <InputHidden name="mali_code" />
        <InputHidden name="list_no" />
        <InputHidden name="po_sub_title1" />

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
                name={drpName}
                {...rest}
            />
            <FormHelperText>
                {hasError && (error.message)}
            </FormHelperText>
        </FormControl>



        {showModal &&
            <ModalSelector
                classes={"modal-90w"}
                singleSelect={true}
                isShow={showModal}
                columns={column}
                checkunique={checkunique}
                keyColumnUnique = {selectUnique}
                searchForm={searchForm}
                keyColumn={selectKey}
                // size="xl"
                title={" انتخاب " + label}
                onDismiss={() => setShowModal(false)}
                onConfirm={confirmHandler}
                url={url}
            />
        }


<FormLabel  style={{ color: '#000000' }} component="legend">كد مالي سفارش : {mali_code_label}</FormLabel>
<FormLabel style={{ color: '#000000' }} component="legend">شماره ليست : {list_no_label}</FormLabel>
<FormLabel style={{ color: '#000000' }} component="legend">نوع سفارش : {po_sub_title1_label}</FormLabel>

    </>);

}
export default InputModalOaplist;
