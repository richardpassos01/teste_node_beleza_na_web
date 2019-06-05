function editProduct() {
    let elements = document.getElementsByClassName("isDisabled")
    for (let i = 0; i < elements.length; ++i) {
        let item = elements[i];  
        item.disabled = false;
    }
}
