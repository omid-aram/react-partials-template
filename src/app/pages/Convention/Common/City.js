import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSelect from "../../../partials/editors/InputSelect";

const Province = () => {


    const columns = [
        {
            field: "PARENTPROVINCE",
            title: "نام استان والد",
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
                        action="GetSelectProvince"
                        name="PARENTID"
                        label="استان والد"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="NAME"
                        label="نام شهرستان"
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
            title="مدیریت شهر"
            urls={{
                readUrl: "/CountryDivision/Show_City",
                createUrl: "/CountryDivision/Create_City",
                deleteUrl: "/CountryDivision/Delete",
                editUrl: "/CountryDivision/Update_City"
            }}
            form={form}
        />

    </>);
}

export default Province;