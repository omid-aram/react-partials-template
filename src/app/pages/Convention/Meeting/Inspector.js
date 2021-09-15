import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSelect from "../../../partials/editors/InputSelect";
import SimpleInputHidden from "../../../partials/editors/Custom/SimpleInputHidden";
import InputDate from "../../../partials/editors/InputDate";
import { connect } from "react-redux";

const Inspector = (prop) => {

    const columns = [
        {
            field: "PERSON",
            title: "بازرس",
            width: 70
        },
        {
            field: "PERSIANFROMDATE",
            title: "از تاریخ",
            width: 80
        },
        {
            field: "PERSIANTODATE",
            title: "تا تاریخ",
            width: 80
        },
        {
            field: "DESCRIPTION",
            title: "توضیحات",
            width: 70
        }
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <SimpleInputHidden name="approvalId" value={prop.approvalState.Id} />
            <SimpleInputHidden name="companyId" value={prop.approvalState.CompanyId} />
            <Row>
                <Col sm={3}>
                    <InputSelect
                        controller="Individual"
                        action="GetSelect"
                        name="INDIVIDUALID"
                        label="بازرس"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
                    <InputDate
                        name="FROMDATE"
                        label="از تاریخ"
                        time={false}
                    />
                </Col>
                <Col sm={3}>
                    <InputDate
                        name="TODATE"
                        label="تا تاریخ"
                        time={false}
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={3}>
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
            backButton={true}
            columns={columns}
            title="مدیریت بازرسان"
            urls={{
                GetId: prop.approvalState.Id,
                readUrl: "/Inspector/Show",
                createUrl: "/Inspector/Create",
                deleteUrl: "/Inspector/Delete",
                editUrl: "/Inspector/Update"
            }}
            form={form}
        />

    </>);
}


const mapStateToProps = state => {
    return {
        approvalState: state.passIds.approvalState,
    };
};
export default connect(mapStateToProps)(Inspector);