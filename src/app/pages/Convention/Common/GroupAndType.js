import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";
import InputSelect from "../../../partials/editors/InputSelect";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import { Button } from "react-bootstrap";


const GroupAndType = () => {


    const columns = [
        {
            field: "TYPEDESC",
            title: "نوع",
            width: 50
        },
        {
            field: "VALUE",
            title: "شرح",
            width: 50
        },
    ]

    const form = () => (
        <>
            <InputHidden name="ID" />
            <Row>
                <Col sm={6}>
                    <InputSelect
                        controller="BaseValue"
                        action="GetSelectData"
                        name="TYPE"
                        label="نوع"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="VALUE"
                        label="مقدار"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
        </>
    );


    const searchForm = (
        <>
            <Row>
                <Col md={3}>
                    <InputSelect
                        controller="BaseValue"
                        action="GetSelectData"
                        name="type"
                        label="نوع"
                    />
                </Col>
                <Col md={3}>
                    <InputText
                        name="value"
                        label="مقدار"
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
            title="مقادیر پایه"
            urls={{
                readUrl: "/BaseValue/Show",
                createUrl: "/BaseValue/Create",
                deleteUrl: "/BaseValue/Delete",
                editUrl: "/BaseValue/Update"
            }}
            form={form}
            searchForm={searchForm}
        />

    </>);
}

export default GroupAndType;