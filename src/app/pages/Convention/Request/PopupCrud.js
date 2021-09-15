import React, { useState, useRef } from "react"
import Grid from "../../../partials/grid"
import { DeleteButton, EditButton } from "../../../partials/content/UIHelper";
import { Portlet, PortletBody } from "../../../partials/content/Portlet";
import { makeStyles } from "@material-ui/core";
import { useForm, FormProvider } from 'react-hook-form'
import GenModal from "../../../partials/modal";
import baseService from "../../../services/base.service";
import { useDispatch } from "react-redux";
import { loaderActions } from "../../../store/ducks/loader.duck";
import { snackbarActions } from "../../../store/ducks/snackbar.duck";
import Alert from "@material-ui/lab/Alert";
import confirmService from "../../../partials/content/ConfirmService";
import { IconButton } from "@material-ui/core";

const PopupCrud = (props) => {

    const style = {
        color: 'red',
    };

    const { columns, urls, form, secondForm, searchForm, key, initFormValues } = props
    const [filter, setFilter] = useState({
        page: 1,
        pageSize: 10
    });
    const [showModal, setShowModal] = useState(false);
    const [showSecondModal, setshowSecondModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [formError, setFormError] = useState("");
    const [formValues, setFormValues] = useState();
    const [editMode, setEditMode] = useState(false);
    const searchMethods = useForm();
    const formMethods = useForm();

    const classes = useStyle();

    const formRef = useRef();

    const dispatch = useDispatch();




    const editHandler = (item) => {
        setEditMode(true);
        setModalTitle("به روز رسانی");

        if (urls.getUrl) { //which means data is complexer than grid data and needs to be fetch
            dispatch(loaderActions.show())
            baseService.post(urls.getUrl, { id: item.id }).then(res => {
                setFormValues(res.data);
                dispatch(loaderActions.hide())
                if (item.personType == 1) {
                    setShowModal(true);
                }
                else if (item.personType == 2) {
                    setshowSecondModal(true);
                }
            });
        } else {
            setFormValues(item);
            if (item.personType == 1) {
                setShowModal(true);
            }
            else if (item.personType == 2) {
                setshowSecondModal(true);
            }
        }
    }

    const deleteHandler = (item) => {
        confirmService.show("آیا از حذف اطمیان دارید؟").then(isConfirmed => {
            if (isConfirmed) {
                dispatch(loaderActions.show())
                baseService.post(urls.deleteUrl, { id: item.id }).then((result) => {
                    if (result.succeed) {
                        if (item.personType == 1) {
                            setShowModal(false);
                        }
                        else if (item.personType == 2) {
                            setshowSecondModal(false);
                        }
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

    const acceptHandler = (item) => {
        confirmService.show("آیا از تایید درخواست اطمیان دارید؟").then(isConfirmed => {
            if (isConfirmed) {
                dispatch(loaderActions.show())
                baseService.post(urls.acceptUrl, { id: item.id }).then((result) => {
                    if (result.succeed) {

                        dispatch(snackbarActions.success("با موفقیت تایید شد"))
                        forceGridUpdate();

                    } else {
                        setFormError(result.errorMessage);
                    }
                    dispatch(loaderActions.hide())
                })
            }

        });
    }

    const rejectHandler = (item) => {
        confirmService.show("آیا از رد درخواست اطمیان دارید؟").then(isConfirmed => {
            if (isConfirmed) {
                dispatch(loaderActions.show())
                baseService.post(urls.rejectUrl, { id: item.id }).then((result) => {
                    if (result.succeed) {

                        dispatch(snackbarActions.success("با موفقیت تایید شد"))
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
                setshowSecondModal(false);
                dispatch(snackbarActions.success("با موفقیت ثبت شد"))
                forceGridUpdate();

            } else {
                setFormError(result.errorMessage);
            }
            dispatch(loaderActions.hide())
        })
    }

    const modalConfirmHandler = () => {
        //تا وقتی فرم معتبر نباشد همه ورودی ها صدا زده نمیشود
        formRef.current.dispatchEvent(new Event('submit'));
    }


    const forceGridUpdate = () => {
        setFilter(prev => ({ ...prev }));
    }

    let finalColumns = [...columns]

    if (urls.acceptUrl) {
        finalColumns.push({
            title: "تایید درخواست",
            template: (item) => (
                <>
                    <IconButton onClick={() => acceptHandler(item)} color="secondary" aria-label="تایید درخواست">
                        <i className="fa fa-check"></i>
                    </IconButton>
                </>
            ),
            width: 70
        })
    }
    if (urls.acceptUrl) {
        finalColumns.push({
            title: "رد درخواست",
            template: (item) => (
                <>
                    <IconButton onClick={() => rejectHandler(item)} style={style} aria-label="رد درخواست">
                        <i className="fa fa-times"></i>
                    </IconButton>
                </>
            ),
            width: 70
        })
    }



    if (urls.editUrl) {
        finalColumns.push({
            title: "ویرایش",
            template: (item) => (
                <>
                    <EditButton onClick={() => editHandler(item)} />
                </>
            ),
            width: 40
        })
    }
    if (urls.deleteUrl) {
        finalColumns.push({
            title: "حذف",
            template: (item) => (
                <>
                    <DeleteButton onClick={() => deleteHandler(item)} />
                </>
            ),
            width: 40
        })
    }


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

            <GenModal
                title={modalTitle}
                isShow={showModal}
                onDismiss={() => setShowModal(false)}
                onConfirm={modalConfirmHandler}>
                {formError && (
                    <Alert severity="error">{formError}</Alert>
                )}

                <FormProvider values={formValues} {...formMethods}>

                    <form onSubmit={formMethods.handleSubmit(formSubmitHandler)} ref={formRef} >
                        {form(formValues, formMethods)}
                    </form>
                </FormProvider>

            </GenModal >

            <GenModal
                title={modalTitle}
                isShow={showSecondModal}
                onDismiss={() => setshowSecondModal(false)}
                onConfirm={modalConfirmHandler}>
                {formError && (
                    <Alert severity="error">{formError}</Alert>
                )}

                <FormProvider values={formValues} {...formMethods}>

                    <form onSubmit={formMethods.handleSubmit(formSubmitHandler)} ref={formRef} >
                        {secondForm(formValues, formMethods)}
                    </form>
                </FormProvider>
            </GenModal >
        </>
    );
}

const useStyle = makeStyles({
    form: {
        marginBottom: "10px"
    }
})

export default PopupCrud;




