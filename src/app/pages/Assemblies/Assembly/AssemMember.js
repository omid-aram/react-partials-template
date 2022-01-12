import React, { useState, useRef } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputText from "../../../partials/editors/InputText";
import InputNumber from "../../../partials/editors/InputNumber";
import InputMoney from "../../../partials/editors/InputMoney";
import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";
import InputDate from "../../../partials/editors/InputDate";
import InputSelect from "../../../partials/editors/InputSelect";
import InputSelectApi from "../../../partials/editors/InputSelectApi";
import InputSelectApiChangeValue from "../../../partials/editors/InputSelectApiChangeValue";
import InputSelectApiInputParams from "../../../partials/editors/InputSelectApiInputParams";
import InputCheckbox from "../../../partials/editors/InputCheckbox";

const AssemMember = (props) => {

    const columns = [
        {
            field: "person.personTypeDesc",
            title: "نوع",
        },
        {
            field: "person.title",
            title: "نام عضو",
        },
        {
            field: "person.nationalId",
            title: "کد/شناسه ملی",
        },
    ]

    const formfg = () => (
        <>
            <InputHidden name="id" />
            <SimpleInputHidden name="assemApprovalId" value={props.parentItem.id} />
            <Row>
                <Col sm={12}>
                    <InputSelectApi
                        name="personId"
                        label="نام عضو"
                        readUrl="/AssemMember/GetPersons"

                        textField="title"
                        valueField="id"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
        </>
    );

    const searchForm = (
        <>
        </>
    );

    return (<>

        <PopupCurd
            columns={columns}
            pageSize={5}
            modalSize="md"
            title="تعیین اعضای هیئت مدیره"
            sortItem="id"
            urls={{
                readUrl: "/AssemMember/GetPaginated",
                createUrl: "/AssemMember/Create",
                deleteUrl: "/AssemMember/HardDelete",
                //editUrl: "/AssemMember/Update",
                //detailUrl: "sub",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ assemApprovalId: props.parentItem.id }}

        // detailForm={<AssemApprovalDetails />}
        />

    </>);
}

export default AssemMember;