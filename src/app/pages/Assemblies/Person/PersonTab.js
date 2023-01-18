import React from 'react'
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputText from "../../../partials/editors/InputText";
import InputNumber from "../../../partials/editors/InputNumber";
import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";
import InputDate from "../../../partials/editors/InputDate";
import InputSelect from "../../../partials/editors/InputSelect";

const PersonTab = () => {

    const columns = [
        {
            field: "personTypeDesc",
            title: "نوع شخص",
            width: 140
        },
        {
            field: "title",
            title: "عنوان",
        },
        {
            field: "nationalId",
            title: "کد ملی",
        },
        {
            field: "birthDateFa",
            title: "تاریخ تولد",
        },
        {
            field: "fatherName",
            title: "نام پدر",
        },
        {
            field: "idNo",
            title: "شماره شناسنامه",
        },
        {
            field: "eduField",
            title: "رشته تحصیلی",
        },
        {
            field: "personStatusDesc",
            title: "وضعیت",
        },
    ]

    const formfg = () => (
        <>
            <InputHidden name="id" />
            <SimpleInputHidden name="personType" value="1" />
            <Row>
                <Col sm={4}>
                    <InputText
                        name="firstName"
                        label="نام"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="lastName"
                        label="نام خانوادگي"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputNumber
                        name="nationalId"
                        label="کد ملي"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="fatherName"
                        label="نام پدر"
                    />
                </Col>
                <Col sm={4}>
                    <InputDate
                        name="birthDate"
                        label="تاريخ تولد"
                    />
                </Col>
                <Col sm={4}>
                    <InputNumber
                        name="idNo"
                        label="شماره شناسنامه"
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="birthPlace"
                        label="محل صدور"
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="insuranceType"
                        label="نوع بيمه"
                    />
                </Col>
                <Col sm={4}>
                    <InputSelect
                        type="select"
                        enumType="InsuranceStatus"
                        name="insuranceStatus"
                        label="وضعيت بيمه"
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="eduGrade"
                        label="مقطع تحصيلي"
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="eduField"
                        label="رشته تحصيلي / گرايش"
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="university"
                        label="دانشگاه محل تحصيل"
                    />
                </Col>
                <Col sm={4}>
                    <InputNumber
                        name="graduationYear"
                        label="سال اخذ مدرک"
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="jobCompany"
                        label="شرکت محل خدمت"
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="jobTitle"
                        label="سمت/عنوان پست"
                    />
                </Col>
                <Col sm={4}>
                    <InputDate
                        name="jobDateFrom"
                        label="مدت اشتغال از تاريخ"
                    />
                </Col>
                <Col sm={4}>
                    <InputDate
                        name="jobDateTo"
                        label="تا تاريخ"
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
            pageSize={10}
            title="اشخاص حقیقی"
            sortItem="id"
            urls={{
                readUrl: "/AsmPerson/GetPaginated",
                createUrl: "/AsmPerson/Create",
                //deleteUrl: "/AsmPerson/Delete",
                editUrl: "/AsmPerson/Update",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{personType: 1}}
        />

    </>);
}
export default PersonTab;