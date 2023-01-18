import React from 'react'

import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";
import InputSelect from "../../../partials/editors/InputSelect";

const AssemMember = (props) => {

    const columns = [
        {
            field: "person.personTypeDesc",
            title: "نوع",
        },
        {
            field: "person.title",
            title: "نام عضو",
        },
        {
            field: "person.nationalId",
            title: "کد/شناسه ملی",
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
                        // readUrl="/AssemMember/GetPersons"
                        // textField="title"
                        // valueField="id"
                        serverBinding={{
                            url: '/AssemMember/GetPersons',
                            filter: {},
                            textField: 'title',
                            valueField: 'id'
                        }}

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
            modalSize="md"
            title="تعیین اعضای هیئت مدیره"
            sortItem="id"
            urls={{
                readUrl: "/AssemMember/GetPaginated",
                createUrl: "/AssemMember/Create",
                deleteUrl: "/AssemMember/HardDelete",
                //editUrl: "/AssemMember/Update",
                //detailUrl: "sub",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ assemApprovalId: props.parentItem.id }}

        // detailForm={<AssemApprovalDetails />}
        />

    </>);
}

export default AssemMember;