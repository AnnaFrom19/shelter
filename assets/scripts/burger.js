export default class BurgerMenu {
    burgerInput = document.getElementById('burgerMenu');
    burgerLabel = document.querySelector('.burger-menu');
    navElement = document.querySelector('nav');
    linkElements = this.navElement.getElementsByTagName('a');
    blackBackground = document.createElement('div');

    constructor() {
        this.blackBackground.className = 'black-background';
        document.body.append(this.blackBackground);
        for (const onLinkElement of this.linkElements) {
            if (!onLinkElement.classList.contains('active')) {
                onLinkElement.addEventListener('click', () => this.closeBurger());
            }
            else {
                onLinkElement.addEventListener('click', (event) => { event.preventDefault(); this.closeBurger(); });
            }
        }
        this.blackBackground.addEventListener('click', () => this.closeBurger());
        this.burgerInput.addEventListener('change', () => {
            this.burgerInput.checked ? this.actionOnOpen() : this.actionOnClose();
        });
    }

    closeBurger() {
        this.burgerInput.checked = false;
        this.actionOnClose();
    }

    actionOnClose() {
        this.blackBackground.classList.remove('visible');
        document.body.style.overflowY = 'auto';
    }

    actionOnOpen() {
        this.blackBackground.classList.add('visible');
        document.body.style.overflowY = 'hidden';
    }
}