import React from "react"
import PopupCurd from "../../template/PopupCrud"
import { Row, Col,Button as Btn } from "react-bootstrap";
import InputDate from "../../partials/editors/InputDate";
import InputText from "../../partials/editors/InputText";
import InputHidden from "../../partials/editors/InputHidden";
import InputSelect from "../../partials/editors/InputSelect";
import InputModal from "../../partials/editors/InputModal";
const Sec_Agenda = () => {


    const columns = [
        {
            field: "company",
            title: "شرکت",
            width: 140
        },
        {
            field: "personAgent",
            title: "نام نماینده"
        },
        {
            field: "postTitle",
            title: "سمت"
        },
    ]

    const DocTypeColumn = [
        {
          field: "DES_ID",
          title: "کد تفصیلی",
          width: 2
        },
        {
          field: "DES",
          title: "نام بانک",
          width: 5
        },
      ]
    
    
      const searchForm = (
        <>
          <Row>
            <Col md={4}>
              <InputText
                name="name"
                label="تفصیلی یا نام بانک"
              />
            </Col>
            <Col sm={2}>
              <Btn variant="outline-primary" type="submit">جستجو</Btn>
            </Col>
          </Row>
        </>
      );
    

    const form = () => (
        <div className="form-container">
            <InputHidden name="id" />
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
                    <InputModal
                        modalSize="small"
                        singleSelect={true}
                        column={DocTypeColumn}
                        searchForm={searchForm}
                        hiddenInputName="BANK_SRL"
                        textInputName="BANK_DES"
                        selectLabel="DES"
                        selectKey="ID"
                        label="نام بانک"
                        url="/Common/Show_Bank"
                        rules={{ required: "اجباری است" }} />
                </Col>
                <Col sm={4}>
                    <InputText label="شماره جلسه" name="ali" rules={{ required: "اجباری است" }} />
                </Col>
            </Row>
            <Row>
                <Col sm={4}>
                    <InputDate name="fromDate" label="تاریخ و ساعت برگزاری" rules={{ required: "اجباری است" }} />
                </Col>
                <Col sm={4}>
                    <InputText label="شماره نامه اتوماسیون" name="ali" rules={{ required: "اجباری است" }} />
                </Col>
                <Col sm={4}>
                    <InputDate name="fromDate" label="تاریخ نامه اتوماسیون" rules={{ required: "اجباری است" }} />
                </Col>
            </Row>
        </div >
    );
    return (<>

        <PopupCurd
            columns={columns}
            title="مدیریت دستور جلسه"
            urls={{
                readUrl: "/BankAccount/Show",
                createUrl: "/BankAccount/Create",
                deleteUrl: "",
                editUrl: ""
            }}
            form={form}
        />

    </>);
}

export default Sec_Agenda;