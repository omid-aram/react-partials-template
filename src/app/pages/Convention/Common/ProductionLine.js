import React from 'react';
import { connect } from "react-redux";
import { Admin, User } from "../Partials/_ProductionLine"
import Enums from '../Partials/Enums';
import PopupCurd from "../../../template/PopupCrud"
import { Row, Col, Button } from "react-bootstrap";
import InputText from "../../../partials/editors/InputText";
import InputHidden from "../../../partials/editors/InputHidden";

const ProductionLine = (props) => {

     const access = props.user.access.find(x => x.appType === Enums.ApplicationType);

     const role = access.code;
     const app = access.applicationId;
     const companyId = access.companyId;
     //debugger;

    //  return (

    //      <>
    //          {role === Enums.RoleAccess.Admin && Enums.ApplicationId === app ? <Admin /> : role === Enums.RoleAccess.User && Enums.ApplicationId === app ? <User companyId={companyId} /> : null}
    //      </>

    //  ) 

    const columns = [
        {
            field: "CODE",
            title: "کد",
            width: 140
        },
        {
            field: "SALOON",
            title: "سالن",
            width: 140
        },
        {
            field: "LOCATION",
            title: "موقعیت",
            width: 140
        }
    ]

    const form = () => (
        <div className="form-container">
            <InputHidden name="ID" />
            <Row>
                <Col sm={6}>
                    <InputText
                        name="CODE"
                        label="کد"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="SALOON"
                        label="سالن"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
                <Col sm={6}>
                    <InputText
                        name="LOCATION"
                        label="موقعیت"
                        rules={{ required: "اجباری است" }}
                    />
                </Col>
            </Row>
        </div>
    );


    // const searchForm = (
    //     <>
    //         <Row>
    //             <Col md={3}>
    //                 <InputText
    //                     name="code"
    //                     label="کد"
    //                 />
    //             </Col>
    //             <Col md={3}>
    //                 <InputText
    //                     name="name"
    //                     label="نام دستور جلسه "
    //                 />
    //             </Col>
    //             <Col sm={2}>
    //                 <Button variant="btn btn-outline-dark" type="submit">
    //                     <i className="fa fa-search" />
    //                     جستجو
    //                     </Button>
    //             </Col>
    //         </Row>
    //     </>
    // );

    return (<>

        <PopupCurd
            columns={columns}
            title="تعریف خطوط تولیدی"
            urls={{
                readUrl: "/ProductionLine/Show",
                createUrl: "/ProductionLine/Create",
                deleteUrl: "/ProductionLine/Delete",
                editUrl: "/ProductionLine/Update"
            }}
            form={form}
            //searchForm={searchForm}
        />

    </>);


}

const mapStateToProps = ({ auth: { user } }) => ({
    user
});

export default connect(mapStateToProps)(ProductionLine);



