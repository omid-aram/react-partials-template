import React from 'react'
import { Tab, Tabs } from "react-bootstrap"

import _Person from "./_Person";
import _Legal from "./_Legal";

const Person = () => {

    return (
        <>
            <Tabs defaultActiveKey="person" id="uncontrolled-tab-example">
                <Tab eventKey="person" title="اشخاص حقیقی">
                    <_Person />
                </Tab>
                <Tab eventKey="legal" title="اشخاص حقوقی">
                    <_Legal />
                </Tab>
            </Tabs>
        </>
    );
}

export default Person;