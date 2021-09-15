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
            title: "نام",
            width: 140
        },
        {
            field: "MEMBERQTY",
            title: "تعداد اعضا",
            width: 140
        },
        {
            field: "SHAREPERCENT",
            title: "تعداد سهام",
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
                    <InputSelect
                        controller="CompanyDetail"
                        action="GetSelectFinancialYear"
                        name="COMPANYFINANCIALYEARID"
                        label="سال مالی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText
                        name="NAME"
                        label="نام"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="MEMBERQTY"
                        label="تعداد اعضا"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText
                        name="SHAREPERCENT"
                        label="درصد سهام"
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="SHARENUMBER"
                        label="تعداد سهام"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText
                        name="SHARECODE"
                        label="کد سهامداری"
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

        <CompanyPopupCrud
            companyLocalFilter={companyLocalFilter}
            forceGridUpdate={forceGridUpdate}
            columns={columns}
            title="مدیریت سهامداران"
            urls={{
                readUrl: "/CompanyDetail/Show_Shareholder",
                createUrl: "/CompanyDetail/Create_Shareholder",
                deleteUrl: "/CompanyDetail/Delete_Shareholder",
                editUrl: "/CompanyDetail/Update_Shareholder"
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
            title: "نام",
            width: 140
        },
        {
            field: "MEMBERQTY",
            title: "تعداد اعضا",
            width: 140
        },
        {
            field: "SHAREPERCENT",
            title: "تعداد سهام",
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
                <Col sm={4}>
                    <InputSelect
                        controller="CompanyDetail"
                        action="GetSelectFinancialYear"
                        name="COMPANYFINANCIALYEARID"
                        label="سال مالی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="NAME"
                        label="نام"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="MEMBERQTY"
                        label="تعداد اعضا"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={4}>
                    <InputText
                        name="SHAREPERCENT"
                        label="درصد سهام"
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="SHARENUMBER"
                        label="تعداد سهام"
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="SHARECODE"
                        label="کد سهامداری"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={4}>
                    <InputDate
                        name="FROMDATE"
                        label="از تاریخ"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputDate
                        name="TODATE"
                        label="تا تاریخ"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
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
            title="مدیریت سهامداران"
            urls={{
                GetId: companyId,
                readUrl: "/CompanyDetail/Show_Shareholder_ToUser",
                createUrl: "/CompanyDetail/Create_Shareholder",
                deleteUrl: "/CompanyDetail/Delete_Shareholder",
                editUrl: "/CompanyDetail/Update_Shareholder"
            }}
            form={form}
        />

    </>);

}
