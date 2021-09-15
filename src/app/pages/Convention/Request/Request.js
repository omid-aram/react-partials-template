import React from "react"
import { Tab, Tabs } from "react-bootstrap"
import Accept from "./Accept";
import Reject from "./Reject";
import Waiting from "./Waiting";


const Request = () => {


    return (
        <>
            <Tabs defaultActiveKey="waiting" id="uncontrolled-tab-example">
                <Tab eventKey="waiting" title="در انتظار">
                    <Waiting />
                </Tab>
                <Tab eventKey="accept" title="تایید شده">
                    <Accept />
                </Tab>
                <Tab eventKey="reject" title="رد شده">
                    <Reject />
                </Tab>
            </Tabs>
        </>
    );
}

export default Request;