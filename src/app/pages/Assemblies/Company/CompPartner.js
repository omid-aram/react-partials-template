import React, { useState, useRef } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputText from "../../../partials/editors/InputText";
import InputNumber from "../../../partials/editors/InputNumber";
import InputMoney from "../../../partials/editors/InputMoney";
import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";
import InputDate from "../../../partials/editors/InputDate";
import InputSelect from "../../../partials/editors/InputSelect";
import InputSelectApi from "../../../partials/editors/InputSelectApi";
import InputSelectApiChangeValue from "../../../partials/editors/InputSelectApiChangeValue";
import InputSelectApiInputParams from "../../../partials/editors/InputSelectApiInputParams";

import InputCheckbox from "../../../partials/editors/InputCheckbox";

const CompPartner = (props) => {
    //console.log('CompAddress.parentItem', parentItem);

    const columns = [
        {
            field: "name",
            title: "نام شریک تجاری",
            //sortable: true,
        },
        {
            field: "dateFromFa",
            title: "از تاریخ",
        },
        {
            field: "dateToFa",
            title: "تا تاریخ",
        },
    ]

    const [countryVal, setCountryVal] = useState(0);
    const countryChanged = (val) => {
        setCountryVal(val);
    }

    const [stateVal, setStateVal] = useState(0);
    const stateChanged = (val) => {
        setStateVal(val);
    }

    const formfg = () => (
        <>
            <InputHidden name="id" />
            <SimpleInputHidden name="companyId" value={props.parentItem.id} />
            <Row>
                <Col sm={12}>
                    <InputText
                        name="name"
                        label="نام شریک تجاری"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputDate
                        name="dateFrom"
                        label="از تاریخ"
                    />
                </Col>
                <Col sm={6}>
                    <InputDate
                        name="dateTo"
                        label="تا تاریخ"
                    />
                </Col>
            </Row>
        </>
    );

    const searchForm = (
        <>
        </>
    );

    return (<>

        <PopupCurd
            columns={columns}
            pageSize={5}
            modalSize="md"
            title="شرکای تجاری"
            sortItem="dateFrom desc, name, id"
            urls={{
                readUrl: "/CompPartner/GetPaginated",
                createUrl: "/CompPartner/Create",
                //deleteUrl: "/CompPartner/Delete",
                editUrl: "/CompPartner/Update",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ companyId: props.parentItem.id }}
        />

    </>);
}

export default CompPartner;