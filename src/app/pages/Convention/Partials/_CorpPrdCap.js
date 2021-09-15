import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSelect from "../../../partials/editors/InputSelect";
import InputNumber from "../../../partials/editors/InputNumber";
import CompanyPopupCrud from "../../../partials/editors/Custom/CompanyPopupCrud";


export function Admin(props) {

    const { companyLocalFilter, forceGridUpdate } = props

    const columns = [
        {
            field: "COMPANY",
            title: "شرکت",
            width: 140
        },
        {
            field: "PRODUCTNAME",
            title: "نام محصول",
            width: 140
        },
        {
            field: "CAPACITY",
            title: "ظرفیت",
            width: 140
        },
        {
            field: "SALOON",
            title: "سالن",
            width: 140
        },
        {
            field: "PRODUCTIONLINE",
            title: "خط تولید",
            width: 140
        }
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <Row>
                <Col sm={6}>
                    <InputSelect
                        controller="Company"
                        action="GetSelectData"
                        name="COMPANYID"
                        label="شرکت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputSelect
                        type="2"
                        lookupType="305"
                        name="MEASUREMENTUNITID"
                        label="واحد اندازه گیری"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputSelect
                        controller="CompanyDetail"
                        action="GetSelectFinancialYear"
                        name="COMPANYFINANCIALYEARID"
                        label="سال مالی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputSelect
                        controller="ProductionLine"
                        action="GetSelectProductionLine"
                        name="PRODUCTIONLINEID"
                        label="خط تولید"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText
                        name="PRODUCTNAME"
                        label="نام محصول"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputNumber
                        name="CAPACITY"
                        label="ظرفیت تولید"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <InputText
                        name="DESCRIPTION"
                        label="توضیحات"
                    />
                </Col>
            </Row>
        </div>
    );

    return (<>

        <CompanyPopupCrud
            companyLocalFilter={companyLocalFilter}
            forceGridUpdate={forceGridUpdate}
            columns={columns}
            title="مدیریت ظرفیت تولید"
            urls={{
                readUrl: "/CompanyDetail/Show_PrdCap",
                createUrl: "/CompanyDetail/Create_PrdCap",
                deleteUrl: "/CompanyDetail/Delete_PrdCap",
                editUrl: "/CompanyDetail/Update_PrdCap"
            }}
            form={form}
        />

    </>);

}

export function User(props) {
    const companyId = props.companyId;

    const columns = [
        {
            field: "PRODUCTNAME",
            title: "نام محصول",
            width: 140
        },
        {
            field: "CAPACITY",
            title: "ظرفیت",
            width: 140
        },
        {
            field: "SALOON",
            title: "سالن",
            width: 140
        },
        {
            field: "PRODUCTIONLINE",
            title: "خط تولید",
            width: 140
        }
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <Row>
                <Col sm={4}>
                    <InputSelect
                        type="2"
                        lookupType="305"
                        name="MEASUREMENTUNITID"
                        label="واحد اندازه گیری"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputSelect
                        controller="CompanyDetail"
                        action="GetSelectFinancialYear"
                        name="COMPANYFINANCIALYEARID"
                        label="سال مالی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputSelect
                        controller="ProductionLine"
                        action="GetSelectProductionLine"
                        name="PRODUCTIONLINEID"
                        label="خط تولید"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={4}>
                    <InputText
                        name="PRODUCTNAME"
                        label="نام محصول"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="CAPACITY"
                        label="ظرفیت تولید"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="DESCRIPTION"
                        label="توضیحات"
                    />
                </Col>
            </Row>
        </div>
    );


    return (<>

        <PopupCurd
            columns={columns}
            title="مدیریت ظرفیت تولید"
            urls={{
                GetId: companyId,
                readUrl: "/CompanyDetail/Show_PrdCap_ToUser",
                createUrl: "/CompanyDetail/Create_PrdCap",
                deleteUrl: "/CompanyDetail/Delete_PrdCap",
                editUrl: "/CompanyDetail/Update_PrdCap"
            }}
            form={form}
        />

    </>);

}
