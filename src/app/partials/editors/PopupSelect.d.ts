/**
* PopupSelect.d.ts - 1401/11/25
*/

export interface PopupSelectProps {

  /**
   * - نام فیلد
   */
  name: string;

  /**
   * - شرح نمایش داده شده در بالای فیلد
   */
  label: string;

  /**
   * - آیتم ها را از سرور فراخوانی میکند
   * - baseService.post(apiUrl, apiFilter || {})
   * -
   * - ورودی و خروجی سمت سرور باید به این شکل باشد 
   * - Input: An instance of the BaseSearch class
   * - Output: A PaginatedResult object
   * -
   * - مثال
   * -         public PaginatedResult<CompanyDTO> PopupCompanies(CompanySearch search)
   * -         {
   * -              var data = UnitOfWork.Repository<Company>().Get();
   * -              if (search != null)
   * -              {
   * -                  if (search.Id > 0)
   * -                  {
   * -                      data = data.Where(x => x.Id == search.Id);
   * -                  }
   * -                  else if (!string.IsNullOrEmpty(search.Code))
   * -                  {
   * -                      data = data.Where(x => x.Code == search.Code);
   * -                  }
   * -                  else if (!string.IsNullOrEmpty(search.SearchText))
   * -                  {
   * -                      var words = search.SearchText.Trim().Split(' ');
   * -                      for (int i = 0; i < words.Length; i++)
   * -                      {
   * -                          var word = words[i].Replace('ك', 'ک').Replace('ى', 'ي');
   * -                          data = data.Where(x => x.Code.Contains(word)
   * -                                              || x.Name.Replace('ك', 'ک').Replace('ى', 'ي').Contains(word));
   * -                      }
   * -                   }
   * -              }
   * -              return GetPaginated(search, data);
   * -          }
   */
  apiUrl: string;

  /**
  * - تابعی که در صورت تغییر مقدار فراخوانی میشود
  * - onChange(item);
  */
  onChange(item: object);

  /**
   * - نام فیلد شرح آیتم
   -      e.g. (1) textField="codeName"
   -      e.g. (2) textField="@code - @name"
   -      e.g. (3) textField="@code@: @name"
   */
  textField;

  /**
   * - نام فیلد شناسه آیتم
   */
  valueField;

  /**
   * - نام فیلد جستجوی سریع
   */
  searchField;

  /**
   * در صورت تعریف، کنترل غیر قابل تغییر می شود
   */
  readOnly?: boolean;

  /**
   * ویژگی هایی که بر روی کنترل اصلی درونی اعمال می شود
   */
  inputProps?: object;

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

  /**
   * - لیست فیلدهایی که با اطلاعات انتخاب شده مقداردهی میشوند
   * - mappingFields={[
   * -                  { from: "companyTypeDesc", to: "companyTypeDesc_clone" },
   * -                  { from: "registerDateFa", to: "registerDateFa_clone" }
   * -                ]}
   */
  mappingFields: object[];

  /**
   * - (اجباری) لیست ستون های نمایش داده شده در جدول
   * - const columns = [
     -   {
     -      field: string,        //نام فیلد
     -      title: string,        //عنوان در جدول
     -      sortable: boolean,    //قابلیت مرتب سازی
     -      sortField: string,    //فیلد مرتب سازی در صورتیکه با فیلد اصلی یکسان نباشد
     -      e.g. (1) "companyType"
     -      e.g. (2) "code.Length, code" //در مواقعی که تایپ فیلد رشته ای باشد ولی محتوای عددی دارد
     -      align: string,        
     -      width: number,        //عرض ستون را تعیین میکند
     -      style: object,
     -      e.g. {color: 'green', fontWeight: 'bold'}
     -      comma1000: boolean,   //جداسازی 3 رقمی اعداد
     -      template: function,   //تابع محاسبه مقدار ستون با در اختیار داشتن مقادیر کل ردیف
     -      filterable: true,     //قابلیت فیلتر کردن - Not OK
     -   },
     -   { . . . }
     - ]
   */
  columns: object[];

  /**
   * - سایز پنجره باز شده
   * - e.g. modalSize = 'sm' | 'lg' | 'xl';
   */
   modalSize: string;

  /**
   * - تعداد ردیف ها در هر صفحه
   */
   pageSize: number;

  /**
   * - مرتب سازی پیش فرض جدول
   * - e.g. sortItem = "code.Length, code asc, id"
   */
   sortItem: string;
}

/**
 * - \<PopupSelect
 * -        name="companyId"
 * -        label="شرکت"
 * -        apiUrl="/Company/PopupCompanies"
 * -        textField="@code - @name"
 * -        valueField="id"
 * -        searchField="code"
 * -        mappingFields={[
 * -          { from: "companyTypeDesc", to: "companyTypeDesc_clone" },
 * -          { from: "registerDateFa", to: "registerDateFa_clone" }
 * -        ]}
 * -        columns={[
 * -          { title: "کد شرکت", field: 'code', sortable: true, sortField: "code.Length, code" },
 * -          { title: "نام شرکت", field: 'name', sortable: true },
 * -          { title: "گروه", field: 'companyGroupName', sortable: true, sortField: "companyGroup.name" }
 * -        ]}
 * -        size="md"
 * -        sortItem="code.Length, code"
 * - />
 */
export default function PopupSelect(props: PopupSelectProps);
