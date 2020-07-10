import {postRequest} from "./ajax";

const apiurl = "http://192.168.37.1:8080/"

export const login = (data,callback) => {
    const url = apiurl+`login`;
    postRequest(url, data, callback)
};

export const getBooks = (data,callback) => {
    const url = apiurl+`getBooks`;
    postRequest(url, data, callback)
};

export const buyBooks = (data,callback) => {
    const url = apiurl+`saveOneCart`;
    postRequest(url, data, callback)
};

export const getCart = (data,callback) => {
    const url = apiurl+`getCarts`;
    postRequest(url, data, callback)
};

export const emptyCart = (data,callback) => {
    const url = apiurl+`deleteAllMobileOrder`;
    postRequest(url, data, callback)
};

export const getOrder = (data,callback) => {
    const url = apiurl+`getOrders`;
    postRequest(url, data, callback)
};
