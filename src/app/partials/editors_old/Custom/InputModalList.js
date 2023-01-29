import React, { useState, useEffect } from "react"
import { FormControl, FormHelperText, OutlinedInput } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import Button from '@material-ui/core/Button';
import { Row, Col } from "react-bootstrap";
import ModalSelector from "../../ModalSelector";
import InputText from "../InputText";
import objectPath from "object-path";
import InputHidden from "../InputHidden";
import { useDispatch } from 'react-redux';
import { passIdsActions } from "../../../store/ducks/passIds.duck";
import { snackbarActions } from "../../../store/ducks/snackbar.duck";

const InputModalList = (props) => {
    const { url, column, name, titleName, selectKey, selectLabel, label, ...rest } = props

    const { control, errors, setValue, getValues } = useFormContext();
    const drpName = titleName
    const [showModal, setShowModal] = useState();
    let namePath = drpName.replace(/\[(\w+)\]/g, '.$1')
    let error = objectPath.get(errors, namePath);
    let hasError = !!error;
    const [isSelected, setIsSelected] = useState(false);
    // const [items, setItems] = useState([]);

    const searchForm = (
        <>
            <Row>
                <Col md={4}>
                    <InputText
                        name="LIST_NO"
                        label="شماره سفارش"
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

        if (data === undefined) {
            dispatch(snackbarActions.error("لطفا اطلاعات موردنظر خود را انتخاب کنید."));
            return false;
        }


        //redux
        dispatch(passIdsActions.fetchListSanad(data));
        setIsSelected(true);
        // console.log(data)
        hasError = !!error;
        setValue(name, data[selectKey]);
        setValue(drpName, data[selectLabel]);
        //setItems(data.PO_SRL);
    }

    const openModalHandler = () => {
        setShowModal(true);
    }

    const ClearModal = () => {
        setIsSelected(false);
        setValue(name, null);
        setValue(drpName, "")
    }

    // useEffect(() => {
    //     const items = JSON.parse(localStorage.getItem('items'));
    //     if (items) {
    //       setItems(items);
    //     }
    //   }, []);

    // useEffect(() => {
    //     localStorage.setItem('items', JSON.stringify(items));
    //   }, [items]);


    return (<>
        <InputHidden name={name} />
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

            {isSelected && (
                <i className="fa fa-times" onClick={() => ClearModal()} style={{ position: "absolute", top: "12px", left: "10px", cursor: "pointer" }}></i>
            )}

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

export default InputModalList;