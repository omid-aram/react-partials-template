import React from "react"
import { Button, Col, Row } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import PopupCurd from "./PopupCrud";
const ConventionRpt = () => {


    const columns = [
        {
            field: "COMPANYNAME",
            title: "نام شرکت",
            width: 140
        },
        {
            field: "CONVENTIONCOUNT",
            title: "تعداد مجامع",
            width: 140
        },
        {
            field: "AGENDACOUNT",
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

    const form = () => (
        <></>
    );

    return (<>
        <PopupCurd
            columns={columns}
            title=""
            urls={{
                readUrl: "/Report/Convention",
                createUrl: "",
                deleteUrl: "",
                editUrl: ""
            }}
            form={form}
            searchForm={searchForm}
        />
    </>);
}

export default ConventionRpt;