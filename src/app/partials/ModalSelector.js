/**
* ModalSelector.js - 1401/11/24
*/

import React, { useState } from "react"
import GenModal from "./modal";
import Grid from "./grid";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from 'prop-types';

const ModalSelector = props => {

    const {
        isShow,
        title,
        size,
        onConfirm,
        onDismiss,
        keyColumn,
        singleSelect,
        columns, url, searchForm, initFilter } = props

    const [filter, setFilter] = useState(initFilter);
    const [selected, setSelected] = useState(singleSelect ? null : []);

    const searchMethods = useForm();

    const selectHandler = (item, isCheck) => {
        if (singleSelect) {
            if (isCheck) {
                setSelected(item)
            } else {
                setSelected(null)
            }
        } else {
            if (isCheck) {
                setSelected(prev => [...prev, item[keyColumn]])
            } else {
                setSelected(prev => prev.filter(x => x[keyColumn] !== item[keyColumn]))
            }
        }
    }

    const searchHandler = (searchData, e) => {
        setFilter(prev => ({ ...prev, ...searchData }))
    }

    const confirmHandler = () => {
        onConfirm(selected);
        onDismiss();
    }

    return (
        <>

            <GenModal
                title={title}
                size={size}
                isShow={isShow}
                onConfirm={confirmHandler}
                onDismiss={onDismiss}
            >
                {searchForm && (
                    <FormProvider {...searchMethods}>
                        <form onSubmit={searchMethods.handleSubmit(searchHandler)}>
                            {searchForm}
                        </form>
                    </FormProvider>
                )}

                <Grid
                    columns={columns}
                    url={url}
                    filter={filter}
                    selectable={true}
                    selectedItems={selected}
                    keyColumn={keyColumn}
                    singleSelect={singleSelect}
                    onSelectChange={selectHandler}
                    //fixHeight="400px"
                    hidePageNumbers={true}
                    hideRowsPerPage={true}
                />
            </GenModal>
        </>
    );
}

ModalSelector.propTypes = {
    isShow: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    keyColumn: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default ModalSelector;

