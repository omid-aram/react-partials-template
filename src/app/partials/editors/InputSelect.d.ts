/**
* InputSelect.d.ts - 1401/11/17
*/

export interface InputSelectProps {
  /**
   * نام فیلد
   */
  name: string;
  /**
   * شرح نمایش داده شده در بالای فیلد
   */
  label: string;
  /**
   * در صورت تعریف، مقدار آن به عنوان اولین آیتم نمایش داده میشود
   * 
   * - مثال: انتخاب کنید
   */
  placeholder?: string;
  /**
   * لیست آیتم ها
   */
  items?: Object[];
  /**
   * آیتم ها را از سرور فراخوانی میکند
   * 
   * baseService.post("/Common/GetEnumSelectData", { enumType });
   */
  enumType: string;
  /**
   * آیتم ها را از سرور فراخوانی میکند
   * 
   * baseService.post("/Lookup/GetLookupSelectData", { lookupType });
   */
  lookupType: string;
  /**
   * آیتم ها را از سرور فراخوانی میکند
   * 
   * baseService.post(apiUrl, apiFilter || {})
   */
  apiUrl: string;
  /**
  * تابعی که در صورت تغییر مقدار فراخوانی میشود
  */
  onChange;
  /**
   * نام فیلد شناسه آیتم
   */
  valueField;
  /**
   * نام فیلد شرح آیتم
   */
  textField;
  /**
   * در این حالت چنانچه یکبار مقداردهی شده باشد، دیگر اجازه تغییر نمی دهد
   */
  readOnly?: boolean;
  /**
   * ⚠️Caution
   * - Never use apiFilter like this: 
   * 
   * ⛔ apiFilter = {{ CompanyId: company.id }}
   * 
   * - Instead, declare a const outside of the function and use that:
   * 
   * ✔️ const sthFilter = { CompanyId: company.id };
   * ... 
   * apiFilter={sthFilter}
   * 
   * - در غیر این صورت ممکن است منجر به فراخوانی های تکراری و ناخواسته شود
   */
  apiFilter?: object;
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
 *      apiUrl="/[Controller]/[Action]"
 *      valueField="id"
 *      textField="desc"
 *  />
 */
export default function InputSelect(props: InputSelectProps);
