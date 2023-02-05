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

    // constructor() {
    //     let service = axios.create();
    //     this.service = service;
    // }


    handleError = (error) => {
        this.store.dispatch(loaderActions.hide());
        this.store.dispatch(snackbarActions.error("خطا در اتصال به سرور "));
        console.log(error);
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
                    console.log(error);
                    break;
                default:
                    //this.redirectTo(document, '/500')
                    console.log(error);
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
    postWithUrl(path, payload) {
        const { auth: { authToken } } = this.store.getState();

        return axios.request({
            headers: { Authorization: `Bearer ${authToken}` },
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload
        }).then(response => { return response.data })
            .catch(this.handleError);
    }
    post(path, payload) {
        const authToken  = this.store.getState().auth.authToken;

        path = this.baseUrl + 'api' + path;
        return axios.request({
            headers: { Authorization: `Bearer ${authToken}` },
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload
        }).then(response => { return response.data })
            .catch(this.handleError);
    }
}


export default new BaseService();
