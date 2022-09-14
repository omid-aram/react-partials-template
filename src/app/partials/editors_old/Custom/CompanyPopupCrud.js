import React, { useState, useRef, useEffect } from "react"
import Grid from "../../../partials/grid"
import { DeleteButton, EditButton } from "../../../partials/content/UIHelper";
import { Portlet, PortletHeader, PortletHeaderToolbar, PortletBody } from "../../../partials/content/Portlet";
import { makeStyles } from "@material-ui/core";
import { useForm, FormProvider } from 'react-hook-form'
import GenModal from "../../../partials/modal";
import baseService from "../../../services/base.service";
import { useDispatch } from "react-redux";
import { loaderActions } from "../../../store/ducks/loader.duck";
import { snackbarActions } from "../../../store/ducks/snackbar.duck";
import Alert from "@material-ui/lab/Alert";
import confirmService from "../../../partials/content/ConfirmService";
import objectPath from "object-path";
import { connect } from "react-redux";
import Enums from "../../../pages/Convention/Partials/Enums";
import { useHistory } from "react-router-dom";


const CompanyPopupCrud = (props) => {
    let history = useHistory();
    // const companyLocalFilter = props.companyLocalFilter
    const {companyLocalFilter,forceGridUpdate, title, columns, urls, form, searchForm, key, initFormValues, user, backButton } = props
   
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [formError, setFormError] = useState("");
    const [formValues, setFormValues] = useState();
    const [editMode, setEditMode] = useState(false);
    const [tempfilter, setTempfilter] = useState({companyLocalFilter});
    const searchMethods = useForm();
    const formMethods = useForm();

    const classes = useStyle();

    const formRef = useRef();

    const dispatch = useDispatch();

    // useEffect(() => {
    //     console.log("1",companyLocalFilter)
    //     if (companyLocalFilter) {
    //         if(companyLocalFilter.company !== 0){
    //             setFilter({
    //                 page: 1,
    //                 pageSize: 10,
    //                 company:companyLocalFilter.company
    //             }
    //                 )
    //                 console.log("2" , companyLocalFilter)
    //         }
    //     }
      
    // }, []);
    

    const editHandler = (item) => {
       
        setEditMode(true);
        setModalTitle("به روز رسانی");
        if (urls.getUrl) { //which means data is complexer than grid data and needs to be fetch
            dispatch(loaderActions.show())
            baseService.post(urls.getUrl, { ID: item.ID }).then(res => {

                //setFormValues(res.data);
                formMethods.reset(res.data)

                dispatch(loaderActions.hide())
                setShowModal(true);
            });
        } else {
            //setFormValues(item);
            formMethods.reset({ ...item })
            setShowModal(true);
        }
    }

    const deleteHandler = (item) => {
        confirmService.show("آیا از حذف اطمیان دارید؟").then(isConfirmed => {

            if (isConfirmed) {
                dispatch(loaderActions.show())
                baseService.post(urls.deleteUrl, { ID: item.ID }).then((result) => {
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

    const formSubmitHandler = (data) => {
        var url = editMode ? urls.editUrl : urls.createUrl;
        let newData = null;
        const access = user.access.find(x => x.appType === Enums.ApplicationType);
        if (access.code === Enums.RoleAccess.User) {
            const companyId = access.companyId;
            newData = { ...data, companyId }

        } else {

            newData = { ...data }

        }


        setFormError(null);
        dispatch(loaderActions.show())
        baseService.post(url, newData).then((result) => {
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
        // setFormValues(initVal);
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


    // const forceGridUpdate = () => {
    //     setTempfilter(prev => ({ ...prev }));
    // }

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
                {urls.createUrl !== "" ? <PortletHeader
                    title={title}
                    toolbar={
                        (
                            <PortletHeaderToolbar>
                                <button
                                    onClick={addNewHandler}
                                    type="button"
                                    className="btn btn-sm btn-outline-success"
                                >
                                    <i className="fa fa-plus" />
                                    ثبت مورد جدید
                            </button>
                            </PortletHeaderToolbar>
                        )}

                /> : null}


                <PortletBody>

                    <Grid
                        GetId={urls.GetId}
                        filter={companyLocalFilter}
                        url={urls.readUrl}
                        columns={finalColumns}
                    />
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
        </>
    );
}

const useStyle = makeStyles({
    form: {
        marginBottom: "10px"
    },
    back_button: {
        marginTop: "10px"
    }
})
const mapStateToProps = ({ auth: { user } }) => ({
    user
});

export default connect(mapStateToProps)(CompanyPopupCrud);
