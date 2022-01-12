import React from "react"
import { Button as BButton } from "react-bootstrap";
import { Tooltip, IconButton } from "@material-ui/core";

export const DeleteButton = (props) => {
    return (
        <Tooltip title="حذف">
            <IconButton {...props} size="small">
                <i className="fa fa-trash"></i>
            </IconButton>
            {/* <BButton size="sm" variant="outline-danger" {...props}>
                <i className="fa fa-trash"></i>
        </BButton> */}
        </Tooltip>
    );
}

export const EditButton = (props) => {
    return (
        <Tooltip title="ویرایش">
            <IconButton {...props} size="small">
                <i className="fa fa-pen"></i>
            </IconButton>
        </Tooltip>
    );
}

export const DetailButton = (props) => {
    return (
        <Tooltip title="جزئیات">
            <IconButton {...props} size="small">
                <i className="fa fa-list-alt"></i>
            </IconButton>
        </Tooltip>
    );
}

export const IconBButton = (props) => {
    let btn =
        <BButton className="bbtn-icon" {...props}>
            {props.children}
        </BButton>

    if (props.tooltip) {
        btn =
            <Tooltip title={props.tooltip}>
                {btn}
            </Tooltip>
    }

    return btn;
}


export function TabPanel(props) {
    const { children, value, index, lazy, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {lazy ? (
                <>{value === index && <div>{children}</div>}</>
            ) : (
                    <div style={{ display: value === index ? 'block' : 'none' }}>{children}</div>
                )}

        </div>
    );
}