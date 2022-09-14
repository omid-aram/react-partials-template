import React, { useState, useRef } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";
import InputSelect from "../../../partials/editors/InputSelect";

const CompSubCompany = (props) => {
    //console.log('CompAddress.parentItem', parentItem);

    const columns = [
        {
            field: "codeName",
            title: "نام شرکت",
            //sortable: true,
        },
        {
            field: "nationalCode",
            title: "شناسه ملی",
        },
        {
            field: "companyTypeDesc",
            title: "نوع شرکت",
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
            <SimpleInputHidden name="parentCompanyId" value={props.parentItem.id} />
            <Row>
                <Col sm={12}>
                    <InputSelect
                        name="id"
                        label="شرکت زیرمجموعه"
                        // readUrl="/CompSubCompany/GetOrphanCompanies"
                        // textField="codeName"
                        // valueField="id"
                        serverBinding={{
                            url: '/CompSubCompany/GetOrphanCompanies',
                            filter: {},
                            textField: 'codeName',
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
            title="شرکت های زیرمجموعه"
            sortItem="code, id"
            urls={{
                readUrl: "/CompSubCompany/GetPaginated",
                createUrl: "/CompSubCompany/Create",
                deleteUrl: "/CompSubCompany/DeleteParent",
                //editUrl: "/CompSubCompany/Update",
            }}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ parentCompanyId: props.parentItem.id }}
        />

    </>);
}

export default CompSubCompany;