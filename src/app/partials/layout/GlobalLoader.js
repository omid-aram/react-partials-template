//ali
import React from "react"
import { useSelector } from "react-redux";


const GlobalLoader = () => {

    const isShowing = useSelector(state => state.loader.isShowing);

    let content = null;
    if (isShowing) {
        content = (
        <div id="plzw">
            <div className="plzw-content">
                <div className="plzw-loader"><i className="fa fa-spinner fa-spin fa-8x"></i></div>
            </div>
        </div>)
    }

    return (
        <>
        { content }
        </>
    );
}


export default GlobalLoader;
