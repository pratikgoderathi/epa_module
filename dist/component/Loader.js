import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';

function Loader(props) {
  return /*#__PURE__*/React.createElement(Box, {
    className: "loader-wrapper"
  }, /*#__PURE__*/React.createElement(CircularProgress, {
    className: "loader",
    disableShrink: true
  }));
}

export default Loader;