import React, { useState } from "react";
import "../styles/components/epa.scss";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const moment = require('moment');

const UploadedFilesCard = props => {
  const {
    fileName = "-",
    status = "processing",
    createdAt = "-",
    onClickLink = () => {},
    excelFile,
    pdfFile,
    setErrorMsg,
    password = '-'
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

  const handlClickExcelFile = () => {
    if (excelFile) {
      onClickLink({
        "file_key": excelFile
      });
      return;
    }

    setErrorMsg("Invalid file link");
  };

  const handleClickPdfFile = () => {
    if (pdfFile) {
      onClickLink({
        "file_key": pdfFile
      });
      return;
    }

    setErrorMsg("Invalid Link");
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "list_card_container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sub_container1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file_name_container vertical_padding"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "txt_label"
  }, "Filename"), /*#__PURE__*/React.createElement("h3", {
    className: "txt_value file_name_txt"
  }, Boolean(fileName) ? fileName : "-")), /*#__PURE__*/React.createElement("div", {
    className: "file_status_container vertical_padding"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "txt_label"
  }, "Status"), /*#__PURE__*/React.createElement("h3", {
    className: "txt_value"
  }, status))), /*#__PURE__*/React.createElement("div", {
    className: "sub_container1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "folio_container vertical_padding"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "txt_label"
  }, "Date & Time"), /*#__PURE__*/React.createElement("h3", {
    className: "txt_value"
  }, moment(createdAt).fromNow())), Boolean(password) && /*#__PURE__*/React.createElement("div", {
    className: "password_container vertical_padding"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "txt_label"
  }, "File password"), /*#__PURE__*/React.createElement("div", {
    className: 'password_txt_container'
  }, /*#__PURE__*/React.createElement("h3", {
    className: "txt_value"
  }, displayPassword()), "\xA0", passwordVisible ? /*#__PURE__*/React.createElement(VisibilityOffIcon, {
    fontSize: 'small',
    onClick: togglePasswordIcon
  }) : /*#__PURE__*/React.createElement(VisibilityIcon, {
    fontSize: 'small',
    onClick: togglePasswordIcon
  }))), Boolean(excelFile) || Boolean(pdfFile) ? /*#__PURE__*/React.createElement("div", {
    className: "download_link_container vertical_padding"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "txt_label"
  }, "Download"), /*#__PURE__*/React.createElement("div", {
    className: "download_links"
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
  }, "Uploaded File") : /*#__PURE__*/React.createElement("div", null))) : /*#__PURE__*/React.createElement("div", null)), /*#__PURE__*/React.createElement("div", {
    className: "list_card_seperator"
  }));
};

export default UploadedFilesCard;