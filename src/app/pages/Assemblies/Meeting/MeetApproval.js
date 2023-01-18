import React from 'react'

import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";

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