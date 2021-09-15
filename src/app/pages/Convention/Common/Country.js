import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";


const Country = () => {


    const columns = [
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
                <Col sm={4}>
                    <InputText
                        name="NAME"
                        label="نام کشور"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="DESCRIPTION"
                        label="توضیحات"
                    />
                </Col>
                <Col sm={4}>
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
            title=" مدیریت کشور"
            urls={{
                readUrl: "/CountryDivision/Show_Country",
                createUrl: "/CountryDivision/Create_Country",
                deleteUrl: "/CountryDivision/Delete",
                editUrl: "/CountryDivision/Update_Country"
            }}
            form={form}
        />

    </>);
}

export default Country;