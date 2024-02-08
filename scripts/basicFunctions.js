export function childRemover(element){
    while(element.firstChild)
    {  
        element.removeChild(element.firstChild);
    }
}

export function createElement(element){
    return document.createElement(element)
}

export function append(parent, child){
    return parent.append(child)
}

export function setClassAttribute(element, value){
    element.classList.add(value)
}

export function setIdAttribute(element, value){
    element.classList.add(value)
}

export function setInnerHTML(element, value){
    element.innerHTML = value
}

export function addElementToArr(arr, element){
    arr.push(element)
}

export function getElementById(element){
    const el = document.getElementById(element)

    return{
        getElement(){
            return el
        },
        getValue(){
            return el.value
        },
        getFirstChild(){
            return el.firstChild
        }
    }
}

export function querySelector(element){
    const el = document.querySelector(element)

    return{
        getElement(){
            return el
        },
        getValue(){
            return el.value
        }
    }
}

export function getItem(element){
    const el = element

    return{
        getElement(){
            return el
        },
        getValue(){
            return el.value
        },

    }
}

export function getInput(input){
    const el = input

    return{
        getInput(){
            return el
        },
        getValue(){
            return el.value
        },
        getPlaceholder(){
            return el.placeholder
        }, 

    }
}

export function getArr(arr){
    const el = arr

    return{
        getElement(){
            return el
        },
        getElementIndex(index){
            return el[index]
        },
        spliceArr(index, length){
            el.splice(index, length)
        },
        getLength(){
            return el.length
        },
        pushItem(element){
            el.push(element)
        },
        incrementElementInObj(index, key, amount){
            el[index][key] += amount
        },
        decrementElementInObj(index, key, amount){
            el[index][key] -= amount
        }
    }
}