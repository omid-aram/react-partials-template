import React from "react"
import { Tab, Tabs } from "react-bootstrap"
import LegalAgent from "./LegalAgent"
import ActualAgent from "./ActualAgent"

const AgentDetail = () => {


    return (
        <>
            <Tabs defaultActiveKey="legal" id="uncontrolled-tab-example">
                <Tab eventKey="legal" title="نماینده حقوقی">
                    <LegalAgent />
                </Tab>
                <Tab eventKey="individual" title="نماینده حقیقی">
                    <ActualAgent />
                </Tab>
            </Tabs>
        </>
    );
}

export default AgentDetail;