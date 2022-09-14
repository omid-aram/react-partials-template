import React, { useState, useRef } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";
import InputDate from "../../../partials/editors/InputDate";
import InputSelect from "../../../partials/editors/InputSelect";

import InputCheckbox from "../../../partials/editors/InputCheckbox";

const AssemAnnounce = (props) => {

    const columns = [
        {
            field: "announceTypeDesc",
            title: "نوع آگهی",
            //sortable: true,
        },
        {
            field: "announceDateFa",
            title: "تاریخ آگهی",
        },
        {
            field: "title",
            title: "عنوان آگهی",
        },
        {
            field: "description",
            title: "شرح آگهی",
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
                        enumType="AnnounceType"
                        name="announceType"
                        label="نوع آگهی"
                    />
                </Col>
                <Col sm={6}>
                    <InputDate
                        name="announceDate"
                        label="تاریخ آگهی"
                    />
                </Col>
                <Col sm={12}>
                    <InputText
                        name="title"
                        label="عنوان آگهی"
                    />
                </Col>
                <Col sm={12}>
                    <InputText
                        name="description"
                        label="شرح آگهی"
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
            title="آگهی"
            sortItem="announceDate, id"
            urls={{
                readUrl: "/AssemAnnounce/GetPaginated",
                createUrl: "/AssemAnnounce/Create",
                deleteUrl: "/AssemAnnounce/HardDelete",
                editUrl: "/AssemAnnounce/Update",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ assemInfoId: props.parentItem.id }}
        />

    </>);
}

export default AssemAnnounce;