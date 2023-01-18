import React from 'react'
import { Tab, Tabs } from "react-bootstrap"

import PersonTab from "./PersonTab";
import LegalTab from "./LegalTab";

const Person = () => {

    return (
        <>
            <Tabs defaultActiveKey="person" id="uncontrolled-tab-example">
                <Tab eventKey="person" title="اشخاص حقیقی">
                    <PersonTab />
                </Tab>
                <Tab eventKey="legal" title="اشخاص حقوقی">
                    <LegalTab />
                </Tab>
            </Tabs>
        </>
    );
}

export default Person;