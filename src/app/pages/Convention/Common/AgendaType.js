import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col, Button } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";



const AgendaType = () => {


    const columns = [
        {
            field: "CODE",
            title: "کد",
            width: 140
        },
        {
            field: "NAME",
            title: "نام دستور جلسه",
            width: 140
        }
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <Row>
                <Col sm={6}>
                    <InputText
                        name="CODE"
                        label="کد"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="NAME"
                        label="نوع"
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
                        name="code"
                        label="کد"
                    />
                </Col>
                <Col md={3}>
                    <InputText
                        name="name"
                        label="نام دستور جلسه "
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
            title="مدیریت نوع دستور جلسه"
            urls={{
                readUrl: "/AgendaType/Show",
                createUrl: "/AgendaType/Create",
                deleteUrl: "/AgendaType/Delete",
                editUrl: "/AgendaType/Update"
            }}
            form={form}
            searchForm={searchForm}
        />

    </>);
}

export default AgendaType;