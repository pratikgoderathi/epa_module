import React, { useState } from "react";
import Form from "./form/Form";
import Input from "./form/Input";
import Button from "./form/Button";
import classNames from 'classnames';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import NoEncryptionOutlinedIcon from '@material-ui/icons/NoEncryptionOutlined';
import Ripple from "react-ripples";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { rippleWhite } from "../variables";
import { panRegex } from '../validation/regex';
const defaultFileObj = {
  file: undefined,
  password: '',
  passwordVisible: false,
  pan: '',
  //for uniqueness of component we cannot relay on index, so creating new id.
  id: Date.now()
};

const UploadMultiFiles = props => {
  const {
    isUploading,
    setSuccessMsg,
    setErrorMsg,
    uploadClientFiles,
    postAudit,
    ipAddress,
    employee_id
  } = props;
  const [selectedFiles, setSelectedFiles] = useState([Object.assign({}, defaultFileObj)]);
  const [errorObj, setErrorObj] = useState({});
  const isWebDevice = useMediaQuery("(min-width:700px)");
  let rippleclass = classNames("full-width", {
    "dissable-ripple": false //!Boolean(clientCode),

  });
  let uploadBtnWidthClass = classNames("", {
    "width_30": isWebDevice
  });

  const addNewFile = () => {
    const newFile = Object.assign({}, defaultFileObj);
    newFile.id = Date.now();
    const updatedFiles = [...selectedFiles];
    updatedFiles.push(newFile);
    setSelectedFiles(updatedFiles);
  };

  const removeSelectedFile = index => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const uploadFilesToS3 = () => {
    //prepare data
    const passwords = [];
    const pans = [];
    let formData = new FormData();
    let errorObjCp = Object.assign({}, errorObj);
    selectedFiles.filter(selectedFile => Boolean(selectedFile.file)).forEach((selectedFile, index) => {
      passwords.push(selectedFile.password);
      pans.push(selectedFile.pan);
      formData.append('files', selectedFile.file); //add error if pan validation failed

      if (!panRegex.test(selectedFile.pan)) {
        errorObjCp[selectedFile.id] = {
          pan: "Invalid PAN"
        };
      }

      if (!Boolean(selectedFile.pan)) {
        errorObjCp[selectedFile.id] = {
          pan: "Please provide PAN"
        };
      }
    }); //check if there any error and return

    if (Object.keys(errorObjCp).filter(id => {
      return Boolean(errorObjCp[id]) && Boolean(errorObjCp[id].pan);
    }).length > 0) {
      setErrorObj(errorObjCp);
      return;
    }

    formData.append('passwords', JSON.stringify(passwords));
    formData.append('pan_numbers', JSON.stringify(pans));
    formData.append('rm_id', '' + employee_id);
    isUploading(true);
    postAuditAPI("UPLOAD FILES"); //submit data

    uploadClientFiles(formData).then(res => {
      isUploading(false);

      if (res.status === 200) {
        let newFile = Object.assign({}, defaultFileObj);
        newFile.id = Date.now();
        setSelectedFiles([newFile]);
        setSuccessMsg('Files uploaded successfully. File status is in progress.');
      }
    }).catch(err => {
      console.log("error", err);
      setErrorMsg("Failed to upload files");
      isUploading(false);
    });
  };

  const postAuditAPI = data => {
    let auditData = {
      "client_code": "",
      "ip_address": ipAddress,
      "emp_id": employee_id,
      "extra_info": {
        data
      },
      "user_action": "EPA upload files"
    };
    postAudit(auditData).then(res => {
      console.log("res", res.data);
    }).catch(err => {
      console.log("err", err);
    });
  };

  const updateSelectedFile = (index, file) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles[index].file = file;
    setSelectedFiles(updatedFiles);
  };

  const updateFilePassword = (index, password) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles[index].password = password;
    setSelectedFiles(updatedFiles);
  };

  const updatePanDetails = (index, pan) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles[index].pan = Boolean(pan) ? pan.toUpperCase() : "";
    let errorObjCp = Object.assign({}, errorObj); //remove pan field error while typing 

    if (Boolean(errorObjCp[updatedFiles[index].id])) {
      errorObjCp[updatedFiles[index].id].pan = "";
      setErrorObj(errorObjCp);
    }

    setSelectedFiles(updatedFiles);
  };

  const setPasswordVisible = index => {
    const updatedFiles = [...selectedFiles];
    updatedFiles[index].passwordVisible = !updatedFiles[index].passwordVisible;
    setSelectedFiles(updatedFiles);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "title-container"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "title"
  }, "UPLOAD FILES"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      opacity: 0.7
    }
  }, "Only upload original statements without any modifications done to them")), selectedFiles.map((file, index) => {
    if (isWebDevice) {
      return /*#__PURE__*/React.createElement("div", {
        className: "textfield_container_web",
        key: "" + file.id
      }, /*#__PURE__*/React.createElement(Form.FormItem, {
        className: "form_input_container width_20"
      }, /*#__PURE__*/React.createElement(Input, {
        label: "Upload file",
        accept: 'application/pdf',
        type: "file",
        autoComplete: "off",
        id: "" + file.id,
        onChange: e => {
          const {
            files
          } = e.target;
          updateSelectedFile(index, files[0]);
        }
      })), /*#__PURE__*/React.createElement(Form.FormItem, {
        className: "form_input_container width_20 uf_web_input"
      }, /*#__PURE__*/React.createElement(Input, {
        label: "Password",
        type: file.passwordVisible ? "text" : "password",
        onChange: e => {
          updateFilePassword(index, e.target.value);
        },
        value: Boolean(file.password) ? file.password : ''
      }), /*#__PURE__*/React.createElement("div", {
        className: "right-icon"
      }, file.passwordVisible ? /*#__PURE__*/React.createElement(NoEncryptionOutlinedIcon, {
        onClick: () => setPasswordVisible(index)
      }) : /*#__PURE__*/React.createElement(LockOutlinedIcon, {
        onClick: () => setPasswordVisible(index)
      }))), /*#__PURE__*/React.createElement(Form.FormItem, {
        className: "form_input_container width_20 uf_web_input",
        validateStatus: (() => {
          let error = Boolean(errorObj[file.id]) && Boolean(errorObj[file.id].pan) ? "error" : "";
          let inputErr = file.pan !== "" && !panRegex.test(file.pan) ? "error" : "";
          let finalErr = error || inputErr || "";
          console.log("PAN", error, "INPUT", inputErr);
          return finalErr;
        })(),
        helperText: (() => {
          let error = Boolean(errorObj[file.id]) ? errorObj[file.id].pan : "";
          let inputErr = file.pan !== "" && !panRegex.test(file.pan) ? "Invalid PAN" : "";
          let finalErr = error || inputErr || "";
          return finalErr;
        })()
      }, /*#__PURE__*/React.createElement(Input, {
        label: "PAN",
        id: "PAN_" + file.id,
        type: "text",
        onChange: e => {
          updatePanDetails(index, e.target.value);
        },
        value: Boolean(file.pan) ? file.pan : ''
      })), /*#__PURE__*/React.createElement(Ripple, {
        className: `button_container ${rippleclass}`,
        color: rippleWhite
      }, /*#__PURE__*/React.createElement(Button, {
        className: "ops__btn txn_submit_padding",
        onClick: () => removeSelectedFile(index),
        disabled: selectedFiles.length === 1
      }, "REMOVE")), /*#__PURE__*/React.createElement(Ripple, {
        className: `button_container ${rippleclass}`,
        color: rippleWhite
      }, /*#__PURE__*/React.createElement(Button, {
        className: "ops__btn txn_submit_padding",
        invertButton: true,
        onClick: addNewFile,
        disabled: index !== selectedFiles.length - 1
      }, "ADD")));
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "textfield_container bottom_line",
      key: "" + file.id
    }, /*#__PURE__*/React.createElement(Form.FormItem, null, /*#__PURE__*/React.createElement(Input, {
      label: "Upload file",
      accept: 'application/pdf',
      type: "file",
      autoComplete: "off",
      id: "" + file.id,
      onChange: e => {
        const {
          files
        } = e.target;
        updateSelectedFile(index, files[0]);
      }
    })), /*#__PURE__*/React.createElement(Form.FormItem, null, /*#__PURE__*/React.createElement(Input, {
      label: "Password",
      type: file.passwordVisible ? "text" : "password",
      onChange: e => {
        updateFilePassword(index, e.target.value);
      },
      value: Boolean(file.password) ? file.password : ''
    }), /*#__PURE__*/React.createElement("div", {
      className: "right-icon"
    }, file.passwordVisible ? /*#__PURE__*/React.createElement(NoEncryptionOutlinedIcon, {
      onClick: () => setPasswordVisible(index)
    }) : /*#__PURE__*/React.createElement(LockOutlinedIcon, {
      onClick: () => setPasswordVisible(index)
    }))), /*#__PURE__*/React.createElement(Form.FormItem, {
      validateStatus: (() => {
        let error = Boolean(errorObj[file.id]) && Boolean(errorObj[file.id].pan) ? "error" : "";
        let inputErr = file.pan !== "" && !panRegex.test(file.pan) ? "error" : "";
        let finalErr = error || inputErr || "";
        console.log("PAN", error, "INPUT", inputErr);
        return finalErr;
      })(),
      helperText: (() => {
        let error = Boolean(errorObj[file.id]) ? errorObj[file.id].pan : "";
        let inputErr = file.pan !== "" && !panRegex.test(file.pan) ? "Invalid PAN" : "";
        let finalErr = error || inputErr || "";
        return finalErr;
      })()
    }, /*#__PURE__*/React.createElement(Input, {
      label: "PAN",
      id: "PAN_" + file.id,
      type: "text",
      onChange: e => {
        updatePanDetails(index, e.target.value);
      },
      value: Boolean(file.pan) ? file.pan : ''
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "row"
      }
    }, /*#__PURE__*/React.createElement(Ripple, {
      className: rippleclass,
      color: rippleWhite
    }, /*#__PURE__*/React.createElement(Button, {
      className: "ops__btn txn_submit_padding",
      onClick: () => removeSelectedFile(index),
      disabled: selectedFiles.length === 1
    }, "REMOVE")), /*#__PURE__*/React.createElement(Ripple, {
      className: rippleclass,
      color: rippleWhite
    }, /*#__PURE__*/React.createElement(Button, {
      className: "ops__btn txn_submit_padding",
      invertButton: true,
      onClick: addNewFile,
      disabled: index !== selectedFiles.length - 1
    }, "ADD"))));
  }), isWebDevice ? /*#__PURE__*/React.createElement("div", {
    className: 'bottom_line'
  }) : /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement(Ripple, {
    className: `${rippleclass} ${uploadBtnWidthClass}`,
    color: rippleWhite
  }, /*#__PURE__*/React.createElement(Button, {
    className: "ops__btn txn_submit_padding",
    invertButton: true,
    onClick: uploadFilesToS3,
    disabled: !(selectedFiles.filter(file => Boolean(file.file)).length > 0)
  }, "UPLOAD"))));
};

export default UploadMultiFiles;