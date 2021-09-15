import React from "react"
import PopupCurd from "../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";
import InputDate from "../../partials/editors/InputDate";
import InputText from "../../partials/editors/InputText";
import InputHidden from "../../partials/editors/InputHidden";
import { Button as MatBtn } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { passIdsActions } from "../../store/ducks/passIds.duck";
import InputSelect from "../../partials/editors/InputSelect";
const MeetingRequest = () => {


  const dispatch = useDispatch();
  const url = useHistory();

  const detailHandler = (item, action) => {
    dispatch(passIdsActions.fetchMeetingId(item.SRL));
    url.push("/" + action);
  }


  const columns = [
    {
      field: "NUMBER",
      title: "شماره",
      width: 80
    },
    {
      field: "LETTERNUMBER",
      title: "شماره نامه اتوماسیون",
      width: 80
    },
    {
      field: "PERSIANDATE",
      title: "تاریخ",
      width: 80
    },
    {
      field: "PERSIANLETTERDATE",
      title: "تاریخ نامه اتوماسیون",
      width: 80
    },
  ]

  columns.push({
    title: "عملیات",
    template: (item) => (
      <>
        <MatBtn variant="outlined" size="small" onClick={() => detailHandler(item, "MeetingRequestParagraph")} color="primary">بند های نامه</MatBtn>
      </>
    ),
    width: 50
  })

  const form = () => (
    <div className="form-container">
      <InputHidden name="SRL" />
      <Row>
        <Col sm={4}>
          <InputSelect serverBinding={{
            url: '/Common/UserDropDown',
            filter: {},
            textField: 'desc',
            valueField: 'id'
          }} label="گیرنده" name="user" rules={{ required: "اجباری است" }} />
        </Col>
        <Col sm={4}>
          <InputText label="شماره" name="NUMBER" rules={{ required: "اجباری است" }} />
        </Col>
        <Col sm={4}>
          <InputDate label="تاریخ" name="DATE" rules={{ required: "اجباری است" }} />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <InputText label="شماره نامه اتوماسیون" name="LETTERNUMBER" rules={{ required: "اجباری است" }} />
        </Col>
        <Col sm={6}>
          <InputDate label="تاریخ نامه اتوماسیون" name="LETTERDATE" rules={{ required: "اجباری است" }} />
        </Col>
      </Row>
    </div >
  );
  return (<>

    <PopupCurd
      columns={columns}
      title="مدیریت درخواست جلسه"
      urls={{
        readUrl: "/MeetingRequest/Show",
        createUrl: "/MeetingRequest/Create",
        deleteUrl: "/MeetingRequest/Delete",
        editUrl: "/MeetingRequest/Update"
      }}
      form={form}
    />

  </>);
}

export default MeetingRequest;