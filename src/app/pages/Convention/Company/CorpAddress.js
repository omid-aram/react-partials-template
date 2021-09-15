import React from "react"
import { Admin, User } from "../Partials/_CorpAddress"
import Enums from '../Partials/Enums';
import { connect } from "react-redux";


const CorpAddress = (props) => {

    const { companyLocalFilter , forceGridUpdate} = props;
  

    // const role = props.user.access[0].code;
    // const app = props.user.access[0].applicationId;
    // const companyId = props.user.access[0].companyId;

    const access = props.user.access.find(x => x.appType === Enums.ApplicationType);

    const role = access.code;
    const app = access.applicationId;
    const companyId = access.companyId;
    
    return (
        <>
            {role === Enums.RoleAccess.Admin && Enums.ApplicationId === app  ? <Admin companyLocalFilter={companyLocalFilter} forceGridUpdate={forceGridUpdate} /> : role === Enums.RoleAccess.User && Enums.ApplicationId === app ? <User companyId={companyId} /> : null}
        </>
    )

}

const mapStateToProps = ({ auth: { user } }) => ({
    user
});

export default connect(mapStateToProps)(CorpAddress);