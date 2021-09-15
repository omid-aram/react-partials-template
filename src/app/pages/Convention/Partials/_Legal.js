import React from 'react';
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col, Button } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSelect from "../../../partials/editors/InputSelect";
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
            title: "عنوان",
            width: 140
        },
        {
            field: "REGISTERNUMBER",
            title: "شماره ثبت",
            width: 140
        },
        {
            field: "BOURSESYMBOL",
            title: "نماد بورسی",
            width: 140
        },
        {
            field: "ADDRESS",
            title: "آدرس",
            width: 140
        },
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <SimpleInputHidden name="personType" value="2" />
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
                        name="TITLE"
                        label="عنوان"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="REGISTERNUMBER"
                        label="شماره ثبت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="BOURSESYMBOL"
                        label="نماد بورسی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <InputText
                        name="ADDRESS"
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
                        controller="Company"
                        action="GetSelectData"
                        name="company"
                        label="شرکت"
                    />
                </Col>
                <Col md={3}>
                    <InputText
                        name="registerNumber"
                        label="َشماره ثبت"
                    />
                </Col>
                <Col md={3}>
                    <InputText
                        name="name"
                        label="عنوان"
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
            title="مدیریت اشخاص حقوقی"
            urls={{
                GetId: "2",
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

    const columns = [
        {
            field: "FULLNAME",
            title: "عنوان",
            width: 140
        },
        {
            field: "REGISTERNUMBER",
            title: "شماره ثبت",
            width: 140
        },
    ]

    columns.unshift({
        title: "وضعیت",
        template: (item) => (
            item.status === "Waiting" ? <Alert severity="warning" color="warning"> {item.statusTitle}</Alert> :
                item.status === "Accept" ? <Alert severity="success" color="success"> {item.statusTitle}</Alert> :
                    item.status === "Reject" ? <Alert severity="error" color="error"> {item.statusTitle}</Alert> :
                        <Alert severity="success" color="success">-</Alert>
        ),
        width: 100
    })

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <SimpleInputHidden name="personType" value="2" />
            <Row>
                <Col sm={4}>
                    <InputText
                        name="TITLE"
                        label="عنوان"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="REGISTERNUMBER"
                        label="شماره ثبت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="BOURSESYMBOL"
                        label="نماد بورسی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <InputText
                        name="ADDRESS"
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
                    <InputText
                        name="registerNumber"
                        label="َشماره ثبت"
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
            title="مدیریت اشخاص حقوقی"
            urls={{
                GetId: companyId,
                readUrl: "/Individual/Show_Legal_To_User",
                createUrl: "/Individual/Create_Waiting",
                deleteUrl: "/Individual/Delete",
                editUrl: "/Individual/Update_For_User"
            }}
            form={form}
            searchForm={searchForm}
        />

    </>);
}