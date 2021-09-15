import React from "react"
import PopupCurd from "../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";
import InputDate from "../../partials/editors/InputDate";
import InputText from "../../partials/editors/InputText";
import InputHidden from "../../partials/editors/InputHidden";


const AgendaParagraph = () => {


    const columns = [
        {
            field: "company",
            title: "شرکت",
            width: 140
        },
        {
            field: "personAgent",
            title: "نام نماینده"
        },
        {
            field: "postTitle",
            title: "سمت"
        },
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="id" />
            <Row>
                <Col sm={6}>
                    <InputText label="شماره جلسه" name="ali" rules={{ required: "اجباری است" }} />
                </Col>
                <Col sm={6}>
                    <InputDate name="fromDate" label="تاریخ و ساعت برگزاری" rules={{ required: "اجباری است" }} />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText label="شماره نامه اتوماسیون" name="ali" rules={{ required: "اجباری است" }} />
                </Col>
                <Col sm={6}>
                    <InputDate name="fromDate" label="تاریخ نامه اتوماسیون" rules={{ required: "اجباری است" }} />
                </Col>
            </Row>
        </div >
    );
    return (<>

        <PopupCurd
            columns={columns}
            title="مدیریت حساب بانکی"
            urls={{
                readUrl: "/BankAccount/Show",
                createUrl: "/BankAccount/Create",
                deleteUrl: "",
                editUrl: ""
            }}
            form={form}
        />

    </>);
}

export default AgendaParagraph;