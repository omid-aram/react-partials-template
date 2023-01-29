import React from "react"
import PopupCurd from "../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";
import InputHidden from "../../partials/editors/InputHidden";
import InputSelect from "../../partials/editors/InputSelect";

const UserCharts = () => {


    const columns = [
        {
            field: "company",
            title: "چارت سازمانی",
            width: 140
        },
        {
            field: "personAgent",
            title: "نام و نام خانوادگی"
        }
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="id" />
            <Row>
                <Col sm={6}>
                    <InputSelect
                        label=" چارت سازمانی"
                        name="chart"
                        apiUrl="/Common/ChartDropDown"
                        textField="desc"
                        valueField="id"
                        // serverBinding={{
                        //     url: '/Common/ChartDropDown',
                        //     filter: {},
                        //     textField: 'desc',
                        //     valueField: 'id'
                        // }}
                        rules={{ required: "اجباری است" }} />
                </Col>
                <Col sm={6}>
                    <InputSelect
                        label="کاربر"
                        name="user"
                        apiUrl="/Common/UserDropDown"
                        textField="desc"
                        valueField="id"
                        // serverBinding={{
                        //     url: '/Common/UserDropDown',
                        //     filter: {},
                        //     textField: 'desc',
                        //     valueField: 'id'
                        // }}
                        rules={{ required: "اجباری است" }} />
                </Col>
            </Row>
        </div >
    );
    return (<>

        <PopupCurd
            columns={columns}
            title="مدیریت چارت سازمانی"
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

export default UserCharts;