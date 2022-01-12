import React from 'react'
import { Tab, Tabs } from "react-bootstrap"

import AssemBoard from "./AssemBoard";
import AssemAgenda from "./AssemAgenda";
import AssemDocument from "./AssemDocument";
import AssemAnnounce from "./AssemAnnounce";

const AssemDetails = (parentItem) => {
    //console.log('parentItem', parentItem)
    return (
        <>
            <Tabs defaultActiveKey="assemBoard" id="uncontrolled-tab-example">
                <Tab eventKey="assemBoard" title="هیئت رئیسه و بازرسان">
                    <AssemBoard parentItem={parentItem} />
                </Tab>
                <Tab eventKey="assemAgenda" title="دستور جلسه">
                    <AssemAgenda parentItem={parentItem} />
                </Tab>
                <Tab eventKey="assemDocument" title="مستندات">
                    <AssemDocument parentItem={parentItem} />
                </Tab>
                <Tab eventKey="assemAnnounce" title="آگهی">
                    <AssemAnnounce parentItem={parentItem} />
                </Tab>
            </Tabs>
        </>
    );
}

export default AssemDetails;