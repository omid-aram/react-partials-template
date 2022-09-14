import React from "react"
import { Modal, Button } from "react-bootstrap";

//generic modal
const GenModalList = props => {

    const { isShow, size, onDismiss, title, confirmText, classes } = props
    return (
        <Modal
            dialogClassName={classes || ""}
            size={size || "lg"}
            show={isShow}
            onHide={onDismiss}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onDismiss}>
                    بستن
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default GenModalList;