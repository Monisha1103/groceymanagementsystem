function loadBuyNowItem(){
    const buyNowContainer = document.getElementById("buyNowContainer");
    
let groceryData = getGroceryData(productId);
    const rightSide = document.createElement("div");
    rightSide.setAttribute("class", "rightSide");
    const leftSide = document.createElement("div");
    leftSide.setAttribute("class", "leftSide");

    let img = document.createElement("img");
    img.title = "Image";
    if(groceryData.img){
        img.setAttribute("class", groceryData.img);
    } else {
    img.setAttribute("class", "buyPageImg");
    img.setAttribute("src", "../static/logo.png");
    }

    let header = document.createElement("h1");
    header.innerHTML = groceryData.groceryName;
    header.setAttribute("class", "header");

    let rating = document.createElement("span");
    rating.innerHTML = "4 Star &#9733; &#9733; &#9733; &#9733;"
    rating.setAttribute("class", "rating");

    let price = document.createElement("div");
    price.innerHTML = "&#8377;" + " " + groceryData.price;
    price.setAttribute("class", "price");

    let quantity = document.createElement("input");
    quantity.setAttribute("class", "quantity");
    quantity.type = "number";
    quantity.setAttribute("min", 1);
    quantity.setAttribute("max", 100);
    quantity.setAttribute("placeholder", "Enter quantity..");
    
    leftSide.appendChild(img);
    rightSide.appendChild(header);
    rightSide.appendChild(rating);
    rightSide.appendChild(price);
    rightSide.appendChild(quantity);

    buyNowContainer.appendChild(leftSide);
    buyNowContainer.appendChild(rightSide);
}

let productId = window.location.search.match(/\d+/)[0];

loadBuyNowItem();

document.addEventListener("change", function(event){
    if(event.target.classList.contains("quantity")){
        let groceryData = getGroceryData(productId);
        let changedPrice = groceryData.price * Number(event.target.value);
        document.querySelector(".price").innerHTML = "&#8377;" + " " + changedPrice;
    }
})

function editAddress(args){
    let inputs = document.querySelectorAll("#leftSide input")
    let el = document.querySelector(".fa-edit") || document.querySelector(".fa-save");

    if(args.target.classList.contains("fa-edit")){
        inputs.forEach(a => a.removeAttribute("disabled"));
        el.classList.replace("fa-edit", "fa-save");
        el.textContent = "Save Address";
    } else {
        inputs.forEach(a => a.setAttribute("disabled", true));
        el.classList.replace("fa-save", "fa-edit");
        el.textContent = "Edit Address";
        saveAddress(inputs);
    }
}

function saveAddress(inputs){
    let address = [];
    for(var i =0; i < inputs.length; i++){
        address[i] = inputs[i].value;
    }
    window.sessionStorage.setItem("address", JSON.stringify(address));
}

setTimeout( function(){
    let inputs = document.querySelectorAll("#leftSide input");
    let address = window.sessionStorage.getItem("address");
    address = JSON.parse(address);
    if(address && address.length){
        for(var i =0; i < inputs.length; i++){
            inputs[i].value = address[i];
        }
    }
}, 100)

function placeOrder(){
    let placeOrder = document.getElementById("placeOrder");
    let icon = document.createElement("lord-icon");
    icon.src = "https://cdn.lordicon.com/ivayzoru.json";
    icon.trigger = "loop";
    icon.delay = "2000";
    icon.colors = "outline:#121331,primary:#121331,secondary:#16c72e";
    placeOrder.childNodes[1].replaceWith(icon);
    placeOrder.innerHTML = placeOrder.innerHTML.replace("Place Order!", "Order Placed!");

    setTimeout(function(){
        window.location.href = "../html/home.html";
    }, 3000)
}
