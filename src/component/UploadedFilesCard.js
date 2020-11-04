import React, { useState} from "react";
// import "../styles/components/epa.scss";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const moment = require('moment');

const UploadedFilesCard = (props) => {
    const { 
        fileName = "-", 
        status = "processing", 
        createdAt = "-", 
        onClickLink=()=>{},
        excelFile,
        pdfFile,
        setErrorMsg,
        password = '-'
    } = props;

    const [passwordVisible, setPasswordVisible] = useState(false);
    
    const togglePasswordIcon = () => {
        setPasswordVisible(!passwordVisible);
    }

    const displayPassword = () => {
        if(!Boolean(password) || passwordVisible) {
            return password;
        }

        return "*****"
    }

    const handlClickExcelFile = () => {
        if(excelFile) {
            onClickLink({
                "file_key": excelFile
            })
            return;
        }
        setErrorMsg("Invalid file link");
    }

    const handleClickPdfFile = () => {
        if (pdfFile) {
            onClickLink({
                "file_key": pdfFile
            })
            return;
        }
        setErrorMsg("Invalid Link");
    }

    return (
        <div className='list_card_container'>
            <div className='sub_container1'>
                <div className='file_name_container vertical_padding'>
                    <h3 className='txt_label'>Filename</h3>
                    <h3 className='txt_value file_name_txt'>
                        {Boolean(fileName) ? fileName : "-"}
                    </h3>
                </div>
                <div className='file_status_container vertical_padding'>
                    <h3 className='txt_label'>Status</h3>
                    <h3
                        className='txt_value'>
                        {status}
                    </h3>
                </div>
            </div>
            <div className='sub_container1'>
                <div className='folio_container vertical_padding'>
                    <h3 className='txt_label'>Date & Time</h3>
                    <h3 className='txt_value'>{moment(createdAt).fromNow()}</h3>
                </div>
                {Boolean(password) &&
                    <div className='password_container vertical_padding'>
                        <h3 className='txt_label'>File password</h3>
                        <div className={'password_txt_container'}>
                            <h3 className='txt_value'>{displayPassword()}</h3>
                        &nbsp;
                        {passwordVisible ? <VisibilityOffIcon fontSize={'small'} onClick={togglePasswordIcon} /> : <VisibilityIcon fontSize={'small'} onClick={togglePasswordIcon} />}
                        </div>
                    </div>
                }
                {Boolean(excelFile) || Boolean(pdfFile) ? (<div className='download_link_container vertical_padding'>
                        <h3 className='txt_label'>Download</h3>
                        <div className='download_links'>
                            {Boolean(excelFile) ? 
                                <h3 className='txt_value excel_link'
                                    onClick={handlClickExcelFile}>{pdfFile ? "Output file" : "Consolidated holdings"}</h3> : <div/>
                            }
                            
                            {Boolean(excelFile) && Boolean(pdfFile) ? (<>
                            &nbsp;
                            <h4 style={{ fontSize: 12, color: "black" }}>OR</h4>
                            &nbsp;
                            </>) : <div/>}

                            {Boolean(pdfFile) ?
                                    <h3 className='txt_value pdf_link'
                                        onClick={handleClickPdfFile}>Uploaded File</h3> : <div/>
                            }
                        </div>
                    </div>) : <div/>
                }
            </div>
            <div className='list_card_seperator' />
        </div>
    );
};

export default UploadedFilesCard;
