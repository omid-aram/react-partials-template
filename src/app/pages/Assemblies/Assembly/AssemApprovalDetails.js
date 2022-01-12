import React from 'react'
import { Tab, Tabs } from "react-bootstrap"

import PopupCurd from "../../../template/PopupCrud"
import { Row, Col } from "react-bootstrap";

import InputText from "../../../partials/editors/InputText";
import InputNumber from "../../../partials/editors/InputNumber";
import InputMoney from "../../../partials/editors/InputMoney";
import InputHidden from "../../../partials/editors/InputHidden";
import SimpleInputHidden from "../../../partials/editors/SimpleInputHidden";
import InputDate from "../../../partials/editors/InputDate";
import InputSelect from "../../../partials/editors/InputSelect";
import InputSelectApi from "../../../partials/editors/InputSelectApi";
import InputSelectApiChangeValue from "../../../partials/editors/InputSelectApiChangeValue";
import InputSelectApiInputParams from "../../../partials/editors/InputSelectApiInputParams";

import InputCheckbox from "../../../partials/editors/InputCheckbox";

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