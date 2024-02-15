class Http {
    post(url, options, contentType = true) {
        const requestOptions = this.#getOptions("POST", options, contentType);

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

    postBlob(url, options) {
        return fetch(url, this.#getOptions("POST", options)).then((response) => {
            if (response.status === 404) {
                return response.json();
            }
            else if (response.status === 422) {
                return response.json();
            }
            else {
                return response.blob();
            }
        }).catch((error) => {
            this.#showErrorMessage();
        });
    }

    #getOptions(method, otherOptions, contentType = true) {
        const baseOptions = {
            method: method,
            headers: {
                "Accept": "application/json"
            },
        };

        if (contentType) {
            baseOptions.headers["Content-Type"] = "application/json";
        }

        return Object.assign({}, baseOptions, otherOptions);
    }

    #showErrorMessage() {
        window.showAlert("failed", "Something went wrong. Please try it again");
    }
}

export default new Http();