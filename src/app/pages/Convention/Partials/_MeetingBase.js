import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col, Button } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputDate from "../../../partials/editors/InputDate";
import InputSelect from "../../../partials/editors/InputSelect";
import InputSwitch from "../../../partials/editors/InputSwitch";
import { Button as MatBtn } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { passIdsActions } from "../../../store/ducks/passIds.duck";

export function Admin() {

    const columns = [
        {
            field: "NUMBER",
            title: "شماره",
            width: 80
        },
        {
            field: "COMPANY",
            title: "شرکت",
            width: 70
        },
        {
            field: "TYPETITLE",
            title: "نوع مجمع",
            width: 90
        },
        {
            field: "PERSIANREVIEWDATE",
            title: "تاریخ",
            width: 40
        }
    ]


    const dispatch = useDispatch();
    const url = useHistory();

    const detailHandler = (id, action) => {
        dispatch(passIdsActions.fetchMeetingId(id));
        url.push("/" + action);
    }



    columns.push({
        title: "عملیات",
        template: (item) => (
            <>
                <MatBtn variant="outlined" className="ml-1" size="small" onClick={() => detailHandler(item.ID, "Directorate")} color="primary">رئیس و بازرس</MatBtn>
                <MatBtn variant="outlined" className="ml-1" size="small" onClick={() => detailHandler(item.ID, "Agenda")} color="primary">دستور جلسه</MatBtn>
                <MatBtn variant="outlined" className="ml-1" size="small" onClick={() => detailHandler(item.ID, "Announcement")} color="primary">آگهی</MatBtn>
            </>
        ),
        width: 200
    })

    const form = () => (
        <div className="form-container">
            <InputHidden name="id" />
            <Row>
                <Col sm={4}>
                    <InputSelect
                        controller="Company"
                        action="GetSelectData"
                        name="COMPANYID"
                        label="شرکت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
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
                    <InputSelect
                        type="1"
                        enumType="ConventionType"
                        name="TYPE"
                        label="نوع مجمع"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={4}>
                    <InputText
                        name="NUMBER"
                        label="شماره"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputDate
                        name="FROMDATE"
                        label="تاریخ "
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="ADDRESS"
                        label="محل برگزاری مجمع"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={4}>
                    <InputDate
                        name="REVIEWDATE"
                        label="تاریخ بازنگری"
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="DESCRIPTION"
                        label="شرح"
                    />
                </Col>
                <Col sm={4}>
                    <InputSwitch
                        name="BREATHE"
                        label="تنفس" />
                </Col>
            </Row>
        </div>
    );

    const searchForm = (
        <>
            <Row>
                <Col md={2}>
                    <InputSelect
                        controller="Company"
                        action="GetSelectData"
                        name="company"
                        label="شرکت"
                    />
                </Col>
                <Col md={2}>
                    <InputSelect
                        type="1"
                        enumType="ConventionType"
                        name="type"
                        label="نوع مجمع"
                    />
                </Col>
                <Col md={2}>
                    <InputText
                        name="number"
                        label="شماره مجمع"
                    />
                </Col>
                <Col sm={2}>
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
            title="مدیریت اطلاعات مجامع"
            urls={{
                readUrl: "/Convention/Show",
                createUrl: "/Convention/Create",
                deleteUrl: "/Convention/Delete",
                editUrl: "/Convention/Update"
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
            field: "NUMBER",
            title: "شماره",
            width: 80
        },
        {
            field: "TYPETITLE",
            title: "نوع مجمع",
            width: 90
        },
        {
            field: "PERSIANREVIEWDATE",
            title: "تاریخ",
            width: 40
        }
    ]

    const dispatch = useDispatch();
    const url = useHistory();

    const detailHandler = (id, action) => {
        dispatch(passIdsActions.fetchMeetingId(id));
        url.push("/" + action);
    }


    columns.push({
        title: "عملیات",
        template: (item) => (
            <>
                <MatBtn variant="outlined" className="ml-1" size="small" onClick={() => detailHandler(item.ID, "Directorate")} color="primary">رئیس و بازرس</MatBtn>
                <MatBtn variant="outlined" className="ml-1" size="small" onClick={() => detailHandler(item.ID, "Agenda")} color="primary">دستور جلسه</MatBtn>
                <MatBtn variant="outlined" className="ml-1" size="small" onClick={() => detailHandler(item.ID, "Announcement")} color="primary">آگهی</MatBtn>
            </>
        ),
        width: 200
    })

    const form = () => (
        <div className="form-container">
            <InputHidden name="id" />
            <Row>
                <Col sm={3}>
                    <InputSelect
                        controller="CompanyDetail"
                        action="GetSelectFinancialYear"
                        name="COMPANYFINANCIALYEARID"
                        label="سال مالی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputSelect
                        type="1"
                        enumType="ConventionType"
                        name="TYPE"
                        label="نوع مجمع"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="NUMBER"
                        label="شماره"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputDate
                        name="FROMDATE"
                        label="تاریخ "
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <InputText
                        name="ADDRESS"
                        label="محل برگزاری مجمع"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputDate
                        name="REVIEWDATE"
                        label="تاریخ بازنگری"
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="DESCRIPTION"
                        label="شرح"
                    />
                </Col>
                <Col sm={3}>
                    <InputSwitch
                        name="BREATHE"
                        label="تنفس" />
                </Col>
            </Row>
        </div>
    );

    const searchForm = (
        <>
            <Row>
                <Col md={3}>
                    <InputSelect
                        type="1"
                        enumType="ConventionType"
                        name="type"
                        label="نوع مجمع"
                    />
                </Col>
                <Col md={3}>
                    <InputText
                        name="number"
                        label="شماره مجمع"
                    />
                </Col>
                <Col sm={2}>
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
            title="مدیریت اطلاعات مجامع"
            urls={{
                GetId: companyId,
                readUrl: "/Convention/Show_ToUser",
                createUrl: "/Convention/Create",
                deleteUrl: "/Convention/Delete",
                editUrl: "/Convention/Update"
            }}
            form={form}
            searchForm={searchForm}
        />

    </>);


}