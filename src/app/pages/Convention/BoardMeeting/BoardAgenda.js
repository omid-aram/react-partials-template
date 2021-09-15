import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Col, Row } from "react-bootstrap";

import InputHidden from "../../../partials/editors/InputHidden";
import InputText from "../../../partials/editors/InputText";
import SimpleInputHidden from "../../../partials/editors/Custom/SimpleInputHidden";
import { useHistory } from "react-router-dom";
import { Button as MatBtn } from "@material-ui/core";
import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
import { passIdsActions } from "../../../store/ducks/passIds.duck";

const BoardAgenda = (prop) => {

    const dispatch = useDispatch();
    const url = useHistory();

    const detailHandler = (id, action) => {
        dispatch(passIdsActions.fetchBoardAgendaId(id));
        url.push("/" + action);
    }

    const columns = [
        {
            field: "DESCRIPTION",
            title: "دستور جلسه",
            width: 70
        },
        {
            field: "CODE",
            title: "شماره جلسه",
            width: 70
        },
        {
            field: "COMPANY",
            title: "نام شرکت",
            width: 80
        }
    ]



    columns.push({
        title: "عملیات",
        template: (item) => (
            <>
                <MatBtn variant="outlined" size="small" onClick={() => detailHandler(item.ID, "BoardApproval")} color="primary">مصوبه</MatBtn>
            </>
        ),
        width: 100
    })

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
            title="مدیریت دستور جلسات "
            urls={{
                GetId: prop.boardMeetingState,
                readUrl: "/BoardAgenda/Show",
                createUrl: "/BoardAgenda/Create",
                deleteUrl: "/BoardAgenda/Delete",
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
export default connect(mapStateToProps)(BoardAgenda);