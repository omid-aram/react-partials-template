import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col, Button } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSelect from "../../../partials/editors/InputSelect";
import InputDate from "../../../partials/editors/InputDate";
import InputFile from "../../../partials/editors/InputFile";
import baseService from "../../../services/base.service";
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
            field: "DOCUMENTARYGROUP",
            title: "نوع مستند",
            width: 140
        },
        {
            field: "PERSIANDATE",
            title: "تاریخ",
            width: 140
        },
        {
            title: "",
            width: 250,
            template: (item) => (
                <>
                    {/* onClick={() => itemImages(item.file_BinaryId)} */}
                    <Button href={baseService.baseFileUrl + item.FILE_BINARYID} variant="outline-dark" size="sm">
                        دانلود
                    </Button>
                </>

            )
        },
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
                        lookupType="302"
                        name="DOCUMENTARYGROUPID"
                        label="نوع مستند"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputDate
                        name="DATE"
                        label="تاریخ"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputFile
                        name="FILE_BINARYID"
                        label="آپلود"
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
            title="مدیریت مستندات"
            urls={{
                readUrl: "/CompanyDetail/Show_Document",
                createUrl: "/CompanyDetail/Create_Document",
                deleteUrl: "/CompanyDetail/Delete_Document",
                editUrl: ""
            }}
            form={form}
        />


        {/* <DocumentImage
            isShow={showModal}
            guid={guid}
            onClose={() => setShowModal(false)} /> */}
    </>
    );

}

export function User(props) {


    const companyId = props.companyId;

    const columns = [
        {
            field: "DOCUMENTARYGROUP",
            title: "نوع مستند",
            width: 140
        },
        {
            field: "PERSIANDATE",
            title: "تاریخ",
            width: 140
        },
        {
            title: "",
            width: 250,
            template: (item) => (
                <>
                    <Button href={baseService.baseFileUrl + item.FILE_BINARYID} variant="outline-dark" size="sm">
                        دانلود
                    </Button>
                </>
            )
        },
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <Row>
                <Col sm={6}>
                    <InputSelect
                        type="2"
                        lookupType="302"
                        name="DOCUMENTARYGROUPID"
                        label="نوع مستند"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputDate
                        name="DATE"
                        label="تاریخ"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputFile
                        name="FILE_BINARYID"
                        label="آپلود"
                    />
                </Col>
                <Col sm={6}>
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
            title="مدیریت مستندات"
            urls={{
                GetId: companyId,
                readUrl: "/CompanyDetail/Show_Document_ToUser",
                createUrl: "/CompanyDetail/Create_Document",
                deleteUrl: "/CompanyDetail/Delete_Document",
                editUrl: ""
            }}
            form={form}
        />
    </>);

}