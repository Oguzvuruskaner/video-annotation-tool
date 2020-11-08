import React,{Component} from "react"
import AnnotationViewer from "./AnnotationViewer";
import ButtonFactory from "./ButtonFactory";

class Sidebar extends Component{

    render() {

        return <div className={"sidebar"}>
            <ButtonFactory/>
            <AnnotationViewer/>
        </div>

    }
}


export default Sidebar
