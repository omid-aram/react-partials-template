
import React, { useState } from "react"
import Grid from "../../../partials/grid"
import { Portlet, PortletBody } from "../../../partials/content/Portlet";
import { makeStyles } from "@material-ui/core";
import { useForm, FormProvider } from 'react-hook-form'


const PopupCurd = (props) => {

    const { columns, urls, searchForm } = props
    const [filter, setFilter] = useState({
        page: 1,
        pageSize: 10
    });

    const searchMethods = useForm();
    const classes = useStyle();



    const searchHandler = (data) => {
        setFilter(prev => ({
            page: 1,
            pageSize: prev.pageSize,
            ...data
        }));
    }

    let finalColumns = [...columns]


    return (
        <>
            <Portlet>
                <PortletBody>
                    {searchForm && (
                        <FormProvider {...searchMethods}>
                            <form onSubmit={searchMethods.handleSubmit(searchHandler)} className={classes.form}>
                                {searchForm}
                            </form>
                        </FormProvider>
                    )}
                    <Grid
                        GetId={urls.GetId}
                        filter={filter}
                        url={urls.readUrl}
                        columns={finalColumns}
                    />
                </PortletBody>
            </Portlet>
        </>
    );
}

const useStyle = makeStyles({
    form: {
        marginBottom: "10px"
    }
})

export default PopupCurd;