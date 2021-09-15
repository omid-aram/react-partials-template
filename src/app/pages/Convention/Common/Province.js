import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSelect from "../../../partials/editors/InputSelect";

const Province = () => {


    const columns = [
        {
            field: "PARENTCOUNTRY",
            title: "نام کشور والد",
            width: 140
        },
        {
            field: "NAME",
            title: "نام",
            width: 140
        },
        {
            field: "AREACODE",
            title: "کد منطقه",
            width: 140
        },
        {
            field: "DESCRIPTION",
            title: "توضیحات",
            width: 140
        },
    ]

    const form = () => (
        <>
            <InputHidden name="ID" />
            <Row>
                <Col sm={6}>
                <InputSelect
                        controller="CountryDivision"
                        action="GetSelectCountry"
                        name="PARENTID"
                        label="کشور والد"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="NAME"
                        label="نام استان"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputText
                        name="DESCRIPTION"
                        label="توضیحات"
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="AREACODE"
                        label="کد منطقه"
                    />
                </Col>
            </Row>
        </>
    );

    return (<>

        <PopupCurd
            columns={columns}
            title="مدیریت استان"
            urls={{
                readUrl: "/CountryDivision/Show_Province",
                createUrl: "/CountryDivision/Create_Province",
                deleteUrl: "/CountryDivision/Delete",
                editUrl: "/CountryDivision/Update_Province"
            }}
            form={form}
        />

    </>);
}

export default Province;