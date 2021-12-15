import React from 'react'
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";
import InputSelect from "../../../partials/editors/InputSelect";
import InputCheckbox from "../../../partials/editors/InputCheckbox";

const _Legal = () => {

    const columns = [
        {
            field: "personTypeDesc",
            title: "نوع شخص",
            width: 140
        },
        {
            field: "title",
            title: "عنوان",
        },
        {
            field: "registerNo",
            title: "شماره ثبت",
        },
        {
            field: "stockSymbol",
            title: "نماد بورسي",
        },
        {
            field: "personStatusDesc",
            title: "وضعیت",
        },
    ]

    const formLegal = () => (
        <>
            <InputHidden name="id" />
            <SimpleInputHidden name="personType" value="2" />
            <Row>
                <Col sm={12}>
                    <InputText
                        name="title"
                        label="عنوان"
                        rules={{ required: "اجباری است" }}
                        value=""
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText
                        name="registerNo"
                        label="شماره ثبت"
                        value=""
                    //rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText
                        name="stockSymbol"
                        label="نماد بورسي"
                        value=""                        
                    //rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={12}>
                    <InputText
                        name="address"
                        label="آدرس"
                        multiline={true}
                        rows={2}
                    //rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
        </>
    );

    return (<>

        <PopupCurd
            columns={columns}
            pageSize={10}
            title="اشخاص حقوقی"
            sortItem="id"
            urls={{
                readUrl: "/AsmPerson/GetPaginated",
                createUrl: "/AsmPerson/Create",
                //deleteUrl: "/AsmPerson/Delete",
                editUrl: "/AsmPerson/Update",
            }}
            form={formLegal}
            //searchForm={searchForm}
            initSearchValues={{ personType: 2 }}
            modalSize="md"
        />

    </>);
}
export default _Legal;