import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col, Button } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSelect from "../../../partials/editors/InputSelect";
import InputDate from "../../../partials/editors/InputDate";

export function Admin() {

    const columns = [
        {
            field: "NAME",
            title: "نام",
            width: 100
        },
        {
            field: "CODE",
            title: "کد",
            width: 70
        },
        {
            field: "NATIONALCODE",
            title: "کد ملی",
            width: 140
        },
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <InputHidden name="ACMID" />
            <Row>
                <Col sm={6}>
                    <InputSelect
                        type="2"
                        lookupType="306"
                        name="COMPANYTYPEID"
                        label="نوع"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputSelect
                        type="2"
                        lookupType="301"
                        name="COMPANYGROUPID"
                        label="گروه"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            {/* <Row>
                <Col sm={6}>
                    <InputText
                        name="NAME"
                        label="نام"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="FULLNAME"
                        label="نام کامل"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row> */}
            <Row>
                <Col sm={6}>
                    <InputText
                        name="CODE"
                        label="کد"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="NATIONALCODE"
                        label="کد ملی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
            <Col sm={6}>
                    <InputText
                        name="REGISTERNO"
                        label="شماره ثبت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="NATIONALITY"
                        label="ملیت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
            <Col sm={6}>
                    <InputText
                        name="NUMBEROFSTOCK"
                        label="تعداد سهام"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="BOURSESYMBOL"
                        label="نماد بورس"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
            <Col sm={6}>
                    <InputDate
                        name="REGISTERDATE"
                        label="تاريخ ثبت"
                        rules={{ required: "اجباری است" }}
                        time={false}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="AMOUNTOFSTOCK"
                        label="مبلغ سهام"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <InputDate
                        name="EXPIREDATE"
                        label="تاريخ انقضاء"
                        rules={{ required: "اجباری است" }}
                        time={false}
                    />
                </Col>
            </Row>
        </div>
    );


    const searchForm = (
        <>
            {/* <Row>
                <Col md={3}>
                    <InputSelect
                        controller="Company"
                        action="GetSelectData"
                        name="company"
                        label="شرکت"
                    />

                </Col>
                <Col md={3}>
                    <InputText
                        name="code"
                        label="کد شرکت"
                    />
                </Col>
                <Col md={3}>
                    <InputText
                        name="nationalCode"
                        label="کد ملی"
                    />
                </Col>
                <Col sm={2}>
                    <Button variant="btn btn-outline-dark" type="submit">
                        <i className="fa fa-search" />
                        جستجو
                        </Button>
                </Col>
            </Row> */}
        </>
    );

    return (<>
        <PopupCurd
            columns={columns}
            title="مدیریت اطلاعات پایه"
            urls={{
                readUrl: "/Company/GetAllAcmCompanies",
                createUrl: "",
                deleteUrl: "",
                editUrl: "/Company/InsertAcmCompany"
            }}
            form={form}
            searchForm={searchForm}
        />

    </>);
}



export function User(props) {
    const companyId = props.companyId;

    const columns = [
        {
            field: "CODE",
            title: "کد",
            width: 140
        },
        {
            field: "NAME",
            title: "نام",
            width: 140
        },
        {
            field: "NATIONALCODE",
            title: "کد ملی",
            width: 140
        },
        {
            field: "GROUPVALUE",
            title: "گروه",
            width: 140
        },
        {
            field: "TYPEVALUE",
            title: "نوع",
            width: 140
        }
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <Row>
                <Col sm={6}>
                    <InputSelect
                        type="2"
                        lookupType="306"
                        name="COMPANYTYPEID"
                        label="نوع"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputSelect
                        type="2"
                        lookupType="301"
                        name="COMPANYGROUPID"
                        label="گروه"
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
                        name="FULLNAME"
                        label="نام کامل"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText
                        name="CODE"
                        label="کد"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="NATIONALCODE"
                        label="کد ملی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText
                        name="ENGLISHNAME"
                        label="نام لاتین"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="NATIONALITY"
                        label="ملیت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText
                        name="REGISTERNO"
                        label="شماره ثبت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="BOURSESYMBOL"
                        label="نماد بورس"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText
                        name="NUMBEROFSTOCK"
                        label="تعداد سهام"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="AMOUNTOFSTOCK"
                        label="مبلغ سهام"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputDate
                        name="REGISTERDATE"
                        label="تاريخ ثبت"
                        rules={{ required: "اجباری است" }}
                        time={false}
                    />
                </Col>
                <Col sm={6}>
                    <InputDate
                        name="EXPIREDATE"
                        label="تاريخ انقضاء"
                        rules={{ required: "اجباری است" }}
                        time={false}
                    />
                </Col>
            </Row>
        </div>
    );


    return (<>
        <PopupCurd
            columns={columns}
            title="مدیریت اطلاعات پایه"
            urls={{
                GetId: companyId,
                readUrl: "/Company/Show_ToUser",
                createUrl: "",
                deleteUrl: "",
                editUrl: "/Company/Update"
            }}
            form={form}
        />

    </>);
}