import "./dropdown.scss";

class DropdownController {

    init() {
        this.selectedItem = this.data[0];
    }

    onItemClick(item) {
        if(item !== this.selectedItem) {
            this.selectedItem = item;
            this.isOpened = false;
            this.onChange({item: this.selectedItem});
        }
    }

    close() {
        this.isOpened = false;
    }

    toggle() {
        this.isOpened = !this.isOpened;
    }

    $onChanges(changesObj) {
        this.init();
    }
}

export default {
    templateUrl: "components/shared/dropdown/dropdown.html",
    controller: DropdownController,
    bindings: {
        data: "<",
        onChange: "&"
    }
};