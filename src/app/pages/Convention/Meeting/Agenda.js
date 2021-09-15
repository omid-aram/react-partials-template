import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSelect from "../../../partials/editors/InputSelect";
import SimpleInputHidden from "../../../partials/editors/Custom/SimpleInputHidden";
import { Button as MatBtn } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
import { passIdsActions } from "../../../store/ducks/passIds.duck";

const Agenda = (props) => {

    const columns = [
        {
            field: "AGENDATYPETITLE",
            title: "نوع",
            width: 80
        },
        {
            field: "DESCRIPTION",
            title: "توضیحات",
            width: 70
        }
    ]

    const dispatch = useDispatch();
    const url = useHistory();

    const detailHandler = (id, action) => {
        dispatch(passIdsActions.fetchAgendaId(id));
        url.push("/" + action);
    }

    columns.push({
        title: "عملیات",
        template: (item) => (
            <>
                <MatBtn variant="outlined" size="small" onClick={() => detailHandler(item.ID, "Approval")} color="primary">مصوبات</MatBtn>
            </>
        ),
        width: 100
    })

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <SimpleInputHidden name="conventionId" value={props.meetingIdState} />
            <Row>
                <Col md={4}>
                    <InputText
                        name="CODE"
                        label="کد"
                    />
                </Col>
                <Col sm={4}>
                    <InputSelect
                        controller="AgendaType"
                        action="GetSelectAgendaType"
                        name="AGENDATYPEID"
                        label="نوع دستور جلسه"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col md={4}>
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
            title="مدیریت دستور جلسه"
            urls={{
                GetId: props.meetingIdState,
                readUrl: "/Agenda/Show",
                createUrl: "/Agenda/Create",
                deleteUrl: "/Agenda/Delete",
                editUrl: "/Agenda/Update"
            }}
            form={form}
        />
    </>);
}

const mapStateToProps = state => {
    return {
        meetingIdState: state.passIds.meetingIdState,
    };
};
export default connect(mapStateToProps)(Agenda);