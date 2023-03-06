/**
* PopupCrud.js - 1401/12/15
*/

import React from "react"
import { Modal } from "react-bootstrap";

//generic modal
const GenModal = props => {

    const { isShow, size, onDismiss, title, buttons } = props

    return (
        <Modal
            size={size || "lg"}
            show={isShow}
            onHide={onDismiss}
            //dialogClassName="modal-90w"
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                {buttons.map((x, i) => (
                    <button
                        onClick={x.onClick}
                        type="button"
                        key={i}
                        disabled={x.disabled}
                        hidden={x.hidden}
                        style={{ whiteSpace: "nowrap", marginRight: "3px", ...x.style }}
                        className={`btn ${x.className}`}
                    >
                        <i className={x.icon} style={{ paddingLeft: (x.text && x.icon) ? "0.5rem" : 0, fontSize: "inherit" }} />
                        {x.text}
                    </button>
                ))}
            </Modal.Footer>
        </Modal>
    );
}

export default GenModal;