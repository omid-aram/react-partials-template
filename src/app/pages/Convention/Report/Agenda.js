import React from "react"
import PopupCurd from "./PopupCrud"
import { Button, Col, Row } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";

const AgendaRpt = () => {


    const columns = [
        {
            field: "COMPANYNAME",
            title: "نام شرکت",
            width: 140
        },
        {
            field: "BOARDMEETINGCOUNT",
            title: "تعداد صورت جلسات",
            width: 140
        },
        {
            field: "BOARDOFDIRECTORCOUNT",
            title: "تعداد دستور جلسه",
            width: 140
        }
    ]


    const searchForm = (
        <>
            <Row>
                <Col md={4}>
                    <InputText
                        name="company"
                        label="نام شرکت"
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
            title="نمایش گزارشات"
            urls={{
                readUrl: "/Report/Agenda",
            }}
            searchForm={searchForm}
        />

    </>);
}

export default AgendaRpt;