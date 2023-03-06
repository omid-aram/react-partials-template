/**
* PopupCrud.js - 1401/12/15
*/

import React, { useState, useRef, useEffect } from "react"
import Grid from "../partials/grid"
//import { DeleteButton, EditButton, DetailButton } from "../partials/content/UIHelper";
import { Portlet, PortletHeader, PortletHeaderToolbar, PortletBody } from "../partials/content/Portlet";
import { makeStyles, LinearProgress, Tooltip/*, IconButton, Icon, Button*/ } from "@material-ui/core";
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
        , trigger, setTrigger, hasFileUpload, topButtons, rowButtons, formButtons } = props;

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

    //const [finalColumns, setFinalColumns] = useState([...columns]);
    const [finalTopBtns, setFinalTopBtns] = useState([]);
    const [finalFormBtns, setFinalFormBtns] = useState([]);
    //const [isInitialLoad, setIsInitialLoad] = useState(true);

    const searchMethods = useForm({ defaultValues: { ...initSearchValues } });
    const formMethods = useForm();

    const classes = useStyle();

    const formRef = useRef();

    const dispatch = useDispatch();

    const _keyColumn = keyColumn || "id";

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

    useEffect(() => {
        const defaultCreateButton = {
            type: "create", text: "ثبت مورد جدید", icon: "fa fa-plus", className: "btn-outline-success", disabled: !urls.createUrl,
            //onClick: addNewHandler
        };
        // const defaultEditButton = {
        //     type: "edit", tooltip: "ویرایش", icon: "fa fa-pen", className: "btn-outline-warning", disabled: !urls.editUrl,
        //     //onClick: editHandler
        // };
        // const defaultDeleteButton = {
        //     type: "delete", tooltip: "حذف", icon: "fa fa-trash", className: "btn-outline-danger", disabled: !urls.createUrl,
        //     //onClick: deleteHandler
        // };
        // const defaultDetailButton = {
        //     type: "detail", tooltip: "جزئیات", icon: "fa fa-list-alt", className: "btn-outline-dark", disabled: !urls.createUrl,
        //     //onClick: detailHandler
        // };

        const _topButtons = [...(topButtons || [])];
        const createBtn = _topButtons.find(x => x.type === "create");
        if (createBtn) {
            createBtn.text = createBtn.text || defaultCreateButton.text;
            createBtn.icon = createBtn.icon || defaultCreateButton.icon;
            createBtn.className = createBtn.className || defaultCreateButton.className;
            createBtn.disabled = createBtn.disabled || defaultCreateButton.disabled;
        }
        else {
            _topButtons.push({ ...defaultCreateButton });
        }

        setFinalTopBtns([..._topButtons]);

        // debugger;
        // const _columns = [...(columns || [])];
        // const editBtn = _topButtons.find(x => x.type === "edit");
        // if (editBtn) {
        //     editBtn.tooltip = editBtn.tooltip || defaultEditButton.tooltip;
        //     editBtn.icon = editBtn.icon || defaultEditButton.icon;
        //     editBtn.className = editBtn.className || defaultEditButton.className;
        //     editBtn.disabled = editBtn.disabled || defaultEditButton.disabled;

        //     if (editBtn.firstColumn) {
        //         _columns.unshift(editBtn);
        //     } else {
        //         _columns.push(editBtn);
        //     }
        // }
        // else {
        //     _columns.push({ ...defaultEditButton });
        // }

        //setFinalColumns([..._columns]);
    }, [topButtons, urls.createUrl])

    const addNewHandler = () => {
        let initVal = { ...initFormValues };
        objectPath.set(initVal, _keyColumn, 0);//null id => server validation error

        if (typeof (onNewButtonClicked) === "function") {
            onNewButtonClicked(initVal);
        }

        //setUndefinedToEmptyString(initVal);

        checkFormButtonsIfs(initVal);

        formMethods.reset(initVal);

        setFormError(null);

        setEditMode(false);

        const createBtn = (topButtons || []).find(x => x.type === "create") || {};
        setModalTitle(createBtn.tooltip || createBtn.text || "ثبت مورد جدید");

        setShowModal(true);
    }

    const editHandler = (item) => {

        dispatch(passIdsActions.fetchEditData(item));
        setEditMode(true);

        const editBtn = (rowButtons || []).find(x => x.type === "edit") || {};
        setModalTitle(editBtn.tooltip || editBtn.text || "ویرایش");

        if (urls.getUrl) { //which means data is complexer than grid data and needs to be fetch
            dispatch(loaderActions.show())
            baseService.post(urls.getUrl, { [_keyColumn]: item[_keyColumn] }).then(res => {

                const data = { ...item, ...res.data };
                if (typeof (onEditButtonClicked) === "function") {
                    onEditButtonClicked(data);
                }

                checkFormButtonsIfs(data);

                formMethods.reset(data);

                dispatch(loaderActions.hide())
                setShowModal(true);
            });
        } else {
            const data = { ...item };
            if (typeof (onEditButtonClicked) === "function") {
                onEditButtonClicked(data);
            }

            checkFormButtonsIfs(data);

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
                baseService.post(urls.deleteUrl, { [_keyColumn]: item[_keyColumn] }).then((result) => {
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

    const modalConfirmHandler = () => {
        //تا وقتی فرم معتبر نباشد همه ورودی ها صدا زده نمیشود
        formRef.current.dispatchEvent(new Event('submit'));
    }

    const modalDismissHandler = () => {
        setShowModal(false);
        setFormError("");
        setDetailItem({});
        setLastDetailItemId(-1);
        setDetailMode(false);
    }

    const forceGridUpdate = () => {
        setFilter(prev => ({ ...prev }));
    }

    const checkIf = (item, itemIf) => {
        if (!itemIf) return false;

        for (const key in itemIf) {
            if (item[key] !== itemIf[key]) return false;
        }
        return true;
    }

    const checkFormButtonsIfs = (item) => {
        const _buttons = [...(formButtons || [])];
        const defaultConfirmButton = {
            type: "confirm", text: "تایید", icon: "fa fa-check", className: "btn-primary", style: {}, //disabled: false, hidden: false,
            onClick: modalConfirmHandler
        };
        const defaultDismissButton = {
            type: "dismiss", text: "انصراف", icon: "", className: "btn-secondary", style: {}, //disabled: false, hidden: false,
            onClick: modalDismissHandler
        };

        let confirmBtn = _buttons.find(x => x.type === "confirm");
        if (confirmBtn) {
            confirmBtn.text = confirmBtn.text || defaultConfirmButton.text;
            confirmBtn.icon = confirmBtn.icon || defaultConfirmButton.icon;
            confirmBtn.className = confirmBtn.className || defaultConfirmButton.className;
            confirmBtn.style = confirmBtn.style || defaultConfirmButton.style;
            confirmBtn.onClick = confirmBtn.onClick || defaultConfirmButton.onClick;
        }
        else {
            _buttons.push({ ...defaultConfirmButton });
        }

        let dismissBtn = _buttons.find(x => x.type === "dismiss");
        if (dismissBtn) {
            dismissBtn.text = dismissBtn.text || defaultDismissButton.text;
            dismissBtn.icon = dismissBtn.icon || defaultDismissButton.icon;
            dismissBtn.className = dismissBtn.className || defaultDismissButton.className;
            dismissBtn.style = dismissBtn.style || defaultDismissButton.style;
            dismissBtn.onClick = dismissBtn.onClick || defaultDismissButton.onClick;
        }
        else {
            _buttons.push({ ...defaultDismissButton });
        }

        _buttons.forEach(x => {
            if (x.disabledIf) { x.disabled = checkIf(item, x.disabledIf) }
            if (x.hiddenIf) { x.hidden = checkIf(item, x.hiddenIf) }
        });

        setFinalFormBtns([..._buttons]);
    }

    let _finalColumns = [...columns];

    const appendButtons = () => {
        let _rowButtons = [];

        let editButton = (rowButtons || []).find(x => x.type === "edit") || {};
        if (urls.editUrl && !editButton.type) {
            _rowButtons.push({ type: "edit" });
        }
        editButton = {
            type: "edit",
            text: editButton.text || "",
            tooltip: editButton.tooltip || "ویرایش",
            icon: editButton.icon || "fa fa-pen",
            className: editButton.className || "btn-outline-warning",
            style: editButton.style || {},
            disabled: editButton.disabled || !urls.editUrl,
            disabledIf: editButton.disabledIf,
            hidden: editButton.hidden || false,
            hiddenIf: editButton.hiddenIf,
            firstColumn: editButton.firstColumn || false,
            onClick: editHandler
        };

        let deleteButton = (rowButtons || []).find(x => x.type === "delete") || {};
        if (urls.deleteUrl && !deleteButton.type) {
            _rowButtons.push({ type: "delete" });
        }
        deleteButton = {
            type: "delete",
            text: deleteButton.text || "",
            tooltip: deleteButton.tooltip || "حذف",
            icon: deleteButton.icon || "fa fa-trash",
            className: deleteButton.className || "btn-outline-danger",
            style: deleteButton.style || {},
            disabled: deleteButton.disabled || !urls.deleteUrl,
            disabledIf: deleteButton.disabledIf,
            hidden: deleteButton.hidden || false,
            hiddenIf: deleteButton.hiddenIf,
            firstColumn: deleteButton.firstColumn || false,
            onClick: deleteHandler
        };

        let detailButton = (rowButtons || []).find(x => x.type === "detail") || {};
        if (urls.detailUrl && !detailButton.type) {
            _rowButtons.push({ type: "detail" });
        }
        detailButton = {
            type: "detail",
            text: detailButton.text || "",
            tooltip: detailButton.tooltip || "جزئیات",
            icon: detailButton.icon || "fa fa-list-alt",
            className: detailButton.className || "btn-outline-dark",
            style: detailButton.style || {},
            disabled: detailButton.disabled || !urls.detailUrl,
            disabledIf: detailButton.disabledIf,
            hidden: detailButton.hidden || false,
            hiddenIf: detailButton.hiddenIf,
            firstColumn: detailButton.firstColumn || false,
            onClick: detailHandler
        };
        _rowButtons = [..._rowButtons, ...(rowButtons || [])];

        _rowButtons.forEach(x => {
            if (x.type === "edit") x = editButton;
            if (x.type === "delete") x = deleteButton;
            if (x.type === "detail") x = detailButton;
            const col = {
                title: "",
                template: (item) => (
                    <Tooltip title={(x.disabled || checkIf(item, x.disabledIf)) ? "" : (x.tooltip || "")} arrow placement="top">
                        <button
                            onClick={() => x.onClick(item)}
                            type="button"
                            disabled={x.disabled || checkIf(item, x.disabledIf)}
                            hidden={x.hidden || checkIf(item, x.hiddenIf)}
                            style={{ whiteSpace: "nowrap", margin: 0, padding: x.text ? "0.4rem 0.8rem" : "0.2rem 0.8rem 0.1rem 0.8rem", fontSize: x.text ? "" : "1.2rem", ...x.style }}
                            className={`btn btn-sm ${x.className}`}
                        >
                            <i className={x.icon} style={{ marginLeft: (x.text && x.icon) ? "0.35rem" : 0, fontSize: "inherit" }} />
                            {x.text}
                        </button>
                    </Tooltip>
                ),
                width: 1
            }
            if (x.firstColumn) {
                _finalColumns.unshift(col);
            } else {
                _finalColumns.push(col);
            }
        });
    }

    appendButtons();

    return (
        <>
            <Portlet>
                <PortletHeader
                    title={title}
                    toolbar={
                        urls.createUrl ?
                            (
                                <PortletHeaderToolbar>
                                    <>
                                        {finalTopBtns.map((x, i) => (
                                            <Tooltip title={x.disabled ? "" : (x.tooltip || "")} arrow placement="top" key={i}>
                                                <button
                                                    onClick={() => x.type === "create" ? addNewHandler() : x.onClick()}
                                                    type="button"
                                                    disabled={x.disabled}
                                                    hidden={x.hidden}
                                                    style={{ whiteSpace: "nowrap", marginRight: "6px", padding: x.text ? "0.4rem 0.8rem" : "0.2rem 0.8rem 0.1rem 0.8rem", fontSize: x.text ? "" : "1.2rem", ...x.style }}
                                                    className={`btn btn-sm ${x.className}`}
                                                >
                                                    <i className={x.icon} style={{ marginLeft: (x.text && x.icon) ? "0.35rem" : 0, fontSize: "inherit" }} />
                                                    {x.text}
                                                </button>
                                            </Tooltip>
                                        )
                                        )}
                                    </>
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
                        columns={_finalColumns}
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
                onDismiss={modalDismissHandler}
                //onConfirm={modalConfirmHandler}
                buttons={detailMode ? [{ type: "dismiss", text: "بستن", className: "btn-secondary", onClick: modalDismissHandler }] : finalFormBtns}
            //item={formMethods}
            //checkIfFunc={checkIfFunc}
            >
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