export class SidebarService {
    constructor() {
        this.isOpen = false;
    }

    toggle(data) {
        this.isOpen ? this.closeNav() : this.openNav();
    }

    openNav() {
        document.getElementById("mySidenav").style.width = "140px";
        this.isOpen = true;
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        this.isOpen = false;
    }
}