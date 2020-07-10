import {postRequest} from "../utils/ajax";

export const login = (data,callback) => {
    const url = `http://localhost:8080/login`;
    postRequest(url, data, callback)
};

export const testOverlap = (data,callback) => {
    const url = `http://localhost:8080/overlap`;
    postRequest(url, data, callback)
};

export const register = (data,callback) => {
    const url = `http://localhost:8080/register`;
    postRequest(url, data, callback)
};

export const getPassengers = (data,callback) => {
    const url = `http://localhost:8080/getPassengers`;
    postRequest(url, data, callback)
};

export const blockOrUnblock = (data,callback) => {
    const url = `http://localhost:8080/blockOrUnblock`;
    postRequest(url, data, callback)
};
