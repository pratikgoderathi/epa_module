import EPA from '../src/container/EPA';
import axios from "axios";
let base_url = 'https://6u7wdz8p7b.execute-api.ap-south-1.amazonaws.com/dev';
let apiKey = 'NDPzU7IWUV6aDzwBqW4G86I9wIBav9qU7yJlYhYn';
export const uploadClientFilesApi = `${base_url}/file-upload`;
export const getUploadedClientFilesApi = `${base_url}/files?`;
export const getDownloadUrlApi = `${base_url}/files/download?`;
export const uploadFilesApiKey = apiKey;
export const uploadClientFiles = data => {
  return axios.post(uploadClientFilesApi, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-api-key": uploadFilesApiKey
    }
  });
};
export const getUploadedClientFiles = ({
  rm_id,
  offset,
  limit = 10,
  status,
  search
}) => {
  let url = getUploadedClientFilesApi + `rm_id=${rm_id}&limit=${limit}&offset=${offset}`;

  if (search) {
    url += `&file_name=${search}`;
  }

  if (status) {
    url += `&status=${status}`;
  }

  return axios.get(url, {
    headers: {
      "x-api-key": uploadFilesApiKey
    }
  });
};
export const getDownloadUrl = data => {
  return axios.post(getDownloadUrlApi, data, {
    headers: {
      "x-api-key": uploadFilesApiKey
    }
  });
};
export function postAudit(data) {
  return axios.post('http://google.co.in/', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

function App() {
  return /*#__PURE__*/React.createElement("div", {
    className: "App"
  }, /*#__PURE__*/React.createElement(EPA, {
    employee_id: 937589,
    getUploadedClientFiles: getUploadedClientFiles,
    getDownloadUrl: getDownloadUrl,
    uploadClientFiles: uploadClientFiles,
    postAudit: postAudit,
    ipAddress: true
  }));
}

export default App;