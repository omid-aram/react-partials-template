import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSelect from "../../../partials/editors/InputSelect";
import SimpleInputHidden from "../../../partials/editors/Custom/SimpleInputHidden";
import { Button as MatBtn } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import InputDate from "../../../partials/editors/InputDate";
import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
import { passIdsActions } from "../../../store/ducks/passIds.duck";

const CapitalChange = (prop) => {
   
    const dispatch = useDispatch();
    const url = useHistory();

    const detailHandler = (id, action) => {
        dispatch(passIdsActions.fetchCapitalChangeId(id));
        url.push("/" + action);
    }

    const columns = [
        {
            field: "FROMDATEPERSIAN",
            title: "از تاریخ",
            width: 80
        },
        {
            field: "TODATEPERSIAN",
            title: "تا تاریخ",
            width: 80
        },
        {
            field: "TYPETITLE",
            title: "نوع تغییر",
            width: 70
        },
        {
            field: "AMOUNTPERSHARE",
            title: "مبلغ هر سهم",
            width: 70
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


    columns.push({
        title: "عملیات",
        template: (item) => (
            <>
                <MatBtn variant="outlined" size="small" onClick={() => detailHandler(item.ID, "CapitalChangeDetail")} color="primary">ثبت جزئیات</MatBtn>
            </>
        ),
        width: 100
    })

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <SimpleInputHidden name="approvalId" value={prop.approvalState.Id} />
            <SimpleInputHidden name="companyId" value={prop.approvalState.CompanyId} />
            <Row>
                <Col sm={4}>
                    <InputDate
                        name="FROMDATE"
                        label="از تاریخ"
                        time={false}
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputDate
                        name="TODATE"
                        label="تا تاریخ"
                        time={false}
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={4}>
                    <InputSelect
                        type="1"
                        enumType="CapitalChangeType"
                        name="TYPE"
                        label="نوع تغییر"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={4}>
                    <InputText
                        name="AMOUNTPERSHARE"
                        label="مبلغ هر سهم"
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
            title="مدیریت تغییرات سرمایه"
            urls={{
                GetId: prop.approvalState.Id,
                readUrl: "/CapitalChange/Show",
                createUrl: "/CapitalChange/Create",
                deleteUrl: "/CapitalChange/Delete",
                editUrl: "/CapitalChange/Update"
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
export default connect(mapStateToProps)(CapitalChange);