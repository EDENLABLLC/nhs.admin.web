import { handleActions, combineActions } from "redux-actions";
import { MOCK_API_URL, API_URL } from "config";
import { normalize } from "normalizr";
import { createUrl } from "helpers/url";
import { contract } from "schemas";
import { invoke } from "./api";

export const fetchContracts = options =>
  invoke({
    endpoint: createUrl(`${API_URL}/api/contracts`, options),
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "contracts/FETCH_LIST_REQUEST",
      {
        type: "contracts/FETCH_LIST_SUCCESS",
        payload: (action, state, res) =>
          res
            .clone()
            .json()
            .then(json => normalize(json.data, [contract])),
        meta: (action, state, res) =>
          res
            .clone()
            .json()
            .then(json => json.paging || { cursors: {} })
      },
      "contracts/FETCH_LIST_FAILURE"
    ]
  });

export const fetchContractRequests = options =>
  invoke({
    endpoint: createUrl(`${API_URL}/api/contract_requests`, options),
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "contracts/FETCH_LIST_REQUEST",
      {
        type: "contracts/FETCH_LIST_SUCCESS",
        payload: (action, state, res) =>
          res
            .clone()
            .json()
            .then(json => normalize(json.data, [contract])),
        meta: (action, state, res) =>
          res
            .clone()
            .json()
            .then(json => json.paging || { cursors: {} })
      },
      "contractsRequests/FETCH_LIST_FAILURE"
    ]
  });

export const fetchContractRequest = id =>
  invoke({
    endpoint: createUrl(`${API_URL}/api/contract_requests/${id}`),
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "contracts/FETCH_DETAILS_REQUEST",
      {
        type: "contracts/FETCH_DETAILS_SUCCESS",
        payload: (action, state, res) =>
          res.json().then(json => normalize(json.data, contract))
      },
      "contractsRequests/FETCH_DETAILS_FAILURE"
    ]
  });

export const fetchContract = id =>
  invoke({
    endpoint: createUrl(`${API_URL}/api/contracts/${id}`),
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "contracts/FETCH_DETAILS_REQUEST",
      {
        type: "contracts/FETCH_DETAILS_SUCCESS",
        payload: (action, state, res) =>
          res.json().then(json => normalize(json.data, contract))
      },
      "contracts/FETCH_DETAILS_FAILURE"
    ]
  });

export const getContractPrintoutContent = id =>
  invoke({
    endpoint: createUrl(
      `${API_URL}/api/contract_requests/${id}/printout_content/`
    ),
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "contracts/FETCH_DETAILS_REQUEST",
      {
        type: "contracts/FETCH_DETAILS_SUCCESS",
        payload: (action, state, res) =>
          res.json().then(json => normalize(json.data, contract))
      },
      "contracts/FETCH_DETAILS_FAILURE"
    ]
  });

export const updateContract = (id, body) =>
  invoke({
    endpoint: createUrl(`${API_URL}/api/contract_requests/${id}`),
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "contracts/UPDATE_CONTRACT_REQUEST",
      "contracts/UPDATE_CONTRACT_SUCCESS",
      {
        type: "contracts/UPDATE_CONTRACT_FAILURE",
        payload: (action, state, res) => res.json().then(json => json.error)
      }
    ],
    body
  });

export const declineContract = (id, body) =>
  invoke({
    endpoint: createUrl(
      `${API_URL}/api/contract_requests/${id}/actions/decline`
    ),
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "contracts/DECLINE_CONTRACT_REQUEST",
      "contracts/DECLINE_CONTRACT_SUCCESS",
      {
        type: "contracts/DECLINE_CONTRACT_FAILURE",
        payload: (action, state, res) => res.json().then(json => json.error)
      }
    ],
    body
  });

export const approveContract = (id, body) =>
  invoke({
    endpoint: createUrl(
      `${API_URL}/api/contract_requests/${id}/actions/approve`
    ),
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "contracts/APPROVE_CONTRACT_REQUEST",
      "contracts/APPROVE_CONTRACT_SUCCESS",
      {
        type: "contracts/APPROVE_CONTRACT_FAILURE",
        payload: (action, state, res) => res.json().then(json => json.error)
      }
    ],
    body
  });

export const signNhs = (id, body) =>
  invoke({
    endpoint: createUrl(
      `${API_URL}/api/contract_requests/${id}/actions/sign_nhs`
    ),
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "contracts/SIGN_NHS_CONTRACT_REQUEST",
      "contracts/SIGN_NHS_CONTRACT_SUCCESS",
      {
        type: "contracts/SIGN_NHS_CONTRACT_FAILURE",
        payload: (action, state, res) => res.json().then(json => json.error)
      }
    ],
    body
  });

export const fetchContractEmployees = options =>
  invoke({
    endpoint: createUrl(`${API_URL}/api/employees`, options),
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "contracts/CONTRACT_EMPLOYEES_REQUEST",
      "contracts/CONTRACT_EMPLOYEES_SUCCESS",
      {
        type: "contracts/CONTRACT_EMPLOYEES_FAILURE",
        payload: (action, state, res) => res.json().then(json => json.error)
      }
    ]
  });

export default handleActions(
  {
    [combineActions(
      "contracts/FETCH_LIST_SUCCESS",
      "contracts/CREATE_SUCCESS",
      "contracts/UPDATE_SUCCESS"
    )]: (state, action) => ({
      ...state,
      ...action.payload.entities.contracts,
      ...action.meta
    }),
    "contracts/FETCH_DETAILS_SUCCESS": (state, action) => ({
      ...state,
      [action.payload.result]: {
        ...state[action.payload.result],
        ...action.payload.entities.contracts[action.payload.result],
        ...action.meta
      }
    }),
    "contracts/FETCH_DETAILS_SUCCESS": (state, action) => ({
      ...state,
      [action.payload.result]: {
        ...state[action.payload.result],
        ...action.payload.entities.contracts[action.payload.result],
        ...action.meta
      }
    })
  },
  {}
);