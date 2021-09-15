import React from "react"
import { Row, Col, Button } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/Custom/SimpleInputHidden";
import PopupCrud from "./PopupCrud"
import InputSelect from "../../../partials/editors/InputSelect";
import InputDate from "../../../partials/editors/InputDate";

const Accept = () => {



    const columns = [
        {
            field: "fullName",
            title: "نام ",
            width: 140
        },
        {
            field: "personTypeDesc",
            title: "نوع",
            width: 140
        },
        {
            field: "address",
            title: "آدرس",
            width: 140
        }
    ]


    const form = () => (
        <div className="form-container">
            <InputHidden name="id" />
            <SimpleInputHidden name="personType" value="1" />
            <SimpleInputHidden name="personStatus" value="1" />
            <Row>
                <Col sm={3}>
                    <InputSelect
                        controller="Company"
                        action="GetSelectData"
                        name="companyId"
                        label="شرکت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="firstName"
                        label="نام"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="lastName"
                        label="نام خانوادگی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="nationalCode"
                        label="کد ملی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <InputText
                        name="companyService"
                        label="شرکت محل خدمت"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="certificateNumber"
                        label="شماره شناسنامه"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="jobPosition"
                        label="سمت شغلی"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="mobile"
                        label="موبایل"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <InputText
                        name="fatherName"
                        label="نام پدر"
                    />
                </Col>
                <Col sm={3}>
                    <InputSelect
                        controller="CountryDivision"
                        action="GetSelectCity"
                        name="placeOfIssueId"
                        label="محل صدور"
                    />
                </Col>
                <Col sm={3}>
                    <InputSelect
                        type="1"
                        enumType="InsuranceType"
                        name="insuranceType"
                        label="نوع بیمه"
                    />
                </Col>
                <Col sm={3}>
                    <InputSelect
                        type="1"
                        enumType="InsuranceStatus"
                        name="insuranceStatus"
                        label="وضعیت بیمه"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <InputSelect
                        type="1"
                        enumType="Grade"
                        name="grade"
                        label="مدرک"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="fieldOfStudy"
                        label="رشته تحصیلی"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="university"
                        label="دانشگاه"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="yearOfGraduation"
                        label="سال اخذ مدرک"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <InputDate
                        name="endCooperation"
                        label="تاریخ پایان کار"
                        time={false}
                    />
                </Col>
                <Col sm={3}>
                    <InputDate
                        name="startCooperation"
                        label="تاریخ شروع به کار"
                        time={false}
                    />
                </Col>
                <Col sm={3}>
                    <InputDate
                        name="birthDate"
                        label="تاریخ تولد"
                        time={false}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="address"
                        label="آدرس"
                    />
                </Col>
            </Row>
        </div>
    );

    const secondForm = () => (
        <div className="form-container">
            <InputHidden name="id" />
            <SimpleInputHidden name="personType" value="2" />
            <SimpleInputHidden name="personStatus" value="1" />
            <Row>
                <Col sm={3}>
                    <InputSelect
                        controller="Company"
                        action="GetSelectData"
                        name="companyId"
                        label="شرکت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="title"
                        label="نام"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="registerNumber"
                        label="شماره ثبت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="bourseSymbol"
                        label="نماد بورسی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <InputText
                        name="address"
                        label="آدرس"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
        </div>
    );

    const searchForm = (
        <>
            <Row>
                <Col md={3}>
                    <InputSelect
                        controller="Individual"
                        action="GetSelectPersonType"
                        name="type"
                        label="نوع"
                    />
                </Col>
                <Col md={3}>
                    <InputText
                        name="nationalCode"
                        label="کد ملی"
                    />
                </Col>
                <Col md={3}>
                    <InputText
                        name="name"
                        label="نام و نام خانوادگی"
                    />
                </Col>
                <Col sm={3}>
                    <Button variant="btn btn-outline-dark" type="submit">
                        <i className="fa fa-search" />
                        جستجو
                        </Button>
                </Col>
            </Row>
        </>
    );

    return (<>
        <PopupCrud
            columns={columns}
            title="مدیریت در انتظار"
            urls={{
                readUrl: "/Individual/Show_Accept",
                deleteUrl: "/Individual/Delete",
                editUrl: "/Individual/Update_Accept"
            }}
            form={form}
            secondForm={secondForm}
            searchForm={searchForm}
        />

    </>);
}

export default Accept;