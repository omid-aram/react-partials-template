import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSelect from "../../../partials/editors/InputSelect";
import InputDate from "../../../partials/editors/InputDate";
import CompanyPopupCrud from "../../../partials/editors/Custom/CompanyPopupCrud";

export function Admin(props) {

    const { companyLocalFilter, forceGridUpdate } = props

    const columns = [
        {
            field: "COMPANY",
            title: "شرکت",
            width: 140
        },
        {
            field: "NAME",
            title: "عنوان فعالیت",
            width: 140
        },
        {
            field: "PERSIANDATE",
            title: "تاریخ فعالیت",
            width: 140
        },
        {
            field: "YEAR",
            title: "سال فعالیت",
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
                        name="NAME"
                        label="عنوان فعالیت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputDate
                        name="DATE"
                        label="تاریخ فعالیت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="YEAR"
                        label="سال فعالیت"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText
                        name="BODY"
                        label="شرح فعالیت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="DESCRIPTION"
                        label="توضیحات"
                    />
                </Col>
            </Row>
        </div>
    );


    return (<>

        <CompanyPopupCrud
            companyLocalFilter={companyLocalFilter}
            forceGridUpdate={forceGridUpdate}
            columns={columns}
            title="مدیریت فعالیت ها"
            urls={{
                readUrl: "/CompanyDetail/Show_Activity",
                createUrl: "/CompanyDetail/Create_Activity",
                deleteUrl: "/CompanyDetail/Delete_Activity",
                editUrl: "/CompanyDetail/Update_Activity"
            }}
            form={form}
        />

    </>);

}

export function User(props) {
    const companyId = props.companyId;


    const columns = [
        {
            field: "NAME",
            title: "عنوان فعالیت",
            width: 140
        },
        {
            field: "PERSIANDATE",
            title: "تاریخ فعالیت",
            width: 140
        },
        {
            field: "YEAR",
            title: "سال فعالیت",
            width: 140
        }
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="id" />
            <Row>
                <Col sm={6}>
                    <InputText
                        name="NAME"
                        label="عنوان فعالیت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputDate
                        name="DATE"
                        label="تاریخ فعالیت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText
                        name="YEAR"
                        label="سال فعالیت"
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="BODY"
                        label="شرح فعالیت"
                        rules={{ required: "اجباری است" }}
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
        </div>
    );


    return (<>

        <PopupCurd
            columns={columns}
            title="مدیریت فعالیت ها"
            urls={{
                GetId: companyId,
                readUrl: "/CompanyDetail/Show_Activity_ToUser",
                createUrl: "/CompanyDetail/Create_Activity",
                deleteUrl: "/CompanyDetail/Delete_Activity",
                editUrl: "/CompanyDetail/Update_Activity"
            }}
            form={form}
        />

    </>);

}