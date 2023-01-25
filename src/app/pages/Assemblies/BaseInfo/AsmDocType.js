import React from 'react'
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputCheckbox from "../../../partials/editors/InputCheckbox";


const AsmDocType = () => {

    //LayoutSubheader({ title: "سرویس ها" });

    const columns = [
        {
            field: "code",
            title: "کد نوع مستند",
            width: 140
        },
        {
            field: "name",
            title: "عنوان نوع مستند",
        },
        {
            field: "isActiveDesc",
            title: "وضعیت",
        },
    ]

    const formfg = () => (
        <>
            <InputHidden name="id" />
            <Row>
                <Col sm={6}>
                    <InputText
                        name="code"
                        label="کد نوع مستند"
                        //rules={{ required: "اجباری است" }}
                        disabled={true}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="name"
                        label="عنوان نوع مستند"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputCheckbox
                        label="فعال / غیرفعال"
                        name="isActive"
                    />
                </Col>
            </Row>
        </>
    );

    return (<>

        <PopupCurd
            columns={columns}
            pageSize={50}
            title="ثبت انواع مستندات"
            sortItem="code desc, id desc"
            urls={{
                readUrl: "/AsmDocType/GetPaginated",
                createUrl: "/AsmDocType/Create",
                //deleteUrl: "/AsmDocType/Delete",
                editUrl: "/AsmDocType/Update",
            }}
            form={formfg}
        //searchForm={searchForm}
        />

    </>);
}

export default AsmDocType;