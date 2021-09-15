//ali
import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { snackbarActions } from "../../store/ducks/snackbar.duck";

const GlobalSnackbar = () => {

    const { type, message } = useSelector(state => state.snackbar);

    const dispatch = useDispatch()

    let open = type != null;
    //بعد از اتمام زمان این تابع صدا زده میشود
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(snackbarActions.clear());
    }


    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={type != null ? type : "info"} >
                    {message != null ? message : ""}
                </MuiAlert>
            </Snackbar>
        </>
    );
}


export default GlobalSnackbar;
