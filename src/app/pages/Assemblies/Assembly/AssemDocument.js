import React from 'react'

import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";
import InputDate from "../../../partials/editors/InputDate";
import InputSelect from "../../../partials/editors/InputSelect";

import InputCheckbox from "../../../partials/editors/InputCheckbox";

const CompDocument = (props) => {
    //console.log('CompAddress.parentItem', parentItem);

    const columns = [
        {
            field: "asmDocTypeName",
            title: "نوع مستند",
        },
        {
            field: "docDateFa",
            title: "تاریخ",
            //sortable: true,
        },
        {
            field: "isActiveDesc",
            title: "وضعیت",
        },
        // {
        //     field: "actDesc",
        //     title: "مستند",
        // },
    ]

    // const [countryVal, setCountryVal] = useState(0);
    // const countryChanged = (val) => {
    //     setCountryVal(val);
    // }

    // const [stateVal, setStateVal] = useState(0);
    // const stateChanged = (val) => {
    //     setStateVal(val);
    // }

    const formfg = () => (
        <>
            <InputHidden name="id" />
            <SimpleInputHidden name="companyId" value={props.parentItem.id} />
            <Row>
                <Col sm={4}>
                    <InputSelect
                        name="asmDocTypeId"
                        label="نوع مستند"
                        // readUrl="/CompDocument/GetAsmDocTypes"
                        // textField="name"
                        // valueField="id"
                        serverBinding={{
                            url: '/CompDocument/GetAsmDocTypes',
                            filter: {},
                            textField: 'name',
                            valueField: 'id'
                        }}
                    />
                </Col>
                <Col sm={4}>
                    <InputDate
                        name="docDate"
                        label="تاریخ"
                    />
                </Col>
                <Col sm={12}>
                    <InputCheckbox
                        label="فعال / غیرفعال"
                        name="isActive"
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
            title="مستندات"
            sortItem="docDate desc, id"
            urls={{
                readUrl: "/CompDocument/GetPaginated",
                createUrl: "/CompDocument/Create",
                //deleteUrl: "/CompDocument/Delete",
                editUrl: "/CompDocument/Update",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ companyId: props.parentItem.id }}
        />

    </>);
}

export default CompDocument;