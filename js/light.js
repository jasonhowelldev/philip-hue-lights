class HueLight {
    constructor(lightObj, id) {
        this._id = id
        this._urlPrefix = `lights/${this._id}`
        this._on = lightObj.state.on
        this._brightness = lightObj.state.bri
        this._alert = lightObj.state.alert
        this._mode = lightObj.state.mode
        this._reachable = lightObj.state.reachable

        this._name = lightObj.name
        this._productName = lightObj.productname
        this._minDimLevel = lightObj.capabilities.mindimlevel
        this._maxLumen = lightObj.capabilities.maxlumen
        this._type = lightObj.type

    }

    sendPutCommand(bridge, urlAddition, data){
        const url = bridge.url+this._urlPrefix+urlAddition
        console.log('lights sendPutCommand ',url, data)
        let response = fetch(url, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
    }

    setBrightness(bridge, bri){
        // console.log('light.js setBrightness ', bri)
        this.sendPutCommand(bridge, '/state', {'bri':bri})
    }

    setOn(bridge, state){ // bool
        // console.log('light.js setOn ', state, bridge)
        this.sendPutCommand(bridge, '/state', {"on":state})
    }


}