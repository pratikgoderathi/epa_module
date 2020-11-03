import React, { useState, useEffect } from 'react';

//Styles
import "../styles/components/epa.scss";

//Component 
import UploadMultiFiles from "../component/UploadMultiFiles";
import UploadedFilesCard from "../component/UploadedFilesCard";
import Form from "../component/form/Form";
import Input from "../component/form/Input";
import DropDown from '../component/DropDown';
import Loader from '../component/Loader';
import {
    Snackbar,
    Select,
    MenuItem,
    InputLabel,
    Collapse
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import RefreshIcon from '@material-ui/icons/Refresh';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';

const moment = require('moment');

const filterStatusNames = [
    { name: "All", value: "all" },
    { name: "Processing", value: "processing" },
    { name: "Failed", value: "failed" },
    { name: "Success", value: "success" }
]

const CustomSelect = withStyles({
    select: {
        fontSize: "14px",
        padding: 5,
        width: "100px"
    },
})(Select);

const CustomMenuItem = withStyles({
    root: {
        fontSize: "12px",
        padding: "10px",
        //overriding default css
        minHeight: "0px",
    },
})(MenuItem);

const PasswordComponent = (props) => {
    const { password } = props;
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordIcon = () => {
        setPasswordVisible(!passwordVisible);
    }

    const displayPassword = () => {
        if (!Boolean(password) || passwordVisible) {
            return password;
        }

        return "*****"
    }

    return (
        <div className={'password_txt_container justify_center'}>
            <h3>{displayPassword()}</h3>
                    &nbsp;
            {passwordVisible ?
                <VisibilityOffIcon fontSize={'small'} onClick={togglePasswordIcon} /> :
                <VisibilityIcon fontSize={'small'} onClick={togglePasswordIcon} />}
        </div>
    )
}

const UploadedFilesTable = (props) => {
    const { data = [],
        fetchUploadedClientFiles,
        onClickLink = () => { },
        updateFilterVisibility,
        filterEnabled,
        searchStatus,
        setSearchStatus,
        searchText,
        setSearchText,
        onClickRefresh
    } = props;

    return (
        <div className='table_container'>
            <div className='table_title_container'>
                <h1 className='table_title'>UPLOADED FILES</h1>
                <div className='filter_opt_container cursor_pointer'>
                    <SearchIcon
                        style={{ color: 'white', marginRight: 5 }}
                        onClick={updateFilterVisibility} />
                    <RefreshIcon
                        onClick={onClickRefresh}
                        className='refresh_icon_web' />
                </div>
            </div>
            <Collapse in={filterEnabled}>
                <div className='filter_container'>
                    <Form.FormItem className='form_input_container search_input_container'>
                        <Input
                            label={"Search file name"}
                            type={"text"}
                            onChange={setSearchText}
                            value={searchText}
                        />
                        <div className='right-icon'>
                            <SearchIcon fontSize='small' />
                        </div>
                    </Form.FormItem>
                    <div className='flex_row'>
                        <div>
                            <InputLabel
                                shrink
                                className='material-label'
                            >Status</InputLabel>
                            <CustomSelect
                                value={searchStatus}
                                onChange={setSearchStatus}>
                                {filterStatusNames.map((item, index) => {
                                    return (
                                        <CustomMenuItem key={index} value={item.value}>
                                            {item.name}
                                        </CustomMenuItem>
                                    );
                                })}
                            </CustomSelect>
                        </div>
                        <h1 className='reset_filter_txt' onClick={onClickRefresh}>Reset filter</h1>
                    </div>
                </div>
            </Collapse>
            <div className='padding-5px'>
                <table className='width_100'>
                    <tbody>
                        <tr>
                            <th className='table_header_col'>Date & Time</th>
                            <th className='table_header_col'>File Name</th>
                            <th className='table_header_col text_align_center'>Status</th>
                            <th className='table_header_col text_align_center'>File Password</th>
                            <th className='table_header_col text_align_center'>Download</th>
                        </tr>
                        {data.map((row, index) => {
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
                                    })
                                    return;
                                }
                            }

                            const handleClickPdfFile = () => {
                                if (pdfFile) {
                                    onClickLink({
                                        "file_key": pdfFile
                                    })
                                    return;
                                }
                            }

                            return (
                                <tr key={'key_' + index} className={'table_row'}>
                                    <td className='table_row_col'>{dateTime !== "-" ? moment(dateTime).fromNow() : "-"}</td>
                                    <td className='table_row_col file_name_txt_table'>{fileName}</td>
                                    <td className='table_row_col text_align_center'>{status}</td>
                                    <td className='table_row_col text_align_center'>
                                        {Boolean(password) &&
                                            <PasswordComponent
                                                password={password}
                                            />
                                        }
                                    </td>
                                    <td className='table_row_col text_align_center'>
                                        <div className='download_links justify_center'>
                                            {Boolean(excelFile) ?
                                                <h3 className='txt_value excel_link'
                                                    onClick={handlClickExcelFile}>{pdfFile ? "Output file" : "Consolidated holdings"}</h3> : <div />
                                            }

                                            {Boolean(excelFile) && Boolean(pdfFile) ? (<>
                                                &nbsp;
                                        <h4 style={{ fontSize: 12 }}>OR</h4>
                                        &nbsp;
                                        </>) : <div />}

                                            {Boolean(pdfFile) ?
                                                <h3 className='txt_value pdf_link'
                                                    onClick={handleClickPdfFile}>Uploaded file</h3> : <div />
                                            }
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {data.length > 0 ?
                (
                    <div className='load_more_container'>
                        <h3 className='load_more_txt' onClick={() => fetchUploadedClientFiles()}>Load more</h3>
                    </div>
                ) : <div />
            }
        </div>
    )
}

const UploadFiles = (props) => {
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
    })

    useEffect(() => {
        fetchUploadedClientFiles();
        // eslint-disable-next-line
    }, [Boolean(employee_id)])

    useEffect(() => {
        let { searchText, searchStatus } = searchParams;
        if (searchText.length > 2 ||
            searchStatus !== "all" ||
            !Boolean(searchText)) {
            fetchUploadedClientFiles(true);
        }

        // eslint-disable-next-line
    }, [searchParams.searchStatus, searchParams.searchText]);

    const updateFilterVisibility = () => {
        enableFilter(!filterEnabled);
    }

    const fetchUploadedClientFiles = (refresh = false) => {
        if (Boolean(employee_id)) {
            const rm_id = employee_id;
            let { searchText, searchStatus } = searchParams;

            setLoading(true);
            let params = {
                rm_id,
                offset
            }
            // reset offset to zero if refresh 
            if (refresh) {
                params.offset = 0;
            }

            if (searchText.length > 2) {
                params.search = searchText;
            }

            if (searchStatus !== "all") {
                params.status = searchStatus;
            }

            getUploadedClientFiles(params)
                .then(res => {
                    if (res.status === 200) {
                        const { data } = res.data;

                        // if refresh then load latest files
                        if (refresh && Array.isArray(data)) {
                            setLoading(false);
                            setUploadedFiles(data);
                            return
                        }

                        // load files offset wise
                        if (Array.isArray(data) && data.length > 0) {
                            //get previous files
                            let newData = uploadedFiles.slice();
                            newData = newData.concat(data);
                            //set updated data
                            setUploadedFiles(newData);
                            setOffset(newData.length);
                        }

                        if (Array.isArray(data) && data.length === 0 && uploadedFiles.length > 0) {
                            setSuccessMsg("All files are loaded");
                        }
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.log("err", err);
                    setLoading(false);
                })
        }
    }

    const downloadFile = (data) => {

        setLoading(true);
        getDownloadUrl(data)
            .then(res => {
                if (res.status === 200) {
                    const { data = {} } = res.data;
                    const { url } = data;
                    window.open(url);
                }
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log("err", err);
            })
    }

    const handleOnClickFormatFile = () => {
        let url = `https://docs.google.com/spreadsheets/d/13gumOsFhk2MeHKhlVEEFy5xnug7aw2Seu5bueLiTwmw/edit?usp=sharing`;
        window.open(url);
    }

    const handleSelectStatus = (e) => {
        let { value } = e.target;
        setSearchParams({ ...searchParams, searchStatus: value });
    }

    const handleSearchTxtChanged = (e, val) => {
        let { value } = e.target;
        setSearchParams({ ...searchParams, searchText: value });
    }

    const resetSearchData = () => {
        setSearchParams({ searchText: "", searchStatus: 'all' });
        //if status and text is not updated then
        let { searchText, searchStatus } = searchParams;
        if (searchText === "" && searchStatus === "all") {
            fetchUploadedClientFiles(true);
        }
    }

    return (<div className='container'>
        <Snackbar
            open={Boolean(error_message)}
            autoHideDuration={3000}
            onClose={() => setErrorMsg("")}>
            <Alert
                elevation={6}
                variant='filled'
                onClose={() => { }}
                severity='error'>
                {error_message}
            </Alert>
        </Snackbar>
        <Snackbar
            open={Boolean(success_message)}
            autoHideDuration={3000}
            onClose={() => setSuccessMsg("")}>
            <Alert
                elevation={6}
                variant='filled'
                onClose={() => { }}
                severity='success'>
                {success_message}
            </Alert>
        </Snackbar>
        {isLoading && <Loader />}
        <div className='action_container'>
            <CloudDownloadIcon
                className='margin_horizontal_5 cursor_pointer'
                onClick={handleOnClickFormatFile}
                fontSize={'small'}
            />
            <h5
                className='margin_horizontal_5 cursor_pointer font_size_14'
                onClick={handleOnClickFormatFile}>
                Supported file formats
            </h5>
        </div>
        <div className={'margin-bottom-15px'}>
            <UploadMultiFiles
                //API calls
                uploadClientFiles={uploadClientFiles}
                postAudit={postAudit}
                employee_id={employee_id}
                ipAddress={ipAddress}
                isUploading={(bool) => setLoading(bool)}
                setSuccessMsg={(msg) => setSuccessMsg(msg)}
                setErrorMsg={(msg) => setErrorMsg(msg)} />
        </div>
        {isMobileDevice ? (
            <DropDown title='UPLOADED FILES'
                open={true}
                headerChild={
                    <>
                        <SearchIcon className={'filter_icon'} onClick={(e) => {
                            e.stopPropagation();
                            updateFilterVisibility();
                        }} />
                        <RefreshIcon className={'refresh_icon'} onClick={(e) => {
                            e.stopPropagation();
                            resetSearchData();
                        }} />
                    </>
                }
            >
                <Collapse in={filterEnabled}>
                    <div className='filter_container'>
                        <Form.FormItem className='form_input_container search_input_container'>
                            <Input
                                label={"Search file name"}
                                type={"text"}
                                onChange={handleSearchTxtChanged}
                                value={searchParams.searchText}
                            />
                            <div className='right-icon'>
                                <SearchIcon fontSize='small' />
                            </div>
                        </Form.FormItem>
                        <div className='flex_row'>
                            <div>
                                <InputLabel
                                    shrink
                                    className='material-label'
                                >Status</InputLabel>
                                <CustomSelect
                                    value={searchParams.searchStatus}
                                    onChange={handleSelectStatus}>
                                    {filterStatusNames.map((item, index) => {
                                        return (
                                            <CustomMenuItem key={index} value={item.value}>
                                                {item.name}
                                            </CustomMenuItem>
                                        );
                                    })}
                                </CustomSelect>
                            </div>
                            <h1 className='reset_filter_txt' onClick={resetSearchData}>Reset filter</h1>
                        </div>
                    </div>
                </Collapse>
                {uploadedFiles.map((file, index) => {
                    return <UploadedFilesCard
                        key={index}
                        fileName={file.input_file_original_name}
                        createdAt={file.created_timestamp}
                        excelFile={file.response_key}
                        pdfFile={file.upload_key}
                        status={file.request_status}
                        onClickLink={downloadFile}
                        setSuccessMsg={(msg) => setSuccessMsg(msg)}
                        setErrorMsg={(msg) => setErrorMsg(msg)}
                        password={file.password} />
                })}
                {uploadedFiles.length > 0 ?
                    (
                        <div className='load_more_container'>
                            <h3 className='load_more_txt' onClick={() => fetchUploadedClientFiles()}>Load more</h3>
                        </div>
                    ) : <div />
                }
            </DropDown>
        ) : <UploadedFilesTable
                data={uploadedFiles}
                fetchUploadedClientFiles={fetchUploadedClientFiles}
                onClickRefresh={resetSearchData}
                onClickLink={downloadFile}
                updateFilterVisibility={updateFilterVisibility}
                filterEnabled={filterEnabled}
                searchStatus={searchParams.searchStatus}
                setSearchStatus={handleSelectStatus}
                searchText={searchParams.searchText}
                setSearchText={handleSearchTxtChanged}
            />}
    </div>)
}

UploadFiles.propTypes = {
    employee_id: PropTypes.number.isRequired,
    getUploadedClientFiles: PropTypes.func,
    getDownloadUrl: PropTypes.func,
    uploadClientFiles: PropTypes.func,
    postAudit: PropTypes.func,
    ipAddress: PropTypes.string
}

UploadFiles.defaultProps = {
    getUploadedClientFiles: () => {},
    getDownloadUrl: () => {},
    uploadClientFiles: () => { },
    postAudit: () => { },
    ipAddress: ''
}

export default UploadFiles;