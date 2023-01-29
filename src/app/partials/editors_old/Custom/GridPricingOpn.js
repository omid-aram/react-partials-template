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
import { Portlet, PortletHeader, PortletHeaderToolbar } from '../../content/Portlet';
import baseService from '../../../services/base.service';
import { CircularProgress, Checkbox, TableContainer, TableSortLabel, LinearProgress, IconButton, Radio } from '@material-ui/core';
import objectPath from 'object-path';
import Pagination from '@material-ui/lab/Pagination';
import { dynamicSort } from '../../../utils/helper';
import { useDispatch } from 'react-redux';
import { snackbarActions } from "../../../store/ducks/snackbar.duck";
import { Button, Col, Row } from "react-bootstrap";


{/* <Grid
filter={filter}
url="/auctionResponse/getItems"
columns={columns}
selectable={true}
onSelectChange={handleSelectChange} /> */}

export default function GridPricingOpn(props) {
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
        defaultSort,
        itemInPage,
        fixHeight,
        hideRowsPerPage,
        paginationBtnCount,
        addEmptyRow,
        ChekRowPricing,
        selectedRow,
        rowSelect
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
    //const [itemstorage, setitemstorage] = useState([]);
    const dispatch = useDispatch();
    let offline = !!offlineData;

    const keysToLowerCase = (obj) => {

        const x = {};
        for (const [key, value] of Object.entries(obj)) {
            x[key.toUpperCase()] = value;
        }
        return x;
    }

    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    useEffect(() => {
        if (offline) {

            let temp = [...offlineData];
            let dataList = [];

            temp.map((item, i) => (
                dataList.push(keysToLowerCase(item))

            ))


            if (localFilter) {
                for (var field in localFilter) {
                    //temp = temp.filter(x => (x[field] + '').indexOf(localFilter[field]) > -1)
                    dataList = dataList.filter(x => (x[field] + '').toLowerCase().startsWith(localFilter[field].toLowerCase()))
                }
            }

            setRecords(dataList.sort(dynamicSort(orderby, orderDir)));
            setTotal(dataList.length);
            setLoading(false);

        } else {
            setLoading(true);

            let f = { ...filter, ...localFilter }
            f.GetId = GetId;
            f.page = page + 1;
            f.pageSize = isShowAll() ? 10000 : rowsPerPage;
            if (orderby)
                f.sort = orderby + ' ' + orderDir;
            baseService.post(url, f).then(({ data }) => {
                if (data.errors) {
                    //alert or something
                } else {
                    console.log("fff", f);
                    //if has error convert this code to ==>> data.items
                    let dataList = [];
                    data.items.map((item, i) => (
                        dataList.push(keysToLowerCase(item))

                    ))

                    //setitemstorage(dataList);
                    console.log("GRID", dataList);

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
    }, [page, rowsPerPage, filter, orderby, orderDir, offlineData, forceUpdate, localFilter])


    // useEffect(() => {
    //     const data = localStorage.getItem("item-storage");
    //     if (data){
    //         JSON.parse(data);
    //     }

    //  }, []);

    // useEffect(() => {
    //    localStorage.setItem("item-storage", JSON.stringify(itemstorage));
    // });
    useEffect(() => {
        let temp = [...records]
        setRecords(temp);
    }, [selectedRow])


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

    const getStripedStyle = (index,rowId) => {
        return { background: rowId === selectedRow ? '#a3e7d3' : index % 2 ? '#f5f5f5' : 'white' };
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

    let columnSelect = rowSelect || "SRL";

    const dataBody = useMemo(() => (
        <TableBody>
            {records.map((row, i) => (
                <TableRow key={i} style={{ ...getStripedStyle(i,row[columnSelect]) }}>
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

    const HandleDeletePricing = (data) => {

        debugger;

        let sendData = {};
        let Srllist = [];
        for (var i = 0; i < data.length; i++) {

            let obj = {};
            obj.SRL = data[i].SRL;
            Srllist.push(obj);

        }

        sendData.SRLS = Srllist;

        baseService.post("/PricingResid/PricingResidDelete_Opn", sendData).then(({ data }) => {

            console.log("PricingResidOpn_Show", data);
            dispatch(snackbarActions.success("عملیات حذف با موفقیت انجام شد."));
            
            let f = { ...filter, ...localFilter }
            f.GetId = GetId;
            f.page = page + 1;
            f.pageSize = isShowAll() ? 10000 : rowsPerPage;
            if (orderby)
                f.sort = orderby + ' ' + orderDir;
            baseService.post(url, f).then(({ data }) => {
                if (data.errors) {
                    //alert or something
                } else {
                    console.log("fff", f);
                    //if has error convert this code to ==>> data.items
                    let dataList = [];
                    data.items.map((item, i) => (
                        dataList.push(keysToLowerCase(item))

                    ))

                    //setitemstorage(dataList);
                    console.log("GRID", dataList);

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

        })


    }


    return (<>
        <Portlet>
            <PortletHeader
                title={'لیست قیمت گذاری'}
                toolbar={
                    (
                        <PortletHeaderToolbar>
                            <Button onClick={() => HandleDeletePricing(ChekRowPricing)} variant="outline-danger" >
                                <i className="fa fa-trash" />
                                        حذف
                                    </Button>
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
    </>
    );
}

function TablePaginationActions(props) {

    const { count, page, rowsPerPage, onChangePage, loading, refreshHandler, btnCount } = props;

    // const ref = useRef()
    // const [containerWidth, setContainerWidth] = useState(0);

    // useEffect(() => {
    //     function handleResize() {
    //     console.log(containerWidth)
    //     setContainerWidth(ref.current.offsetWidth);
    //     }

    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, [containerWidth])
    // console.log(containerWidth)

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