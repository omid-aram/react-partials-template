import React from "react"
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col, Button } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/Custom/SimpleInputHidden";
import InputSelect from "../../../partials/editors/InputSelect";
import InputDate from "../../../partials/editors/InputDate";
import InputFile from "../../../partials/editors/InputFile";
import baseService from "../../../services/base.service";
import { connect } from "react-redux";

const Announcement = (props) => {

    const columns = [
        {
            field: "NAME",
            title: "عنوان آگهی",
            width: 80
        },
        {
            field: "TYPETITLE",
            title: "نوع آگهی",
            width: 70
        },
        {
            field: "DESCRIPTION",
            title: "شرح آگهی",
            width: 70
        },
        {
            field: "PERSIANDATE",
            title: "تاریخ آگهی",
            width: 70
        },
        {
            title: "",
            width: 70,
            template: (item) => (
                <>
                    <Button href={baseService.baseFileUrl + item.FILE_BINARYID} variant="outline-dark" size="sm">
                        دانلود
                    </Button>
                </>
            )
        },
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <SimpleInputHidden name="conventionId" value={props.meetingIdState} />
            <Row>
                <Col sm={6}>
                    <InputSelect
                        type="1"
                        enumType="AnnouncementType"
                        name="ANNOUNCEMENTTYPE"
                        label="نوع آگهی"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="NAME"
                        label="عنوان آگهی"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <InputDate
                        name="DATE"
                        label="تاریخ آگهی"
                        time={false}
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputFile
                        name="FILE_BINARYID"
                        label="آپلود"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <InputText
                        name="DESCRIPTION"
                        label="شرح آگهی"
                    />
                </Col>
            </Row>
        </div >
    );

    return (<>

        <PopupCurd
            backButton={true}
            columns={columns}
            title="مدیریت آگهی "
            urls={{
                GetId: props.meetingIdState,
                readUrl: "/Announcement/Show",
                createUrl: "/Announcement/Create",
                deleteUrl: "/Announcement/Delete",
                editUrl: "/Announcement/Update"
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
export default connect(mapStateToProps)(Announcement);