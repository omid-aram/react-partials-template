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

const CompShareholder = (props) => {
    //console.log('CompAddress.parentItem', parentItem);

    const columns = [
        {
            field: "name",
            title: "نام",
            //sortable: true,
        },
        {
            field: "shareCode",
            title: "کد سهامداری",
        },
        {
            field: "shareCount",
            title: "تعداد سهام",
        },
        {
            field: "sharePercentRounded",
            title: "درصد سهام",
        },
        {
            field: "memberCount",
            title: "تعداد اعضاء",
        },
        {
            field: "compFiscalYearYear",
            title: "سال مالی",
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
                    <InputText
                        name="name"
                        label="نام"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="shareCode"
                        label="کد سهامداری"
                    />
                </Col>
                <Col sm={4}>
                    <InputMoney
                        name="shareCount"
                        label="تعداد سهام"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputNumber
                        name="sharePercent"
                        label="درصد سهام"
                    />
                </Col>
                <Col sm={4}>
                    <InputMoney
                        name="memberCount"
                        label="تعداد اعضاء"
                    />
                </Col>
                <Col sm={4}>
                    <InputSelect
                        name="compFiscalYearId"
                        label="سال مالی"
                        // readUrl="/CompShareholder/GetCompFiscalYears"
                        // param={{ CompanyId: props.parentItem.id }}
                        // textField="year"
                        // valueField="id"
                        serverBinding={{
                            url: '/CompShareholder/GetCompFiscalYears',
                            filter: { CompanyId: props.parentItem.id },
                            textField: 'year',
                            valueField: 'id'
                        }}
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
            title="سهامداران"
            sortItem="sharePercent desc, id"
            urls={{
                readUrl: "/CompShareholder/GetPaginated",
                createUrl: "/CompShareholder/Create",
                //deleteUrl: "/CompShareholder/Delete",
                editUrl: "/CompShareholder/Update",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ companyId: props.parentItem.id }}
        />

    </>);
}

export default CompShareholder;