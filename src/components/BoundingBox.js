import React from "react"
import {Rect} from "fabric"

export default (canvas) => class BoundingBox extends React {

    constructor(props) {
        super(props);
        const {xmin,ymin,xmax,ymax,color,id} = props
        this.rect = new Rect()
    }


    render(){
        return null
    }
}
