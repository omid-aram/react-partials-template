import React, { useState, useRef } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputText from "../../../partials/editors/InputText";
import InputNumber from "../../../partials/editors/InputNumber";
import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";
import InputDate from "../../../partials/editors/InputDate";
import InputSelect from "../../../partials/editors/InputSelect";
import InputSelectApiChangeValue from "../../../partials/editors_old/InputSelectApiChangeValue";
import InputSelectApiInputParams from "../../../partials/editors_old/InputSelectApiInputParams";

import InputCheckbox from "../../../partials/editors/InputCheckbox";

const CompAddress = (props) => {
    //console.log('CompAddress.parentItem', parentItem);

    const columns = [
        {
            field: "address",
            title: "آدرس",
            sortable: true,
        },
        {
            field: "addressTypeDesc",
            title: "نوع آدرس",
        },
        {
            field: "description",
            title: "توضیحات",
        },
        {
            field: "postCode",
            title: "کد پستی",
        },
        {
            field: "dateFromFa",
            title: "از تاریخ",
        },
        {
            field: "dateToFa",
            title: "تا تاریخ",
        },
        {
            field: "cityFullName",
            title: "شهر / استان",
        },
        {
            field: "telModir",
            title: "تلفن دفتر مدیریت",
        },
        {
            field: "telMoaven",
            title: "تلفن معاونت مالی",
        },
        {
            field: "telMarkaz",
            title: "مرکز تلفن",
        },
        {
            field: "siteAddress",
            title: "آدرس سایت",
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
            {/* <InputHidden name="stateId" />  
               <InputHidden name="countryId" /> */}
            <SimpleInputHidden name="companyId" value={props.parentItem.id} />
            <Row>
                <Col sm={4}>
                    <InputSelect
                        type="select"
                        enumType="AddressType"
                        name="addressType"
                        label="نوع آدرس"
                    />
                </Col>
                <Col sm={12}>
                    <InputText
                        name="address"
                        label="آدرس"
                        multiline={true}
                        rows={2}
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputSelectApiChangeValue
                        name="countryId"
                        label="کشور"
                        readUrl="/CompAddress/GetCountries"
                        textField="name"
                        valueField="id"
                        changeVal={countryChanged}
                    />
                </Col>
                <Col sm={4}>
                    <InputSelectApiChangeValue
                        name="stateId"
                        label="استان"
                        readUrl="/CompAddress/GetStates"
                        textField="name"
                        valueField="id"
                        changeVal={stateChanged}
                    />
                </Col>
                <Col sm={4}>
                     <InputSelectApiInputParams
                        name="cityId"
                        label="شهر"
                        readUrl="/CompAddress/GetCities"
                        param={{ CountryId: countryVal, StateId: stateVal }}

                        textField="name"
                        valueField="id"
                    /> 
                     {/* <InputSelectApiChangeValue
                         name="cityId"
                         label="شهر"
                         readUrl="/CompAddress/GetCities"
                        textField="name"
                        valueField="id"
                        //changeVal={stateChanged}
                        param={{ CountryId: countryVal, StateId: stateVal }}
                    /> */}
                </Col>
                <Col sm={4}>
                    <InputNumber
                        name="postCode"
                        label="کد پستی"
                    />
                </Col>
                <Col sm={4}>
                    <InputDate
                        name="dateFrom"
                        label="از تاریخ"
                    />
                </Col>
                <Col sm={4}>
                    <InputDate
                        name="dateTo"
                        label="تا تاریخ"
                    />
                </Col>
                <Col sm={4}>
                    <InputNumber
                        name="telModir"
                        label="تلفن دفتر مدیریت"
                    />
                </Col>
                <Col sm={4}>
                    <InputNumber
                        name="telMoaven"
                        label="تلفن معاونت مالی"
                    />
                </Col>
                <Col sm={4}>
                    <InputNumber
                        name="telMarkaz"
                        label="مرکز تلفن"
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="description"
                        label="توضیحات"
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="siteAddress"
                        label="آدرس سایت"
                        style={{ direction: 'ltr' }}
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
            title="آدرس های شرکت"
            sortItem="id"
            urls={{
                readUrl: "/CompAddress/GetPaginated",
                createUrl: "/CompAddress/Create",
                //deleteUrl: "/CompAddress/Delete",
                editUrl: "/CompAddress/Update",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ companyId: props.parentItem.id }}
        />

    </>);
}

export default CompAddress;