import React,{Component} from "react"
import SaveButton from "./SaveButton"
import AddButton from "./AddButton";
import CloseButton from "./CloseButton";

class BoundingBoxView extends Component{

    render() {

        return <div className={"bounding-box-view"}>
            <AddButton/>
            <SaveButton/>
            <CloseButton/>
        </div>

    }
}


export default BoundingBoxView
