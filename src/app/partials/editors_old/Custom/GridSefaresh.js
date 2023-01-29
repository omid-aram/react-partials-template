import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from "react-bootstrap/Button";
import baseService from '../../../services/base.service';
import confirmService from "../../content/ConfirmService";
import { loaderActions } from "../../../store/ducks/loader.duck";
import { CircularProgress, Checkbox, TableContainer, TableSortLabel, LinearProgress, IconButton, Radio } from '@material-ui/core';
import objectPath from 'object-path';
import Pagination from '@material-ui/lab/Pagination';
import { dynamicSort } from '../../../utils/helper';
import { snackbarActions } from "../../../store/ducks/snackbar.duck";
import { useDispatch } from 'react-redux';
import { Portlet, PortletHeader, PortletHeaderToolbar } from '../../content/Portlet';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { passIdsActions } from "../../../store/ducks/passIds.duck";


const GridSefaresh = (props) => {
    const {
        columns, //required
        url, data, // one required 
        filter,
        GetId,
        keyColumn,
        selectable,
        selectedItems,
        singleSelect,
        onSelectChange,
        hazinevalues,
        defaultSort,
        itemInPage,
        fixHeight,
        hideRowsPerPage,
        paginationBtnCount,
        addEmptyRow,
        sefareshData
    } = props;
    const classes = useStyles2();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(itemInPage || 10);
    const [records, setRecords] = useState([]); // records which showed to user
    const [offlineData, setOfflineData] = useState(data); // offlineData
    const [total, setTotal] = useState(0);
    const [orderby, setOrderby] = useState(defaultSort);
    const [orderDir, setOrderDir] = useState('asc');
    const [loading, setLoading] = useState(false);
    const [forceUpdate, setForceUpdate] = useState({});
    const [localFilter, setLocalFilter] = useState(null); //filter on each column
    const [dataItem, setDataItem] = useState([]);
    const [SefareshData, setSefareshData] = useState([]);

    let offline = !!offlineData;


    // console.log("sefareshData2222", sefareshData);

    const keysToLowerCase = (obj) => {

        const x = {};
        for (const [key, value] of Object.entries(obj)) {
            x[key.toUpperCase()] = value;
        }
        return x;
    }

    const dispatch = useDispatch();

    const history = useHistory();

    const CalCulateOrderCost = () => {
        //  debugger;
        let f = {};
        f.SRL = sefareshData.SRL;
        f.PROFORM_SRL = sefareshData.PROFORM_SRL;
        f.LIST_NO = sefareshData.LIST_NO
        //console.log("window.globalSefaresh", window.globalSefaresh)
        baseService.post("/Oaplistt/OrderCost", f).then(({ data }) => {

            dispatch(snackbarActions.success("هزینه سفارش با موفقیت محاسبه گردید."));
            let f = { ...filter, ...localFilter }
            f.GetId = sefareshData.SRL;
            f.page = page + 1;
            f.pageSize = isShowAll() ? 10000 : rowsPerPage;

            baseService.post(url, f).then(({ data }) => {


                //if has error convert this code to ==>> data.items
                let dataList = [];

                data.items.map((item, i) => (
                    dataList.push(keysToLowerCase(item))

                ))

                setDataItem(dataList)

                if (dataList.length > 0) {

                    dispatch(passIdsActions.fetchHasDataOrder(true));

                }
                else {
                    dispatch(passIdsActions.fetchHasDataOrder(false));
                }

                if (isShowAll()) {

                    //|| (localFilter == null && result.items.length == result.totalCount) it was very wrong
                    //if user select show all one time, for other request we use local Data
                    setTotal(data.totalCount);
                    setOfflineData(dataList); // 
                    setLocalFilter({});

                } else {
                    setRecords(dataList);
                    setTotal(data.totalCount);
                }

                setLoading(false);
            })

        })

    }

    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    useEffect(() => {

        if (offline) {
            let temp = [...offlineData];


            if (localFilter) {
                for (var field in localFilter) {
                    //temp = temp.filter(x => (x[field] + '').indexOf(localFilter[field]) > -1)
                    temp = temp.filter(x => (x[field] + '').toLowerCase().startsWith(localFilter[field].toLowerCase()))
                }
            }

            setRecords(temp.sort(dynamicSort(orderby, orderDir)));
        } else {
            // const Sid = localStorage.getItem('SefareshId');
            // let data = JSON.parse(Sid);
            // window.globalSefaresh = data;

            // if (Sid && SefareshData.length === 0) {
            //     setSefareshData(JSON.parse(Sid));
            // }

            setLoading(true);
            let f = { ...filter, ...localFilter }
            f.GetId = sefareshData.SRL;
            f.page = page + 1;
            f.pageSize = isShowAll() ? 10000 : rowsPerPage;
            if (orderby)
                f.sort = orderby + ' ' + orderDir;
            baseService.post(url, f).then(({ data }) => {
                if (data.errors) {
                    //alert or something
                } else {
                    // console.log(f)
                    //if has error convert this code to ==>> data.items
                    let dataList = [];
                    data.items.map((item, i) => (
                        dataList.push(keysToLowerCase(item))

                    ))
                    setDataItem(dataList);
                    if (dataList.length > 0) {

                        dispatch(passIdsActions.fetchHasDataOrder(true));

                    }
                    else {
                        dispatch(passIdsActions.fetchHasDataOrder(false));
                    }

                    if (isShowAll()) {

                        //|| (localFilter == null && result.items.length == result.totalCount) it was very wrong
                        //if user select show all one time, for other request we use local Data
                        setTotal(data.totalCount);
                        setOfflineData(dataList); // 
                        setLocalFilter({});

                    } else {
                        setRecords(dataList);
                        setTotal(data.totalCount);
                    }

                }
                setLoading(false);
            })
        }
    }, [page, rowsPerPage, filter, orderby, orderDir, offlineData, forceUpdate, localFilter, SefareshData])



    useEffect(() => {
        setOfflineData(data);
    }, [data])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const reafreshData = () => {
        setForceUpdate(prev => ({ ...prev }));
    }

    const handleChangeRowsPerPage = event => {
        var selected = event.target.value;
        setRowsPerPage(selected);
        setPage(0);
    };

    const getStripedStyle = (index) => {
        return { background: index % 2 ? '#f5f5f5' : 'white' };
    }

    const sortHandler = (field) => {
        const isAsc = orderby === field && orderDir === 'asc';
        setOrderDir(isAsc ? 'desc' : 'asc');
        setOrderby(field);
    }

    const localFilterChange = (field, input) => {
        setLocalFilter(prev => {
            var n = { ...prev };
            n[field] = input;
            return n;
        });
    }

    const isShowAll = () => {
        return rowsPerPage == 'All';
    }

    const emptyRows = addEmptyRow ? (rowsPerPage - records.length) : 0;

    const dataBody = useMemo(() => (
        <TableBody>
            {records.map((row, i) => (
                <TableRow key={i} style={{ ...getStripedStyle(i) }}>
                    {selectable ? (<TableCell key={0} >
                        {singleSelect ?
                            <Radio onChange={(event) => { onSelectChange(row, event.target.checked) }} checked={selectedItems && selectedItems[keyColumn] == row[keyColumn]} />
                            :
                            <Checkbox onChange={(event) => { onSelectChange(row, event.target.checked) }} checked={selectedItems && selectedItems.some(x => x == row[keyColumn])} />
                        }
                    </TableCell>) : null}

                    {columns.filter(x => !x.hidden).map((col, j) => {
                        var cell = null;
                        if (col.template) {
                            cell = col.template(row);
                        } else {

                            //cell = row[col.field];  simple  e.g. title
                            cell = objectPath.get(row, col.field);//   complex e.g. type.title
                        }
                        return (<TableCell key={j} align={col.align ? col.align : "inherit"}>{cell}</TableCell>);
                    })}

                </TableRow>
            ))}
            {emptyRows > 0 && (
                <TableRow style={{ height: (true ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={columns.length} />
                </TableRow>
            )}
        </TableBody>
    ), [records, selectedItems])

    const HandleDeleteClickSp = (input) => {
        // debugger;
        let f = {}
        f.SRL = input;
        baseService.post("/Oaplistt/Delete_ListCost", f).then(({ data }) => {
            dispatch(snackbarActions.success("حذف هزینه با موفقیت انجام شد."))
            let f = { ...filter, ...localFilter }
            f.GetId = sefareshData.SRL;
            f.page = page + 1;
            f.pageSize = isShowAll() ? 10000 : rowsPerPage;

            baseService.post(url, f).then(({ data }) => {


                //if has error convert this code to ==>> data.items
                let dataList = [];

                data.items.map((item, i) => (
                    dataList.push(keysToLowerCase(item))

                ))

                setDataItem(dataList)


                if (isShowAll()) {

                    //|| (localFilter == null && result.items.length == result.totalCount) it was very wrong
                    //if user select show all one time, for other request we use local Data
                    setTotal(data.totalCount);
                    setOfflineData(dataList); // 
                    setLocalFilter({});

                } else {
                    setRecords(dataList);
                    setTotal(data.totalCount);
                }

                setLoading(false);
            })
        })
    }

    const HandleDeleteSefareshList = (item) =>{

        confirmService.show("آیا از حذف اطمیان دارید؟").then(isConfirmed => {

            if (isConfirmed) {
                dispatch(loaderActions.show())
                baseService.post("/Oaplistt/Delete", { Id: item }).then((result) => {
                
                        dispatch(snackbarActions.success("با موفقیت حذف شد"));
                        history.push("/out/SefareshList");
                    dispatch(loaderActions.hide())
                })
            }

        });

    }

    return (<>
        {/* {console.log("sefareshdataSefareshData44444", sefareshData)} */}
        <Portlet>
            <PortletHeader
                title={'هزینه'}
                toolbar={
                    (
                        <PortletHeaderToolbar>
                            { dataItem.length === 0 ?
                                <Button
                                    onClick={CalCulateOrderCost}
                                    variant="outline-primary"
                                >
                                    هزینه ها
                                </Button> : <></>}
                            {props.StatusOaplist === 0 && dataItem.length > 0 && props.OrderDataSanad === false ?
                                <Button
                                    onClick={() => HandleDeleteClickSp(sefareshData.SRL)}
                                    variant="outline-danger"
                                >
                                    <i className="fa fa-trash" />
                                    حذف هزینه
                                </Button> : <></>}
                            {dataItem.length === 0 && props.StatusOaplist === 0 && props.OrderDataSanad === false ?
                                <Button
                                    onClick={() => HandleDeleteSefareshList(sefareshData.SRL)}
                                    variant="outline-danger"
                                >
                                    <i className="fa fa-trash" />
                                    حذف لیست
                                </Button>
                                :
                                <></>

                            }
                            <div className="clearfix" style={{ padding: '.5rem' }}>
                                <button onClick={() => history.push("/out/SefareshList")} className="btn btn-warning float-right">
                                    <i className="fa fa-angle-right" />
                                    بازگشت
                                </button>
                            </div>
                        </PortletHeaderToolbar>
                    )}
            />
        </Portlet>
        <TableContainer className={classes.root} style={{ height: fixHeight || "auto" }}>
            <div>
                {loading ? <LinearProgress style={{ height: "2px" }} /> : null}
            </div>
            {/* <div className={classes.loader}>
                {loading ? <CircularProgress size={20} /> : null}
            </div> */}
            <Table stickyHeader={(fixHeight || data) ? true : false} className={classes.table} style={{ tableLayout: 'fixed' }} size="small">
                <TableHead>
                    <TableRow className={classes.header}>
                        {selectable ? (<TableCell key={0} style={{ width: 10 }} >انتخاب</TableCell>) : null}

                        {columns.filter(x => !x.hidden).map((col, i) =>
                            <TableCell
                                key={i}
                                style={{ width: col.width || 'auto' }}
                                className={classes.headerCell + ' ' + col.filterable ? classes.headerCellWithFilter : ''}>
                                {col.sortable ?
                                    (
                                        <TableSortLabel
                                            active={orderby === col.field}
                                            direction={orderby === col.field ? orderDir : 'asc'}
                                            onClick={() => sortHandler(col.field)}
                                        >
                                            {col.title}
                                        </TableSortLabel>
                                    )
                                    :
                                    <>
                                        {col.title}
                                    </>
                                }
                                {col.filterable &&
                                    <div className={classes.filterInputCon}>
                                        <input className={classes.filterInput} type="text" onChange={(e) => localFilterChange(col.field, e.target.value)} />
                                    </div>
                                }
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                {dataBody}
                {!offline && (
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                className={classes.header + " " + (fixHeight ? classes.stickyFooter : {})}
                                rowsPerPageOptions={hideRowsPerPage ? [] : [50, 100, 250]}
                                colSpan={columns.length + (selectable ? 1 : 0)}
                                count={total}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={(defaultProps) => <TablePaginationActions {...defaultProps} btnCount={paginationBtnCount} loading={loading} refreshHandler={reafreshData} />}
                            />
                        </TableRow>
                    </TableFooter>
                )}
            </Table>
        </TableContainer>
    </>);
}


const mapStateToProps = state => {

    return {
        SefareshData: state.passIds.SefareshData,
        OrderDataSanad: state.passIds.OrderDataSanad,
        StatusOaplist: state.passIds.statusBtnSanad,
    };
};
export default connect(mapStateToProps)(GridSefaresh);


function TablePaginationActions(props) {

    const { count, page, rowsPerPage, onChangePage, loading, refreshHandler, btnCount } = props;


    let pageCount = Math.ceil(count / rowsPerPage)
    const handleChange = (event, value) => {
        onChangePage(event, value - 1);
    };
    const classes = useStyles2();

    return (
        <>
            <IconButton
                className={classes.syncBtn}
                color="primary"
                disabled={loading}
                onClick={refreshHandler} >
                <i className={"fa fa-sync " + (loading ? "fa-spin" : "")}></i>
            </IconButton>

            <Pagination
                //ref={ref}
                variant="outlined"
                siblingCount={1} boundaryCount={1}
                count={pageCount}
                //showFirstButton showLastButton
                page={page + 1}
                onChange={handleChange} />
        </>


    );
}



TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


//table
const useStyles2 = makeStyles({
    root: {
        border: "1px solid #e0e0e0",
        position: "relative"
    },
    table: {
        minWidth: 400,
    },
    loader: {
        position: "absolute",
        bottom: 10,
        left: 20
    },
    header: {
        fontSize: "1.1rem",
        background: "rgb(236,236,236)",
        background: "linear-gradient(0deg, rgba(236,236,236,1) 0%, rgba(250,250,250) 60%, rgba(242,242,242,1) 100%)",
    },
    headerCell: {
        lineHeight: '1rem',

    },
    headerCellWithFilter: {
        paddingBottom: '5px',
        lineHeight: '1.5rem',
        position: 'relative',
    },
    syncBtn: {
        position: "absolute",
        left: "10px"
    },
    stickyFooter: {
        position: "sticky",
        bottom: 0,
        zIndex: 2
    }
    , filterInputCon: {
        position: 'absolute',
        bottom: '2px'
    }
    , filterInput: {
        width: '100%',
        height: '20px',
        borderRadius: '4px',
        border: '1px solid #dedcdc'
    }
});



