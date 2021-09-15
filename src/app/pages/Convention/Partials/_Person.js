import React from 'react';
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col, Button } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSelect from "../../../partials/editors/InputSelect";
import InputDate from "../../../partials/editors/InputDate";
import SimpleInputHidden from "../../../partials/editors/Custom/SimpleInputHidden";
import Alert from '@material-ui/lab/Alert';

export function Admin() {
    const columns = [
        {
            field: "COMPANY",
            title: "نام شرکت",
            width: 140
        },
        {
            field: "FULLNAME",
            title: "نام",
            width: 140
        },
        {
            field: "NATIONALCODE",
            title: "کد ملی",
            width: 140
        },
        {
            field: "MOBILE",
            title: "موبایل",
            width: 140
        },
        {
            field: "STATUSTITLE",
            title: "وضعیت",
            width: 140
        }
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <SimpleInputHidden name="personType" value="1" />
            <Row>
                <Col sm={3}>
                    <InputSelect
                        controller="Company"
                        action="GetSelectData"
                        name="COMPANYID"
                        label="شرکت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="FIRSTNAME"
                        label="نام"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="LASTNAME"
                        label="نام خانوادگی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="NATIONALCODE"
                        label="کد ملی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <InputText
                        name="COMPANYSERVICE"
                        label="شرکت محل خدمت"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="CERTIFICATENUMBER"
                        label="شماره شناسنامه"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="JOBPOSITION"
                        label="سمت شغلی"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="MOBILE"
                        label="موبایل"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <InputText
                        name="FATHERNAME"
                        label="نام پدر"
                    />
                </Col>
                <Col sm={3}>
                    <InputSelect
                        controller="CountryDivision"
                        action="GetSelectCity"
                        name="PLACEOFISSUEID"
                        label="محل صدور"
                    />
                </Col>
                <Col sm={3}>
                    <InputSelect
                        type="1"
                        enumType="InsuranceType"
                        name="INSURANCETYPE"
                        label="نوع بیمه"
                    />
                </Col>
                <Col sm={3}>
                    <InputSelect
                        type="1"
                        enumType="InsuranceStatus"
                        name="INSURANCESTATUS"
                        label="وضعیت بیمه"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <InputSelect
                        type="1"
                        enumType="Grade"
                        name="GRADE"
                        label="مدرک"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="FIELDOFSTUDY"
                        label="رشته تحصیلی"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="UNIVERSITY"
                        label="دانشگاه"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="YEAROFGRADUATION"
                        label="سال اخذ مدرک"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <InputDate
                        name="ENDCOOPERATION"
                        label="تاریخ پایان کار"
                        time={false}
                    />
                </Col>
                <Col sm={3}>
                    <InputDate
                        name="STARTCOOPERATION"
                        label="تاریخ شروع به کار"
                        time={false}
                    />
                </Col>
                <Col sm={3}>
                    <InputDate
                        name="BIRTHDATE"
                        label="تاریخ تولد"
                        time={false}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="ADDRESS"
                        label="آدرس"
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
                        controller="Company"
                        action="GetSelectData"
                        name="company"
                        label="شرکت"
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

        <PopupCurd
            columns={columns}
            title="مدیریت اشخاص حقیقی"
            urls={{
                GetId: "1",
                readUrl: "/Individual/Show",
                createUrl: "/Individual/Create_Accept",
                deleteUrl: "/Individual/Delete",
                editUrl: "/Individual/Update_Accept"
            }}
            form={form}
            searchForm={searchForm}
        />

    </>);
}

export function User(props) {

    const companyId = props.companyId;

    let columns = [
        {
            field: "FULLNAME",
            title: "نام",
            width: 140
        },
        {
            field: "NATIONALCODE",
            title: "کد ملی",
            width: 140
        },
        {
            field: "COMPANYSERVICE",
            title: "شرکت محل خدمت",
            width: 140
        },
        {
            field: "STATUSTITLE",
            title: "وضعیت",
            width: 140
        }
    ]


    columns.unshift({
        title: "وضعیت",
        template: (item) => (
            item.STATUS === "Waiting" ? <Alert severity="warning" color="warning"> {item.STATUSTITLE}</Alert> :
                item.STATUS === "Accept" ? <Alert severity="success" color="success"> {item.STATUSTITLE}</Alert> :
                    item.STATUS === "Reject" ? <Alert severity="error" color="error"> {item.STATUSTITLE}</Alert> :
                        <Alert severity="success" color="success">-</Alert>
        ),
        width: 100
    })

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <SimpleInputHidden name="personType" value="1" />
            <Row>
                <Col sm={3}>
                    <InputText
                        name="FIRSTNAME"
                        label="نام"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="LASTNAME"
                        label="نام خانوادگی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="NATIONALCODE"
                        label="کد ملی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputDate
                        name="BIRTHDATE"
                        label="تاریخ تولد"
                        time={false}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <InputText
                        name="COMPANYSERVICE"
                        label="شرکت محل خدمت"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="CERTIFICATENUMBER"
                        label="شماره شناسنامه"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="JOBPOSITION"
                        label="سمت شغلی"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="MOBILE"
                        label="موبایل"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <InputText
                        name="FATHERNAME"
                        label="نام پدر"
                    />
                </Col>
                <Col sm={3}>
                    <InputSelect
                        controller="CountryDivision"
                        action="GetSelectCity"
                        name="PLACEOFISSUEID"
                        label="محل صدور"
                    />
                </Col>
                <Col sm={3}>
                    <InputSelect
                        type="1"
                        enumType="InsuranceType"
                        name="INSURANCETYPE"
                        label="نوع بیمه"
                    />
                </Col>
                <Col sm={3}>
                    <InputSelect
                        type="1"
                        enumType="InsuranceStatus"
                        name="INSURANCESTATUS"
                        label="وضعیت بیمه"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <InputSelect
                        type="1"
                        enumType="Grade"
                        name="GRADE"
                        label="مدرک"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="FIELDOFSTUDY"
                        label="رشته تحصیلی"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="UNIVERSITY"
                        label="دانشگاه"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="YEAROFGRADUATION"
                        label="سال اخذ مدرک"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <InputDate
                        name="ENDCOOPERATION"
                        label="تاریخ پایان کار"
                        time={false}
                    />
                </Col>
                <Col sm={3}>
                    <InputDate
                        name="STARTCOOPERATION"
                        label="تاریخ شروع به کار"
                        time={false}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="ADDRESS"
                        label="آدرس"
                    />
                </Col>
            </Row>
        </div>
    );

    const searchForm = (
        <>
            <Row>
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
        <PopupCurd
            columns={columns}
            title="مدیریت اشخاص حقیقی"
            urls={{
                GetId: companyId,
                readUrl: "/Individual/Show_Person_To_User",
                createUrl: "/Individual/Create_Waiting",
                deleteUrl: "/Individual/Delete",
                editUrl: "/Individual/Update_For_User"
            }}
            form={form}
            searchForm={searchForm}
        />
    </>);
}