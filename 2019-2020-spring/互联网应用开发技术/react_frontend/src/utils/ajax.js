
let postRequest = (url, json, callback) => {

    let formData = new FormData();

    for (let key in json){
        formData.append(key,json[key]);
    }
    let opts = {
        method: "POST",
        body: formData,
    };
    // console.log(json);
    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

export {postRequest};
