//ali
import React, { useState, useCallback, useEffect } from 'react';
import { render } from "react-dom";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogContentText } from '@material-ui/core';

let resolve;
const Confirm = ({ refShow }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("آیا اطمینان دارید");

    const handleCancel = useCallback(() => {
        setIsOpen(false);
        resolve(false);
    }, []);

    const handleConfirm = useCallback(() => {
        setIsOpen(false);
        resolve(true);
    }, []);

    const showCb = useCallback((msg) => {
        setIsOpen(true);
        if (msg) {
            setMessage(msg);
        }
        return new Promise((res) => {
            resolve = res;
        });
    }, []);

    useEffect(() => {
        refShow(showCb);
    }, [showCb]);

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleCancel}
                aria-labelledby="confirm-dialog-title"
                aria-labelledby="confirm-dialog-message"
                
            >
                <DialogTitle id="confirm-dialog-title">هشدار</DialogTitle>
                <DialogContent style={{ minWidth: "300px" }}>
                    <DialogContentText id="confirm-dialog-message">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={handleCancel}
                        color="default"
                    >
                        خیر
          </Button>
                    <Button
                        variant="outlined"
                        onClick={handleConfirm}
                        color="secondary"
                        style={{ marginRight: "5px" }}
                    >
                        بله
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

Confirm.create = () => {
    const containerElement = document.createElement('div');
    document.body.appendChild(containerElement);
    const ref = { show: null };
    render(<Confirm refShow={(showRef) => { ref.show = showRef; }} />, containerElement);
    return ref;
};

//we pass a funtion (refShow) to confirm
//Confirm will call it with refShow(showCb)
//then out function will called and "showCb" will pass to ref.show
//so we can use showCb



export default Confirm.create();