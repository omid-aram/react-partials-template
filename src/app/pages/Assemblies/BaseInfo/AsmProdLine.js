import React, { useEffect, useState } from 'react'
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";
import { makeStyles, useTheme } from '@material-ui/core/styles/makeStyles';
//import { LayoutSubheader } from "../../../_metronic/layout/LayoutContext";

import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSwitch from "../../../partials/editors/InputSwitch";
import InputSelect from "../../../partials/editors/InputSelect";
import InputCheckbox from "../../../partials/editors/InputCheckbox";
import InputSelectApi from "../../../partials/editors/InputSelectApi";


const AsmProdLine = () => {

    //LayoutSubheader({ title: "سرویس ها" });

    const columns = [
        {
            field: "code",
            title: "کد",
        },
        {
            field: "saloon",
            title: "سالن",
            //filterable: true,
        },
        {
            field: "location",
            title: "موقعیت",
            //filterable: true,
        },
        {
            field: "company.codeName",
            title: "شرکت",
            // sortable: true,
            // sortField: "company.code"
        },
        {
            field: "isActiveDesc",
            title: "وضعیت",
        },
    ]




    const formfg = () => (
        <>


            <InputHidden name="id" />
            <Row>
                <Col sm={6}>
                    <InputSelectApi
                        name="companyId"
                        label="شرکت"
                        readUrl="/AsmProdLine/GetCompanies"
                        textField="codeName"
                        valueField="id"
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="code"
                        label="کد"
                        //rules={{ required: "اجباری است" }}
                        disabled={true}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="saloon"
                        label="سالن"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="location"
                        label="موقعیت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputCheckbox
                        label="فعال / غیرفعال"
                        name="isActive"
                    />
                </Col>
            </Row>
        </>
    );

    return (<>

        <PopupCurd
            columns={columns}
            pageSize={50}
            title="ثبت خطوط تولید"
            sortItem="company.code, code, id"
            urls={{
                readUrl: "/AsmProdLine/GetPaginated",
                createUrl: "/AsmProdLine/Create",
                //deleteUrl: "/AsmProdLine/Delete",
                editUrl: "/AsmProdLine/Update",
            }}
            form={formfg}
        //searchForm={searchForm}
        />

    </>);
}

export default AsmProdLine;