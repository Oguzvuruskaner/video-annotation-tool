import React from "react"
import Video from "../components/Video"
import BorderboxView from "../components/BorderboxView"
import VideoController from "./VideoController"
import FileBarrier from "../components/FileBarrier";

export default () => {

    return <FileBarrier>
            <div className="application-page">
                <div>
                    <Video/>
                    <BorderboxView/>
                </div>
                <VideoController/>
            </div>
        </FileBarrier>

}
