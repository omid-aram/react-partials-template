import React from 'react'

import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";
import InputSelect from "../../../partials/editors/InputSelect";

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