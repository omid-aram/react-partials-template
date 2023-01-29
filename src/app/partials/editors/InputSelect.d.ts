import * as React from 'react';
import { StandardProps } from '..';
import { InputProps } from '../Input';
import { MenuProps } from '../Menu';
import { SelectInputProps } from './SelectInput';

export interface SelectProps
  extends StandardProps<InputProps, SelectClassKey, 'value' | 'onChange'>,
    Pick<SelectInputProps, 'onChange'> {

}

/**
 * آیتم ها را از طریق یکی از موارد زیر نمایش دهید
 * 
 * - [items](http://saipacorp.com): To show constant menu items
 * - [enumType](http://saipacorp.com): To show items of an Enum (/Common/GetEnumSelectData)
 * - [lookupType](http://saipacorp.com): To show lookup items (/Lookup/GetLookupSelectData)
 * - [apiUrl](http://saipacorp.com): baseService.post(apiUrl, apiFilter)
 *
 * Demos:
 *
 * \<InputSelect
 *      name="[fieldName]"
 *      label="[title]"
 *      api_url="/[Controller]/[Action]"
 *      valueField="id"
 *      textField="desc"
 *  />
 */
export default function InputSelect(props: SelectProps): JSX.Element;
