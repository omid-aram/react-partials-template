/**
* InputText.d.ts - 1401/11/17
*/

export interface InputTextProps {
  /**
   * نام فیلد
   */
  name: string;
  /**
   * شرح نمایش داده شده در بالای فیلد
   */
  label: string;
  /**
   * جهت کار با مقادیر خاص بهتر است تعریف شود
   * - digit: فقط مقادیر عددی
   * - digit3: فقط مقادیر عددی - دسته بندی سه تایی
   * - number: تایپ استاندارد اعداد
   * - email: ایمیل
   * - tel: تلفن
   * - password: کلمه عبور
   */
  type?: string;
  /**
   * در صورت تعریف، کنترل به صورت چندخطی نمایش داده می شود
   */
  rows?: number;
  /**
   * در صورت تعریف، کنترل غیر قابل تغییر می شود
   */
  readOnly?: boolean;
  /**
   * در صورت تعریف، کنترل غیر فعال می شود
   */
  disabled?: boolean;
  /**
   * در صورت تعریف، طول رشته محدود می شود
   */
  maxLength?: number;
  /**
   * شخصی سازی استایل
   */
  style?: object;
  /**
   * ویژگی هایی که بر روی کنترل اصلی درونی اعمال می شود
   */
  inputProps?: object;
  /**
  * تابعی که در صورت تغییر مقدار فراخوانی میشود
  */
  onChange;
}

export default function InputText(props: InputTextProps);
