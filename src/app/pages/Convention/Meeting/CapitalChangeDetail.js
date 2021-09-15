import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSelect from "../../../partials/editors/InputSelect";
import SimpleInputHidden from "../../../partials/editors/Custom/SimpleInputHidden";
import { connect } from "react-redux";

const CapitalChangeDetail = (prop) => {
    

    const columns = [
        {
            field: "LOOKUP",
            title: "نوع",
            width: 80
        },
        {
            field: "AMOUNT",
            title: "مبلغ",
            width: 70
        },
        {
            field: "QTY",
            title: "تعداد",
            width: 70
        }
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <SimpleInputHidden name="capitalChangeId" value={prop.capitalChangeState} />
            <Row>
                <Col sm={4}>
                    <InputSelect
                        type="2"
                        lookupType="303"
                        name="LOOKUPID"
                        label="نوع"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="AMOUNT"
                        label="مبلغ"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        name="QTY"
                        label="تعداد"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
        </div>
    );


    return (<>

        <PopupCurd
            backButton={true}
            columns={columns}
            title="مدیریت جزئیات تغییر سرمایه"
            urls={{
                GetId: prop.capitalChangeState,
                readUrl: "/CapitalChangeDetail/Show",
                createUrl: "/CapitalChangeDetail/Create",
                deleteUrl: "/CapitalChangeDetail/Delete",
                editUrl: "/CapitalChangeDetail/Update"
            }}
            form={form}
        />

    </>);
}


const mapStateToProps = state => {
    return {
        capitalChangeState: state.passIds.capitalChangeState,
    };
};
export default connect(mapStateToProps)(CapitalChangeDetail);