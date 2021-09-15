import React from "react"
import GenModal from "../partials/modal";
import { Row, Col } from "react-bootstrap";
import { isUndefined } from "lodash";
import ShowMoreGrid from "../partials/ShowMoreGrid";



const ShowMoreModal = (props) => {

    const { isShow, onClose, data, moreColumn } = props;

    let dataList = []
    if (!isUndefined(data)) {
        dataList.push(data)
    }
    return (
        <GenModal
            title={"اطلاعات بیشتر"}
            isShow={isShow}
            onDismiss={onClose}
        >
            <Row>
                <Col sm={12}>
                    <ShowMoreGrid
                        columns={moreColumn}
                        moreData={dataList}
                    />
                </Col>
            </Row>
        </GenModal >
    );
}


export default ShowMoreModal