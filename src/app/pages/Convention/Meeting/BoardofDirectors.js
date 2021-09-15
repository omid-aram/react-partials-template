import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row } from "react-bootstrap";
import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/Custom/SimpleInputHidden";
import InputCascadeSelect from "../../../partials/editors/Custom/InputCascadeSelect";
import InputCascade from "../../../partials/editors/InputCascade";
import { connect } from "react-redux";

const BoardofDirectors = (prop) => {

    const columns = [
        {
            field: "TYPETITLE",
            title: "نوع",
            width: 80
        },
        {
            field: "PERSON",
            title: "شخص",
            width: 70
        }
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <SimpleInputHidden name="approvalId" value={prop.approvalState.Id} />
            <SimpleInputHidden name="companyId" value={prop.approvalState.CompanyId} />
            <Row>
                <InputCascade
                    colSize={6}
                    firstDrpName="TYPE"
                    secDrpName="INDIVIDUALID"
                    firstLblName="نوع"
                    secLblName="عضو"
                    firstUrl="/Individual/GetSelectPersonType"
                    secUrl="/Individual/GetSelectPerson"
                    rules={{ required: "اجباری است" }} />
            </Row>
        </div>
    );


    return (<>
        <PopupCurd
            backButton={true}
            columns={columns}
            title="مدیریت اعضای هیئت مدیره"
            urls={{
                // getUrl: "/BoardofDirector/EditData",
                GetId: prop.approvalState.Id,
                readUrl: "/BoardofDirector/Show",
                createUrl: "/BoardofDirector/Create",
                deleteUrl: "/BoardofDirector/Delete",
                editUrl: "/BoardofDirector/UpdateBOD"
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
export default connect(mapStateToProps)(BoardofDirectors);