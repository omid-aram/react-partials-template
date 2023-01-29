import React, { useState, useRef, useEffect } from "react"
import { DeleteButton, EditButton } from "../../content/UIHelper";
import { Portlet, PortletHeader, PortletHeaderToolbar, PortletBody } from "../../content/Portlet";
import { makeStyles } from "@material-ui/core";
import { useForm, FormProvider } from 'react-hook-form'
import GenModal from "../../modal";
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
import Grid from "../../grid";
import GridSanadSefaresh from "./GridSanadSefaresh";
import { connect } from "react-redux";
import { string } from "prop-types";
import { passIdsActions } from "../../../store/ducks/passIds.duck";


const PopupCurdSanadSefaresh = (props) => {

    const { title, columns, refreshHandler, refreshCopySanad, urls, form, searchForm, key, initFormValues, backButton, moreColumn, sefareshData } = props
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
    const [datacntrl, setdatacntrl] = useState();

    const formRef = useRef();

    const dispatch = useDispatch();
    // console.log("sefareshData111", sefareshData);

    useEffect(() => {
        // console.log("props.StatusOaplist", props.StatusOaplist)
    }, [props.StatusOaplist])

    useEffect(() => {
        if (refreshCopySanad) {
            forceGridUpdate();
            refreshHandler();
        }

    }, [refreshCopySanad])
    const editHandler = (item) => {
        debugger;
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

            if (typeof item.CRD == "string") {
                item.CRD = parseFloat(item.CRD.replace(/,/g, ''));
                item.DBT = parseFloat(item.DBT.replace(/,/g, ''));;
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
        debugger;
        if (typeof data.CRD == "string") {
            data.CRD = parseFloat(data.CRD.replace(/,/g, ''));
            //data.DBT = parseFloat(data.DBT.replace(/,/g, ''));
        }
        if (typeof data.DBT == "string") {
            //data.CRD = parseFloat(data.CRD.replace(/,/g, ''));
            data.DBT = parseFloat(data.DBT.replace(/,/g, ''));
        }
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

        }).catch(error => {
            console.log(error)
            dispatch(snackbarActions.success("خطا در ثبت."))
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
                    {props.StatusOaplist === 0  ? <EditButton onClick={() => editHandler(item)} /> : <></>}
                </>
            ),
            width: 50
        })
    }
    if (urls.deleteUrl) {
        finalColumns.push({
            title: "",
            template: (item) => (
                <>
                    {props.StatusOaplist === 0  ? <DeleteButton onClick={() => deleteHandler(item)} /> : <></>}
                </>
            ),
            width: 50
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
            width: 10
        })
    }

    const user = useSelector(x => x.auth);

    const CntrlCountList = () => {
        debugger;
        let b = {};
        b.SRL = sefareshData.SRL;
        b.UAUSER_SRL = sefareshData.UAUSER_SRL;
        b.VOU = sefareshData.VOU;
        b.GADURA_SRL = sefareshData.GADURA_SRL;
        b.GASYST_SRL = sefareshData.GASYST_SRL;
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
        }).catch(err => {
            console.log('err', err);
            dispatch(snackbarActions.error("خطا در حذف سند دفترداری."))
            dispatch(loaderActions.hide())
        })
    }

    useEffect(() => {
        debugger;
        let b = {};
        b.VOU = sefareshData.VOU;
        b.GADURA_SRL = sefareshData.GADURA_SRL;
        b.GASYST_SRL = sefareshData.GASYST_SRL;
        baseService.post("/Sanad/Cntrl_Delete_daftardari", b).then(({ data }) => {

            //  console.log('cntrldeletedaftardari',data);
           // setdatacntrl(data.cntrL_CNT);
           dispatch(passIdsActions.fetchdataCntrl(data.cntrL_CNT));
        })

    }, [])

    return (
        <>

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

                                {props.OrderDataSanad && props.StatusOaplist === 0  ?
                                    <Button
                                        onClick={addNewHandler}
                                        variant="success"
                                    >
                                        <i className="fa fa-plus" />
                                        ثبت مورد جدید
                                    </Button> : <></>}

                                {props.datacntrlsanad === true && props.StatusOaplist === 2  && props.VouDocument !== null ?
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
                    {/* {console.log("pppppppppppppppppppp", props)} */}
                    <GridSanadSefaresh
                        sefareshData={sefareshData}
                        GetId={urls.GetId}
                        filter={filter}
                        url={urls.readUrl}
                        Value={urls.Value}
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
    return {
        SefareshData: state.passIds.SefareshData,
        OrderDataSanad: state.passIds.OrderDataSanad,
        StatusOaplist: state.passIds.statusBtnSanad,
        datacntrlsanad: state.passIds.datacntrlsanad,
        VouDocument : state.passIds.btnVou,
    };
};
export default connect(mapStateToProps)(PopupCurdSanadSefaresh);