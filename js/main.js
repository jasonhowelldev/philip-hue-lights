//document.getElementById('submitBridgeInfo').addEventListener('click', saveBridgeInfo)
const getButtons = document.getElementsByClassName('getInfo')
for ( i=0; i<getButtons.length;i++) {
    getButtons[i].addEventListener("click",getDataFromBridge)
}

// bridge IP and username
if (!localStorage.getItem("bridgeIP")) {
    localStorage.setItem("bridgeIP", prompt("enter your bridge IP", 'x.x.x.x'))
}
if (!localStorage.getItem("bridgeUser")) {
    localStorage.setItem("bridgeUser", prompt("enter your bridge user"))
}

const bridge = new HueBridge(localStorage.getItem("bridgeIP"), localStorage.getItem("bridgeUser"))


function getDataFromBridge(){

    console.log(this.name)

    // set heading
    document.getElementById('responseHeader').innerHTML = this.name.replace(this.name[0], this.name[0].toUpperCase())

    // get data from bridge
    // let result = bridge.groups
    // console.log('result from getter', result)

    bridge[this.name].then(data => {
        //console.log('response ',data)
        
        // document.getElementById('tempResponse').innerText = JSON.stringify(data)
        // document.getElementById('tempResponse').innerText = ''

        switch(this.name) {
            case 'groups' :
                displayGroups(data)
                break
            case 'lights' :
                displayLights(data)
                break
            default :
                document.getElementById('tempResponse').innerText = JSON.stringify(data)
                break
        }


    })

}

function displayGroups(data) {
    document.getElementById('responseHeader').innerHTML = 'Groups'
    document.getElementById('tempResponse').innerText = ''
    // get main section
    for(const room in data) {
        console.log(data[room])
        // create a new html container that has each group name in it
        document.getElementById('tempResponse').innerText += data[room].name
        document.getElementById('tempResponse').innerText += '\n'
    }
}

function displayLights(data){
    // console.log('lights ', data)

    document.getElementById('responseHeader').innerHTML = 'Lights'
    document.getElementById('tempResponse').innerText = ''

    // create array of light objects using HueLight class
    let arrLights = []

    for(light in data){
        arrLights.push(new HueLight(data[light],light))

        // just test stuff
        // console.log('this light ', data[light])
        // document.getElementById('tempResponse').innerText += data[light].name
        // document.getElementById('tempResponse').innerText += '\n'
    }

    // console.log('light object test ', arrLights)

    arrLights.forEach(light => {
        // console.log('each light ', light)  
        
        // add html section to contain each light
        const section = document.createElement('section')
        section.classList.add('light')
        
        // add buttons for each light
        const lightButton = document.createElement('button')
        lightButton.textContent = light._name
        lightButton.classList.add('lightName')
        lightButton.light = light
        section.append(lightButton)

        // add buttons to quickly set brightness presets
        for(i=0; i<=100;i+=25){
            const button = document.createElement('button')
            button.textContent = i
            button.classList.add('setBrightness')
            button.light = light
            button.addEventListener('click', pressedSetBrightness)
            section.append(button)
        }

        // insert button to set the light's minimum brightness level
        const minButton = document.createElement('button')
        minButton.textContent = 'min'
        minButton.classList.add('setBrightness')
        minButton.light = light
        minButton.addEventListener('click', pressedSetBrightness)
        section.insertBefore(minButton, section.children[2])

        // insert button to set the light to be on
        const onButton = document.createElement('button')
        onButton.textContent = 'on'
        onButton.classList.add('setBrightness')
        onButton.light = light
        onButton.addEventListener('click', pressedSetBrightness)
        section.insertBefore(onButton, section.children.lenth)

        document.getElementById('main').append(section)
    })


}

function pressedSetBrightness(){
    // console.log('mian > pressedSetBrightness ', this.textContent, this.light)

    switch (this.textContent){
        case '0':
            this.light.setOn(bridge, false)
            break
        case 'on':
            this.light.setOn(bridge, true)
            break
        case 'min':
            this.light.setBrightness(bridge, 0)
        
        case '25':
            this.light.setBrightness(bridge, 63)
            break
        case '50':
            this.light.setBrightness(bridge, 127)
            break
        case '75':
            this.light.setBrightness(bridge, 190)
            break
        case '100':
            this.light.setBrightness(bridge, 254)
            break
        default :
            console.log('main > pressedSetBrightness didnt match textConent')
    }

    //this.light.setOn(bridge, true)

}