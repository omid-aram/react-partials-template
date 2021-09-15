import React, { useState } from "react"
import { Tab, Tabs } from "react-bootstrap"
import CorpDocuments from "./CorpDocuments"
import CorpActivity from "./CorpActivity"
import CorpBusPartners from "./CorpBusPartners"
import CorpFiscalYear from "./CorpFiscalYear"
import CorpShareholders from "./CorpShareholders"
import CorpPrdCap from "./CorpPrdCap"
import CorpAddress from "./CorpAddress"
import { Row, Col, Button } from "react-bootstrap";
import InputSelect from "../../../partials/editors/InputSelect";
import { useForm, FormProvider } from 'react-hook-form'
import { makeStyles } from "@material-ui/core";
const CorpDetail = () => {

    const searchMethods = useForm();
    const classes = useStyle();
    // const [companyLocalFilter, setcompanyLocalFilter] = useState({
    //     page: 1,
    //     pageSize: 10,
    //     company: 0
    // });
    const [filter, setFilter] = useState({
        page: 1,
        pageSize: 10,
        company:''
    });
    const searchHandler = (data) => {
      setFilter(prev => ({
            page: 1,
            pageSize: prev.pageSize,
            company: data.company
        }));
    }
    const forceGridUpdate = () => {
        setFilter(prev => ({ ...prev }));
    }
    return (
        <>
            <FormProvider {...searchMethods}>
                <form onSubmit={searchMethods.handleSubmit(searchHandler)} className={classes.form}>
                    <Col md={12}>
                        <Row>
                            <Col md={4}>
                                <InputSelect
                                    controller="Company"
                                    action="GetSelectData"
                                    name="COMPANY"
                                    label="شرکت"
                                />

                            </Col>
                            <Col sm={4}>
                                <Button variant="btn btn-outline-dark" type="submit">
                                    <i className="fa fa-search" />
                        جستجو
                        </Button>
                            </Col>
                        </Row>
                    </Col>
                </form>
            </FormProvider>
            <Tabs defaultActiveKey="address" id="uncontrolled-tab-example">
                <Tab eventKey="address" title="آدرس ها">
                    <CorpAddress companyLocalFilter={filter} forceGridUpdate={forceGridUpdate} />
                </Tab>
                <Tab eventKey="prpCap" title="ظرفیت تولید">
                    <CorpPrdCap companyLocalFilter={filter} forceGridUpdate={forceGridUpdate} />
                </Tab>
                <Tab eventKey="shareHolder" title="سهامداران">
                    <CorpShareholders companyLocalFilter={filter} forceGridUpdate={forceGridUpdate}/>
                </Tab>
                <Tab eventKey="fiscalYear" title="سال مالی">
                    <CorpFiscalYear companyLocalFilter={filter} forceGridUpdate={forceGridUpdate}/>
                </Tab>
                <Tab eventKey="busPartner" title="شرکا تجاری">
                    <CorpBusPartners companyLocalFilter={filter} forceGridUpdate={forceGridUpdate}/>
                </Tab>
                <Tab eventKey="activity" title="فعالیت ها">
                    <CorpActivity companyLocalFilter={filter} forceGridUpdate={forceGridUpdate}/>
                </Tab>
                <Tab eventKey="document" title="مستندات">
                    <CorpDocuments companyLocalFilter={filter} forceGridUpdate={forceGridUpdate}/>
                </Tab>
            </Tabs>
        </>
    );




}

const useStyle = makeStyles({
    form: {
        marginBottom: "20px"
    },
})

export default CorpDetail;