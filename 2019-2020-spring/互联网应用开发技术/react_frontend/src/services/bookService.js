import {postRequest} from "../utils/ajax";

export const getBooks = (data,callback) => {
    const url = `http://localhost:8080/getBooks`;
    postRequest(url, data,callback);
};

export const buyBooks = (data,callback) => {
    const url = `http://localhost:8080/saveOneCart`;
    postRequest(url,data,callback);
};

export const getCart = (data,callback) => {
    const url = `http://localhost:8080/getCarts`;
    postRequest(url,data,callback);
};

export const emptyCart = (data,callback) => {
    const url = `http://localhost:8080/saveOrders`;
    postRequest(url,data,callback);
};

export const saveOneCart = (data,callback) => {
    const url = `http://localhost:8080/saveOneCart`;
    postRequest(url,data,callback);
};
export const reduceOneCart = (data,callback) => {
    const url = `http://localhost:8080/reduceOneCart`;
    postRequest(url,data,callback);
};
export const deleteOneCart = (data,callback) => {
    const url = `http://localhost:8080/deleteOneCart`;
    postRequest(url,data,callback);
};

export const getOrder = (data,callback) => {
    const url = `http://localhost:8080/getOrders`;
    postRequest(url,data,callback);
};

export const editBook = (data,callback) => {
    const url = `http://localhost:8080/editBook`;
    postRequest(url,data,callback);
};

export const deleteBook = (data,callback) => {
    const url = `http://localhost:8080/deleteBook`;
    postRequest(url,data,callback);
};

export const editBookIcon = (data,callback) => {
    const url = `http://localhost:8080/editBookIcon`;
    postRequest(url,data,callback);
};

export const getAllOrder = (data,callback) => {
    const url = `http://localhost:8080/getAllOrder`;
    postRequest(url,data,callback);
};

export const getSaleExcel = (data,callback) => {
    const url = `http://localhost:8080/saleExcel`;
    postRequest(url,data,callback);
};

export const getUserExcel = (data,callback) => {
    const url = `http://localhost:8080/userExcel`;
    postRequest(url,data,callback);
};

export const getCustomerExcel = (data,callback) => {
    const url = `http://localhost:8080/customerExcel`;
    postRequest(url,data,callback);
};
