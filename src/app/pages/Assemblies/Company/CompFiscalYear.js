import React from 'react'

import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";
import InputDate from "../../../partials/editors/InputDate";

import InputCheckbox from "../../../partials/editors/InputCheckbox";

const CompFiscalYear = (props) => {
    //console.log('CompAddress.parentItem', parentItem);

    const columns = [
        {
            field: "year",
            title: "سال مالی",
            //sortable: true,
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
            field: "isActiveDesc",
            title: "وضعیت",
        },
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
                    <InputText
                        name="year"
                        label="سال مالی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputDate
                        name="dateFrom"
                        label="از تاریخ"
                    />
                </Col>
                <Col sm={4}>
                    <InputDate
                        name="dateTo"
                        label="تا تاریخ"
                    />
                </Col>
                <Col sm={4}>
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
            title="سال مالی"
            sortItem="year desc, id"
            urls={{
                readUrl: "/CompFiscalYear/GetPaginated",
                createUrl: "/CompFiscalYear/Create",
                //deleteUrl: "/CompFiscalYear/Delete",
                editUrl: "/CompFiscalYear/Update",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ companyId: props.parentItem.id }}
        />

    </>);
}

export default CompFiscalYear;