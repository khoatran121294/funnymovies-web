import axios from "axios";
import qs from "qs";
import _ from "lodash";
import appConfig from "../app-config";
import functionHelpers from "../helpers/functions";
import Session from "../helpers/session";
import { toastr } from "react-redux-toastr";

axios.defaults.baseURL = appConfig.apiBaseUrl;
axios.defaults.timeout = 90000;
axios.defaults.headers["x-access-token"] = Session.getAccessToken();

const http = {
  setupInterceptors: history => {
    axios.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      response => {
        return response;
      },
      e => {
        const error = { ...e };
        const { response } = error;
        if (_.isEmpty(response)) {
          toastr.error("Error", "Network is unvailable");
        } else {
          const statusCode = _.get(response, "status");
          const errorMessage = _.get(response, "data.error");
          // check response status is 401 & 403 then clear access token & redirect to login page.
          if (statusCode === 401 || statusCode === 403) {
            toastr.error("Error", "Unauthorized");
            Session.clearAll();
            setTimeout(() => {
              history.push("/login");
            }, 500);
          }
          // just show message popup if status code is 500, others statuses will be handle in the inner function
          else if (statusCode === 500) {
            toastr.error("Error", errorMessage);
          }
        }
        return Promise.reject(e);
      }
    );
  },
  setAuthorizationHeader(accessToken) {
    axios.defaults.headers["x-access-token"] = accessToken;
  },
  request(config = {}) {
    return axios.request(config);
  },
  get(url, params, config = {}) {
    return axios.get(
      url,
      _.assign({}, config, {
        params,
        paramsSerializer: _params => {
          return qs.stringify(_params, { arrayFormat: "repeat" });
        }
      })
    );
  },
  post(url, data = {}, config = {}) {
    return axios.post(url, data, config);
  },
  put(url, data = {}, config = {}) {
    return axios.put(url, data, config);
  },
  patch(url, data = {}, config = {}) {
    return axios.patch(url, data, config);
  },
  delete(url, config = {}) {
    return axios.delete(url, config);
  },
  upload(url, data = {}) {
    return axios.post(url, functionHelpers.jsonToFormData(data), {
      "Content-Type": "multipart/form-data; charset=utf-8;"
    });
  },
  download(url, params, config = {}) {
    config.responseType = "blob";
    return axios.get(
      url,
      _.assign({}, config, {
        params,
        paramsSerializer: _params => {
          return qs.stringify(_params, { arrayFormat: "repeat" });
        }
      })
    );
  }
};

export default http;
