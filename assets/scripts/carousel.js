import { createNotRepeated, createNotRepeatedInThisArray, defaultCardsQuantity, createOneCard } from "./helper.js";

export default class Carousel {
    frameElement = document.querySelector("div.pets-cards__frame");
    wrapperElement = document.querySelector("div.pets-cards__all_cards-wrapper");
    navElements = document.getElementsByClassName("pets-cards__nav__button");
    baseCardQuantity = this.cardOnScreen();
    numbersArray = [];
    data = [];
    onRotate = false;

    resizeObserver = new ResizeObserver(() => {
        if (this.baseCardQuantity !== this.cardOnScreen()) {
            this.baseCardQuantity = this.cardOnScreen();
            this.setAllCards();
        }
    })

    popup = null;
    
    constructor(popupClass) {
        if (popupClass) this.popup = popupClass;
        (async () => {
            this.data = await fetch("../../assets/data/data.json").then(res => res.json()).catch((e) => { console.log(e) });
            this.setAllCards();
            if (this.popup) this.popup.storeData(this.data);
        })();
        this.wrapperElement.addEventListener("animationend", () => {
            const moveToLeft = this.wrapperElement.style.animation.toString().includes('Left');
            this.wrapperElement.style.animation = '';
            this.onRotate = false;
            this.changeData(moveToLeft);
        });
        this.resizeObserver.observe(document.body);
        for (const oneNavElement of this.navElements) {
            oneNavElement.addEventListener('click', () => {
                if (!this.onRotate) {
                    this.nextElements(oneNavElement.classList.contains('button_previews'));
                }
            });
        }
    }

    setAllCards() {
        this.wrapperElement.innerHTML = '';
        this.numbersArray = [];
        const cardQuantity = this.baseCardQuantity;
        const mainData = createNotRepeated(8, cardQuantity);
        const leftData = createNotRepeatedInThisArray(8, cardQuantity, mainData);
        const rightData = createNotRepeatedInThisArray(8, cardQuantity, mainData);
        [leftData, mainData, rightData].forEach((array) => this.appendDataToWrapper(array));
    }

    resetSomeCards(addToLeft) {
        const cardQuantity = this.baseCardQuantity;
        const mainData = this.numbersArray[addToLeft ? 0 : 2];
        const leftData = !addToLeft ? this.numbersArray[1] : createNotRepeatedInThisArray(8, cardQuantity, mainData);
        const rightData = addToLeft ? this.numbersArray[1] : createNotRepeatedInThisArray(8, cardQuantity, mainData);
        if (!addToLeft) {
            this.numbersArray.shift();
            this.numbersArray.push(rightData);
            this.removeFrom(true, cardQuantity);
            this.addTo(false);
        }
        else {
            this.numbersArray.pop();
            this.numbersArray.unshift(leftData);
            this.removeFrom(false, cardQuantity);
            this.addTo(true);
        }

    }

    removeFrom(begin, quantity) {
        const allDivs = Array.from(this.wrapperElement.getElementsByClassName("one-pet-card"));
        const toRemove = begin ? allDivs.slice(0, quantity) : allDivs.slice(allDivs.length - quantity);
        for (const divToRemove of toRemove) divToRemove.remove();
    }

    addTo(begin) {
        const arrayToAdd = begin ? this.numbersArray[0] : this.numbersArray[2];
        for (const data of arrayToAdd) begin ? this.wrapperElement.prepend(this.createOneCard(data)) : this.wrapperElement.append(this.createOneCard(data));
    }

    cardOnScreen() {
        const cardQuantity = defaultCardsQuantity();
        const dataSizes = ["270px", "580px", "990px"];
        this.frameElement.style.maxWidth = dataSizes[cardQuantity - 1];
        return cardQuantity;
    }

    appendDataToWrapper(someArray) {
        this.numbersArray.push(someArray);
        for (const data of someArray) this.wrapperElement.append(this.createOneCard(data));
    }

    nextElements(moveToLeft = true) {
        this.onRotate = true;
        const animation = moveToLeft ? 'moveLeft' : 'moveRight';
        this.wrapperElement.style.animation = `1s ease-in ${animation}`;
    }

    changeData(movedToLeft) {
        this.resetSomeCards(movedToLeft);
    }

    createOneCard(number) {
        return createOneCard(this.data[number], number, this.popup);
    }
}
