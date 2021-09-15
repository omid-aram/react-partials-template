import React from "react"
import PopupCurd from "../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";
import InputHidden from "../../partials/editors/InputHidden";
import InputText from "../../partials/editors/InputText";
import SimpleInputHidden from "../../partials/editors/SimpleInputHidden";
import { connect } from "react-redux";

const MeetingRequestParagraph = (props) => {

  const columns = [
    {
      field: "SUBJECT",
      title: "موضوع",
      width: 80
    },
    {
      field: "DESCRIPTION",
      title: "شرح",
      width: 80
    },
    {
      field: "LETTER_NUMBER",
      title: "شماره نامه های مرتبط",
      width: 80
    },
    {
      field: "UNITS",
      title: "واحد های مرتبط",
      width: 80
    },
  ]

  const form = () => (
    <div className="form-container">
      <InputHidden name="SRL" />
      <SimpleInputHidden name="parentId" value={props.parentId} />
      <Row>
        <Col sm={6}>
          <InputText label="موضوع" name="SUBJECT" rules={{ required: "اجباری است" }} />
        </Col>
        <Col sm={6}>
          <InputText label="شرح" name="DESCRIPTION" rules={{ required: "اجباری است" }} />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <InputText label="شماره نامه نامه های مرتبط" name="LETTER_NUMBER" rules={{ required: "اجباری است" }} />
        </Col>
        <Col sm={6}>
          <InputText label="واحد های مرتبط" name="UNITS" rules={{ required: "اجباری است" }} />
        </Col>
      </Row>
    </div >
  );
  return (<>

    <PopupCurd
      backButton={true}
      columns={columns}
      title="مدیریت بندهای درخواست جلسه"
      urls={{
        parentId: props.parentId,
        readUrl: "/MeetingRequestParagraph/Show",
        createUrl: "/MeetingRequestParagraph/Create",
        deleteUrl: "/MeetingRequestParagraph/Delete",
        editUrl: "/MeetingRequestParagraph/Update"
      }}
      form={form}
    />

  </>);
}


const mapStateToProps = state => {
  return {
    parentId: state.passIds.meetingIdState,
  };
};
export default connect(mapStateToProps)(MeetingRequestParagraph);