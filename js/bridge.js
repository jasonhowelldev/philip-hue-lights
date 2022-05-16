class HueBridge {
    constructor(ip, user){
        this.ip = ip
        this.user = user
        this.url = `https://${ip}/api/${user}/`
        // https://<bridge ip address>/debug/clip.html
        // debug url = https://<bridge ip address>/debug/clip.html
    }

    sendGetCommand = async (api) => {
        console.log('url ',this.url+api)
        let response = await fetch(this.url+api)
        let data = await response.json()
        return data

        /*

        to use anything that calls this see example below
        const myVar = bridge.groups   // groups calls this
        myVar.then(function(group){
            // you can now use group's data 
        })

        */
    }

    sendPutCommand(url, body){
        console.log('bridge.js sendPutCommand ', url, body)

    }

    get groups() {
        return this.sendGetCommand('groups')

        // let result = {}
        // this.sendGetCommand('groups').then(data => {
        //     console.log('bridge groups', data)
        //     for(group in data) {
        //         result = group
        //     }
        // })

        // return result

    }

    get lights(){
        return this.sendGetCommand('lights')
    }

    get config(){
        return this.sendGetCommand('config')
    }

    get schedules(){
        return this.sendGetCommand('schedules')
    }

    get scenes(){
        return this.sendGetCommand('scenes')
    }  

    get sensors(){
        return this.sendGetCommand('sensors')
    }
    
    get rules(){
        return this.sendGetCommand('rules')
    } 

}