import React, { useState, useRef } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputText from "../../../partials/editors/InputText";
import InputMoney from "../../../partials/editors/InputMoney";
import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";
import InputSelect from "../../../partials/editors/InputSelect";
import InputSelectApiInputParams from "../../../partials/editors_old/InputSelectApiInputParams";

import InputCheckbox from "../../../partials/editors/InputCheckbox";

const CompCapacity = (props) => {
    //console.log('CompAddress.parentItem', parentItem);

    const columns = [
        {
            field: "asmProdLineName",
            title: "خط تولید",
            //sortable: true,
        },
        {
            field: "prodName",
            title: "محصول",
        },
        {
            field: "measUnitName",
            title: "واحد اندازه گیری",
        },
        {
            field: "capacity",
            title: "ظرفیت",
        },
        {
            field: "compFiscalYearYear",
            title: "سال مالی",
        },
        {
            field: "description",
            title: "توضیحات",
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
                <Col sm={8}>
                    <InputSelectApiInputParams
                        name="asmProdLineId"
                        label="خط تولید"
                        readUrl="/CompCapacity/GetProdLines"
                        param={{ CompanyId: props.parentItem.id }}

                        textField="saloonLocation"
                        valueField="id"
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="prodName"
                        label="محصول"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputSelect
                        name="measUnitCode"
                        label="واحد اندازه گیری"
                        // readUrl="/CompCapacity/GetMeasUnits"
                        // textField="name"
                        // valueField="code"
                        serverBinding={{
                            url: '/CompCapacity/GetMeasUnits',
                            filter: {},
                            textField: 'name',
                            valueField: 'code'
                        }}
                    />
                </Col>
                <Col sm={4}>
                    <InputMoney
                        name="capacity"
                        label="ظرفیت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputSelectApiInputParams
                        name="compFiscalYearId"
                        label="سال مالی"
                        readUrl="/CompCapacity/GetCompFiscalYears"
                        param={{ CompanyId: props.parentItem.id }}

                        textField="year"
                        valueField="id"
                    />
                </Col>
                <Col sm={12}>
                    <InputText
                        name="description"
                        label="توضیحات"
                        multiline={true}
                        rows={2}
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
            title="ظرفیت تولید"
            sortItem="id"
            urls={{
                readUrl: "/CompCapacity/GetPaginated",
                createUrl: "/CompCapacity/Create",
                //deleteUrl: "/CompCapacity/Delete",
                editUrl: "/CompCapacity/Update",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ companyId: props.parentItem.id }}
        />

    </>);
}

export default CompCapacity;