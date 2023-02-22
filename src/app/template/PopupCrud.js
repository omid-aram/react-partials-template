/**
* PopupCrud.js - 1401/12/03
*/

import React, { useState, useRef, useEffect } from "react"
import Grid from "../partials/grid"
import { DeleteButton, EditButton, DetailButton } from "../partials/content/UIHelper";
import { Portlet, PortletHeader, PortletHeaderToolbar, PortletBody } from "../partials/content/Portlet";
import { makeStyles, LinearProgress } from "@material-ui/core";
import { useForm, FormProvider } from 'react-hook-form'
import GenModal from "../partials/modal";
import baseService from "../services/base.service";
import { useDispatch } from "react-redux";
import { loaderActions } from "../store/ducks/loader.duck";
import { snackbarActions } from "../store/ducks/snackbar.duck";
import Alert from "@material-ui/lab/Alert";
import confirmService from "../partials/content/ConfirmService";
import objectPath from "object-path";
import { passIdsActions } from "../store/ducks/passIds.duck";

const PopupCurd = (props) => {

    const { title, columns, keyColumn, urls, form, searchForm, detailForm, sortItem, initFormValues, //otherFormFields,
        pageSize, modalSize, detailSize, detailTitle, initSearchValues, onEditButtonClicked, onNewButtonClicked
        , trigger, setTrigger, hasFileUpload } = props;

    const [filter, setFilter] = useState({
        page: 1,
        pageSize: pageSize || 10,
        sort: sortItem || null,
        ...initSearchValues,
    });

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [formError, setFormError] = useState("");
    //const [formValues, setFormValues] = useState();
    const [editMode, setEditMode] = useState(false);
    const [detailMode, setDetailMode] = useState(false);
    const [detailItem, setDetailItem] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitProgress, setSubmitProgress] = useState(0);

    const searchMethods = useForm({ defaultValues: { ...initSearchValues } });
    const formMethods = useForm();

    const classes = useStyle();

    const formRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        if (trigger) {
            setFilter({
                page: 1,
                pageSize: pageSize || 10,
                sort: sortItem || null,
                ...initSearchValues,
            });

            setTrigger(false);
        }
    }, [initSearchValues, pageSize, sortItem, trigger, setTrigger]);

    const editHandler = (item) => {

        dispatch(passIdsActions.fetchEditData(item));
        setEditMode(true);
        setModalTitle("به روز رسانی");

        if (urls.getUrl) { //which means data is complexer than grid data and needs to be fetch
            dispatch(loaderActions.show())
            baseService.post(urls.getUrl, { id: item.id }).then(res => {

                const data = { ...res.data, ...item };
                if (typeof (onEditButtonClicked) === "function") {
                    onEditButtonClicked(data);
                }

                formMethods.reset(data);

                dispatch(loaderActions.hide())
                setShowModal(true);
            });
        } else {
            const data = { ...item };
            if (typeof (onEditButtonClicked) === "function") {
                onEditButtonClicked(data);
            }

            formMethods.reset(data);

            setShowModal(true);
        }
    }

    const [lastDetailItemId, setLastDetailItemId] = useState(-1);
    const detailHandler = (item) => {

        setDetailItem(item);
        setDetailMode(true);

        if (urls.detailUrl === "sub") {
            if (lastDetailItemId === item[_keyColumn]) {
                setDetailItem({});
                setLastDetailItemId(-1);
            } else {
                setLastDetailItemId(item[_keyColumn]);
            }
            return;
        }

        let detailTitleText = "";
        const words = detailTitle ? detailTitle.split(' ') : [];
        for (let i = 0; i < words.length; i++) {
            let word = words[i];

            if (word[0] === '@') {
                const indexOfSecondSign = word.indexOf('@', 1);//میتونه @ انتهایی هم داشته باشه. برای حالتی که نمیخوایم فاصله داشته باشیم بعدش
                word = item[word.substring(1, indexOfSecondSign < 0 ? undefined : indexOfSecondSign)] + (indexOfSecondSign < 0 ? "" : word.substring(indexOfSecondSign + 1));
            } else if (words.length === 1) {
                //میخوام اگه فقط یک فیلد منظورش باشه لازم نباشه حتما @ بذاره
                word = item[word];
            }
            detailTitleText += word + ' ';
        }
        setModalTitle(detailTitleText);

        setShowModal(true);
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
            sort: sortItem || null,
            ...data
        }));
    }

    const progressHandler = (ev) => {
        const progress = ev.loaded / ev.total * 100;
        setSubmitProgress(Math.round(progress));
    }

    const formSubmitHandler = (data) => {
        var url = editMode ? urls.editUrl : urls.createUrl;
        setFormError(null);
        setLoading(true);
        dispatch(loaderActions.show())

        const api = hasFileUpload ? baseService.postFormData(url, data, progressHandler) :
            baseService.post(url, data, progressHandler);

        api.then((result) => {
            if (result.succeed) {
                setShowModal(false);
                dispatch(snackbarActions.success("با موفقیت ثبت شد"))
                forceGridUpdate();

            } else {
                dispatch(snackbarActions.error(result.errorMessage))
            }
            dispatch(loaderActions.hide())
        })
            .finally(() => { setLoading(false); setSubmitProgress(0) })
    }
    const addNewHandler = () => {
        let initVal = { ...initFormValues };
        let k = keyColumn || "id";
        objectPath.set(initVal, k, 0);//null id => server validation error

        if (typeof (onNewButtonClicked) === "function") {
            onNewButtonClicked(initVal);
        }

        //setUndefinedToEmptyString(initVal);

        formMethods.reset(initVal);

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


    let _keyColumn = keyColumn || "id";
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
    if (urls.detailUrl) {
        finalColumns.push({
            title: "",
            template: (item) => (
                <>
                    <DetailButton onClick={() => detailHandler(item)} />
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
                        urls.createUrl ?
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
                            ) : null}

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
                        keyColumn={_keyColumn}
                        clickedRowId={detailItem[_keyColumn] || -1}
                    />
                </PortletBody>
            </Portlet>

            {urls.detailUrl === 'sub' && detailItem[_keyColumn] ?
                <>
                    {React.cloneElement(detailForm, { ...detailItem })}
                </>
                :
                <></>
            }

            <GenModal
                title={modalTitle}
                isShow={showModal}
                size={detailMode ? detailSize : modalSize}
                onDismiss={() => { setShowModal(false); setDetailMode(false); setFormError(""); setDetailItem({}); setLastDetailItemId(-1); }}
                onConfirm={modalConfirmHandler}>
                {formError && (
                    <Alert severity="error">{formError}</Alert>
                )}

                {showModal &&
                    (detailMode ?
                        <>
                            {React.cloneElement(detailForm, { ...detailItem })}
                        </>
                        :
                        <FormProvider  {...formMethods}>
                            <form onSubmit={formMethods.handleSubmit(formSubmitHandler)} ref={formRef} >
                                {form(formMethods)}
                            </form>
                            <div style={{ position: "relative", top: "17px" }}>
                                {loading && <LinearProgress style={{ height: "2px" }} variant="determinate" value={submitProgress} />}
                            </div>
                        </FormProvider >
                    )
                }
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