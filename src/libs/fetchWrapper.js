const fetchWrapper = (task) => {
    return new Promise((resolve, reject) => {
        task
            .then((response) => {
            if (response.ok) {
                response
                    .json()
                    .then((json) => {
                    resolve(json);
                })
                    .catch((error) => {
                    reject(error);
                });
            }
            else {
                reject(response);
            }
        })
            .catch((error) => {
            reject(error);
        });
    });
};
export default fetchWrapper;
//# sourceMappingURL=fetchWrapper.js.map