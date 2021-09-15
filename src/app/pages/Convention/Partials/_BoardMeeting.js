import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Button, Col, Row } from "react-bootstrap";
import InputHidden from "../../../partials/editors/InputHidden";
import InputText from "../../../partials/editors/InputText";
import InputSelect from "../../../partials/editors/InputSelect";
import InputDate from "../../../partials/editors/InputDate";
import { useHistory } from "react-router-dom";
import { Button as MatBtn } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { passIdsActions } from "../../../store/ducks/passIds.duck";

export function Admin() {

    const dispatch = useDispatch();
    const url = useHistory();

    const detailHandler = (id, action) => {
        dispatch(passIdsActions.fetchBoardMeetingId(id));
        url.push("/" + action);
    }

    const columns = [
        {
            field: "CODE",
            title: "شماره جلسه",
            width: 70
        },
        {
            field: "COMPANY",
            title: "نام شرکت",
            width: 80
        },
        {
            field: "DESCRIPTION",
            title: "شرح جلسه",
            width: 70
        }
    ]

    columns.push({
        title: "عملیات",
        template: (item) => (
            <>
                <MatBtn variant="outlined" size="small" onClick={() => detailHandler(item.ID, "BoardAgenda")} color="primary">دستور جلسه</MatBtn>
                <MatBtn variant="outlined" size="small" onClick={() => detailHandler(item.ID, "DirectoratePresentInMeeting")} color="primary">اعضای هیئت مدیره حاضر در جلسه</MatBtn>
            </>
        ),
        width: 100
    })

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <Row>
                <Col sm={3}>
                    <InputText
                        name="CODE"
                        label="شماره جلسه"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputSelect
                        controller="company"
                        action="GetSelectData"
                        name="COMPANYID"
                        label="شرکت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="SECRETARY"
                        label="دبیر جلسه"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputDate
                        name="DATE"
                        label="تاریخ جلسه"
                        time={false}
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <InputText
                        name="DESCRIPTION"
                        label="شرح جلسه"
                        rules={{ required: "اجباری است" }}
                    />
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
                    <InputText
                        name="code"
                        label="شماره جلسه"
                    />
                </Col>
                <Col md={2}>
                    <InputText
                        name="secretary"
                        label="دبیر جلسه"
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
            title="مدیریت جلسات هیئت مدیره"
            urls={{
                readUrl: "/BoardMeeting/Show",
                createUrl: "/BoardMeeting/Insert",
                deleteUrl: "/BoardMeeting/Delete",
                editUrl: "/BoardMeeting/Update"
            }}
            form={form}
            searchForm={searchForm}
        />

    </>);

}


export function User(props) {
    const companyId = props.companyId;

    const dispatch = useDispatch();
    const detailHandler = (id, action) => {
        dispatch(passIdsActions.fetchBoardMeetingId(id));
        url.push("/" + action);
    }

    const columns = [
        {
            field: "CODE",
            title: "شماره جلسه",
            width: 70
        },
        {
            field: "SECRETARY",
            title: "دبیر جلسه",
            width: 70
        },
        {
            field: "PERSIANDATE",
            title: "تاریخ جلسه",
            width: 70
        },
        {
            field: "DESCRIPTION",
            title: "شرح جلسه",
            width: 70
        }
    ]


    const url = useHistory();

    columns.push({
        title: "عملیات",
        template: (item) => (
            <>
                <MatBtn variant="outlined" size="small" onClick={() => detailHandler(item.id, "BoardAgenda")} color="primary">دستور جلسه</MatBtn>
            </>
        ),
        width: 100
    })

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <Row>
                <Col sm={3}>
                    <InputText
                        name="CODE"
                        label="شماره جلسه"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="SECRETARY"
                        label="دبیر جلسه"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputDate
                        name="DATE"
                        label="تاریخ جلسه"
                        time={false}
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="DESCRIPTION"
                        label="شرح جلسه"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
        </div>
    );


    const searchForm = (
        <>
            <Row>
                <Col md={2}>
                    <InputText
                        name="code"
                        label="شماره جلسه"
                    />
                </Col>
                <Col md={2}>
                    <InputText
                        name="secretary"
                        label="دبیر جلسه"
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
            title="مدیریت جلسات هیئت مدیره"
            urls={{
                GetId: companyId,
                readUrl: "/BoardMeeting/Show_ToUser",
                createUrl: "/BoardMeeting/Insert",
                deleteUrl: "/BoardMeeting/Delete",
                editUrl: "/BoardMeeting/Update"
            }}
            form={form}
            searchForm={searchForm}
        />

    </>);

}

