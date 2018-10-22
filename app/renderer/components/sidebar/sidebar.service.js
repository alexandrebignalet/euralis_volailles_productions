export class SidebarService {
    constructor() {
        this.isOpen = false;
    }

    toggle() {
        this.isOpen ? this.closeNav() : this.openNav();
    }

    isOpen() {
        return this.isOpen;
    }

    openNav() {
        document.getElementById("mySidenav").style.width = "140px";
        this.isOpen = true;
    }

    closeNav() {
        if(this.isOpen) {
            document.getElementById("mySidenav").style.width = "0";
            this.isOpen = false;
        }
    }
}