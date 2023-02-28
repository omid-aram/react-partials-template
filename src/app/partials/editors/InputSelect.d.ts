/**
* InputSelect.d.ts - 1401/11/19
*/

export interface InputSelectProps {

  /**
   * - نام فیلد
   */
  name: string;

  /**
   * - شرح نمایش داده شده در بالای فیلد
   */
  label: string;

  /**
   * - در صورت تعریف، مقدار آن به عنوان اولین آیتم نمایش داده میشود
   * 
   * - مثال: انتخاب کنید
   */
  placeholder?: string;

  /**
   * - لیست آیتم ها
   */
  items?: Object[];

  /**
   * - آیتم ها را از سرور فراخوانی میکند
   * 
   * - baseService.post("/Common/GetEnumSelectData", { enumType });
   */
  enumType: string;

  /**
   * - آیتم ها را از سرور فراخوانی میکند
   * 
   * - baseService.post("/Lookup/GetLookupSelectData", { lookupType });
   */
  lookupType: string;

  /**
   * - آیتم ها را از سرور فراخوانی میکند
   * 
   * - baseService.post(apiUrl, apiFilter || {})
   */
  apiUrl: string;

  /**
  * - تابعی که در صورت تغییر مقدار فراخوانی میشود
  * - onChange(value, text);
  */
  onChange(value: string, text: string);

  /**
   * - نام فیلد شناسه آیتم
   */
  valueField;

  /**
   * - نام فیلد شرح آیتم
     -      e.g. (1) textField="codeName"
     -      e.g. (2) textField="@code - @name"
     -      e.g. (3) textField="@code@: @name"
   */
  textField;

  /**
   * در صورت تعریف، کنترل غیر قابل تغییر می شود
   */
  readOnly?: boolean;

  /**
   * ⚠️Caution
   * - Its value must be a stringified json:
   * 
   * - ✔️ apiFilter={JSON.stringify({ CompanyId: company.id })}
   * - ✔️ apiFilter={\`{ "CompanyId": ${company.id} }\`}
   * - 
   * - ⛔ NOT apiFilter = {{ CompanyId: company.id }}
   */
  apiFilter?: object;
}

/**
 * - آیتم ها را از طریق یکی از موارد زیر نمایش دهید
 * -
 * - [items](http://saipacorp.com): To show constant menu items
 * - [enumType](http://saipacorp.com): To show items of an Enum (/Common/GetEnumSelectData)
 * - [lookupType](http://saipacorp.com): To show lookup items (/Lookup/GetLookupSelectData)
 * - [apiUrl](http://saipacorp.com): baseService.post(apiUrl, apiFilter)
 * -
 * - Demos:
 * -
 * - \<InputSelect
 * -        name="[fieldName]"
 * -        label="[title]"
 * -        apiUrl="/[Controller]/[Action]"
 * -        valueField="id"
 * -        textField="desc"
 * - />
 */
export default function InputSelect(props: InputSelectProps);
