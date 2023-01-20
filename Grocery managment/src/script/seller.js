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
    
    leftSide.appendChild(img);
    rightSide.appendChild(header);
    rightSide.appendChild(rating);
    rightSide.appendChild(price);

    buyNowContainer.appendChild(leftSide);
    buyNowContainer.appendChild(rightSide);
}

let productId = window.location.search.match(/\d+/)[0];
let actionType = window.location.search.includes("edit") ? "editItem" : "viewItem";

loadBuyNowItem();

if(actionType === "editItem"){
    document.getElementById("detailsContainer").style.display = "block";
} else {
    document.getElementById("detailsContainer").style.display = "none";
}

document.addEventListener("change", function(event){
    if(event.target.classList.contains("quantity")){
        let groceryData = getGroceryData(productId);
        let changedPrice = groceryData.price * Number(event.target.value);
        document.querySelector(".price").innerHTML = "&#8377;" + " " + changedPrice;
    }
})

function editDetails(args){
    let inputs = document.querySelectorAll("#leftSide input")
    let el = document.querySelector(".fa-edit") || document.querySelector(".fa-save");

    if(args.target.classList.contains("fa-edit")){
        inputs.forEach(a => a.removeAttribute("disabled"));
        el.classList.replace("fa-edit", "fa-save");
        el.innerHTML = "&nbsp;Save product details";
    } else {
        inputs.forEach(a => a.setAttribute("disabled", true));
        el.classList.replace("fa-save", "fa-edit");
        el.innerHTML = "&nbsp;Edit product details";
        saveDetails(inputs);
    }
}

function saveDetails(inputs){
    
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

function changeProductDetails(event){
    let header = document.getElementsByClassName("header")[0];
    let rating = document.getElementsByClassName("rating")[0];
    let price = document.getElementsByClassName("price")[0];
    if(event.target.id === "productName"){
        header.innerHTML = event.target.value;
    } else if(id === "productPrice"){
        rating.innerHTML = event.target.value;
    } else if(id === "productType"){
        
    } else if(id === "productDesc"){
        price.innerHTML = event.target.value;
    }
}

