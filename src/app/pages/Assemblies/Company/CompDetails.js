import React from 'react'
import { Tab, Tabs } from "react-bootstrap"

import CompAddress from "./CompAddress";
import CompCapacity from "./CompCapacity";
import CompShareholder from "./CompShareholder";
import CompFiscalYear from "./CompFiscalYear";
import CompSubCompany from "./CompSubCompany";
import CompPartner from "./CompPartner";
import CompActivity from "./CompActivity";
import CompDocument from "./CompDocument";

const CompDetails = (parentItem) => {
    //console.log('parentItem', parentItem)
    return (
        <>
            <Tabs defaultActiveKey="address" id="uncontrolled-tab-example">
                <Tab eventKey="address" title="آدرس">
                    <CompAddress parentItem={parentItem} />
                </Tab>
                <Tab eventKey="capacity" title="ظرفیت تولید">
                    <CompCapacity parentItem={parentItem} />
                </Tab>
                <Tab eventKey="shareholder" title="سهامداران">
                    <CompShareholder parentItem={parentItem} />
                </Tab>
                <Tab eventKey="fiscalYear" title="سال مالی">
                    <CompFiscalYear parentItem={parentItem} />
                </Tab>
                <Tab eventKey="subCompany" title="شرکتهای زیرمجموعه">
                    <CompSubCompany parentItem={parentItem} />
                </Tab>
                <Tab eventKey="partner" title="شرکای تجاری">
                    <CompPartner parentItem={parentItem} />
                </Tab>
                <Tab eventKey="activity" title="فعالیت ها">
                    <CompActivity parentItem={parentItem} />
                </Tab>
                <Tab eventKey="document" title="مستندات">
                    <CompDocument parentItem={parentItem} />
                </Tab>
            </Tabs>
        </>
    );
}

export default CompDetails;