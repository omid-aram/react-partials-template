import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSelect from "../../../partials/editors/InputSelect";
import SimpleInputHidden from "../../../partials/editors/Custom/SimpleInputHidden";
import { connect } from "react-redux";

const Directorate = (props) => {
    const columns = [
        {
            field: "POSTTITLE",
            title: "سمت",
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
            <SimpleInputHidden name="conventionId" value={props.meetingIdState} />
            <Row>
                <Col sm={6}>
                    <InputSelect
                        type="1"
                        enumType="PostType"
                        name="POSTTYPE"
                        label="سمت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputSelect
                        controller="Individual"
                        action="GetSelectActual"
                        name="INDIVIDUALID"
                        label="شخص"
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
            title="مدیریت هیئت مدیره و بازرسین"
            urls={{
                GetId: props.meetingIdState,
                readUrl: "/Directorate/Show",
                createUrl: "/Directorate/Create",
                deleteUrl: "/Directorate/Delete",
                editUrl: "/Directorate/Update"
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
export default connect(mapStateToProps)(Directorate);