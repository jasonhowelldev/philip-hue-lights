document.querySelector("button").addEventListener("click", getAPIResult)

function getAPIResult(){
    let input = document.querySelector('input').value

    const url = ``

    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
}
