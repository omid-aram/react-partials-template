import React, { useState, useRef, useEffect } from "react";
import Grid from "../../grid"
import { DeleteButton, EditButton } from "../../content/UIHelper";
import { Portlet, PortletHeader, PortletHeaderToolbar, PortletBody } from "../../content/Portlet";
import { makeStyles } from "@material-ui/core";
import { useForm, FormProvider } from 'react-hook-form'
import baseService from "../../../services/base.service";
import { useDispatch, useSelector } from "react-redux";
import { loaderActions } from "../../../store/ducks/loader.duck";
import { snackbarActions } from "../../../store/ducks/snackbar.duck";
import Alert from "@material-ui/lab/Alert";
import confirmService from "../../content/ConfirmService";
import objectPath from "object-path";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ShowMoreModal from "../../../template/ShowMoreModal";
import { MoreVert } from "@material-ui/icons";
import { connect } from "react-redux";
import GenModal from "../../modal";
import GridSanadPricing from "./GridSanadPricing";
import { passIdsActions } from "../../../store/ducks/passIds.duck";

const PopupCurdSanadPricing = (props) => {

    const { title, columns, urls, form, searchForm, key, initFormValues, backButton, moreColumn,refreshHandler, refreshCopySanad } = props
    const [filter, setFilter] = useState({
        page: 1,
        pageSize: 10
    });
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [formError, setFormError] = useState("");
    const [showMoreModal, setShowMoreModal] = useState(false);
    //const [formValues, setFormValues] = useState();
    const [editMode, setEditMode] = useState(false);
    const [moreData, setmoreData] = useState();
    const searchMethods = useForm();
    const formMethods = useForm();
    let history = useHistory();
    const classes = useStyle();

    const formRef = useRef();

    const dispatch = useDispatch();
    const user = useSelector(x => x.auth);

    const CntrlCountList = () => {
        // debugger;
        let b = {};
        b.SRL = props.PricingList.SRL;
        b.UAUSER_SRL = props.PricingList.UAUSER_SRL;
        b.VOU = props.PricingList.VOU;
        b.GADURA_SRL = props.PricingList.GADURA_SRL;
        b.GASYST_SRL = props.PricingList.GASYST_SRL;
        b.personalCode = user.user.personalCode;

        baseService.post("/Sanad/Delete_daftardari", b).then(({ data }) => {
            // console.log('Cntrl_List', data);
            if (data.cnT_TYPE === 2) {

                dispatch(snackbarActions.error("براي اين شماره سند چندين ليست ثبت شده است . لذا از فرم حذف تجميعي استفاده نماييد."))
            }
            else if (data.cnT_TYPE === 1) {

                dispatch(snackbarActions.success("حذف سند دفترداری با موفقیت انجام شد."))
                dispatch(passIdsActions.fetchStatusOaplist(data.status));
                dispatch(passIdsActions.fetchVouDocument(null));
            }
        }).catch(error => {
            console.log(error)
            dispatch(snackbarActions.error("خطا در حذف سند دفترداری."))
            dispatch(loaderActions.hide())
        })
    }

    useEffect(() => {
        console.log("props.StatusOaplist", props.StatusOaplist)
    }, [props.StatusOaplist])


    useEffect(() => {
        if (refreshCopySanad) {
            forceGridUpdate();
            refreshHandler();
        }

    }, [refreshCopySanad])

    const editHandler = (item) => {
        console.log(item)
        setEditMode(true);
        setModalTitle("به روز رسانی");

        if (urls.getUrl) { //which means data is complexer than grid data and needs to be fetch
            dispatch(loaderActions.show())
            baseService.post(urls.getUrl, { id: item.SRL }).then(res => {

                //setFormValues(res.data);
                formMethods.reset(res.data)

                dispatch(loaderActions.hide())
                setShowModal(true);
            });
        } else {
            //setFormValues(item);
            if (typeof item.CRD == "string") {
                item.CRD = parseFloat(item.CRD.replace(/,/g, ''));
                item.DBT = parseFloat(item.DBT.replace(/,/g, ''));
            }
            formMethods.reset({ ...item })
            setShowModal(true);
        }
    }

    const showMoreHandler = (item) => {
        setmoreData(item)
        setShowMoreModal(true);
    }

    const deleteHandler = (item) => {
        confirmService.show("آیا از حذف اطمیان دارید؟").then(isConfirmed => {

            if (isConfirmed) {
                dispatch(loaderActions.show())
                baseService.post(urls.deleteUrl, { Id: item.SRL }).then((result) => {
                    if (result.succeed) {
                        setShowModal(false);
                        dispatch(snackbarActions.success("با موفقیت حذف شد"))
                        forceGridUpdate();

                    } else {
                        setFormError(result.errorMessage);
                    }
                    dispatch(loaderActions.hide())
                })
            }

        });


    }

    const searchHandler = (data) => {
        setFilter(prev => ({
            page: 1,
            pageSize: prev.pageSize,
            ...data
        }));
    }

    const formSubmitHandler = (data) => {

        var url = editMode ? urls.editUrl : urls.createUrl;
        setFormError(null);
        dispatch(loaderActions.show())
        baseService.post(url, data).then((result) => {

            if (result.succeed) {
                setShowModal(false);
                dispatch(snackbarActions.success("با موفقیت ثبت شد"))
                forceGridUpdate();

            } else {
                setFormError(result.errorMessage);
            }
            dispatch(loaderActions.hide())

        })
    }
    const addNewHandler = () => {
        let initVal = { ...initFormValues };
        let k = key ? key : "id";
        objectPath.set(initVal, k, 0);//null id => server validation error
        //setFormValues(initVal);
        formMethods.reset(initVal)
        setFormError(null);

        setEditMode(false);
        setModalTitle("ثبت مورد جدید");
        setShowModal(true);
    }

    const modalConfirmHandler = () => {
        //تا وقتی فرم معتبر نباشد همه ورودی ها صدا زده نمیشود
        formRef.current.dispatchEvent(new Event('submit'));
    }


    const forceGridUpdate = () => {
        setFilter(prev => ({ ...prev }));
    }



    let finalColumns = [...columns]

    if (urls.editUrl) {
        finalColumns.push({
            title: "",
            template: (item) => (
                <>
                    {props.StatusOaplist === 0   ? <EditButton onClick={() => editHandler(item)} /> : <></>}
                </>
            ),
            width: 80
        })
    }
    if (urls.deleteUrl) {
        finalColumns.push({
            title: "",
            template: (item) => (
                <>
                    {props.StatusOaplist === 0   ? <DeleteButton onClick={() => deleteHandler(item)} /> : <></>}
                </>
            ),
            width: 80
        })
    }


    if (moreColumn) {
        finalColumns.push({
            title: "",
            template: (item) => (
                <>
                    <IconButton style={{ float: "left" }} size="small" onClick={() => showMoreHandler(item)} component="span">
                        <MoreVert />
                    </IconButton>
                </>

            ),
            width: 100
        })
    }

    return (
        <>
{console.log("statuspricing",props.StatusOaplist)}
            <ShowMoreModal
                moreColumn={moreColumn}
                data={moreData}
                isShow={showMoreModal}
                onClose={() => setShowMoreModal(false)} />

            <Portlet>
                <PortletHeader
                    title={title}
                    toolbar={
                        (
                            <PortletHeaderToolbar>
                                {props.StatusOaplist === 0  &&  props.hasDataSanad === true  ?
                                    <Button onClick={addNewHandler} variant="success">
                                        <i className="fa fa-plus" />
                                        ثبت مورد جدید
                                    </Button> : <></>}

                                {/*props.PricingList.VOU !== null &&*/ props.StatusOaplist === 2  &&  props.VouDocument !== null?
                                    <Button onClick={CntrlCountList} variant="outline-danger" >
                                        <i className="fa fa-trash" />
                                        حذف سند دفترداری
                                    </Button> : <></>}

                            </PortletHeaderToolbar>
                        )}

                />

                <PortletBody>

                    {searchForm && (
                        <FormProvider  {...searchMethods}>
                            <form onSubmit={searchMethods.handleSubmit(searchHandler)} className={classes.form}>
                                {searchForm}
                            </form>
                        </FormProvider >
                    )}

                    <GridSanadPricing
                        GetId={urls.GetId}
                        filter={filter}
                        Value={urls.Value}
                        url={urls.readUrl}
                        columns={finalColumns}
                    />
                </PortletBody>
            </Portlet>

            <GenModal
                title={modalTitle}
                isShow={showModal}
                onDismiss={() => setShowModal(false)}
                onConfirm={modalConfirmHandler}>
                {formError && (
                    <Alert severity="error">{formError}</Alert>
                )}

                {backButton ?
                    <div className="clearfix" style={{ padding: '.5rem' }}>
                        <button onClick={() => history.goBack()} className="btn btn-warning float-right">
                            <i className="fa fa-angle-right" />
                            بازگشت
                        </button>
                    </div>
                    :
                    null
                }

                {/* values={formValues} */}
                <FormProvider {...formMethods}>

                    <form onSubmit={formMethods.handleSubmit(formSubmitHandler)} ref={formRef} >
                        {form(formMethods)}
                    </form>
                </FormProvider >

            </GenModal >
        </>
    );
}

const useStyle = makeStyles({
    form: {
        marginBottom: "10px"
    }
})

const mapStateToProps = state => {
   // console.log("reduxpricingsanad",state)
    return {
        PricingList: state.passIds.PricingList,
        StatusOaplist: state.passIds.statusBtnSanad,
        hasDataSanad : state.passIds.hasDataSanad,
        VouDocument : state.passIds.btnVou,
    };
};
export default connect(mapStateToProps)(PopupCurdSanadPricing);