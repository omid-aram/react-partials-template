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

import AssemApproval from "./AssemApproval";

const AssemAgenda = (props) => {

    const columns = [
        {
            field: "code",
            title: "کد",
        },
        {
            field: "taskType.codeName",
            title: "دستور جلسه",
        },
        {
            field: "description",
            title: "شرح دستور جلسه",
        },
    ]

    const formfg = () => (
        <>
            <InputHidden name="id" />
            <SimpleInputHidden name="assemInfoId" value={props.parentItem.id} />
            <Row>
                <Col sm={6}>
                    <InputText
                        name="code"
                        label="کد"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={12}>
                    <InputSelectApi
                        name="taskTypeId"
                        label="دستور جلسه"
                        readUrl="/AssemAgenda/GetTaskTypes"

                        textField="codeName"
                        valueField="id"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={12}>
                    <InputText
                        name="description"
                        label="شرح دستور جلسه"
                        multiline={true}
                        rows={3}
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
            title="دستور جلسه"
            sortItem="code, id"
            urls={{
                readUrl: "/AssemAgenda/GetPaginated",
                createUrl: "/AssemAgenda/Create",
                deleteUrl: "/AssemAgenda/HardDelete",
                editUrl: "/AssemAgenda/Update",
                detailUrl: "modal",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ assemInfoId: props.parentItem.id }}

            detailForm={<AssemApproval />}
            detailSize="lg"
            detailTitle="مصوبات دستور جلسه : @code - @description"
        />

    </>);
}

export default AssemAgenda;