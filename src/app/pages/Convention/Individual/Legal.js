import React from "react"
import { connect } from "react-redux";
import { Admin, User } from "../Partials/_Legal"
import Enums from '../Partials/Enums';

const Legal = (props) => {

    const access = props.user.access.find(x => x.appType === Enums.ApplicationType);

    const role = access.code;
    const app = access.applicationId;
    const companyId = access.companyId;

    return (
        <>
            {role === Enums.RoleAccess.Admin && Enums.ApplicationId === app ? <Admin /> : role === Enums.RoleAccess.User && Enums.ApplicationId === app ? <User companyId={companyId} /> : null}
        </>
    )

}

const mapStateToProps = ({ auth: { user } }) => ({
    user
});

export default connect(mapStateToProps)(Legal);