import React, { useState, useRef } from "react"
import Grid from "../partials/grid"
import { DeleteButton, EditButton } from "../partials/content/UIHelper";
import { Portlet, PortletHeader, PortletHeaderToolbar, PortletBody } from "../partials/content/Portlet";
import { makeStyles } from "@material-ui/core";
import { useForm, FormProvider } from 'react-hook-form'
import GenModal from "../partials/modal";
import baseService from "../services/base.service";
import { useDispatch } from "react-redux";
import { loaderActions } from "../store/ducks/loader.duck";
import { snackbarActions } from "../store/ducks/snackbar.duck";
import Alert from "@material-ui/lab/Alert";
import confirmService from "../partials/content/ConfirmService";
import objectPath from "object-path";


const PopupCurd = (props) => {

    const { title, columns, urls, form, searchForm, key, sortItem, initFormValues, pageSize, modalSize, initSearchValues } = props
    const [filter, setFilter] = useState({
        page: 1,
        pageSize: pageSize || 10,
        sort: sortItem || null,
        ...initSearchValues,
    });
    const [showModal, setShowModal] = useState(false);
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

        //debugger;
        setEditMode(true);
        setModalTitle("به روز رسانی");

        if (urls.getUrl) { //which means data is complexer than grid data and needs to be fetch
            dispatch(loaderActions.show())
            baseService.post(urls.getUrl, { id: item.id }).then(res => {

                //setFormValues(res.data);
                formMethods.reset(res.data)

                dispatch(loaderActions.hide())
                setShowModal(true);
            });
        } else {
            //  setFormValues(item);
            formMethods.reset({ ...item })
            setShowModal(true);
        }
    }

    const deleteHandler = (item) => {
        confirmService.show("آیا از حذف اطمیان دارید؟").then(isConfirmed => {

            if (isConfirmed) {
                dispatch(loaderActions.show())
                baseService.post(urls.deleteUrl, { id: item.id }).then((result) => {
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

        //debugger;
        var url = editMode ? urls.editUrl : urls.createUrl;
        setFormError(null);
        dispatch(loaderActions.show())
        baseService.post(url, data).then((result) => {
            //debugger;
            if (result.succeed) {
                setShowModal(false);
                dispatch(snackbarActions.success("با موفقیت ثبت شد"))
                forceGridUpdate();

            } else {
                //setFormError(result.errorMessage);
                dispatch(snackbarActions.error(result.errorMessage))
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
                    <EditButton onClick={() => editHandler(item)} />
                </>
            ),
            width: 40
        })
    }
    if (urls.deleteUrl) {
        finalColumns.push({
            title: "",
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
                <PortletHeader
                    title={title}
                    toolbar={
                        (
                            <PortletHeaderToolbar>
                                <button
                                    onClick={addNewHandler}
                                    type="button"
                                    className="btn btn-clean btn-sm ng-star-inserted"
                                >
                                    <i className="fa fa-plus" />
                                    ثبت مورد جدید
                                </button>
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


                    <Grid
                        filter={filter}
                        url={urls.readUrl}
                        columns={finalColumns}
                    />
                </PortletBody>
            </Portlet>

            <GenModal
                title={modalTitle}
                isShow={showModal}
                size={modalSize}
                onDismiss={() => { setShowModal(false) }}
                onConfirm={modalConfirmHandler}>
                {formError && (
                    <Alert severity="error">{formError}</Alert>
                )}

                {/* values={formValues} */}
                <FormProvider  {...formMethods}>

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

export default PopupCurd;