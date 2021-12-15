import React from "react";
import PopupCurd from "../../../template/PopupCrud";
import { Row, Col } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import InputSelect from "../../../partials/editors/InputSelect";
import SimpleInputHidden from "../../../partials/editors/Custom/SimpleInputHidden";
import InputDate from "../../../partials/editors/InputDate";
import { connect } from "react-redux";
import InputNumber from "../../../partials/editors/InputNumber";

const AuditorReport = (prop) => {
  const columns = [
    {
      field: "FIGURESNO",
      title: "شماره بند",
      width: 70,
    },
    {
      field: "CREATEDATEPERSIAN",
      title: "تاریخ ایجاد",
      width: 80,
    },
    {
      field: "CONVENTIONASSIGNMENT",
      title: "تکلیف مجمع",
      width: 80,
    },
    {
      field: "PROCEEDINGS",
      title: "اقدامات صورت گرفته",
      width: 70,
    },
    {
      field: "FIGURESTYPETITLE",
      title: "ماهیت ارقام",
      width: 70,
    },
    {
      field: "AMOUNT",
      title: "مبلغ",
      width: 70,
    },
  ];

  const form = () => (
    <div className="form-container">
      <InputHidden name="ID" />
      <SimpleInputHidden name="approvalId" value={prop.approvalState.Id} />
      <SimpleInputHidden
        name="companyId"
        value={prop.approvalState.CompanyId}
      />

      <Row>
        <Col sm={3}>
          <InputText
            name="FIGURESNO"
            label="شماره بند"
            rules={{ require: "اجباری است" }}
          />
        </Col>
        <Col sm={3}>
          <InputDate
            name="CREATEDATE"
            label="تاریخ ایجاد"
            rules={{ require: "اجباری است" }}
          />
        </Col>
        <Col sm={6}>
          <InputText
            name="CONVENTIONASSIGNMENT"
            rows={2}
            label="تکلیف مجمع"
            rules={{ require: "اجباری است" }}
          />
        </Col>
        <Col sm={6}>
          <InputText
            name="PROCEEDINGS"
            rows={2}
            label="اقدامات صورت گرفته"
            rules={{ require: "اجباری است" }}
          />
        </Col>
        <Col sm={3}>
          <InputSelect
            controller="AuditorReport"
            action="GetFiguresTypes"
            name="FIGURESTYPEID"
            label="ماهیت ارقام"
            rules={{ required: "اجباری است" }}
          />
        </Col>
        <Col sm={3}>
          <InputNumber
            name="AMOUNT"
            label="مبلغ"
            rules={{ require: "اجباری است" }}
          />
        </Col>
      </Row>
    </div>
  );

  return (
    <>
      <PopupCurd
        backButton={true}
        columns={columns}
        title="گزارش حسابرس"
        urls={{
          GetId: prop.approvalState.Id,
          readUrl: "/AuditorReport/Show",
          createUrl: "/AuditorReport/Create",
          deleteUrl: "/AuditorReport/Delete",
          editUrl: "/AuditorReport/Update",
        }}
        form={form}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    approvalState: state.passIds.approvalState,
  };
};
export default connect(mapStateToProps)(AuditorReport);
