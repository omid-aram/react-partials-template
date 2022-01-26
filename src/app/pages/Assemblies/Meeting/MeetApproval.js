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

const MeetApproval = (props) => {
    //console.log('CompAddress.parentItem', parentItem);

    const columns = [
        {
            field: "description",
            title: "شرح مصوبه",
        },
    ]

    const formfg = () => (
        <>
            <InputHidden name="id" />
            <SimpleInputHidden name="meetAgendaId" value={props.id} />
            <Row>
                <Col sm={12}>
                    <InputText
                        name="description"
                        label="شرح مصوبه"
                        multiline={true}
                        rows={5}
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
            title="مصوبات"
            sortItem="id"
            urls={{
                readUrl: "/MeetApproval/GetPaginated",
                createUrl: "/MeetApproval/Create",
                deleteUrl: "/MeetApproval/HardDelete",
                editUrl: "/MeetApproval/Update",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ meetAgendaId: props.id }}
        />

    </>);
}

export default MeetApproval;