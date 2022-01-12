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

const AssemBoard = (props) => {

    const columns = [
        {
            field: "postTypeDesc",
            title: "سمت",
            //sortable: true,
        },
        {
            field: "person.fullName",
            title: "نام شخص",
        },
    ]

    const formfg = () => (
        <>
            <InputHidden name="id" />
            <SimpleInputHidden name="assemInfoId" value={props.parentItem.id} />
            <Row>
                <Col sm={6}>
                <InputSelect
                        type="select"
                        enumType="PostType"
                        name="postType"
                        label="سمت"
                    />
                </Col>
                <Col sm={12}>
                    <InputSelectApi
                        name="personId"
                        label="نام شخص"
                        readUrl="/AssemBoard/GetPersons"

                        textField="fullName"
                        valueField="id"
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
            title="هیئت رئیسه و بازرسان"
            sortItem="postType, id"
            urls={{
                readUrl: "/AssemBoard/GetPaginated",
                createUrl: "/AssemBoard/Create",
                deleteUrl: "/AssemBoard/HardDelete",
                editUrl: "/AssemBoard/Update",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ assemInfoId: props.parentItem.id }}
        />

    </>);
}

export default AssemBoard;