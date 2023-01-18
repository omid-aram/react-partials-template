import React from 'react'

import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";
import InputSelect from "../../../partials/editors/InputSelect";

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
                    <InputSelect
                        name="personId"
                        label="نام شخص"
                        // readUrl="/AssemBoard/GetPersons"
                        // textField="fullName"
                        // valueField="id"
                        serverBinding={{
                            url: '/AssemBoard/GetPersons',
                            filter: {},
                            textField: 'fullName',
                            valueField: 'id'
                        }}

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