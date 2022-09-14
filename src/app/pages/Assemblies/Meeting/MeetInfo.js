import React, { useEffect, useState } from 'react'
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col, Button } from "react-bootstrap";
import { makeStyles, useTheme } from '@material-ui/core/styles/makeStyles';
//import { LayoutSubheader } from "../../_metronic/layout/LayoutContext";

import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSelectApiChangeValue from "../../../partials/editors_old/InputSelectApiChangeValue";
import InputDate from "../../../partials/editors/InputDate";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";

import MeetDetails from "./MeetDetails";


const MeetInfo = () => {

    const columns = [
        {
            field: "meetNo",
            title: "شماره جلسه",
            width: 70
        },
        {
            field: "meetDateFa",
            title: "تاریخ جلسه",
            width: 70
        },
        {
            field: "description",
            title: "شرح",
        },
        {
            field: "secretary",
            title: "دبیر جلسه",
            width: 100
        },
    ]

    const formfg = () => (
        <>
            <InputHidden name="id" />
            <SimpleInputHidden name="companyId" value={company.id} />
            <Row>
                <Col sm={6}>
                    <InputText
                        name="companyName"
                        label="نام شرکت"
                        rules={{ required: "اجباری است" }}
                        defaultValue={company.name}
                        disabled={true}
                    />
                </Col>
                <Col sm={3}>
                    <InputText
                        name="meetNo"
                        label="شماره جلسه"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputDate
                        name="meetDate"
                        label="تاریخ جلسه"
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="secretary"
                        label="دبیر جلسه"
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="description"
                        label="شرح"
                        multiline={true}
                        rows={3}
                    />
                </Col>
            </Row>
        </>
    );

    const [company, setCompany] = useState({});
    const companyChanged = (val, text) => {
        setCompany({ id: val, name: text });
    }

    const searchForm = (
        <>
            <Row>
                <Col sm={4}>
                    <InputSelectApiChangeValue
                        name="companyId"
                        label="شرکت"
                        readUrl="/MeetInfo/GetCompanies"

                        textField="codeName"
                        valueField="id"
                        changeVal={companyChanged}
                    />
                </Col>
            </Row>
        </>
    )

    const detailTitle = `${company.name} : جلسه شماره @meetNo - تاریخ @meetDateFa`;

    return (<>
        <PopupCurd
            columns={columns}
            pageSize={10}
            title="جلسات هیئت مدیره"
            sortItem="meetNo.Length desc, meetNo desc, id"
            urls={{
                readUrl: "/MeetInfo/GetPaginated",
                createUrl: "/MeetInfo/Create",
                deleteUrl: "/MeetInfo/Delete",
                editUrl: "/MeetInfo/Update",
                detailUrl: "modal",
            }}
            //comid={window.a}
            form={formfg}
            searchForm={searchForm}
            initSearchValues={{ companyId: company.id }}

            detailForm={<MeetDetails />}
            detailSize="xl"
            detailTitle={detailTitle}
        />

    </>);
}

export default MeetInfo;