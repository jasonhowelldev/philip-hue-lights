//document.getElementById('submitBridgeInfo').addEventListener('click', saveBridgeInfo)
const getButtons = document.getElementsByClassName('getInfo')
for ( i=0; i<getButtons.length;i++) {
    console.log(getButtons[i])
    getButtons[i].addEventListener("click",getGroups)
}

if (!localStorage.getItem("bridgeIP")) {
    localStorage.setItem("bridgeIP", prompt("enter your bridge IP", 'x.x.x.x'))
}
if (!localStorage.getItem("bridgeUser")) {
    localStorage.setItem("bridgeUser", prompt("enter your bridge user"))
}
    //localStorage.setItem('bridgeIP',document.getElementById('bridgeIP'))
    //localStorage.setItem('bridgeUser',document.getElementById('bridgeUser'))
 
const bridge = new HueBridge(localStorage.getItem("bridgeIP"), localStorage.getItem("bridgeUser"))

function getGroups(){
    //const theGroups = bridge.groups
    console.log(this.name)
    document.getElementById('responseHeader').innerHTML = this.name

    const theResonse = bridge[this.name]

    theResonse.then(function(response){
        console.log('response ',response)
        
        document.getElementById('tempResponse').innerText = JSON.stringify(response)
        
    })

}

