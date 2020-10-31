import React from "react"
import {fabric} from "fabric"

export default (canvas) => class BoundingBox extends React {

    constructor(props) {
        super(props);
        const {xmin,ymin,xmax,ymax,color} = props
        this.rect = new fabric.Rect({
            width: xmax-xmin,
            height: ymax-ymin,
            fill: '',
            stroke: color,
            strokeWidth: 3,
            selectable: true
        });

        canvas.add(this.rect);
    }


    render(){
        return null
    }
}
