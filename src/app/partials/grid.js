/**
* grid.js - 1401/11/24
*/

import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { Table, TableBody, TableHead, TableRow, TableCell, TableFooter, TablePagination } from '@material-ui/core';
import baseService from '../services/base.service'
import { Checkbox, TableContainer, TableSortLabel, LinearProgress, IconButton, Radio } from '@material-ui/core';
import objectPath from 'object-path';
import Pagination from '@material-ui/lab/Pagination';
import { dynamicSort } from '../utils/helper'

import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

export default function Grid(props) {
    const {
        columns, //required
        url, data, // one required 
        filter,

        keyColumn,
        selectable,
        selectedItems,
        singleSelect,
        onSelectChange,
        defaultSort,
        fixHeight,
        hideRowsPerPage,
        paginationBtnCount,
        addEmptyRow,
        hidePageNumbers
    } = props;
    const classes = useStyles2();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(filter.pageSize || 10);
    const [records, setRecords] = useState([]); // records which showed to user
    const [offlineData, setOfflineData] = useState(data); // offlineData
    const [total, setTotal] = useState(0);
    const [orderby, setOrderby] = useState(defaultSort);
    const [orderDir, setOrderDir] = useState('asc');
    const [loading, setLoading] = useState(false);
    const [forceUpdate, setForceUpdate] = useState({});
    const [localFilter, setLocalFilter] = useState(null); //filter on each column
    let offline = !!offlineData;

    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    useEffect(() => {
        let isMounted = true;
        const isShowAll = () => {
            return rowsPerPage === 'All';
        }

        if (offline) {
            let temp = [...offlineData];

            if (localFilter) {
                for (let field in localFilter) {
                    //temp = temp.filter(x => (x[field] + '').indexOf(localFilter[field]) > -1)
                    temp = temp.filter(x => (x[field] + '').toLowerCase().startsWith(localFilter[field].toLowerCase()))
                }
            }

            setRecords(temp.sort(dynamicSort(orderby, orderDir)));
        } else {
            setLoading(true);

            let omidFilters = []
            for (let field2 in localFilter) {
                omidFilters.push({
                    Field: field2[0].toUpperCase() + field2.substring(1),
                    Value: localFilter[field2],
                });
            }

            let f = { ...filter, ...localFilter, Filters: omidFilters }
            f.page = page + 1;
            f.pageSize = isShowAll() ? 10000 : rowsPerPage;
            if (orderby) {
                //f.sort = orderby + ' == null, ' + orderby + ' ' + orderDir;
                f.sort = "";
                const orderbyArray = orderby.split(',');
                orderbyArray.forEach(x => {
                    f.sort += (f.sort.length > 0 ? ", " : "") + x + ' == null, ' + x + ' ' + orderDir;
                });
            }

            baseService.post(url, f).then(({ data }) => {
                if (!isMounted) return;

                if (data.errors) {
                    //alert or something
                } else {
                    if (isShowAll()) {

                        //|| (localFilter == null && result.items.length == result.totalCount) it was very wrong
                        //if user select show all one time, for other request we use local Data
                        setTotal(data.totalCount);
                        setOfflineData(data.items); // 
                        setLocalFilter({});

                    } else {
                        setRecords(data.items);
                        setTotal(data.totalCount);
                    }
                }
            }).finally(() => isMounted && setLoading(false));
        }

        const cleanUp = () => {
            isMounted = false;
        };

        return cleanUp;

    }, [page, rowsPerPage, filter, orderby, orderDir, offlineData, forceUpdate, localFilter, offline, url])

    // useEffect(() => {
    //     let temp = [...records];
    //     setRecords(temp);
    // }, [clickedRowId])

    //console.log(selectedItems);

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

    // const getStripedStyle = (index, rowId) => {
    //     return { background: rowId === props.clickedRowId ? 'gold' : index % 2 ? '#f5f5f5' : 'white' };
    // }

    const sortHandler = (field) => {
        const isAsc = orderby === field && orderDir === 'asc';
        setOrderDir(isAsc ? 'desc' : 'asc');
        setOrderby(field);
        setPage(0);
    }

    const localFilterChange = (field, input) => {
        setLocalFilter(prev => {
            var n = { ...prev };
            n[field] = input;
            return n;
        });
    }

    const emptyRows = addEmptyRow ? (rowsPerPage - records.length) : 0;

    const dataBody = useMemo(() => (
        <TableBody>
            {records.map((row, i) => (
                //<TableRow key={i} style={{ ...getStripedStyle(i, row[keyColumn]) }}>
                <TableRow key={i} style={{ backgroundColor: row[keyColumn] === props.clickedRowId ? 'gold' : i % 2 ? '#f5f5f5' : 'white' }}>
                    {selectable ? (<TableCell key={0} >
                        {singleSelect ?
                            <Radio className={classes.noPadding} onChange={(event) => { onSelectChange(row, event.target.checked) }} checked={selectedItems ? selectedItems[keyColumn] === row[keyColumn] : false} />
                            :
                            <Checkbox onChange={(event) => { onSelectChange(row, event.target.checked) }} checked={selectedItems ? selectedItems.some(x => x === row[keyColumn]) : false} />
                        }
                    </TableCell>) : null}

                    {columns.map((col, j) => {
                        var cell = null;
                        if (col.template) {
                            cell = col.template(row);
                        } else {

                            //cell = row[col.field];  simple  e.g. title
                            cell = objectPath.get(row, col.field);//   complex e.g. type.title
                            if (cell && col.comma1000) {
                                cell = cell.toLocaleString('en-US');
                            }
                        }
                        return (<TableCell key={j} align={col.align ? col.align : "inherit"} style={col.style}>{cell}</TableCell>);
                    })}

                </TableRow>
            ))}
            {emptyRows > 0 && (
                <TableRow style={{ height: (true ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={columns.length} />
                </TableRow>
            )}
        </TableBody>
    ), [classes.noPadding, columns, emptyRows, keyColumn, onSelectChange, props.clickedRowId, records, selectable, selectedItems, singleSelect])
    //), [records, selectedItems])


    return (
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
                        {selectable ? (<TableCell key={0} style={{ width: 50 }} >انتخاب</TableCell>) : null}

                        {columns.map((col, i) =>
                            <TableCell
                                key={i}
                                style={{ width: col.width || 'auto' }}
                                className={classes.headerCell + ' ' + col.filterable ? classes.headerCellWithFilter : ''}>
                                {col.sortable ?
                                    (
                                        <TableSortLabel
                                            active={orderby === (col.sortField || col.field)}
                                            direction={orderby === (col.sortField || col.field) ? orderDir : 'asc'}
                                            onClick={() => sortHandler(col.sortField || col.field)}
                                            style={{ "fontWeight": orderby === (col.sortField || col.field) ? "bold" : null }}
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
                                rowsPerPageOptions={hideRowsPerPage ? [] : [5, 10, 20, 50, 100, 250]}
                                colSpan={columns.length + (selectable ? 1 : 0)}
                                count={total}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={(defaultProps) => <TablePaginationActions {...defaultProps} btnCount={paginationBtnCount} loading={loading} refreshHandler={reafreshData} hidePageNumbers={hidePageNumbers} />}
                            />
                        </TableRow>
                    </TableFooter>
                )}
            </Table>
        </TableContainer>
    );
}

function TablePaginationActions(props) {

    const { count, page, rowsPerPage, onChangePage, loading, refreshHandler/*, btnCount*/, hidePageNumbers } = props;

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

    let pageCount = Math.ceil(count / (rowsPerPage === "All" ? 1 : rowsPerPage))
    const handleChange = (event, value) => {
        onChangePage(event, value - 1);
    };
    const classes = useStyles2();

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <>
            <IconButton
                className={classes.syncBtn}
                color="primary"
                disabled={loading}
                onClick={refreshHandler} >
                <i className={"fa fa-sync " + (loading ? "fa-spin" : "")}></i>
            </IconButton>

            {!hidePageNumbers &&
                <Pagination
                    //ref={ref}
                    variant="outlined"
                    siblingCount={1}
                    boundaryCount={1}
                    count={pageCount}
                    //showFirstButton showLastButton
                    page={page + 1}
                    onChange={handleChange} />
            }
            {hidePageNumbers &&
                <>
                    <IconButton
                        onClick={handleFirstPageButtonClick}
                        disabled={page === 0}
                        aria-label="first page"
                    >
                        <LastPageIcon />
                    </IconButton>
                    <IconButton variant="outlined" onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                        <KeyboardArrowRight />
                    </IconButton>
                    <IconButton
                        onClick={handleNextButtonClick}
                        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                        aria-label="next page">
                        <KeyboardArrowLeft />
                    </IconButton>
                    <IconButton
                        onClick={handleLastPageButtonClick}
                        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                        aria-label="last page"
                    >
                        <FirstPageIcon />
                    </IconButton>
                </>
            }
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
        //background: "linear-gradient(0deg, rgba(236,236,236,1) 0%, rgba(250,250,250) 60%, rgba(242,242,242,1) 100%)",
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
    },
    noPadding: {
        padding: '0px',
    }
});