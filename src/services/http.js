class Http {
    post(url, options) {
        return fetch(url, this.#getOptions("POST", options)).then((response) => {
            return response.json();
        }).catch((error) => {
            window.showAlert("failed", "Something went wrong. Please try it again");
        });
    }

    get(url, options) {
        return fetch(url, this.#getOptions("GET", options)).then((response) => {
            return response.json();
        }).catch((error) => {
            window.showAlert("failed", "Something went wrong. Please try it again");
        });
    }

    put(url, options) {
        return fetch(url, this.#getOptions("PUT", options)).then((response) => {
            return response.json();
        }).catch((error) => {
            window.showAlert("failed", "Something went wrong. Please try it again");
        });
    }

    delete(url, options) {
        return fetch(url, this.#getOptions("DELETE", options)).then((response) => {
            return response.json();
        }).catch((error) => {
            window.showAlert("failed", "Something went wrong. Please try it again");
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
}

export default new Http();