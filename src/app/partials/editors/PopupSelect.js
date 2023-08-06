/**
* PopupSelect.js - 1402/05/15
*/

import React, { useState, useEffect } from "react"
import { OutlinedInput, InputLabel, InputAdornment, IconButton, Icon, FormControl, FormHelperText } from "@material-ui/core"
import { Controller, useFormContext, FormProvider, useForm } from "react-hook-form"
import objectPath from "object-path"
import baseService from "../../services/base.service"
//import ModalSelector from '../ModalSelector';
import GenModal from "../modal";
import Grid from "../grid";
import { Row, Col } from "react-bootstrap";
import DeleteIcon from '@material-ui/icons/Delete';
import InputText from "./InputText";

const PopupSelect = (props) => {
    const { name, label, apiUrl, apiFilter, textField, valueField, inlineSearchField, popupSearchField, onChange, style, readOnly, inputProps,
        mappingFields, columns, modalSize, pageSize, sortItem, ...rest } = props

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState();
    const { control, errors, getValues, setValue } = useFormContext();

    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [displayText, setDisplayText] = useState();
    const [searchText, setSearchText] = useState();

    const [filter, setFilter] = useState({ ...(JSON.parse(apiFilter || "{}")), pageSize: pageSize || 10, sort: sortItem || null, page: 1 });
    const [selected, setSelected] = useState();

    const searchMethods = useForm();

    const namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
    const error = objectPath.get(errors, namePath);
    const hasError = !!error;

    useEffect(() => {
        let isMounted = true;

        setFilter(x=> ({...x, ...(JSON.parse(apiFilter || "{}"))}));

        const val = getValues(namePath);

        if (val) {
            setLoading(true);

            const payload = JSON.parse(apiFilter || "{}");
            payload[valueField || "id"] = val;

            baseService.post(apiUrl, payload)
                .then(res => {
                    if (!isMounted) return;

                    setData(res.data.items);
                })
                .catch()
                .finally(() => isMounted && setLoading(false));
        }

        const cleanUp = () => {
            isMounted = false;
        };

        return cleanUp;

    }, [apiUrl, apiFilter, valueField, getValues, namePath]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (displayText) {
                inlineSearch();
            } else {
                openDialog();
            }
        }
    }

    const getDisplayText = (id, item) => {
        let result = "";

        if (!id && id !== 0) return result;

        if (!item) {
            item = data.length > 0 ? data.find(x => (x[valueField || 'id'] || '').toString() === id.toString()) : null;
        }

        if (item) {
            const words = textField ? textField.split(' ') : [];
            for (let i = 0; i < words.length; i++) {
                let word = words[i];

                if (word[0] === '@') {
                    const indexOfSecondSign = word.indexOf('@', 1);//میتونه @ انتهایی هم داشته باشه. برای حالتی که نمیخوایم فاصله داشته باشیم بعدش
                    word = item[word.substring(1, indexOfSecondSign < 0 ? undefined : indexOfSecondSign)] + (indexOfSecondSign < 0 ? "" : word.substring(indexOfSecondSign + 1));
                } else if (words.length === 1) {
                    //میخوام اگه فقط یک فیلد منظورش باشه لازم نباشه حتما @ بذاره
                    word = item[word];
                }
                result += word + ' ';
            }
        }

        return result.trim();
    }

    const setItem = (item) => {
        if (readOnly) return;

        const id = item[valueField || "id"];
        setDisplayText(getDisplayText(id, item));
        setData([...data, item]);
        setValue(namePath, id);

        if (mappingFields) {
            mappingFields.map(x => setValue(x.to, item[x.from]));
        }

        if (typeof (onChange) === "function") {
            onChange(item);
        }
    }

    const inlineSearch = () => {
        if (readOnly) return;

        setLoading(true);

        const payload = JSON.parse(apiFilter || "{}");
        payload[inlineSearchField || "id"] = displayText;

        baseService.post(apiUrl, payload)
            .then(res => {
                if (res.data && res.data.items.length > 0) {
                    setItem(res.data.items[0]);
                } else {
                    setItem({});
                }
            })
            .catch()
            .finally(() => setLoading(false));
    }

    const openDialog = () => {
        if (readOnly) return;

        const val = getValues(namePath);
        const _valueField = valueField || "id";
        setSelected(val ? data.find(x => x[_valueField] === val) : {});

        setShowModal(true);
    }

    const popupSearch = () => {
        let _filter = { ...filter };
        _filter[popupSearchField] = searchText;
        setFilter(_filter);
    }

    const selectHandler = (item, isCheck) => {
        if (isCheck) {
            setSelected(item)
        } else {
            setSelected(null)
        }
    }

    const dismissHandler = () => {
        setShowModal(false);
    }
    const confirmHandler = () => {
        setItem(selected || {});
        dismissHandler();
    }

    const removeHandler = (e) => {
        //e.stopPropagation();
        setItem({});
    }

    const searchForm = (
        <>
            <Row>
                <Col sm={12}>
                    <InputText
                        name="searchText"
                        label="جستجو"
                        value={searchText || ""}
                        onChange={(text) => setSearchText(text)}
                        onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); popupSearch(); } }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    color="primary"
                                    aria-label="انتخاب"
                                    onClick={popupSearch}
                                    edge="end"
                                >
                                    <Icon className="fa fa-search" />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Col>
            </Row>
        </>
    )

    return (<>
        <FormControl variant="outlined" style={{ width: "100%" }} size="small">
            <InputLabel error={hasError} >{label}</InputLabel>
            <Controller
                render={({ onChange, value, onBlur, name }) => (
                    <>
                        <input type="hidden" name={name} value={value || ""} />
                        <OutlinedInput
                            type="text"
                            label={label}
                            //name={`${name}_InnerText`}
                            value={(isInitialLoad ? getDisplayText(value) : displayText) || ""}
                            onChange={(e) => { setIsInitialLoad(false); setDisplayText(e.target.value); }}
                            onBlur={(e) => { if (!isInitialLoad) setDisplayText(getDisplayText(value)); }}

                            style={{ ...style }}
                            inputProps={{ readOnly: readOnly ? "true" : null, ...inputProps }}
                            error={hasError}
                            //onInput={(e) => { }}
                            onKeyPress={handleKeyPress}
                            endAdornment={
                                <>
                                    <InputAdornment position="end">
                                        <IconButton
                                            style={{ display: value ? "" : "none" }}
                                            aria-label="لغو انتخاب"
                                            onClick={(e) => removeHandler(e)}
                                            edge="end"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </InputAdornment>
                                    <InputAdornment position="end">
                                        <IconButton
                                            color="primary"
                                            aria-label="انتخاب"
                                            onClick={() => openDialog()}
                                            edge="end"
                                        >
                                            <Icon className="fa fa-search" />
                                        </IconButton>
                                    </InputAdornment>
                                </>
                            }
                            {...rest} />
                    </>
                )}
                control={control}
                name={name}
                defaultValue={""}
            />
            {loading && (
                <i className="fa fa-spin fa-spinner" style={{ position: "absolute", top: "12px", left: "30px" }}></i>
            )}
            <FormHelperText>
                {hasError && (error.message)}
            </FormHelperText>
        </FormControl>

        {showModal &&
            <GenModal
                title={label}
                size={modalSize || "md"}
                isShow={showModal}
                onConfirm={confirmHandler}
                onDismiss={dismissHandler}
            >
                {searchForm && (
                    <FormProvider {...searchMethods}>
                        {searchForm}
                    </FormProvider>
                )}

                <Grid
                    columns={columns}
                    url={apiUrl}
                    filter={filter}
                    selectable={true}
                    selectedItems={selected}
                    keyColumn={valueField}
                    singleSelect={true}
                    onSelectChange={selectHandler}
                    hidePageNumbers={true}
                    hideRowsPerPage={true}
                />
            </GenModal>
        }
    </>);
}

export default PopupSelect;