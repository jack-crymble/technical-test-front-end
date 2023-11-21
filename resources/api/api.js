import axios from "axios";

const BASE_URL = "http://localhost/api";

export function getFarms() {
    return axios
        .get(`${BASE_URL}/farms`)
        .then((response) => response.data.data)
        .catch((error) => console.log(error.toJSON()));
}

export function getTurbines() {
    return axios
        .get(`${BASE_URL}/turbines`)
        .then((response) => response.data.data)
        .catch((error) => console.log(error.toJSON()));
}

export function getFarmTurbines(farmID) {
    return axios
        .get(`${BASE_URL}/farms/${farmID}/turbines`)
        .then((response) => response.data.data)
        .catch((error) => console.log(error.toJSON()));
}

export function getComponents() {
    return axios
        .get(`${BASE_URL}/components`)
        .then((response) => response.data.data)
        .catch((error) => console.log(error.toJSON()));
}

export function getInspections() {
    return axios
        .get(`${BASE_URL}/inspections`)
        .then((response) => response.data.data)
        .catch((error) => console.log(error.toJSON()));
}

export function getComponentTypes() {
    return axios
        .get(`${BASE_URL}/component-types`)
        .then((response) => response.data.data)
        .catch((error) => console.log(error.toJSON()));
}

export function getGrades() {
    return axios
        .get(`${BASE_URL}/grades`)
        .then((response) => response.data.data)
        .catch((error) => console.log(error.toJSON()));
}

export function getGradeTypes() {
    return axios
        .get(`${BASE_URL}/grade-types`)
        .then((response) => response.data.data)
        .catch((error) => console.log(error.toJSON()));
}
