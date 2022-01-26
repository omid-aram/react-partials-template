import React from 'react'
import { Tab, Tabs } from "react-bootstrap"

import MeetAgenda from "./MeetAgenda";
import MeetBoard from "./MeetBoard";

const MeetDetails = (parentItem) => {
    return (
        <>
            <Tabs defaultActiveKey="meetAgenda" id="uncontrolled-tab-example">
                <Tab eventKey="meetAgenda" title="دستور جلسه">
                    <MeetAgenda parentItem={parentItem} />
                </Tab>
                <Tab eventKey="meetBoard" title="اعضاء هیئت مدیره حاضر در جلسه">
                    <MeetBoard parentItem={parentItem} />
                </Tab>
            </Tabs>
        </>
    );
}

export default MeetDetails;