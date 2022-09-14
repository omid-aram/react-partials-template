import React from 'react'
import { Tab, Tabs } from "react-bootstrap"

import AssemInvest from "./AssemInvest";
import AssemMember from "./AssemMember";
import AssemInspector from "./AssemInspector";

const AssemApprovalDetails = (parentItem) => {

    return (
        <>
            <Tabs defaultActiveKey="assemInvest" id="uncontrolled-tab-example">
                <Tab eventKey="assemInvest" title="تغییرات سرمایه">
                    <AssemInvest parentItem={parentItem} />
                </Tab>
                <Tab eventKey="assemMember" title="تعیین اعضای هیئت مدیره">
                    <AssemMember parentItem={parentItem} />
                </Tab>
                <Tab eventKey="assemInspector" title="تعیین بازرسان">
                    <AssemInspector parentItem={parentItem} />
                </Tab>
            </Tabs>
        </>
    );
}

export default AssemApprovalDetails;