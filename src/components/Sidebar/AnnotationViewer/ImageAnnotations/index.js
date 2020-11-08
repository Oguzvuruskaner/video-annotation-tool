import React,{Component} from "react"
import {connect} from "react-redux";
import Button from "./Button"

class ImageAnnotations extends Component{


    render() {

        const {imageAnnotations} = this.props
        const annotations = Object.entries(imageAnnotations).filter(([key,value]) => key !== "counter")


        return <>
            {
                annotations.map(([key,value]) => <Button key={key} id={key} {...value}/>)
            }
        </>
    }
}


const mapStateToProps = ({imageAnnotations}) => ({imageAnnotations})

export default connect(mapStateToProps)(ImageAnnotations)
