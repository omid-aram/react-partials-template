import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/Custom/SimpleInputHidden";
import { Button as MatBtn } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
import { passIdsActions } from "../../../store/ducks/passIds.duck";

const Approval = (props) => {

    const dispatch = useDispatch();
    const url = useHistory();

    const detailHandler = (id, companyId, action) => {
        dispatch(passIdsActions.fetchApprovalId(
            {
                Id: id,
                CompanyId: companyId
            }
        ));
        url.push("/" + action);
    }

    const columns = [
        {
            field: "CODE",
            title: "کد",
            width: 80
        },
        {
            field: "DESCRIPTION",
            title: "شرح مصوبه",
            width: 70
        }
    ]


    columns.push({
        title: "عملیات",
        template: (item) => (
            <>
                <MatBtn variant="outlined" size="small" onClick={() => detailHandler(item.ID, item.COMPANYID, "CapitalChange")} color="primary">تغییرات سرمایه</MatBtn>
                <MatBtn variant="outlined" size="small" onClick={() => detailHandler(item.ID, item.COMPANYID, "BoardofDirectors")} color="primary">تعیین اعضای هیئت مدیره</MatBtn>
                <MatBtn variant="outlined" size="small" onClick={() => detailHandler(item.ID, item.COMPANYID, "Inspector")} color="primary">بازرسان</MatBtn>
                <MatBtn variant="outlined" size="small" onClick={() => detailHandler(item.ID, item.COMPANYID, "AuditorReport")} color="primary">گزارش حسابرس</MatBtn>
            </>
        ),
        width: 150
    })


    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <SimpleInputHidden name="agendaId" value={props.agendaState} />
            <Row>
                <Col sm={6}>
                    <InputText
                        name="CODE"
                        label="کد"
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="DESCRIPTION"
                        label="شرح مصوبه"
                    />
                </Col>
            </Row>
        </div>
    );

    return (<>

        <PopupCurd
            backButton={true}
            columns={columns}
            title="مدیریت مصوبات "
            urls={{
                GetId: props.agendaState,
                readUrl: "/Approval/Show",
                createUrl: "/Approval/Create",
                deleteUrl: "/Approval/Delete",
                editUrl: "/Approval/Update"
            }}
            form={form}
        />

    </>);
}

const mapStateToProps = state => {
    return {
        agendaState: state.passIds.agendaState,
    };
};
export default connect(mapStateToProps)(Approval);