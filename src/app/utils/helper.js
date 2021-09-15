import moment from 'moment-jalaali'

export function toPersianDate(date) {
    if (!date || date == '0001-01-01T00:00:00')
        return ''
    var m = moment(date);
    return m.format('jYYYY/jMM/jDD');
}

export function toPersianDateTime(date) {
    if (!date || date == '0001-01-01T00:00:00')
        return ''
    var m = moment(date);
    return m.format('jYYYY/jMM/jDD HH:mm');
}

export function moneyFormat(num){
    if(num == 0) return num;
    if(!num) return ""; //undefined or null
    num = Math.floor(num);
    return (''+num).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
export function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

export function dynamicSort(property, dir) {
    var sortOrder = 1;
    if(dir === "desc") {
        sortOrder = -1;
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }