import React from 'react'
import PopupCurd from "../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputText from "../../partials/editors/InputText";
import InputHidden from "../../partials/editors/InputHidden";
import InputSelect from "../../partials/editors/InputSelect";
import InputDate from "../../partials/editors/InputDate";
import CompDetails from "../Assemblies/Company/CompDetails";


const ServiceCrud = () => {

    const columns = [
        {
            field: "code",
            title: "كد شركت",
            sortable: true,
            sortField: "code.Length, code",
            width: 70,
        },
        {
            field: "name",
            title: "نام شرکت",
            style: {color: 'blue'},
            sortable: true,
        },
        {
            field: "companyTypeDesc",
            title: "نوع",
            style: {fontWeight: 'bold'},
            sortable: true,
            sortField: "companyType",
        },
        {
            field: "nationalCode",
            title: "شناسه ملی / کد اقتصادی",
            sortable: true,
        },
        {
            field: "registerNo",
            title: "ش ثبت",
            sortable: true,
        },
        {
            field: "stockCode",
            title: "کد بورس",
            sortable: true,
        },
        {
            field: "registerDateFa",
            title: "تاریخ تاسیس",
            sortable: true,
            sortField: "registerDate",
        },
        {
            field: "shareCount",
            title: "تعداد سهام",
            sortable: true,
            comma1000: true,
        },
        {
            field: "sharePrice",
            title: "مبلغ هر سهم",
            sortable: true,
            comma1000: true,
        },
        {
            field: "terminateDateFa",
            title: "تاریخ انحلال",
            sortable: true,
            sortField: "terminateDate",
        },
        {
            field: "nation",
            title: "ملیت",
            sortable: true,
        },
        {
            field: "companyGroupName",
            title: "گروه",
            sortable: true,
            sortField: "CompanyGroupId",
        },
    ]

    const formfg = () => (
        <>
            <InputHidden name="id" />
            <Row>
                <Col sm={6}>
                    <InputText
                        name="name"
                        label="نام شرکت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="code"
                        label="كد شركت"
                        type="digit"
                    />
                </Col>
                <Col sm={3}>
                    <InputSelect
                        type="select"
                        enumType="CompanyType"
                        name="companyType"
                        label="نوع"
                    />
                </Col>
                <Col sm={3}>
                    <InputSelect
                        name="companyGroupId"
                        label="گروه"
                        apiUrl="/CompanyGroup/GetAll"
                        textField="name"
                        valueField="id"
                        // serverBinding={{
                        //     url: '/CompanyGroup/GetAll',
                        //     filter: {},
                        //     textField: 'name',
                        //     valueField: 'id'
                        // }}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="nationalCode"
                        label="شناسه ملی / کد اقتصادی"
                        type="digit"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="registerNo"
                        label="شماره ثبت"
                        type="digit"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="stockCode"
                        label="کد بورس"
                    />
                </Col>
                <Col sm={3}>
                    <InputDate
                        name="registerDate"
                        label="تاریخ تاسیس"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="shareCount"
                        label="تعداد سهام"
                        type="digit3"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="sharePrice"
                        label="مبلغ هر سهم"
                        type="digit3"
                    />
                </Col>
                <Col sm={3}>
                    <InputDate
                        name="terminateDateFa"
                        label="تاریخ انحلال"
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="fullName"
                        label="نام کامل شرکت"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="nation"
                        label="ملیت"
                    />
                </Col>
                <Col sm={6} >
                    <InputText
                        name="nameEn"
                        label="نام انگلیسی شرکت"
                        style={{ direction: 'ltr' }}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="detCode"
                        label="كد تفصیلی"
                    />
                </Col>
            </Row>
        </>
    );

    return (<>

        <PopupCurd
            columns={columns}
            pageSize={10}
            title="اطلاعات شرکت ها"
            sortItem="code.Length, code asc, id"
            urls={{
                readUrl: "/Company/GetPaginated",
                createUrl: "/Company/Create",
                //deleteUrl: "/Company/Delete",
                editUrl: "/Company/Update",
                detailUrl: "modal",
            }}
            form={formfg}
            
            detailForm={<CompDetails />}
            detailSize="xl"
            detailTitle="@code - @name"
        //searchForm={searchForm}
        />

    </>);
}

export default ServiceCrud;