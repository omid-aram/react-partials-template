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

const CompActivity = (props) => {
    //console.log('CompAddress.parentItem', parentItem);

    const columns = [
        {
            field: "actDateFa",
            title: "تاریخ فعالیت",
            //sortable: true,
        },
        {
            field: "title",
            title: "عنوان فعالیت",
        },
        {
            field: "actYear",
            title: "سال فعالیت",
        },
        {
            field: "actDesc",
            title: "شرح فعالیت",
        },
        {
            field: "description",
            title: "توضیحات",
        },
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
            <Col sm={3}>
                    <InputDate
                        name="actDate"
                        label="تاریخ فعالیت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="title"
                        label="عنوان فعالیت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputNumber
                        name="actYear"
                        label="سال فعالیت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                <InputText
                        name="actDesc"
                        label="شرح فعالیت"
                        multiline={true}
                        rows={2}
                    />
                </Col>
                <Col sm={6}>
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
            title="فعالیت ها"
            sortItem="actDate desc, id"
            urls={{
                readUrl: "/CompActivity/GetPaginated",
                createUrl: "/CompActivity/Create",
                //deleteUrl: "/CompActivity/Delete",
                editUrl: "/CompActivity/Update",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ companyId: props.parentItem.id }}
        />

    </>);
}

export default CompActivity;