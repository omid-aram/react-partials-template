/**
* PopupCrud.d.ts - 1402/02/06
*/

export interface PopupCrudProps {
  
  /**
   * نوع نمایش کامپوننت: grid | form
   */
   type?: 'grid' | 'form';
   
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
     -
     -      align: string,        
     -      hidden: boolean,      //نمایش یا عدم نمایش ستون
     -      width: number,        //عرض ستون را تعیین میکند
     -      style: object,        //e.g. {color: 'green', fontWeight: 'bold'}
     -      headerStyle: object,
     -
     -      comma1000: boolean,   //جداسازی 3 رقمی اعداد
     -      slashDate: boolean,   //نمایش عدد به صورت تاریخ
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
   * -       excelUrl:  "/Company/ExcelExport", //متد خروجی اکسل
   * -      deleteUrl:  "/Company/Delete",      //متد حذف ردیف
   * -        editUrl:  "/Company/Update",      //متد تایید ویرایش
   * -         getUrl:  "/Company/GetRow",      //به هنگام بازکردن فرم ویرایش فراخوانی میشود
   * - }}
   * -
   * - back-end API : نمونه کد خروجی اکسل  
   * -  [HttpPost]
   * -  public FileResult ExcelExport(dynamic excelParams)
   * -  {
   * -      var filter = JsonConvert.DeserializeObject<CompanySearch>((string)excelParams.filter);
   * -      var columns = JsonConvert.DeserializeObject<List<ExcelColumn>>((string)excelParams.columns);
   * -      var fileName = (string)excelParams.fileName;
   * -  
   * -      var data = _companyBiz.GetPaginated(filter).Items;
   * -      var fileContent = data.ToExcel(columns, fileName);
   * -      return File(fileContent, "multipart/form-data");
   * -  }
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
  pageSize: number;

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
   * - (اجباری) فرم نمایش داده شده به هنگام ویرایش یا ثبت مورد جدید
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
   * - با هر مقداری دکمه جزئیات نمایش داده میشود
   * - مقادیر قابل قبول: 'modal' | 'sub' | 'sub-auto'
   */
  detailType?: 'modal' | 'sub';

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
   * - e.g. detailTitle = \`${company.name} : @assemblyTypeDesc - شماره @assemNo\`
   */
  detailTitle: string;

  /**
   * - تابعی که پیش از باز شدن پنجره ویرایش فراخوانی میشود
   * @param data داده های ردیف انتخاب شده
   */
  onEditButtonClicked;

  /**
   * - تابعی که پیش از باز شدن پنجره ثبت مورد جدید فراخوانی میشود
   * @param data مقادیر پیش فرض فرم
   */
  onNewButtonClicked;

  /**
   * - میتوانید در صورت نیاز، جدول را مجدداً بارگذاری کنید
   * -
   * - const [trigger, setTrigger] = useState(false);
   * -
   * - const companyChanged = (val) => {
   * -        setCompany({ id: val });
   * -        setTrigger(true);
   * - }
   * -
   * - ...
   * - \<PopupCurd
   * -        columns={columns}
   * -        pageSize={10}
   * -        initSearchValues={{ companyId: company.id }}
   * -        ...
   * -        trigger={trigger}
   * -        setTrigger={setTrigger}
   * - />
   * -
   * - ⚠️ No need to setTrigger(false); It happens inside the component after reloading the grid.
   */
  trigger;

  /**
   * - میتوانید در صورت نیاز، جدول را مجدداً بارگذاری کنید
   * -
   * - const [trigger, setTrigger] = useState(false);
   * -
   * - const companyChanged = (val) => {
   * -        setCompany({ id: val });
   * -        setTrigger(true);
   * - }
   * -
   * - ...
   * - \<PopupCurd
   * -        columns={columns}
   * -        pageSize={10}
   * -        initSearchValues={{ companyId: company.id }}
   * -        ...
   * -        trigger={trigger}
   * -        setTrigger={setTrigger}
   * - />
   * -
   * - ⚠️ No need to setTrigger(false); It happens inside the component after reloading the grid.
   */
  setTrigger;

  /**
   * - در صورتیکه در فرم ثبت، بارگذاری فایل وجود داشته باشد، از این مشخصه استفاده کنید  
   * - 
   * - جهت نمایش فایلی که از قبل ذخیره شده باید نام فایل رو در مشخصه مربوط به فایل قرار دهیم
   * -
   * - اجباری است [FromForm] در متد سمت سرور استفاده از 
   * -
   * - نمونه API:
   * -         [HttpPost]
   * -         public async Task<IActionResult> Update([FromForm] CompDocumentDTO dto)
   * -         {
   * -             if (string.IsNullOrEmpty(dto.DocFile))
   * -             {
   * -                 //در صورت خالی بودن نام فایل، سه حالت داره
   * -                 //1. از قبل فایل نداشته و کاربر هم چیزی انتخاب نکرده
   * -                 //2. از قبل فایل داشته و کاربر حذف کرده
   * -                 //3. کاربر فایل جدیدی انتخاب کرده
   * -
   * -                 //پس اول چک میکنیم که فایل جدیدی انتخاب کرده یا نه
   * -                 var file = Request.Form.Files.GetFile("docFile");
   * -                 if (file != null)
   * -                 {
   * -                     //حالت سوم
   * -                     var bytes = await GetBytes(file);
   * -                     ...
   * -                 }
   * -                 else
   * -                 {
   * -                     //حالت اول یا دوم
   * -                     //باید چک کنیم اگر فایل داشته حذف کنیم
   * -                     ...
   * -                 }
   * -             }
   * -             else
   * -             {
   * -                 //یعنی کاربر فایل رو تغییر نداده
   * -                 ...
   * -             }
   * -             ...
   * -         }
   * -
   * -         private async Task<byte[]> GetBytes(IFormFile formFile)
   * -         {
   * -             await using var memoryStream = new MemoryStream();
   * -             await formFile.CopyToAsync(memoryStream);
   * -             return memoryStream.ToArray();
   * -         }
   * -
   * - ⚠️ فایل های بزرگتر از 30 مگابایت خطا میدهند
   */
  hasFileUpload: boolean;

  /**
   * - topButtons={[
   * -              { type: "excel", text: "خروجی اکسل" },
   * -              { type: "create", text: "افزودن شرکت" },
   * -            ]}
   */
  topButtons: Array;

  /**
   * - rowButtons={[
   * -              { type: "custom", tooltip: "نمایش شناسه", icon: "fa fa-bell", className0: "btn-secondary", style: { fontSize: "1.4rem", color: "rgba(0, 0, 0, 0.54)", padding: "0px 0.8rem" }, onClick: actionClickTest },
   * -              { type: "detail", tooltip: "جزئیات شرکت", text: "جزئیات", icon: "fa fa-list-alt", className: "btn-outline-dark", disabledIf: ["id > 0 && id == [12432, 12446] && st != null", "id == 0 && st == [1, 4]"] },
   * -              { type: "edit", tooltip: "ویرایش اطلاعات شرکت", className: "btn-outline-success", firstColumn: true, hidden: false, hiddenIf: ["registerNo == 89219"] },
   * -              { type: "delete", tooltip: "حذف شرکت", text0: "حذف", icon: "fa fa-trash", className: "btn-outline-danger" },
   * -            ]}
   */
   rowButtons: Array;

  /**
   * - formButtons={[
   * -               { type: "custom", text: "تایید کارتابل", icon: "far fa-check-circle", className: "btn-success", hiddenIf: ["id == 0"], onClick: confirmClick },
   * -               { type: "custom", text: "عدم تایید کارتابل", icon: "fa fa-times", className: "btn-danger", hiddenIf: "id == 0", disabledIf: ["code == 100"] },
   * -               { type: "save", text: "ثبت", icon: "fa fa-check", className: "btn-primary", hiddenIf: "registerNo <= 171318" },
   * -               { type: "dismiss", text: "انصراف", icon: "fa fa-times", className: "btn-outline-secondary" },
   * -             ]}
   * -
   * -
   * -    const confirmClick = (item, actions) => {
   * -        actions.showLoading();
   * -        const api = baseService.post("/Company/Update", item);
   * -
   * -        api.then((result) => {
   * -            if (result.succeed) {
   * -                actions.closeModal();
   * -                actions.showMessage("با موفقیت ثبت شد");
   * -                actions.refreshGrid();
   * -            } else {
   * -                actions.showError(result.errorMessage);
   * -            }
   * -            actions.hideLoading();
   * -        })
   * -    }
   */
   formButtons: Array;

   /**
    * - [Form Mode]
    * - const [isEditingForm, setIsEditingForm] = useState(false);
    * - 
    * - Use this state to make input components readOnly, 
    * - and send 'setIsEditingForm' to PopupCrud
    */
   setIsEditingForm?: Boolean;

   /**
    * در صورت تنظیم شدن، یک چک باکس در هر ردیف نمایش داده میشود و آن را قابل انتخاب میکند
    */
   selectable?: Boolean;
   
  /**
   * - تابعی که در صورت انتخاب ردیف ها فراخوانی میشود
   * @param selectedItems
   */
   onSelectChange;
}

/**
 * - این کامپوننت چهار عمل اصلی فرم را تسهیل میکند
 * - شامل یک جدول جهت نمایش داده ها و یک فرم جهت ثبت یا ویرایش اطلاعات
 * - 
 * - پارامترهای مهم :
 * - - title
 * - - columns
 * - - urls
 * - - form
 */
export default function PopupCrud(props: PopupCrudProps);//: JSX.Element;
