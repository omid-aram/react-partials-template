export interface PopupCrudProps {
  title: string;
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
     -      width: int,           //عرض ستون را تعیین میکند
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
   * - نام فیلد کلید
   * - defaultValue: "id"
   */
  keyColumn: string;
  /**
   * - (اجباری) آدرس های عملیات سرور
   * - در صورت تعریف نکردن هرکدام، آن قابلیت از کامپوننت حذف میگردد
   * - {{
   * -        readUrl:  "/Company/GetPaginated",//نتیجه در جدول نمایش داده میشود
   * -      createUrl:  "/Company/Create",      //متد تایید مورد جدید
   * -      deleteUrl:  "/Company/Delete",      //متد حذف ردیف
   * -        editUrl:  "/Company/Update",      //متد تایید ویرایش
   * -         getUrl:  "/Company/GetRow",      //به هنگام بازکردن فرم ویرایش فراخوانی میشود
   * -      detailUrl:  "modal" | "sub",        //در صورت وجود جزئیات، موقعیت نمایش آن را تعیین میکند
   * - }}
   */
  urls: object;
  /**
   * - مرتب سازی پیش فرض جدول
   * - e.g. sortItem = "code.Length, code asc, id"
   */
  sortItem: string;
  /**
   * - تعداد ردیف ها در هر صفحه
   */
  pageSize: int;
  /**
   * - مقادیر پیش فرض جستجو
   * - e.g. initSearchValues={{ personType: 1 }}
   */
  initSearchValues: object;
  /**
   * - مقادیر پیش فرض فرم
   * - e.g. initFormValues={{ personType: 1 }}
   */
  initFormValues: object;
  /**
   * - فرم نمایش داده شده در بالای جدول جهت جستجو
   */
  searchForm;
  /**
   * - (اجباری) فرم نمایش داده به هنگام ویرایش یا ثبت مورد جدید
   * - const form = () => (
   * - <>
   * -    \<Row>
   * -        <Col sm={6}>
   * -            <InputText
   * -                name="name"
   * -                label="نام شرکت"
   * -            />
   * -        </Col>
   * -        ...
   * -    \</Row>
   * - </>
   * - )
   */
  form;
  /**
   * - سایز پنجره ویرایش|ثبت
   * - e.g. modalSize = 'sm' | 'lg' | 'xl';
   */
  modalSize: string;
  /**
   * - کامپوننت جزئیات
   * - e.g. detailForm = {\<CompDetails />}
   */
  detailForm;
  /**
   * - (modal mode) سایز پنجره جزئیات
   * - e.g. detailSize = 'sm' | 'lg' | 'xl';
   */
  detailSize: string;
  /**
   * - عنوان پنجره جزئیات
   * - میتواند ثابت یا ترکیبی از مقادیر ردیف انتخاب شده باشد
   * - e.g. detailTitle = \`${company.name} : \@assemblyTypeDesc - شماره \@assemNo\`
   */
  detailTitle: string;
  /**
   * - تابعی که با زدن دکمه ویرایش فراخوانی میشود
   * @param data داده های ردیف انتخاب شده
   */
  onEditButtonClicked;
  /**
   * - تابعی که با زدن دکمه ثبت مورد جدید فراخوانی میشود
   * @param data مقادیر پیش فرض فرم
   */
  onNewButtonClicked;
}

export default function PopupCrud(props: PopupCrudProps): JSX.Element;
