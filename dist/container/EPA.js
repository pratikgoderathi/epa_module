import React, { useState, useEffect } from 'react'; //Styles

import "../styles/components/epa.scss"; //Component 

import UploadMultiFiles from "../component/UploadMultiFiles";
import UploadedFilesCard from "../component/UploadedFilesCard";
import Form from "../component/form/Form";
import Input from "../component/form/Input";
import DropDown from '../component/DropDown';
import Loader from '../component/Loader';
import { Snackbar, Select, MenuItem, InputLabel, Collapse } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import RefreshIcon from '@material-ui/icons/Refresh';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import SearchIcon from '@material-ui/icons/Search';

const moment = require('moment');

const filterStatusNames = [{
  name: "All",
  value: "all"
}, {
  name: "Processing",
  value: "processing"
}, {
  name: "Failed",
  value: "failed"
}, {
  name: "Success",
  value: "success"
}];
const CustomSelect = withStyles({
  select: {
    fontSize: "14px",
    padding: 5,
    width: "100px"
  }
})(Select);
const CustomMenuItem = withStyles({
  root: {
    fontSize: "12px",
    padding: "10px",
    //overriding default css
    minHeight: "0px"
  }
})(MenuItem);

const PasswordComponent = props => {
  const {
    password
  } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordIcon = () => {
    setPasswordVisible(!passwordVisible);
  };

  const displayPassword = () => {
    if (!Boolean(password) || passwordVisible) {
      return password;
    }

    return "*****";
  };

  return /*#__PURE__*/React.createElement("div", {
    className: 'password_txt_container justify_center'
  }, /*#__PURE__*/React.createElement("h3", null, displayPassword()), "\xA0", passwordVisible ? /*#__PURE__*/React.createElement(VisibilityOffIcon, {
    fontSize: 'small',
    onClick: togglePasswordIcon
  }) : /*#__PURE__*/React.createElement(VisibilityIcon, {
    fontSize: 'small',
    onClick: togglePasswordIcon
  }));
};

const UploadedFilesTable = props => {
  const {
    data = [],
    fetchUploadedClientFiles,
    onClickLink = () => {},
    updateFilterVisibility,
    filterEnabled,
    searchStatus,
    setSearchStatus,
    searchText,
    setSearchText,
    onClickRefresh
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: "table_container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "table_title_container"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "table_title"
  }, "UPLOADED FILES"), /*#__PURE__*/React.createElement("div", {
    className: "filter_opt_container cursor_pointer"
  }, /*#__PURE__*/React.createElement(SearchIcon, {
    style: {
      color: 'white',
      marginRight: 5
    },
    onClick: updateFilterVisibility
  }), /*#__PURE__*/React.createElement(RefreshIcon, {
    onClick: onClickRefresh,
    className: "refresh_icon_web"
  }))), /*#__PURE__*/React.createElement(Collapse, {
    in: filterEnabled
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter_container"
  }, /*#__PURE__*/React.createElement(Form.FormItem, {
    className: "form_input_container search_input_container"
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Search file name",
    type: "text",
    onChange: setSearchText,
    value: searchText
  }), /*#__PURE__*/React.createElement("div", {
    className: "right-icon"
  }, /*#__PURE__*/React.createElement(SearchIcon, {
    fontSize: "small"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex_row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InputLabel, {
    shrink: true,
    className: "material-label"
  }, "Status"), /*#__PURE__*/React.createElement(CustomSelect, {
    value: searchStatus,
    onChange: setSearchStatus
  }, filterStatusNames.map((item, index) => {
    return /*#__PURE__*/React.createElement(CustomMenuItem, {
      key: index,
      value: item.value
    }, item.name);
  }))), /*#__PURE__*/React.createElement("h1", {
    className: "reset_filter_txt",
    onClick: onClickRefresh
  }, "Reset filter")))), /*#__PURE__*/React.createElement("div", {
    className: "padding-5px"
  }, /*#__PURE__*/React.createElement("table", {
    className: "width_100"
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "table_header_col"
  }, "Date & Time"), /*#__PURE__*/React.createElement("th", {
    className: "table_header_col"
  }, "File Name"), /*#__PURE__*/React.createElement("th", {
    className: "table_header_col text_align_center"
  }, "Status"), /*#__PURE__*/React.createElement("th", {
    className: "table_header_col text_align_center"
  }, "File Password"), /*#__PURE__*/React.createElement("th", {
    className: "table_header_col text_align_center"
  }, "Download")), data.map((row, index) => {
    const dateTime = row.created_timestamp || "-";
    const fileName = row.input_file_original_name || "-";
    const pdfFile = row.upload_key;
    const excelFile = row.response_key;
    const status = row.request_status || "processing";
    const password = row.password;

    const handlClickExcelFile = () => {
      if (excelFile) {
        onClickLink({
          "file_key": excelFile
        });
        return;
      }
    };

    const handleClickPdfFile = () => {
      if (pdfFile) {
        onClickLink({
          "file_key": pdfFile
        });
        return;
      }
    };

    return /*#__PURE__*/React.createElement("tr", {
      key: 'key_' + index,
      className: 'table_row'
    }, /*#__PURE__*/React.createElement("td", {
      className: "table_row_col"
    }, dateTime !== "-" ? moment(dateTime).fromNow() : "-"), /*#__PURE__*/React.createElement("td", {
      className: "table_row_col file_name_txt_table"
    }, fileName), /*#__PURE__*/React.createElement("td", {
      className: "table_row_col text_align_center"
    }, status), /*#__PURE__*/React.createElement("td", {
      className: "table_row_col text_align_center"
    }, Boolean(password) && /*#__PURE__*/React.createElement(PasswordComponent, {
      password: password
    })), /*#__PURE__*/React.createElement("td", {
      className: "table_row_col text_align_center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "download_links justify_center"
    }, Boolean(excelFile) ? /*#__PURE__*/React.createElement("h3", {
      className: "txt_value excel_link",
      onClick: handlClickExcelFile
    }, pdfFile ? "Output file" : "Consolidated holdings") : /*#__PURE__*/React.createElement("div", null), Boolean(excelFile) && Boolean(pdfFile) ? /*#__PURE__*/React.createElement(React.Fragment, null, "\xA0", /*#__PURE__*/React.createElement("h4", {
      style: {
        fontSize: 12
      }
    }, "OR"), "\xA0") : /*#__PURE__*/React.createElement("div", null), Boolean(pdfFile) ? /*#__PURE__*/React.createElement("h3", {
      className: "txt_value pdf_link",
      onClick: handleClickPdfFile
    }, "Uploaded file") : /*#__PURE__*/React.createElement("div", null))));
  })))), data.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "load_more_container"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "load_more_txt",
    onClick: () => fetchUploadedClientFiles()
  }, "Load more")) : /*#__PURE__*/React.createElement("div", null));
};

const UploadFiles = props => {
  const {
    employee_id,
    getUploadedClientFiles,
    getDownloadUrl,
    uploadClientFiles,
    postAudit,
    ipAddress
  } = props;
  const [isLoading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [success_message, setSuccessMsg] = useState('');
  const [error_message, setErrorMsg] = useState('');
  const [offset, setOffset] = useState(0);
  const isMobileDevice = useMediaQuery("(max-width:600px)");
  const [filterEnabled, enableFilter] = useState(false);
  const [searchParams, setSearchParams] = useState({
    searchText: "",
    searchStatus: "all"
  });
  useEffect(() => {
    fetchUploadedClientFiles(); // eslint-disable-next-line
  }, [Boolean(employee_id)]);
  useEffect(() => {
    let {
      searchText,
      searchStatus
    } = searchParams;

    if (searchText.length > 2 || searchStatus !== "all" || !Boolean(searchText)) {
      fetchUploadedClientFiles(true);
    } // eslint-disable-next-line

  }, [searchParams.searchStatus, searchParams.searchText]);

  const updateFilterVisibility = () => {
    enableFilter(!filterEnabled);
  };

  const fetchUploadedClientFiles = (refresh = false) => {
    if (Boolean(employee_id)) {
      const rm_id = employee_id;
      let {
        searchText,
        searchStatus
      } = searchParams;
      setLoading(true);
      let params = {
        rm_id,
        offset
      }; // reset offset to zero if refresh 

      if (refresh) {
        params.offset = 0;
      }

      if (searchText.length > 2) {
        params.search = searchText;
      }

      if (searchStatus !== "all") {
        params.status = searchStatus;
      }

      getUploadedClientFiles(params).then(res => {
        if (res.status === 200) {
          const {
            data
          } = res.data; // if refresh then load latest files

          if (refresh && Array.isArray(data)) {
            setLoading(false);
            setUploadedFiles(data);
            return;
          } // load files offset wise


          if (Array.isArray(data) && data.length > 0) {
            //get previous files
            let newData = uploadedFiles.slice();
            newData = newData.concat(data); //set updated data

            setUploadedFiles(newData);
            setOffset(newData.length);
          }

          if (Array.isArray(data) && data.length === 0 && uploadedFiles.length > 0) {
            setSuccessMsg("All files are loaded");
          }
        }

        setLoading(false);
      }).catch(err => {
        console.log("err", err);
        setLoading(false);
      });
    }
  };

  const downloadFile = data => {
    setLoading(true);
    getDownloadUrl(data).then(res => {
      if (res.status === 200) {
        const {
          data = {}
        } = res.data;
        const {
          url
        } = data;
        window.open(url);
      }

      setLoading(false);
    }).catch(err => {
      setLoading(false);
      console.log("err", err);
    });
  };

  const handleOnClickFormatFile = () => {
    let url = `https://docs.google.com/spreadsheets/d/13gumOsFhk2MeHKhlVEEFy5xnug7aw2Seu5bueLiTwmw/edit?usp=sharing`;
    window.open(url);
  };

  const handleSelectStatus = e => {
    let {
      value
    } = e.target;
    setSearchParams({ ...searchParams,
      searchStatus: value
    });
  };

  const handleSearchTxtChanged = (e, val) => {
    let {
      value
    } = e.target;
    setSearchParams({ ...searchParams,
      searchText: value
    });
  };

  const resetSearchData = () => {
    setSearchParams({
      searchText: "",
      searchStatus: 'all'
    }); //if status and text is not updated then

    let {
      searchText,
      searchStatus
    } = searchParams;

    if (searchText === "" && searchStatus === "all") {
      fetchUploadedClientFiles(true);
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Snackbar, {
    open: Boolean(error_message),
    autoHideDuration: 3000,
    onClose: () => setErrorMsg("")
  }, /*#__PURE__*/React.createElement(Alert, {
    elevation: 6,
    variant: "filled",
    onClose: () => {},
    severity: "error"
  }, error_message)), /*#__PURE__*/React.createElement(Snackbar, {
    open: Boolean(success_message),
    autoHideDuration: 3000,
    onClose: () => setSuccessMsg("")
  }, /*#__PURE__*/React.createElement(Alert, {
    elevation: 6,
    variant: "filled",
    onClose: () => {},
    severity: "success"
  }, success_message)), isLoading && /*#__PURE__*/React.createElement(Loader, null), /*#__PURE__*/React.createElement("div", {
    className: "action_container"
  }, /*#__PURE__*/React.createElement(CloudDownloadIcon, {
    className: "margin_horizontal_5 cursor_pointer",
    onClick: handleOnClickFormatFile,
    fontSize: 'small'
  }), /*#__PURE__*/React.createElement("h5", {
    className: "margin_horizontal_5 cursor_pointer font_size_14",
    onClick: handleOnClickFormatFile
  }, "Supported file formats")), /*#__PURE__*/React.createElement("div", {
    className: 'margin-bottom-15px'
  }, /*#__PURE__*/React.createElement(UploadMultiFiles //API calls
  , {
    uploadClientFiles: uploadClientFiles,
    postAudit: postAudit,
    employee_id: employee_id,
    ipAddress: ipAddress,
    isUploading: bool => setLoading(bool),
    setSuccessMsg: msg => setSuccessMsg(msg),
    setErrorMsg: msg => setErrorMsg(msg)
  })), isMobileDevice ? /*#__PURE__*/React.createElement(DropDown, {
    title: "UPLOADED FILES",
    open: true,
    headerChild: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SearchIcon, {
      className: 'filter_icon',
      onClick: e => {
        e.stopPropagation();
        updateFilterVisibility();
      }
    }), /*#__PURE__*/React.createElement(RefreshIcon, {
      className: 'refresh_icon',
      onClick: e => {
        e.stopPropagation();
        resetSearchData();
      }
    }))
  }, /*#__PURE__*/React.createElement(Collapse, {
    in: filterEnabled
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter_container"
  }, /*#__PURE__*/React.createElement(Form.FormItem, {
    className: "form_input_container search_input_container"
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Search file name",
    type: "text",
    onChange: handleSearchTxtChanged,
    value: searchParams.searchText
  }), /*#__PURE__*/React.createElement("div", {
    className: "right-icon"
  }, /*#__PURE__*/React.createElement(SearchIcon, {
    fontSize: "small"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex_row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InputLabel, {
    shrink: true,
    className: "material-label"
  }, "Status"), /*#__PURE__*/React.createElement(CustomSelect, {
    value: searchParams.searchStatus,
    onChange: handleSelectStatus
  }, filterStatusNames.map((item, index) => {
    return /*#__PURE__*/React.createElement(CustomMenuItem, {
      key: index,
      value: item.value
    }, item.name);
  }))), /*#__PURE__*/React.createElement("h1", {
    className: "reset_filter_txt",
    onClick: resetSearchData
  }, "Reset filter")))), uploadedFiles.map((file, index) => {
    return /*#__PURE__*/React.createElement(UploadedFilesCard, {
      key: index,
      fileName: file.input_file_original_name,
      createdAt: file.created_timestamp,
      excelFile: file.response_key,
      pdfFile: file.upload_key,
      status: file.request_status,
      onClickLink: downloadFile,
      setSuccessMsg: msg => setSuccessMsg(msg),
      setErrorMsg: msg => setErrorMsg(msg),
      password: file.password
    });
  }), uploadedFiles.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "load_more_container"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "load_more_txt",
    onClick: () => fetchUploadedClientFiles()
  }, "Load more")) : /*#__PURE__*/React.createElement("div", null)) : /*#__PURE__*/React.createElement(UploadedFilesTable, {
    data: uploadedFiles,
    fetchUploadedClientFiles: fetchUploadedClientFiles,
    onClickRefresh: resetSearchData,
    onClickLink: downloadFile,
    updateFilterVisibility: updateFilterVisibility,
    filterEnabled: filterEnabled,
    searchStatus: searchParams.searchStatus,
    setSearchStatus: handleSelectStatus,
    searchText: searchParams.searchText,
    setSearchText: handleSearchTxtChanged
  }));
};

export default UploadFiles;