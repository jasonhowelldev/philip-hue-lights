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
    clearDisplay()
    console.log(this.name)

    // set heading
    document.getElementById('responseHeader').innerHTML = this.name.replace(this.name[0], this.name[0].toUpperCase())
    
    // call method on bridge that corresponds the button clicked's name
    bridge[this.name].then(data => {

        switch(this.name) {
            // call appropraite function based on what data you expect back from the bridge
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

function clearDisplay(){
    document.getElementById('responseHeader').innerHTML = ''
    document.getElementById('tempResponse').innerText = ''
    document.getElementById('main').innerHTML = ''
}

function displayGroups(data) {
    clearDisplay()
    document.getElementById('responseHeader').innerHTML = 'Groups'
    // for now, just display group names
    for(const room in data) {
        console.log(data[room])
        // create a new html container that has each group name in it
        document.getElementById('tempResponse').innerText += data[room].name
        document.getElementById('tempResponse').innerText += '\n'
    }
}

function displayLights(data){
    clearDisplay()
    document.getElementById('responseHeader').innerHTML = 'Lights'

    // create array of light objects using HueLight class
    let arrLights = []

    for(light in data){
        arrLights.push(new HueLight(data[light],light))
    }

    // loop through each light and create buttons to control each one
    arrLights.forEach(light => {   
        // add html section to contain each light
        const section = document.createElement('section')
        section.classList.add('light')

        // create an array to hold all possible button values in proper order
        const buttonValues = ['self','off', 'min', '25','50','75','100','on']

        // loop through that array creating the buttons
        buttonValues.forEach(value => {

            const button = document.createElement('button')
            button.textContent = value
            button.light = light
            button.possibleValues = buttonValues
            button.value = value
            button.classList.add('lightName')

            if(value === 'self'){
                button.textContent = light._name
            }else{
                button.addEventListener('click', pressedSetLightPresetStatus)
            }

            section.append(button)
        })

        document.getElementById('main').append(section)
    })


}

function pressedSetLightPresetStatus(){
    // console.log('mian > pressedSetLightPresetStatus ', this.textContent, this.light)

    switch (this.textContent){
        case 'on':
            this.light.setOn(bridge, true)
            break
        case 'off':
            this.light.setOn(bridge, true)
            break
        case 'min':
            this.light.setBrightness(bridge, 0)
            break
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

}