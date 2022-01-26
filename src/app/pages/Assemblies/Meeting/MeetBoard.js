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

const MeetBoard = (props) => {

    const columns = [
        {
            field: "postTypeDesc",
            title: "سمت",
        },
        {
            field: "assemMember.person.fullNameAndNationalId",
            title: "عضو",
        },
        {
            field: "absentFlagDesc",
            title: "وضعیت حضور",
        },
    ]

    const formfg = () => (
        <>
            <InputHidden name="id" />
            <SimpleInputHidden name="meetInfoId" value={props.parentItem.id} />
            <Row>
                <Col sm={6}>
                <InputSelect
                        type="select"
                        enumType="AbsentFlag"
                        name="absentFlag"
                        label="وضعیت حضور"
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
            title="اعضاء هیئت مدیره حاضر در جلسه"
            sortItem="postType, id"
            urls={{
                readUrl: "/MeetBoard/GetPaginated",
                //createUrl: "/MeetBoard/Create",
                //deleteUrl: "/MeetBoard/HardDelete",
                editUrl: "/MeetBoard/Update",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ meetInfoId: props.parentItem.id }}
        />

    </>);
}

export default MeetBoard;