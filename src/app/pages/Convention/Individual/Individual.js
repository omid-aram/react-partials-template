import React from "react"
import { Tab, Tabs } from "react-bootstrap"
import Person from "./Person";
import Legal from "./Legal";

const Individual = () => {


    return (
        <>
            <Tabs defaultActiveKey="person" id="uncontrolled-tab-example">
                <Tab eventKey="person" title="شخص حقیقی">
                    <Person />
                </Tab>
                <Tab eventKey="legal" title="شخص حقوقی">
                    <Legal />
                </Tab>
            </Tabs>
        </>
    );
}

export default Individual;