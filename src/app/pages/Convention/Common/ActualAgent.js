import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col, Button } from "react-bootstrap";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSelect from "../../../partials/editors/InputSelect";
import InputDate from "../../../partials/editors/InputDate";
import InputRadio from "../../../partials/editors/InputRadio";

const ActualAgent = () => {



    const columns = [
        {
            field: "COMPANY",
            title: "شرکت",
            width: 140
        },
        {
            field: "PERSONAGENT",
            title: "نام نماینده"
        },
        {
            field: "POSTTITLE",
            title: "سمت"
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
                        controller="Individual"
                        action="GetSelectActual"
                        name="INDIVIDUALAGENTID"
                        label="نام نماینده"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputSelect
                        type="1"
                        enumType="PostType"
                        name="POSTTYPE"
                        label="سمت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputDate
                        name="FROMDATE"
                        label="از تاریخ"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputDate
                        name="TODATE"
                        label="تا تاریخ"
                    />
                </Col>
                <Col sm={6}>
                    <InputRadio
                        name="AGENTTYPE" //string value
                        label=""
                        items={[
                            { place: 'End', value: 'Bound', label: 'موظف' },
                            { place: 'End', value: 'NotBound', label: 'غیر موظف' }]}
                        rules={{ required: "اجباری است" }} />
                </Col>
            </Row>
        </div >
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
                    <InputSelect
                        controller="Individual"
                        action="GetSelectActual"
                        name="individualAgentId"
                        label="نام نماینده"
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
            title="مدیریت نمایندگان حقیقی"
            urls={{
                readUrl: "/CompanyAgent/Show_Actual",
                createUrl: "/CompanyAgent/Create",
                deleteUrl: "/CompanyAgent/Delete",
                editUrl: "/CompanyAgent/Update"
            }}
            form={form}
            searchForm={searchForm}
        />

    </>);
}

export default ActualAgent;