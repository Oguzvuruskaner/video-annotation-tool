import React,{Component} from "react"
import Dropzone from "react-dropzone"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {compose} from "redux"
import {UPLOAD_FILE} from "../actions";



class FileDrop extends Component{

    render(){

        const {uploadFile} = this.props

        return <Dropzone
            onDrop={(file) => uploadFile(file)}
            maxFiles={1}
            multiple={false}
            accept="image/*,video/*"
        >
            {({getRootProps, getInputProps}) => (
                <div className={"fill"} {...getRootProps()}>
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
            const objectURL = URL.createObjectURL(file[0])
            file = {content:objectURL,type:file[0].type}
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



