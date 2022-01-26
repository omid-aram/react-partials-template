import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import HomePage from "./home/HomePage";

import CompanyGroup from "./Common/CompanyGroup";
import Company from "./Common/Company";

import AsmDocType from "./Assemblies/BaseInfo/AsmDocType";
import AsmProdLine from "./Assemblies/BaseInfo/AsmProdLine";
import AsmTaskType from "./Assemblies/BaseInfo/AsmTaskType";
import AsmFundType from "./Assemblies/BaseInfo/AsmFundType";
import Person from "./Assemblies/Person/Person";

// import CompAddress from "./Assemblies/Company/CompAddress";
// import CompCapacity from "./Assemblies/Company/CompCapacity";
// import CompShareholder from "./Assemblies/Company/CompShareholder";

import AssemInfo from "./Assemblies/Assembly/AssemInfo";
import MeetInfo from "./Assemblies/Meeting/MeetInfo";

///////////////////////////////////
import UserCharts from "./Secretariat/UserCharts";

import MeetingRequest from "./Secretariat/MeetingRequest";
import MeetingRequestParagraph from "./Secretariat/MeetingRequestParagraph";

import Sec_Agenda from "./Secretariat/Sec_Agenda";
import AgendaParagraph from "./Secretariat/AgendaParagraph";

import Communication from "./Secretariat/Communication";
import CommunicationParagraph from "./Secretariat/CommunicationParagraph";

import Proceeding from "./Secretariat/Proceeding";
import ProceedingParagraph from "./Secretariat/ProceedingParagraph";

import ProductionLine from "./Convention/Common/ProductionLine";
import CorpBase from "./Convention/Company/CorpBase";
import Individual from "./Convention/Individual/Individual";
import CorpDetail from "./Convention/Company/CorpDetail";
import CountryDivision from "./Convention/Common/CountryDivision";
import GroupAndType from "./Convention/Common/GroupAndType";
import AgentDetail from "./Convention/Common/AgentDetail";
import MeetingBase from "./Convention/Meeting/MeetingBase";
import Directorate from "./Convention/Meeting/Directorate";
import Agenda from "./Convention/Meeting/Agenda";
import Approval from "./Convention/Meeting/Approval";
import CapitalChange from "./Convention/Meeting/CapitalChange";
import BoardofDirectors from "./Convention/Meeting/BoardofDirectors";
import Inspector from "./Convention/Meeting/Inspector";
import AuditorReport from "./Convention/Meeting/AuditorReport";
import CapitalChangeDetail from "./Convention/Meeting/CapitalChangeDetail";
import Announcement from "./Convention/Meeting/Announcement";
import BoardMeeting from "./Convention/BoardMeeting/BoardMeeting";
import BoardAgenda from "./Convention/BoardMeeting/BoardAgenda";
import BoardApproval from "./Convention/BoardMeeting/BoardApproval";
import Request from "./Convention/Request/Request";
import AgendaRpt from "./Convention/Report/Agenda";
import ConventionRpt from "./Convention/Report/Convention";
import AgendaType from "./Convention/Common/AgendaType";
import DirectoratePresentInMeeting from "./Convention/BoardMeeting/DirectoratePresentInMeeting";

export default function PagesRoute({ baseUrl }) {

  return (
    <Switch>
      {
        <Redirect exact from="/" to="/home" />
      }

      <Route path="/home" component={HomePage} />

      <Route path="/CompanyGroup" component={CompanyGroup} />
      <Route path="/Company" component={Company} />

      <Route path="/AsmDocType" component={AsmDocType} />
      <Route path="/AsmProdLine" component={AsmProdLine} />
      <Route path="/AsmTaskType" component={AsmTaskType} />
      <Route path="/AsmFundType" component={AsmFundType} />
      <Route path="/Person" component={Person} />

      {/* <Route path="/CompAddress" component={CompAddress} />
      <Route path="/CompCapacity" component={CompCapacity} />
      <Route path="/CompShareholder" component={CompShareholder} /> */}

      <Route path="/AssemInfo" component={AssemInfo} />
      <Route path="/MeetInfo" component={MeetInfo} />

      {/* -------------------- */}
      <Route path="/UserCharts" component={UserCharts} />

      <Route path="/MeetingRequest" component={MeetingRequest} />
      <Route path="/MeetingRequestParagraph" component={MeetingRequestParagraph} />

      <Route path="/Sec_Agenda" component={Sec_Agenda} />
      <Route path="/AgendaParagraph" component={AgendaParagraph} />

      <Route path="/Communication" component={Communication} />
      <Route path="/CommunicationParagraph" component={CommunicationParagraph} />

      <Route path="/Proceeding" component={Proceeding} />
      <Route path="/ProceedingParagraph" component={ProceedingParagraph} />

      <Route path="/AgendaType" component={AgendaType} />
      <Route path="/Individual" component={Individual} />
      <Route path="/Directorate" component={Directorate} />
      <Route path="/Agenda" component={Agenda} />
      <Route path="/Approval" component={Approval} />
      <Route path="/Inspector" component={Inspector} />
      <Route path="/AuditorReport" component={AuditorReport} />
      <Route path="/BoardofDirectors" component={BoardofDirectors} />
      <Route path="/CapitalChange" component={CapitalChange} />
      <Route path="/CapitalChangeDetail" component={CapitalChangeDetail} />
      <Route path="/Announcement" component={Announcement} />
      <Route path="/BoardMeeting" component={BoardMeeting} />
      <Route path="/BoardAgenda" component={BoardAgenda} />
      <Route path="/BoardApproval" component={BoardApproval} />
      <Route path="/CorpDetail" component={CorpDetail} />
      <Route path="/GroupAndType" component={GroupAndType} />
      <Route path="/CountryDivision" component={CountryDivision} />
      <Route path="/AgentDetail" component={AgentDetail} />
      <Route path="/Request" component={Request} />
      <Route path="/Report/Agenda" component={AgendaRpt} />
      <Route path="/Report/Convention" component={ConventionRpt} />
      <Route path="/CorpBase" component={CorpBase} />
      <Route path="/ProductLine" component={ProductionLine} />
      <Route path="/MeetingBase" component={MeetingBase} />
      <Route path="/DirectoratePresentInMeeting" component={DirectoratePresentInMeeting} />
    </Switch>
  );
}
