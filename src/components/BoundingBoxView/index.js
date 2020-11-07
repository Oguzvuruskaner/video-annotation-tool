import React,{Component} from "react"
import AnnotationViewer from "./AnnotationViewer";
import ButtonFactory from "./ButtonFactory";

class BoundingBoxView extends Component{

    render() {

        return <div className={"bounding-box-view"}>
            <ButtonFactory/>
            <AnnotationViewer/>
        </div>

    }
}


export default BoundingBoxView
