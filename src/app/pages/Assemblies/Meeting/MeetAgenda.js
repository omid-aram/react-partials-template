import React, { useState, useRef } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";

import MeetApproval from "./MeetApproval";

const MeetAgenda = (props) => {

    const columns = [
        {
            field: "description",
            title: "شرح دستور جلسه",
        },
    ]

    const formfg = () => (
        <>
            <InputHidden name="id" />
            <SimpleInputHidden name="meetInfoId" value={props.parentItem.id} />
            <Row>
                <Col sm={12}>
                    <InputText
                        name="description"
                        label="شرح دستور جلسه"
                        multiline={true}
                        rows={5}
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
            sortItem="id"
            urls={{
                readUrl: "/MeetAgenda/GetPaginated",
                createUrl: "/MeetAgenda/Create",
                deleteUrl: "/MeetAgenda/HardDelete",
                editUrl: "/MeetAgenda/Update",
                detailUrl: "sub",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ meetInfoId: props.parentItem.id }}

            detailForm={<MeetApproval />}
            //detailSize="lg"
            //detailTitle="مصوبات دستور جلسه : @description"
        />

    </>);
}

export default MeetAgenda;