/**
* base.service.js - 1401/12/02
*/

import axios from 'axios';
import { actionTypes } from '../store/ducks/auth.duck';
import { loaderActions } from '../store/ducks/loader.duck';
import { snackbarActions } from '../store/ducks/snackbar.duck';

class BaseService {

    baseUrl = 'https://localhost:44336/';
    store = null; // may came from parent project

    // baseUrl = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? // dev code
    //     this._baseUrllocal : this._baseUrlserver

    // constructor() {
    //     let service = axios.create();
    //     this.service = service;
    // }

    init = (store, url) => {
        if (url)
            this.baseUrl = url;
        if (store)
            this.store = store;
    }

    baseFileUrl = this.baseUrl + 'api/file/getFile/';

    baseApiUrl = () => {
        return this.baseUrl + 'api';
    }
    // constructor() {
    //     let service = axios.create();
    //     this.service = service;
    // }


    handleError = (error) => {
        this.store.dispatch(loaderActions.hide());
        if (error.response.data) {
            this.store.dispatch(snackbarActions.error(error.response.data.Message));
        } else {
            this.store.dispatch(snackbarActions.error("خطا در اتصال به سرور "));
        }
        //console.log(error);
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    this.store.dispatch(snackbarActions.error("لطفا مجدد وارد شوید"));
                    this.store.dispatch(actionTypes.logout());
                    break;
                case 403:
                    this.store.dispatch(snackbarActions.error("دسترسی ندارید"));
                    break;
                case 404:
                    //console.log(error);
                    break;
                default:
                    //this.redirectTo(document, '/500')
                    //console.log(error);
                    break;
            }
        }

        return Promise.reject(error.response || error.message);
    }

    redirectTo = (document, path) => {
        document.location = path
    }

    // get(path, callback) {
    //     return this.service.get(path).then(
    //         (response) => callback(response.status, response.data)
    //     );
    // }

    postFile(formData, progressHandler) {
        return axios.request({
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            url: this.baseUrl + 'api/file/upload',
            responseType: 'json',
            data: formData,
            onUploadProgress: progressHandler
        }).then(response => { return response.data })
            .catch(this.handleError);
    }
    postWithUrl(url, payload) {
        const { auth: { authToken } } = this.store.getState();

        return axios.request({
            headers: { Authorization: `Bearer ${authToken}` },
            method: 'POST',
            url: url,
            responseType: 'json',
            data: payload
        }).then(response => { return response.data })
            .catch(this.handleError);
    }

    post(path, payload, progressHandler) {
        const authToken = this.store.getState().auth.authToken;

        path = this.baseUrl + 'api' + path;
        return axios.request({
            headers: { Authorization: `Bearer ${authToken}` },
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload,
            onUploadProgress: progressHandler
        }).then(response => { return response.data })
            .catch(this.handleError);
    }

    /**
     * در صورتیکه بارگذاری فایل دارید باید از این روش استفاده شود
     */
    postFormData(path, payload, progressHandler) {
        const authToken = this.store.getState().auth.authToken;

        const formData = new FormData();
        this.buildFormData(formData, payload);

        path = this.baseUrl + 'api' + path;
        return axios.request({
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'multipart/form-data',
            },
            method: 'POST',
            url: path,
            responseType: 'json',
            data: formData,
            onUploadProgress: progressHandler
        }).then(response => { return response.data })
            .catch(this.handleError);
    }

    buildFormData(formData, data, parentKey) {
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
            Object.keys(data).forEach(key => {
                this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
        } else {
            const value = data == null ? '' : data;

            formData.append(parentKey, value);
        }
    }

    downloadFile(path, payload, fileName) {
        const authToken = this.store.getState().auth.authToken;

        return axios({
            headers: { Authorization: `Bearer ${authToken}` },
            method: 'POST',
            url: this.baseUrl + 'api' + path,
            data: payload,
            responseType: 'blob', // important
        }).then((response) => {
            // create file link in browser's memory
            const href = URL.createObjectURL(response.data);

            // create "a" HTML element with href to file & click
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', fileName); //or any other extension
            document.body.appendChild(link);
            link.click();

            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        });
    }

}


export default new BaseService();
