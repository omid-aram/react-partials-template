import React from 'react'
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputCheckbox from "../../../partials/editors/InputCheckbox";


const AsmTaskType = () => {

    const columns = [
        {
            field: "code",
            title: "کد",
            width: 140
        },
        {
            field: "name",
            title: "شرح",
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
                        label="کد"
                        //rules={{ required: "اجباری است" }}
                        disabled={true}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="name"
                        label="شرح"
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
            title="تعريف انواع دستور جلسه"
            sortItem="code desc, id desc"
            urls={{
                readUrl: "/AsmTaskType/GetPaginated",
                createUrl: "/AsmTaskType/Create",
                //deleteUrl: "/AsmTaskType/Delete",
                editUrl: "/AsmTaskType/Update",
            }}
            form={formfg}
        //searchForm={searchForm}
        />

    </>);
}

export default AsmTaskType;