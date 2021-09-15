import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path";
import { makeStyles, IconButton, CircularProgress } from "@material-ui/core";
import { useRef } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import baseService from "../../services/base.service";

//برای اینکه بعضی جاها لازم دارم از بیرون خالی کردن فایل رو صدا  بزنم از این روش استفاده شده
//forwardRef https://stackoverflow.com/questions/37949981/call-child-method-from-parent
const InputFile = forwardRef((props, ref) => {
    const { name } = props
    const { control, values, setValue } = useFormContext();

    //simple name : "title" 
    //path name : "items[1].title"
    let namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
    let value = values ? objectPath.get(values, namePath) : undefined;

    const classes = useStyle();
    const inputFile = useRef(null)

    const [file, setFile] = useState();
    const [uploadProgress, updateUploadProgress] = useState(0);
    const [state, setState] = useState();
    const stateTypes = {
        none: 0,
        uploading: 1,
        success: 2,
        error: 3,
    };
    useEffect(() => {
        if (!file) return;

        setState(stateTypes.uploading);
        const formData = new FormData();
        formData.append('file', file);
        baseService.postFile(formData, progressHandler).then((res) => {
            setState(stateTypes.success);
            setValue(name, res.data)

        }).catch(e => {
            setState(stateTypes.error);

        });
    }, [file]);


    const progressHandler = (ev) => {
        const progress = ev.loaded / ev.total * 100;
        updateUploadProgress(Math.round(progress));
    }

    const clickHandler = () => {
        if(state !== stateTypes.uploading){
            inputFile.current.click();
        }
    }

    const removeHandler = () => {
        if(state !== stateTypes.uploading){
            setState(stateTypes.none);
            updateUploadProgress(0)
            setFile(null);
            setValue(name, null)
        }
    }

    let inputState = null
    switch (state) {
        case stateTypes.uploading:
            inputState = <CircularProgress size="small" />
            break;
        case stateTypes.success:
            inputState = <i className="fa fa-check" style={{color:"green"}}></i>
            break;
        case stateTypes.error:
            inputState = <i className="fa fa-times" style={{color:"red"}}></i>
            break;
        default:
            inputState = null
    }

    useImperativeHandle(ref, () => ({
        clear() {
            removeHandler();
        }
      }));

    return (<>
        <Controller
            as={
                <input type="hidden" />
            }
            control={control}
            name={name}
            defaultValue={value}
        />

        <input
            type="file" name="file"
            ref={inputFile}
            style={{ display: "none" }}
            //accept={acceptedTypes.toString()}
            onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                    setFile(e.target.files[0])
                }
            }} />

        <div className={classes.container}>
            <div className={classes.progressBar} style={{ width: uploadProgress + "%" }}> </div>
            <div className={classes.fileInput}>
                <div className={classes.fileName} onClick={clickHandler}>{file ? file.name : "برای انتخاب فایل کلیک کنید"}</div>
                <div className={classes.status} >
                    {inputState}
                </div>
                <div className={classes.deleteBtn} onClick={removeHandler}>
                    <IconButton size="small">
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>

        </div>


    </>);

})

const useStyle = makeStyles({
    container: {
        height: "38px",
        width: "100%",
        border: "1px solid #d8d8d8",
        position: "relative"
    },
    progressBar: {
        position: "absolute",
        height: "100%",
        left: "0px",
        top: "0px",
        width: "0px",
        background: "#f0fff0"
    },
    fileInput: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "38px",
    },
    fileName: {
        padding: "10px",
        flexGrow: 1,
        cursor: "pointer",
        zIndex: 1
    },
    status: {
        flexBasis: "40px",
        fontSize: "1.5rem",
        padding: "5px",
        zIndex: 1
    },
    deleteBtn: {
        flexBasis: "40px",
        padding: "5px",
    }


})

export default InputFile;