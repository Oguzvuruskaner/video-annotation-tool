export const choice = (choices) => {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}


export const hexToRGB = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `rgb(${parseInt(result[1],16)},${parseInt(result[2],16)},${parseInt(result[3],16)})`
}

export function getRenderedSize(contains, cWidth, cHeight, width, height, posX,posY){
    var oRatio = width / height,
        cRatio = cWidth / cHeight

    return function() {
        if (contains ? (oRatio > cRatio) : (oRatio < cRatio)) {
            this.width = cWidth
            this.height = cWidth / oRatio
        } else {
            this.width = cHeight * oRatio
            this.height = cHeight
        }
        this.left = (cWidth - this.width)*(posX/100)
        this.right = this.width + this.left
        this.top = (cHeight - this.height) * (posY/100)
        this.bottom = this.top + this.height
        return this;
    }.call({});
}

export function getFrameSizeInfo(img) {
    const pos = window.getComputedStyle(img).getPropertyValue('object-position').split(' ');

    return getRenderedSize(true,
        img.width,
        img.height,
        img.naturalWidth,
        img.naturalHeight ,
        parseInt(pos[0]),
        parseInt(pos[1])
    );
}
