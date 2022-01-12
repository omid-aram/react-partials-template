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

const AssemInvest = (props) => {
    //console.log('CompAddress.parentItem', parentItem);

    const columns = [
        {
            field: "dateFromFa",
            title: "از تاریخ",
        },
        {
            field: "dateToFa",
            title: "تا تاریخ",
        },
        {
            field: "investChangeTypeDesc",
            title: "نوع تغییر",
        },
        {
            field: "sharePrice",
            title: "مبلغ هر سهم",
        },
        {
            field: "shareCount",
            title: "تعداد",
        },
        {
            field: "totalPrice",
            title: "مبلغ کل",
        },
    ]

    const formfg = () => (
        <>
            <InputHidden name="id" />
            <SimpleInputHidden name="assemApprovalId" value={props.parentItem.id} />
            <Row>
                <Col sm={6}>
                    <InputDate
                        name="dateFrom"
                        label="از تاریخ"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputDate
                        name="dateTo"
                        label="تا تاریخ"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputSelect
                        type="select"
                        enumType="InvestChangeType"
                        name="investChangeType"
                        label="نوع تغییر"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputMoney
                        name="sharePrice"
                        label="مبلغ هر سهم"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputMoney
                        name="shareCount"
                        label="تعداد"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputMoney
                        name="totalPrice"
                        label="مبلغ کل"
                        rules={{ required: "اجباری است" }}
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
            title="تغییرات سرمایه"
            sortItem="dateFrom desc, id desc"
            urls={{
                readUrl: "/AssemInvest/GetPaginated",
                createUrl: "/AssemInvest/Create",
                deleteUrl: "/AssemInvest/HardDelete",
                editUrl: "/AssemInvest/Update",
                //detailUrl: "sub",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ assemApprovalId: props.parentItem.id }}

        // detailForm={<AssemApprovalDetails />}
        />

    </>);
}

export default AssemInvest;