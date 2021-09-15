import React from 'react';
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col, Button } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSelect from "../../../partials/editors/InputSelect";

export function Admin() {

    const columns = [
        {
            field: "CODE",
            title: "کد",
            width: 140
        },
        {
            field: "COMPANYVALUE",
            title: "نام شرکت",
            width: 140
        },
        {
            field: "LOCATION",
            title: "موقعيت",
            width: 140
        },
        {
            field: "SALOON",
            title: "سالن",
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
                        name="CODE"
                        label="کد"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText
                        name="LOCATION"
                        label="موقعيت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="SALOON"
                        label="سالن"
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
                        name="code"
                        label="کد"
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
            title="مدیریت خط تولید"
            urls={{
                readUrl: "/ProductionLine/Show",
                createUrl: "/ProductionLine/Create",
                deleteUrl: "/ProductionLine/Delete",
                editUrl: "/ProductionLine/Update"
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
            field: "LOCATION",
            title: "موقعيت",
            width: 140
        },
        {
            field: "SALOON",
            title: "سالن",
            width: 140
        }
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <Row>
                <Col sm={4}>
                    <InputText
                        name="CODE"
                        label="کد"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="LOCATION"
                        label="موقعيت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="SALOON"
                        label="سالن"
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
                        name="code"
                        label="کد"
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
            title="مدیریت خط تولید"
            urls={{
                GetId: companyId,
                readUrl: "/ProductionLine/Show_To_User",
                createUrl: "/ProductionLine/Create",
                deleteUrl: "/ProductionLine/Delete",
                editUrl: "/ProductionLine/Update"
            }}
            form={form}
            searchForm={searchForm}
        />

    </>);
}
