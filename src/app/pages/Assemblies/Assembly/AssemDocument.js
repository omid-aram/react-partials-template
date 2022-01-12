import React, { useState, useRef } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputText from "../../../partials/editors/InputText";
import InputNumber from "../../../partials/editors/InputNumber";
import InputMoney from "../../../partials/editors/InputMoney";
import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";
import InputDate from "../../../partials/editors/InputDate";
import InputSelect from "../../../partials/editors/InputSelect";
import InputSelectApi from "../../../partials/editors/InputSelectApi";
import InputSelectApiChangeValue from "../../../partials/editors/InputSelectApiChangeValue";
import InputSelectApiInputParams from "../../../partials/editors/InputSelectApiInputParams";

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

    const [countryVal, setCountryVal] = useState(0);
    const countryChanged = (val) => {
        setCountryVal(val);
    }

    const [stateVal, setStateVal] = useState(0);
    const stateChanged = (val) => {
        setStateVal(val);
    }

    const formfg = () => (
        <>
            <InputHidden name="id" />
            <SimpleInputHidden name="companyId" value={props.parentItem.id} />
            <Row>
                <Col sm={4}>
                    <InputSelectApi
                        name="asmDocTypeId"
                        label="نوع مستند"
                        readUrl="/CompDocument/GetAsmDocTypes"

                        textField="name"
                        valueField="id"
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