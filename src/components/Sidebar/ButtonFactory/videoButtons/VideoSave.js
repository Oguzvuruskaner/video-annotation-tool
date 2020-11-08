import React, {Component} from "react"
import {connect} from "react-redux";
import {Fab} from "@material-ui/core";
import {Save} from "@material-ui/icons";
import { saveAs } from 'file-saver';

/*
{
    "filename":name,
    "total_labels":0
    "boxes":[
        {
            "id":int
            "xmin":int,
            "ymin":int,
            "xmax":int,
            "ymin":int,
            "label":int
        }
    ]
}

 */


class VideoSave extends Component{

    onClick(){
        const {imageAnnotations,file} = this.props

        const annotations = Object.entries(imageAnnotations).filter(([key,value]) => key !== "colors" && key != "counter")

        const obj = {}
        obj["filename"] = file.name
        obj["total_labels"] = 0
        obj["files"] = []

        for(var annotation of annotations){

            const [key,value] = annotation
            const {xmin,xmax,ymin,ymax} = value

            obj["files"].push({
                xmin,
                xmax,
                ymin,
                ymax,
                id:parseInt(key),
                label:0
            })

        }
        const blob = new Blob([JSON.stringify(obj, null, 4)], {type : 'application/json'});

        saveAs(blob,`${file.name}_annotation.json`)

    }

    render() {
        return <Fab onClick={() => this.onClick()}>
            <Save/>
        </Fab>
    }
}

const mapStateToProps = ({imageAnnotations,file}) => ({imageAnnotations,file})

export default connect(mapStateToProps)(VideoSave)
