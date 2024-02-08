import * as basic from "./basicFunctions.js"
import * as user from "../storage/users.js"
import * as location from "../storage/countries_data.js"
import * as specific from "./appSpecific.js"

const leaderboard = basic.getArr(user.leaderboard) 
let idSetter = leaderboard.getLength()
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

const main = basic.querySelector("main")
const userSubmit = basic.getElementById("user-submit")
const errorMsgContainer = basic.getElementById("error-msg-container")

displayUserData(leaderboard)

userSubmit.getElement().addEventListener("click", function(e){
    e.preventDefault()
    basic.childRemover(errorMsgContainer.getElement())

    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    const firstName = basic.getInput(inputs[0])
    const lastName = basic.getInput(inputs[1])
    const country = basic.getInput(inputs[2])
    const playerScore = basic.getInput(inputs[3])
    let isEmpty = true
    let isReady = true

    inputs.forEach(input => {
        if(input.value == ""){
            isReady = false
            isEmpty = false
            specific.errorMsgPopup(errorMsgContainer.getElement(), input.placeholder, "is empty")
        }
    })

    if(!isEmpty) return

    for(let i = 0; i < location.countries.length; i++){
        if(country.getValue() === location.countries[i].name){
            isReady = true
            break;
        }
        else{
            isReady = false
        }
        if(isReady == false && location.countries.length-1 === i){
            specific.errorMsgPopup(errorMsgContainer.getElement(), country.getValue(), "is not a country")
        }
    }

    if(playerScore.getValue() < 0){
        console.log("minus")
        specific.errorMsgPopup(errorMsgContainer.getElement(), playerScore.getPlaceholder(), "is negative. Please enter positive number")
        isReady = false
    }

    if(isReady){
        const date = new Date()

        const user = {
            firstName: firstName.getValue(),
            lastName: lastName.getValue(),
            date: `${month[date.getMonth()]} ${date.getDay()} ${date.getFullYear()}`,
            country: country.getValue(),
            playerScore: parseInt(playerScore.getValue()),
            id: setId
        }

        basic.addElementToArr(leaderboard, user)
        displayUserData(leaderboard)
    }
})

function displayUserData(data) {

    basic.childRemover(main.getElement())

    data.getElement().sort((a,b) => b.playerScore - a.playerScore)
    data.getElement().forEach((element,index) => {
       
        const userContainer = basic.createElement("div")
        const userInfo = basic.createElement("div")
        const userNameDate = basic.createElement("div")
        const name = basic.createElement("p")
        const date = basic.createElement("p")
        const country = basic.createElement("p")
        const score = basic.createElement("p")
        const userControls = basic.createElement("div")
        const deleteButton = basic.createElement("button")
        const addButton = basic.createElement("button")
        const removeButton = basic.createElement("button")

        basic.setClassAttribute(userContainer, "user-container")
        basic.setClassAttribute(userInfo, "user-info")
        basic.setClassAttribute(userNameDate, "user-name-date")
        basic.setClassAttribute(userControls, "user-controls")
        basic.setClassAttribute(deleteButton, "delete-button")

        basic.setInnerHTML(name, `${element.firstName} ${element.lastName}`)
        basic.setInnerHTML(date, element.date)
        basic.setInnerHTML(country, element.country)
        basic.setInnerHTML(score, element.playerScore)
        basic.setInnerHTML(deleteButton, `<i class="fa-solid fa-trash"></i>`)
        basic.setInnerHTML(addButton, "+5")
        basic.setInnerHTML(removeButton, "-5")

        basic.append(userContainer, userInfo)
        basic.append(userInfo, userNameDate)
        basic.append(userNameDate, name)
        basic.append(userNameDate, date)
        basic.append(userInfo, country)
        basic.append(userInfo, score)
        basic.append(userContainer, userControls)
        basic.append(userControls, deleteButton)
        basic.append(userControls, addButton)
        basic.append(userControls, removeButton)
        basic.append(main.getElement(), userContainer)

        deleteButton.addEventListener("click", function() {
            data.spliceArr(index, 1)
            displayUserData(data)
        })

        addButton.addEventListener("click", function(){
            data.incrementElementInObj(index, "playerScore", 5)
            displayUserData(data)
        })

        removeButton.addEventListener("click", function(){
            data.decrementElementInObj(index, "playerScore", 5)
            displayUserData(data)
        })

    });

}

function setId(){
    idSetter += 1
    return idSetter
}


const testMain = basic.querySelector("main").getElement()
console.log(testMain.firstChild)
