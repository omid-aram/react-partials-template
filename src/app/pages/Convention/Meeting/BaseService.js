


const dispatch = useDispatch();

export function companySubmit(data) {
    setActiveStep(activeStep + 1);
    var url = "/Convention/Create";
    dispatch(loaderActions.show())
    baseService.post(url, data).then((result) => {
        if (result.succeed) {

            dispatch(snackbarActions.success("با موفقیت ثبت شد"))
        }
        dispatch(loaderActions.hide())
    })
}