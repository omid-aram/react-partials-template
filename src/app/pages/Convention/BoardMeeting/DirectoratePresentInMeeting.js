import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Col, Row } from "react-bootstrap";

import InputHidden from "../../../partials/editors/InputHidden";
import InputText from "../../../partials/editors/InputText";
import SimpleInputHidden from "../../../partials/editors/Custom/SimpleInputHidden";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
import { passIdsActions } from "../../../store/ducks/passIds.duck";

const DirectoratePresentInMeeting = (prop) => {

    const dispatch = useDispatch();
    const url = useHistory();

    const columns = [
        {
            field: "DESCRIPTION",
            title: "سمت",
            width: 70
        },
        {
            field: "CODE",
            title: "عضو",
            width: 70
        },
        {
            field: "COMPANY",
            title: "حضور",
            width: 80
        }
    ]


    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <SimpleInputHidden name="boardMeetingId" value={prop.boardMeetingState} />
            <Row>
                <Col sm={12}>
                    <InputText
                        name="DESCRIPTION"
                        label="دستور جلسه"
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
            title=""
            urls={{
                GetId: prop.boardMeetingState,
                readUrl: "/BoardAgenda/Show",
                createUrl: "",
                deleteUrl: "",
                editUrl: "/BoardAgenda/Update"
            }}
            form={form}
        />

    </>);
}


const mapStateToProps = state => {
    return {
        boardMeetingState: state.passIds.boardMeetingState,
    };
};
export default connect(mapStateToProps)(DirectoratePresentInMeeting);