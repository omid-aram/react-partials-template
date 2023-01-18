import React from 'react'

import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";
import InputDate from "../../../partials/editors/InputDate";
import InputSelect from "../../../partials/editors/InputSelect";

const AssemInspector = (props) => {

    const columns = [
        {
            field: "person.title",
            title: "بازرس",
        },
        {
            field: "dateFromFa",
            title: "از تاریخ",
        },
        {
            field: "dateToFa",
            title: "تا تاریخ",
        },
        {
            field: "description",
            title: "توضیحات",
        },
    ]

    const formfg = () => (
        <>
            <InputHidden name="id" />
            <SimpleInputHidden name="assemApprovalId" value={props.parentItem.id} />
            <Row>
                <Col sm={12}>
                    <InputSelect
                        name="personId"
                        label="نام عضو"
                        // readUrl="/AssemInspector/GetPersons"
                        // textField="title"
                        // valueField="id"
                        serverBinding={{
                            url: '/AssemInspector/GetPersons',
                            filter: {},
                            textField: 'title',
                            valueField: 'id'
                        }}

                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputDate
                        name="dateFrom"
                        label="از تاریخ"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputDate
                        name="dateTo"
                        label="تا تاریخ"
                    />
                </Col>
                <Col sm={12}>
                    <InputText
                        name="description"
                        label="توضیحات"
                        multiline={true}
                        rows={2}
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
            title="تعیین بازرسان"
            sortItem="id"
            urls={{
                readUrl: "/AssemInspector/GetPaginated",
                createUrl: "/AssemInspector/Create",
                deleteUrl: "/AssemInspector/HardDelete",
                editUrl: "/AssemInspector/Update",
                //detailUrl: "sub",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ assemApprovalId: props.parentItem.id }}

        // detailForm={<AssemApprovalDetails />}
        />

    </>);
}

export default AssemInspector;