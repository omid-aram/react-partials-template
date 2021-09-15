import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Col, Row } from "react-bootstrap";

import InputHidden from "../../../partials/editors/InputHidden";
import InputText from "../../../partials/editors/InputText";
import SimpleInputHidden from "../../../partials/editors/Custom/SimpleInputHidden";
import { connect } from "react-redux";

const BoardApproval = (prop) => {
    

    const columns = [
        {
            field: "DESCRIPTION",
            title: "مصوبه",
            width: 70
        },
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <SimpleInputHidden name="boardAgendaId" value={prop.boardAgendaState} />
            <Row>
                <Col sm={12}>
                    <InputText
                        name="DESCRIPTION"
                        label="مصوبه"
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
            title="مدیریت دستور جلسات "
            urls={{
                GetId: prop.boardAgendaState,
                readUrl: "/BoardApproval/Show",
                createUrl: "/BoardApproval/Create",
                deleteUrl: "/BoardApproval/Delete",
                editUrl: "/BoardApproval/Update"
            }}
            form={form}
        />

    </>);
}


const mapStateToProps = state => {
    return {
        boardAgendaState: state.passIds.boardAgendaState,
    };
};
export default connect(mapStateToProps)(BoardApproval);