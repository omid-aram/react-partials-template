import React, { useState } from 'react'
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSelect from "../../../partials/editors/InputSelect";
//import InputSelectApiChangeValue from "../../../partials/editors_old/InputSelectApiChangeValue";
import InputCheckbox from "../../../partials/editors/InputCheckbox";
import InputDate from "../../../partials/editors/InputDate";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";
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

    const [company, setCompany] = useState({});
    const companyChanged = (val, text) => {
        setCompany({ id: val, name: text });
    }

    const fiscalYearFilter = { CompanyId: company.id };

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
                    <InputSelect
                        name="fiscalYearId"
                        label="سال مالی"
                        apiUrl="/AssemInfo/GetCompFiscalYears"
                        apiFilter={fiscalYearFilter}
                        textField="year"
                        valueField="id"
                        // serverBinding={{
                        //     url: '/AssemInfo/GetCompFiscalYears',
                        //     filter: { CompanyId: company.id },
                        //     textField: 'year',
                        //     valueField: 'id'
                        // }}
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

    const searchForm = (
        <>
            <Row>
                <Col sm={4}>
                    {/* <InputSelectApiChangeValue
                        name="companyId"
                        label="شرکت"
                        readUrl="/AssemInfo/GetCompanies"

                        textField="codeName"
                        valueField="id"
                        changeVal={companyChanged}
                    /> */}
                    <InputSelect
                        name="companyId"
                        label="شرکت"
                        apiUrl="/AssemInfo/GetCompanies"
                        textField="codeName"
                        valueField="id"
                        onChange={companyChanged}
                    />
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