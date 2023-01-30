import React from 'react'

import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputText from "../../../partials/editors/InputText";
import InputMoney from "../../../partials/editors/InputMoney";
import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";
import InputSelect from "../../../partials/editors/InputSelect";

const CompCapacity = (props) => {
    //console.log('CompAddress.parentItem', parentItem);

    const columns = [
        {
            field: "asmProdLineName",
            title: "خط تولید",
            //sortable: true,
        },
        {
            field: "prodName",
            title: "محصول",
        },
        {
            field: "measUnitName",
            title: "واحد اندازه گیری",
        },
        {
            field: "capacity",
            title: "ظرفیت",
            comma1000: true
        },
        {
            field: "compFiscalYearYear",
            title: "سال مالی",
        },
        {
            field: "description",
            title: "توضیحات",
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

    const prodLineFilter = { CompanyId: props.parentItem.id };
    const compFiscalYearFilter = { CompanyId: props.parentItem.id };

    const formfg = () => (
        <>
            <InputHidden name="id" />
            <SimpleInputHidden name="companyId" value={props.parentItem.id} />
            <Row>
                <Col sm={8}>
                    <InputSelect
                        name="asmProdLineId"
                        label="خط تولید"
                        apiUrl="/CompCapacity/GetProdLines"
                        apiFilter={prodLineFilter}
                        textField="saloonLocation"
                        valueField="id"
                    // serverBinding={{
                    //     url: '/CompCapacity/GetProdLines',
                    //     filter: { CompanyId: props.parentItem.id },
                    //     textField: 'saloonLocation',
                    //     valueField: 'id'
                    // }}
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="prodName"
                        label="محصول"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputSelect
                        name="measUnitCode"
                        label="واحد اندازه گیری"
                        apiUrl="/CompCapacity/GetMeasUnits"
                        textField="name"
                        valueField="code"
                        // serverBinding={{
                        //     url: '/CompCapacity/GetMeasUnits',
                        //     filter: {},
                        //     textField: 'name',
                        //     valueField: 'code'
                        // }}
                    />
                </Col>
                <Col sm={4}>
                    <InputMoney
                        name="capacity"
                        label="ظرفیت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputSelect
                        name="compFiscalYearId"
                        label="سال مالی"
                        apiUrl="/CompCapacity/GetCompFiscalYears"
                        apiFilter={compFiscalYearFilter}
                        textField="year"
                        valueField="id"
                        // serverBinding={{
                        //     url: '/CompCapacity/GetCompFiscalYears',
                        //     filter: { CompanyId: props.parentItem.id },
                        //     textField: 'year',
                        //     valueField: 'id'
                        // }}
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
            title="ظرفیت تولید"
            sortItem="id"
            urls={{
                readUrl: "/CompCapacity/GetPaginated",
                createUrl: "/CompCapacity/Create",
                //deleteUrl: "/CompCapacity/Delete",
                editUrl: "/CompCapacity/Update",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ companyId: props.parentItem.id }}
        />

    </>);
}

export default CompCapacity;