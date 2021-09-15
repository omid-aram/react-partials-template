import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSelect from "../../../partials/editors/InputSelect";
import InputDate from "../../../partials/editors/InputDate";
import CompanyPopupCrud from "../../../partials/editors/Custom/CompanyPopupCrud";


export function Admin(props) {

    const { companyLocalFilter, forceGridUpdate } = props

    const columns = [
        {
            field: "COMPANY",
            title: "شرکت",
            width: 140
        },
        {
            field: "NAME",
            title: "نام سال مالی",
            width: 140
        },
        {
            field: "PERSIANFROMDATE",
            title: "از تاریخ",
            width: 140
        },
        {
            field: "PERSIANTODATE",
            title: "تا تاریخ",
            width: 140
        }
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <Row>
                <Col sm={6}>
                    <InputSelect
                        controller="Company"
                        action="GetSelectData"
                        name="COMPANYID"
                        label="شرکت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="NAME"
                        label="نام سال مالی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputDate
                        name="FROMDATE"
                        label="از تاریخ"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputDate
                        name="TODATE"
                        label="تا تاریخ"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <InputText
                        name="DESCRIPTION"
                        label="توضیحات"
                    />
                </Col>
            </Row>
        </div>
    );

    return (<>
        <CompanyPopupCrud
            companyLocalFilter={companyLocalFilter}
            forceGridUpdate={forceGridUpdate}
            columns={columns}
            title="مدیریت سال مالی"
            urls={{
                readUrl: "/CompanyDetail/Show_FinancialYear",
                createUrl: "/CompanyDetail/Create_FinancialYear",
                deleteUrl: "/CompanyDetail/Delete_FinancialYear",
                editUrl: "/CompanyDetail/Update_FinancialYear"
            }}
            form={form}
        />
    </>);
}

export function User(props) {
    const companyId = props.companyId;

    const columns = [
        {
            field: "NAME",
            title: "نام سال مالی",
            width: 140
        },
        {
            field: "PERSIANFROMDATE",
            title: "از تاریخ",
            width: 140
        },
        {
            field: "PERSIANTODATE",
            title: "تا تاریخ",
            width: 140
        }
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <Row>
                <Col sm={6}>
                    <InputText
                        name="NAME"
                        label="نام سال مالی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputDate
                        name="FROMDATE"
                        label="از تاریخ"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputDate
                        name="TODATE"
                        label="تا تاریخ"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="DESCRIPTION"
                        label="توضیحات"
                    />
                </Col>
            </Row>
        </div>
    );


    return (<>
        <PopupCurd
            columns={columns}
            title="مدیریت سال مالی"
            urls={{
                GetId: companyId,
                readUrl: "/CompanyDetail/Show_FinancialYear_ToUser",
                createUrl: "/CompanyDetail/Create_FinancialYear",
                deleteUrl: "/CompanyDetail/Delete_FinancialYear",
                editUrl: "/CompanyDetail/Update_FinancialYear"
            }}
            form={form}
        />

    </>);

}

