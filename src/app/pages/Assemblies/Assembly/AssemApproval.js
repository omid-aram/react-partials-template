import React from 'react'

import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";

import AssemApprovalDetails from "./AssemApprovalDetails";

const AssemApproval = (props) => {
    //console.log('CompAddress.parentItem', parentItem);

    const columns = [
        {
            field: "code",
            title: "کد",
        },
        {
            field: "description",
            title: "شرح مصوبه",
        },
    ]

    const formfg = () => (
        <>
            <InputHidden name="id" />
            <SimpleInputHidden name="assemAgendaId" value={props.id} />
            <Row>
                <Col sm={6}>
                    <InputText
                        name="code"
                        label="کد"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={12}>
                    <InputText
                        name="description"
                        label="شرح مصوبه"
                        multiline={true}
                        rows={3}
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
            sortItem="code, id"
            urls={{
                readUrl: "/AssemApproval/GetPaginated",
                createUrl: "/AssemApproval/Create",
                deleteUrl: "/AssemApproval/HardDelete",
                editUrl: "/AssemApproval/Update",
                detailUrl: "sub",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ assemAgendaId: props.id }}

            detailForm={<AssemApprovalDetails />}
        />

    </>);
}

export default AssemApproval;