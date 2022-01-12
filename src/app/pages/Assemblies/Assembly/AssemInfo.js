import React, { useEffect, useState } from 'react'
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col, Button } from "react-bootstrap";
import { makeStyles, useTheme } from '@material-ui/core/styles/makeStyles';
//import { LayoutSubheader } from "../../_metronic/layout/LayoutContext";

import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSwitch from "../../../partials/editors/InputSwitch";
import InputSelect from "../../../partials/editors/InputSelect";
import InputSelectApi from "../../../partials/editors/InputSelectApi";
import InputSelectApiChangeValue from "../../../partials/editors/InputSelectApiChangeValue";
import InputSelectApiInputParams from "../../../partials/editors/InputSelectApiInputParams";
import InputCheckbox from "../../../partials/editors/InputCheckbox";
import InputDate from "../../../partials/editors/InputDate";
import InputMoney from "../../../partials/editors/InputMoney";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";
import { filter } from 'lodash';
import AssemDetails from "./AssemDetails";


const AssemInfo = () => {

    const columns = [
        {
            field: "assemNo",
            title: "شماره مجمع",
            width: 70
        },
        {
            field: "assemDateFa",
            title: "تاریخ مجمع",
        },
        {
            field: "assemblyTypeDesc",
            title: "نوع",
        },
        {
            field: "location",
            title: "محل برگذاری",
        },
        {
            field: "description",
            title: "شرح",
        },
    ]

    const formfg = () => (
        <>
            <InputHidden name="id" />
            <SimpleInputHidden name="companyId" value={company.id} />
            <Row>
                <Col sm={6}>
                    <InputText
                        name="companyName"
                        label="نام شرکت"
                        rules={{ required: "اجباری است" }}
                        defaultValue={company.name}
                        disabled={true}
                    />
                </Col>
                <Col sm={6}>
                    <InputSelect
                        type="select"
                        enumType="AssemblyType"
                        name="assemblyType"
                        label="نوع مجمع"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="assemNo"
                        label="شماره مجمع"
                    />
                </Col>
                <Col sm={3}>
                    <InputDate
                        name="assemDate"
                        label="تاریخ مجمع"
                    />
                </Col>
                <Col sm={3}>
                    <InputSelectApiInputParams
                        name="fiscalYearId"
                        label="سال مالی"
                        readUrl="/AssemInfo/GetCompFiscalYears"
                        param={{ CompanyId: company.id }}

                        textField="year"
                        valueField="id"
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="location"
                        label="محل برگذاری"
                        multiline={true}
                        rows={3}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="description"
                        label="شرح"
                        multiline={true}
                        rows={3}
                    />
                </Col>
                <Col sm={3}>
                    <InputDate
                        name="reviewDate"
                        label="تاریخ بازنگری"
                    />
                </Col>
                <Col sm={3}>
                    <InputCheckbox
                        name="isAdjourned"
                        label="تنفس"
                    />
                </Col>
            </Row>
        </>
    );

    const [company, setCompany] = useState({});
    const companyChanged = (val, text) => {
        setCompany({ id: val, name: text });
    }

    const searchForm = (
        <>
            <Row>
                <Col sm={4}>
                    <InputSelectApiChangeValue
                        name="companyId"
                        label="شرکت"
                        readUrl="/AssemInfo/GetCompanies"

                        textField="codeName"
                        valueField="id"
                        changeVal={companyChanged}
                    />
                    {/* <InputSelectApiInputParams
                        name="companyId"
                        label="شرکت"
                        readUrl="/AssemInfo/GetCompanies"

                        textField="codeName"
                        valueField="id"
                       // changeVal={companyChanged}
                    /> */}
                </Col>
            </Row>
        </>
    )

    const detailTitle = `${company.name} : @assemblyTypeDesc - شماره @assemNo - تاریخ @assemDateFa`;

    return (<>
        <PopupCurd
            columns={columns}
            pageSize={10}
            title="اطلاعات مجامع"
            sortItem="assemNo.Length desc, assemNo desc, id"
            urls={{
                readUrl: "/AssemInfo/GetPaginated",
                createUrl: "/AssemInfo/Create",
                //deleteUrl: "/AssemInfo/Delete",
                editUrl: "/AssemInfo/Update",
                detailUrl: "modal",
            }}
            //comid={window.a}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ companyId: company.id }}

            detailForm={<AssemDetails />}
            detailSize="xl"
            detailTitle={detailTitle}
        />

    </>);
}

export default AssemInfo;