import React,{Component} from "react"
import {connect} from "react-redux"
import BoundingBox from "./BoundingBox";

class AnnotationViewer extends Component{

    constructor(props) {
        super(props);
    }


    render() {

        const {imageAnnotations} = this.props
        console.log(imageAnnotations)
        return <>
            {
                Object.entries(imageAnnotations).map((key,value) =>{
                    return <BoundingBox key={key} id={key} {...value}/>
                })
            }
        </>
    }
}


const mapStateToProps = ({imageAnnotations}) => ({imageAnnotations})

export default connect(mapStateToProps)(AnnotationViewer)
