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
import { useDispatch, useSelector } from "react-redux";
import baseService from '../../../services/base.service'
import { Button as MatBtn, FormLabel } from "@material-ui/core";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CircularProgress, Checkbox, TableContainer, TableSortLabel, LinearProgress, IconButton, Radio } from '@material-ui/core';
import objectPath from 'object-path';
import Pagination from '@material-ui/lab/Pagination';
import { dynamicSort } from '../../../utils/helper';
import { snackbarActions } from "../../../store/ducks/snackbar.duck";
import { useHistory } from "react-router-dom";
import { passIdsActions } from "../../../store/ducks/passIds.duck";
import confirmService from "../../content/ConfirmService";
import { connect } from "react-redux";
import { Portlet, PortletHeader, PortletHeaderToolbar } from '../../content/Portlet';



const GridSanad = (props) => {
    const {
        columns, //required
        url, data, // one required 
        filter,
        GetId,
        keyColumn,
        selectable,
        selectedItems,
        Value,
        singleSelect,
        onSelectChange,
        defaultSort,
        itemInPage,
        fixHeight,
        hideRowsPerPage,
        paginationBtnCount,
        addEmptyRow,
        listSrlState,
        CheckdRow
    } = props;
    const classes = useStyles2();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(itemInPage || 10);
    const [records, setRecords] = useState([]); // records which showed to user
    const [offlineData, setOfflineData] = useState(data); // offlineData
    const [total, setTotal] = useState(0);
    const [dataItem, setDataItem] = useState([]);
    const [orderby, setOrderby] = useState(defaultSort);
    const [orderDir, setOrderDir] = useState('asc');
    const [loading, setLoading] = useState(false);
    const [loadgrid, setLoadinggrid] = useState(false);
    const [cntrlSanad, setcntrlSanad] = useState(false);
    const [status, setstatus] = useState(0);
    const [hasDataError, setHasDataError] = useState(false);
    const [SumDBT, setSumDBT] = useState(0);
    const [SumCRD, setSumCRD] = useState(0);

    const [forceUpdate, setForceUpdate] = useState({});
    const [localFilter, setLocalFilter] = useState(null); //filter on each column
    let offline = !!offlineData;
    const user = useSelector(x => x.auth);
    const dispatch = useDispatch();
    const history = useHistory();


//  let StatusOaplist = localStorage.getItem("myStore");

 
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const detailHandler = (id) => {
        // dispatch(passIdsActions.fetchSrl(id));
        history.push(
            "/out/ShowError",
            { newData: id }
        );

        let f = { ...filter, ...localFilter }
        f.GetId = GetId;
        f.page = page + 1;
        f.pageSize = isShowAll() ? 10000 : rowsPerPage;

        baseService.post(url, f).then(({ data }) => {


            //if has error convert this code to ==>> data.items
            let dataList = [];

            data.data.data.items.map((item, i) => (

                dataList.push(keysToLowerCase(item))

            ))

            setDataItem(dataList)

            if (isShowAll()) {

                //|| (localFilter == null && result.items.length == result.totalCount) it was very wrong
                //if user select show all one time, for other request we use local Data
                setTotal(data.data.data.totalCount);
                setOfflineData(dataList); // 
                setLocalFilter({});

            } else {
                setRecords(dataList);
                setTotal(data.data.data.totalCount);
            }

            setLoading(false);
        })

    }

    const keysToLowerCase = (obj) => {

        const x = {};
        for (const [key, value] of Object.entries(obj)) {
            x[key.toUpperCase()] = value;
        }
        return x;
    }

    const HandleChangeState = (input) => {

        let b = {};
        b.SRL = input;
        baseService.post("/Sanad/Change_State", b).then(({ data }) => {
            // console.log('datastate', data);
            if (data.status === 0) {
                dispatch(snackbarActions.success("تغییر وضعیت با موفقیت انجام شد."));
                dispatch(passIdsActions.fetchStatusOaplist(data.status));
                reafreshData();
               // setstatus(data.status);

            } else {
                dispatch(snackbarActions.error("خطا در تغییر وضعیت."))
            }

        }).catch(err => {
            console.log('err', err);
            dispatch(snackbarActions.error("خطا در تغییر وضعیت."))
        })
    }

    const HandleDeleteSp = (input) => {
        let b = {};
        b.SRL = input;
        baseService.post("/Sanad/Delete_Sanad", b).then(({ data }) => {

            confirmService.show("آیا از حذف اطمیان دارید؟").then(isConfirmed => {

                if (isConfirmed) {
                    dispatch(snackbarActions.success(".با موفقیت حذف شد"))
                    setHasDataError(false)

                    let f = { ...filter, ...localFilter }
                    f.GetId = GetId;
                    f.page = page + 1;
                    f.pageSize = isShowAll() ? 10000 : rowsPerPage;

                    baseService.post(url, f).then(({ data }) => {


                        //if has error convert this code to ==>> data.items
                        let dataList = [];

                        data.data.data.items.map((item, i) => (
                            dataList.push(keysToLowerCase(item))

                        ))

                        setDataItem(dataList)
                        if (dataList.length > 0) {
                            dispatch(passIdsActions.fetchHasDataSanad(true));
                        }
                        else {
                            dispatch(passIdsActions.fetchHasDataSanad(false));
                        }

                        if (isShowAll()) {

                            //|| (localFilter == null && result.items.length == result.totalCount) it was very wrong
                            //if user select show all one time, for other request we use local Data
                            setTotal( data.data.data.totalCount);
                            setOfflineData(dataList); // 
                            setLocalFilter({});

                        } else {
                            setRecords(dataList);
                            setTotal( data.data.data.totalCount);
                        }

                        setLoading(false);
                    })

                }

            });
        }).catch(err => {
            console.log('err', err);
            dispatch(snackbarActions.error("خطا در حذف."))
        })
    }


    const HandleChangeClickSp = (input) => {

        let b = {};
        b.SRL = input;
        baseService.post("/Sanad/Sodor_Sanad", b).then(({ data }) => {
            dispatch(snackbarActions.success("صدور سند با موفقیت انجام شد."))
            let f = { ...filter, ...localFilter }
            f.GetId = GetId;
            f.page = page + 1;
            f.pageSize = isShowAll() ? 10000 : rowsPerPage;

            baseService.post(url, f).then(({ data }) => {


                //if has error convert this code to ==>> data.items
                let dataList = [];

                data.data.data.items.map((item, i) => (

                    dataList.push(keysToLowerCase(item))

                ))

                setDataItem(dataList)
                if (dataList.length > 0) {
                    dispatch(passIdsActions.fetchHasDataSanad(true));
                }
                else {
                    dispatch(passIdsActions.fetchHasDataSanad(false));
                }
                if (isShowAll()) {

                    //|| (localFilter == null && result.items.length == result.totalCount) it was very wrong
                    //if user select show all one time, for other request we use local Data
                    setTotal( data.data.data.totalCount);
                    setOfflineData(dataList); // 
                    setLocalFilter({});

                } else {
                    setSumDBT(data.sum_crd)
                    setSumCRD(data.sum_dbt)
                    setRecords(dataList);
                    setTotal( data.data.data.totalCount);
                }

                setLoading(false);
            })

        }).catch(err => {
            console.log('err', err);
            dispatch(snackbarActions.error("خطا در ثبت سند."))
        })
    }

    const CntrlSanadSp = () => {
        let b = {};
        debugger;
        b.SRL = listSrlState.SRL;
        b.personalCode = user.user.personalCode;
        b.TYPE = 1; //سند ترخیص 

        baseService.post("/Sanad/Cntrl_Sanad", b).then(({ data }) => {

            if (data.type === 1) {
                //setstatus(data.status);
                dispatch(snackbarActions.success("تاييد نهايي سند با موفقيت انجام شد."))
                setHasDataError(false)
                dispatch(passIdsActions.fetchStatusOaplist(data.status));
                //dispatch(passIdsActions.fetchHasDataError(false));
            }
            else if (data.type === 2) {
                //setstatus(data.status);
                dispatch(snackbarActions.error("در هنگام كنترل سند خطا يافت شد.به آيكون مشاهده خطا مراجعه كنيد."))
                setHasDataError(true)
                dispatch(passIdsActions.fetchStatusOaplist(data.status));
                // dispatch(passIdsActions.fetchHasDataError(true));
            }
            let f = { ...filter, ...localFilter }
            f.GetId = GetId;
            f.page = page + 1;
            f.pageSize = isShowAll() ? 10000 : rowsPerPage;

            baseService.post(url, f).then(({ data }) => {


                //if has error convert this code to ==>> data.items
                let dataList = [];

                data.data.data.items.map((item, i) => (

                    dataList.push(keysToLowerCase(item))

                ))

                setDataItem(dataList)

                if (isShowAll()) {

                    //|| (localFilter == null && result.items.length == result.totalCount) it was very wrong
                    //if user select show all one time, for other request we use local Data
                    setTotal( data.data.data.totalCount);
                    setOfflineData(dataList); // 
                    setLocalFilter({});

                } else {
                    setRecords(dataList);
                    setTotal( data.data.data.totalCount);
                }

                setLoading(false);
            })

        }).catch(err => {
            console.log('err', err);
            dispatch(snackbarActions.error("خطا در تایید نهایی."))
        })
    }






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


            setLoading(true);
            let f = { ...filter, ...localFilter }
            f.GetId = GetId;
            f.page = page + 1;
            f.pageSize = isShowAll() ? 10000 : rowsPerPage;
            if (orderby)
                f.sort = orderby + ' ' + orderDir;
            setLoadinggrid(true);
            baseService.post(url, f).then(({ data }) => {
                if (data.errors) {
                    //alert or something
                } else {
                    //if has error convert this code to ==>> data.items
                    let dataList = [];
                    data.data.data.items.map((item, i) => (
                        dataList.push(keysToLowerCase(item))


                    ))

                    setLoadinggrid(false);
                    setDataItem(dataList)
                    //console.log("mazamir",dataList)
                    if (dataList.length > 0) {
                        dispatch(passIdsActions.fetchHasDataSanad(true));
                    }
                    else {
                        dispatch(passIdsActions.fetchHasDataSanad(false));
                    }

                    if (isShowAll()) {

                        //|| (localFilter == null && result.items.length == result.totalCount) it was very wrong
                        //if user select show all one time, for other request we use local Data
                        setTotal(data.data.data.totalCount);
                        setOfflineData(dataList); // 
                        setLocalFilter({});

                    } else {
                        setSumDBT(data.sum_crd)
                        setSumCRD(data.sum_dbt)
                        setRecords(dataList);
                        setTotal(data.data.data.totalCount);
                    }


                }
                setLoading(false);
            })
        }
    }, [page, rowsPerPage, filter, orderby, orderDir, offlineData, forceUpdate, localFilter, status])



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

    //const floatString = (n) => Number.isInteger(n) ? n.toFixed(1) : n.toString();


    return (
        <>
            {!loadgrid ?
                <>
                    {/* {console.log('statusstatusstatus', status)} */}
                    <Portlet>
                        <PortletHeader
                            title={''}
                            toolbar={
                                (
                                    <PortletHeaderToolbar>
                                        {
                                            dataItem.length === 0 && props.StatusOaplist === 0 && props.hasData &&
                                                props.listSrlState.VOU === null ?

                                                <Button onClick={() => HandleChangeClickSp(listSrlState.SRL)} variant="success">
                                                    صدور سند
                                                </Button>
                                                : <></>
                                        }
                                        
                                        {dataItem.length > 0 &&  props.StatusOaplist === 0 ?

                                            <Button onClick={CntrlSanadSp} variant="primary" >
                                                کنترل سند پیش نویس
                                            </Button>

                                            : <></>
                                        }
                                       
                                        {dataItem.length > 0 && hasDataError ?

                                            <Button onClick={() => detailHandler(listSrlState)} variant="danger" >
                                                مشاهده خطا
                                            </Button>

                                            : <></>
                                        }
                                       
                                        {dataItem.length > 0 && props.StatusOaplist === 0  ?

                                            <Button onClick={() => HandleDeleteSp(listSrlState.SRL)} variant="outline-danger" >
                                                <i className="fa fa-trash" />
                                                حذف سند
                                            </Button>

                                            : <></>
                                        }
                                        
                                        {dataItem.length > 0 && props.StatusOaplist === 1  ?
                                            <Button onClick={() => HandleChangeState(listSrlState.SRL)} variant="outline-info" >
                                                <i className="fa fa-exchange" />
                                                تغییر وضعیت
                                            </Button>
                                            : <></>
                                        }





                                    </PortletHeaderToolbar>
                                )}
                        />
                    </Portlet>

                    {dataItem.length > 0 ?
                        <>
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
                            <Container>
                                <Row>

                                    <Col md = {3}>
                                        <FormLabel style={{ color: '#000000' }} component="legend"> جمع بدهکار : {SumDBT}</FormLabel>
                                    </Col>
                                    <Col md = {3}>
                                        <FormLabel style={{ color: '#000000' }} component="legend">جمع بستانکار : {SumCRD}</FormLabel>
                                    </Col>
                                </Row>
                            </Container>

                        </>
                        : <></>
                    }

                </> : <div className="loadingdiv"> <CircularProgress disableShrink /> </div>}
        </>
    );
}


const mapStateToProps = state => {
//console.log("maz" , state)
    return {
        hasData: state.passIds.hasData,
        // listSrlState: state.passIds.listSrlState,
        hasDataError: state.passIds.hasDataError,
        StatusOaplist: state.passIds.statusBtnSanad,
    };
};
export default connect(mapStateToProps)(GridSanad);


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