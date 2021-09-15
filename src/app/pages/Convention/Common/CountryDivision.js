import React from "react"
import { Tab, Tabs } from "react-bootstrap"
//import { LayoutSubheader } from "../../../../_metronic/layout/LayoutContext";
import Country from "./Country"
import Province from "./Province"
import City from "./City"

const CorpDetail = () => {



    return (
        <>
            <Tabs defaultActiveKey="country" id="uncontrolled-tab-example">
                <Tab eventKey="country" title="کشور ">
                    <Country />
                </Tab>
                <Tab eventKey="province" title="استان">
                    <Province />
                </Tab>
                <Tab eventKey="city" title="شهر">
                    <City />
                </Tab>
            </Tabs>
        </>
    );
}

export default CorpDetail;