export default class Popup {
    blackScreen = document.createElement('div');
    popupWrapper = document.createElement('div');
    data;

    constructor() {
        this.blackScreen.classList.add('black-screen');
        this.popupWrapper.classList.add('popup-wrapper');
        this.blackScreen.append(this.popupWrapper);
        this.blackScreen.addEventListener('click', () => {this.closePopup();});
        this.popupWrapper.addEventListener('click', (event) => {event.stopPropagation();});
    }

    storeData(data) {
        this.data=data;
    }

    openPopup(dataId) {
        const currentData = this.data[dataId];
        const closeButton = document.createElement('button');
        closeButton.id = "closeButton";
        closeButton.classList.add('close-button');
        closeButton.addEventListener('click', () => {this.closePopup();});        
        this.popupWrapper.innerHTML = `
        <div class="popup__img-wrapper">
          <img src="${currentData.img}" alt="${currentData.name}"/>
        </div>
        <div class="popup__content-wrapper">
        <h2 class="popup_header">${currentData.name}</h2>
        <h3 class="popup_sub-header">${currentData.type} - ${currentData.breed}</h3>
        <p class="popup_data">${currentData.description}</p>
        <ul class="popup-pet-info">
        <li><span>Age:</span> ${currentData.age}</li>
        <li><span>Inoculations:</span> ${currentData.inoculations.join(', ')}</li>
        <li><span>Diseases:</span> ${currentData.diseases.join(', ')}</li>
        <li><span>Parasites:</span> ${currentData.parasites.join(', ')}</li>
        </ul>
        </div>
        `;
        this.popupWrapper.prepend(closeButton);                
        document.body.append(this.blackScreen);
    }
    
    closePopup() {
        this.blackScreen.remove();
    }
}
