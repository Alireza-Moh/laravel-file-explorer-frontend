import axios from "axios";
import Resource from "axios-resource";
import CSRFException from "@/exceptions/CSRFException.js";
import {useSettingsStore} from "@/stores/settingsStore.js";

class Api {
    constructor() {
        this.http = axios.create({
            withCredentials: true
        });

        this.http.interceptors.request.use(request => {
            const settingsStore = useSettingsStore();
            request.baseURL = settingsStore.baseUrl;

            return request;
        }, error => {
            return Promise.reject(error);
        });
    }

    post(url, data, options = {}, withCsrfToken = true) {
        if(withCsrfToken) {
            return this.fetchCsrfToken().then(response => {
                this.http.defaults.headers.common['X-CSRF-TOKEN'] = response.data.data.csrfToken;

                return this.http.post(url, data, options);
            })
        }
        return this.http.post(url, data, {});
    }

    get(url) {
        return this.http.get(url);
    }

    fetchCsrfToken() {
        return this.http.get('csrf').then(response => {
            return response;
        }).catch(exception => {
            throw new CSRFException('Failed to fetch CSRF token');
        });
    }
}

export default new Api();