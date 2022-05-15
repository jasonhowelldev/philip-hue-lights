class hueLight {
    constructor(id, on) {
        this._id = id
        this.urlPrefix = `resource/light/${_id}`
        this.on = on
    }

    get _id(){
        return this._id
    }

    sendPutCommand(body){

    }

    setOn(state){ // bool
        const power = `on:${state}`
        sendPutCommand(JSON.stringify(power))
    }

    setLightState(on, brightness, hue, saturation, alert, transitionTime){

    } 


}