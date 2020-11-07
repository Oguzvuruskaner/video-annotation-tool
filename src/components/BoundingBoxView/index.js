import React,{Component} from "react"
import SaveButton from "./SaveButton"
import AddButton from "./AddButton";
import CloseButton from "./CloseButton";
import AnnotationViewer from "./AnnotationViewer";

class BoundingBoxView extends Component{

    render() {

        return <div className={"bounding-box-view"}>
            <AddButton/>
            <SaveButton/>
            <CloseButton/>
            <AnnotationViewer/>
        </div>

    }
}


export default BoundingBoxView
