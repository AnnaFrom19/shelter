export function createNotRepeated(fromQuantity, toQuantity) {
    const arrayShuffled = Array(fromQuantity).fill(0).map((data, index) => index).sort(() => (Math.random() > .5) ? 1 : -1);
    return arrayShuffled.slice(0, toQuantity);
}

export function createNotRepeatedInThisArray(fromQuantity, toQuantity, notThisArray) {
    const arrayShuffled = Array(fromQuantity)
        .fill(0)
        .map((data, index) => index)
        .filter(data => notThisArray.indexOf(data) < 0)
        .sort(() => (Math.random() > .5) ? 1 : -1);        
    return arrayShuffled.slice(0, toQuantity);
}

export function defaultCardsQuantity() {
    if (document.body.offsetWidth <= 750) {        
        return 1;
    }
    if (document.body.offsetWidth <= 1258) 
    {                    
        return 2;
    }    
    return 3;
}

export function createOneCard(data, number, popup) {
    const elementWrapper = document.createElement('div');
    elementWrapper.classList.add('one-pet-card');
    elementWrapper.innerHTML = `
                    <img alt="${data.name}" src="${data.imgSmall}">
                    <p>${data.name}</p>
                    <button class="pet-card__button">Learn more</button>
    `;  
    elementWrapper.addEventListener('click', () => {            
        if(popup) popup.openPopup(number);
    });  
    return elementWrapper;
}


