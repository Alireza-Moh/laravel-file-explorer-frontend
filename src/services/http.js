class Http {
    post(url, options, newHeaders = {}) {
        const requestOptions = this.#getOptions("POST", options);

        if (Object.keys(newHeaders).length > 1) {
            requestOptions.headers = newHeaders;
        }

        return fetch(url, requestOptions).then((response) => {
            return response.json();
        }).catch((error) => {
            this.#showErrorMessage();
        });
    }

    get(url, options) {
        return fetch(url, this.#getOptions("GET", options)).then((response) => {
            return response.json();
        }).catch((error) => {
            this.#showErrorMessage();
        });
    }

    put(url, options) {
        return fetch(url, this.#getOptions("PUT", options)).then((response) => {
            return response.json();
        }).catch((error) => {
            this.#showErrorMessage();
        });
    }

    delete(url, options) {
        return fetch(url, this.#getOptions("DELETE", options)).then((response) => {
            return response.json();
        }).catch((error) => {
            this.#showErrorMessage();
        });
    }

    #getOptions(method, otherOptions) {
        const baseOptions = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        };

        return Object.assign({}, baseOptions, otherOptions);
    }

    #showErrorMessage() {
        window.showAlert("failed", "Something went wrong. Please try it again");
    }
}

export default new Http();