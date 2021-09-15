import React from "react"
import GenModal from "../../../../partials/modal";
import { Row, Col } from "react-bootstrap";
import baseService from "../../../../services/base.service";
import { makeStyles } from "@material-ui/core";



const DocumentImage = (props) => {

    
    const { isShow, guid, onClose } = props;
    const classes = useStyle();

    
    return (
        <GenModal
            title={"گالری "}
            isShow={isShow}
            onDismiss={onClose}
        >
            <Row>
                <Col sm={12} className={classes.imgContainer}>
                      <a href={baseService.baseFileUrl + guid} download>Download</a>
                    <img alt='' src={baseService.baseFileUrl + guid} className={classes.img} />
                </Col>
            </Row>
        </GenModal >
    );
}

const useStyle = makeStyles({
    imgContainer: {
        aspectRatio: 1,
        padding: "10px"
    },
    img: {
        width: "100%",
        width: "33%",
        margin:" 0 auto",
        display: "block",
    },
    rmbtn: {
        position: "absolute",
        left: "10px",
        top: "10px"
    }
})

export default DocumentImage