import { defaultCardsQuantity, createOneCard } from "./helper.js";
import { PETS_CARDS_ON_PAGE, PETS_MAX_CARDS, PETS_MAX_ON_PAGE, PETS_MID_ON_PAGE } from "./constants.js";

export default class Paginator {
    popup = null;
    petsInPage = this.setPetsArray();
    cardsOnPageQuantity = PETS_CARDS_ON_PAGE[defaultCardsQuantity() - 1];
    currentPage = 0;
    maxPages = Math.floor(PETS_MAX_CARDS / this.cardsOnPageQuantity);
    cardsWrapper = document.querySelector("div.pets-cards__wrapper");
    pageNavigation = {
        firstPage: document.querySelector("button.double-lt-round-nav"),
        prevPage: document.querySelector("button.lt-round-nav"),
        currentPage: document.querySelector("button.one-page-round-nav"),
        nextPage: document.querySelector("button.rt-round-nav"),
        lastPage: document.querySelector("button.double-rt-round-nav"),
    };
    resizeObserver = new ResizeObserver(() => {
        if (this.cardsOnPageQuantity !== PETS_CARDS_ON_PAGE[defaultCardsQuantity() - 1]) {
            this.cardsOnPageQuantity = PETS_CARDS_ON_PAGE[defaultCardsQuantity() - 1];
            this.maxPages = Math.floor(PETS_MAX_CARDS / this.cardsOnPageQuantity);
            this.currentPage = Math.min(this.currentPage, this.maxPages - 1);
            this.gotoPage(this.currentPage);
        }
    });

    constructor(popup) {
        if (popup) this.popup = popup;
        (async () => {
            this.data = await fetch("../../assets/data/data.json").then(res => res.json()).catch((e) => { console.log(e) });
            if (this.popup) this.popup.storeData(this.data);
            this.gotoPage(0);
        })();
        this.resizeObserver.observe(document.body);
        this.pageNavigation.firstPage.addEventListener('click', () => {
            if (!this.pageNavigation.firstPage.classList.contains("disabled")) {
                this.gotoPage(0);
            }
        });
        this.pageNavigation.prevPage.addEventListener('click', () => {
            if (!this.pageNavigation.prevPage.classList.contains("disabled")) {
                this.gotoPage(this.currentPage - 1);
            }
        });
        this.pageNavigation.lastPage.addEventListener('click', () => {
            if (!this.pageNavigation.lastPage.classList.contains("disabled")) {
                this.gotoPage(this.maxPages - 1);
            }
        });
        this.pageNavigation.nextPage.addEventListener('click', () => {
            if (!this.pageNavigation.nextPage.classList.contains("disabled")) {
                this.gotoPage(this.currentPage + 1);
            }
        });
    }

    resetNavigation() {
        if (this.currentPage) {
            this.pageNavigation.firstPage.classList.remove("disabled");
            this.pageNavigation.prevPage.classList.remove("disabled");
        }
        else {
            this.pageNavigation.firstPage.classList.add("disabled");
            this.pageNavigation.prevPage.classList.add("disabled");
        }
        if ((this.currentPage + 1) < this.maxPages) {
            this.pageNavigation.lastPage.classList.remove("disabled");
            this.pageNavigation.nextPage.classList.remove("disabled");
        }
        else {
            this.pageNavigation.lastPage.classList.add("disabled");
            this.pageNavigation.nextPage.classList.add("disabled");
        }
        this.pageNavigation.currentPage.innerHTML = this.currentPage + 1;
    }

    gotoPage(page) {
        this.currentPage = page;
        this.setCardsOnPage();
        this.resetNavigation();
    }

    setCardsOnPage() {
        this.cardsWrapper.innerHTML = "";
        const baseNumber = this.currentPage * this.cardsOnPageQuantity;
        for (let i = baseNumber; i < baseNumber + this.cardsOnPageQuantity; i++) {
            this.cardsWrapper.append(this.createOneCard(this.petsInPage[i]));
        }
    }

    createOneCard(number) {
        return createOneCard(this.data[number], number, this.popup);
    }

    setPetsArray() {
        let petsArray = [];
        while (petsArray.length < PETS_MAX_CARDS) {
            const petsArrayLength = petsArray.length;
            const currentSet = new Set();
            let testSet = (petsArrayLength >= PETS_MID_ON_PAGE) ? new Set(petsArray.slice(petsArrayLength - PETS_MID_ON_PAGE)) : new Set();

            while (currentSet.size < PETS_MAX_ON_PAGE) {
                let newPetNumber = Math.floor(Math.random() * PETS_MAX_ON_PAGE);
                if (!currentSet.has(newPetNumber) && !testSet.has(newPetNumber)) {
                    currentSet.add(newPetNumber);
                    if (testSet.size > 0) {
                        const toTestArray = [...testSet];
                        toTestArray.shift();
                        testSet = new Set(toTestArray);
                    }
                }
            }

            petsArray = petsArray.concat([...currentSet]);
        }
        return petsArray;
    }
}
