import React,{Component} from "react"
import Dropzone from "react-dropzone"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {compose} from "redux"
import {UPLOAD_FILE} from "../actions";



class FileDrop extends Component{

    render(){

        const {uploadFile} = this.props

        return <Dropzone onDrop={(file) => uploadFile(file)}>
            {({getRootProps, getInputProps}) => (
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
            )}
        </Dropzone>
    }

}

const mapDispatchToProps = (dispatch,{history}) => {
    return {
        uploadFile : (file) => {
            dispatch({
                type:UPLOAD_FILE,
                payload:file
            })
            history.push("/app")
        }
    }
}

export default compose(
    withRouter,
    connect(
        null,
        mapDispatchToProps
    )
)(FileDrop)



