import React from "react"
import Video from "../components/Video"
import BorderboxView from "../components/BorderboxView"
import VideoController from "./VideoController"

export default () => {

    return <div className="application-page">
        <div>
            <Video/>
            <BorderboxView/>
        </div>
        <VideoController/>
    </div>
}
