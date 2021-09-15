import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSelect from "../../../partials/editors/InputSelect";
import InputDate from "../../../partials/editors/InputDate";
import CompanyPopupCrud from "../../../partials/editors/Custom/CompanyPopupCrud";

export function Admin(props) {

    const { companyLocalFilter , forceGridUpdate } = props
    

    const columns = [
        {
            field: "COMPANY",
            title: "شرکت",
            width: 140
        },
        {
            field: "CITY",
            title: "شهر",
            width: 140
        },
        {
            field: "TYPETITLE",
            title: "نوع",
            width: 140
        },
        {
            field: "POSTALCODE",
            title: "کد پستی",
            width: 140
        },
        {
            field: "ADDRESS",
            title: "آدرس کامل"
        },
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
                        type="1"
                        enumType="AddressType"
                        name="TYPE"
                        label="نوع"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputSelect
                        controller="CountryDivision"
                        action="GetSelectCity"
                        name="COUNTRYDIVISIONID"
                        label="شهر"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="POSTALCODE"
                        label="کد پستی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText
                        name="ADDRESS"
                        label="آدرس"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="SITE"
                        label="سایت"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText
                        name="DEPUTYPHONE"
                        label="تلفن معاون مالی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="CENTERPHONE"
                        label="مرکز تلفن"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText
                        name="DIRECTORPHONE"
                        label="تلفن دفتر مدیریت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputDate
                        name="FROMDATE"
                        label="از تاریخ"
                        time={true}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputDate
                        name="FROMDATE"
                        label="تا تاریخ"
                        time={true}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="DESCRIPTION"
                        label="توضیحات"
                    />
                </Col>
            </Row>
        </div >
    );
    
    return (<>
        <CompanyPopupCrud
            companyLocalFilter ={companyLocalFilter}
            forceGridUpdate={forceGridUpdate}
            columns={columns}
            title="مدیریت آدرس"
            urls={{
                readUrl: "/CompanyDetail/Show_Address",
                createUrl: "/CompanyDetail/Create_Address",
                deleteUrl: "/CompanyDetail/Delete_Address",
                editUrl: "/CompanyDetail/Update_Address"
            }}
            form={form}
        />

    </>);

}

export function User(props) {
    const companyId = props.companyId;

    const columns = [
        {
            field: "CITY",
            title: "شهر",
            width: 140
        },
        {
            field: "TYPETITLE",
            title: "نوع",
            width: 140
        },
        {
            field: "POSTALCODE",
            title: "کد پستی",
            width: 140
        },
        {
            field: "ADDRESS",
            title: "آدرس کامل"
        },
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <Row>
                <Col sm={6}>
                    <InputSelect
                        controller="CountryDivision"
                        action="GetSelectCity"
                        name="COUNTRYDIVISIONID"
                        label="شهر"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputSelect
                        type="1"
                        enumType="AddressType"
                        name="TYPE"
                        label="نوع"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText
                        name="DIRECTORPHONE"
                        label="تلفن دفتر مدیریت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="POSTALCODE"
                        label="کد پستی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText
                        name="ADDRESS"
                        label="آدرس"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="SITE"
                        label="سایت"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText
                        name="DEPUTYPHONE"
                        label="تلفن معاون مالی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="CENTERPHONE"
                        label="مرکز تلفن"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputDate
                        name="FROMDATE"
                        label="از تاریخ"
                        time={true}
                    />
                </Col>
                <Col sm={6}>
                    <InputDate
                        name="FROMDATE"
                        label="تا تاریخ"
                        time={true}
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
        </div >
    );


    return (<>

        <PopupCurd
            columns={columns}
            title="مدیریت آدرس"
            urls={{
                GetId: companyId,
                readUrl: "/CompanyDetail/Show_Address_ToUser",
                createUrl: "/CompanyDetail/Create_Address",
                deleteUrl: "/CompanyDetail/Delete_Address",
                editUrl: "/CompanyDetail/Update_Address"
            }}
            form={form}
        />

    </>);

}