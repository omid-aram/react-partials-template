import React from "react"
import { makeStyles } from "@material-ui/core";


const DataView = ({ data }) => {  // const data = props.data

    const classes = styles();

    return (
        <>
            <div className={classes.container}>
                {data.map((item, i) => (
                    <div key={i} className={classes.row}>
                        <div className={classes.name}>
                            {item.name}
                        </div>
                        <div className={classes.value}>
                            {item.value}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

const styles = makeStyles({
    container: {

    },
    row: {
        borderBottom : "1px solid #ccc",
        display: "flex",
        height : "40px",
        alignItems :"center",
        justifyContent :"space-between",
        paddingLeft :"15px",
        paddingRight :"15px",
        
    },
    name: {
        marginLeft :"5px"
    },
    value:{
        fontWeight :"bold"
    }

})

export default DataView;