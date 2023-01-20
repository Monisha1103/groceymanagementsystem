
let userType = getUserType();

function getUserType(){
    if(window.location.search){
        return window.location.search.split("?type=")[1];
    }
    return 'customer';
}

if(userType === "customer"){
    var sellerInfo = document.getElementById("sellerInfo");
    if(sellerInfo){
        sellerInfo.style.display = "none";
    }
} else if(userType === "seller"){
    var home = document.getElementById("home");
    var myCart = document.getElementById("myCart");
    var myAcc = document.getElementById("myAcc");
    home.childNodes[0].href = "../html/home.html?type=seller";
    myCart.style.display = "none";
    myAcc.style.display = "none";
}



function renderGrocertTab(groceryData) {
    let mainConatiner = document.getElementById("container");
    if(!mainConatiner){return}
    mainConatiner.innerHTML = "";
    for (var i = 0; i < groceryData.length; i++) {
        let data = groceryData[i];
        let groceryTab = document.createElement("div");
        groceryTab.setAttribute("class", "grocery-tab");
        groceryTab.setAttribute("id", "grocery-tab-" + data.id.toString());

        let imgElement = document.createElement("img");
        imgElement.setAttribute("class", "grocery-img");
        if(data.img){
        imgElement.setAttribute("class", data.img);
        } else{
        imgElement.src = "../static/logo.png";
        }

        let nameElement = document.createElement("span");
        nameElement.setAttribute("class", "grocery-name");
        nameElement.innerHTML = data.groceryName;

        let priceElement = document.createElement("span");
        priceElement.setAttribute("class", "price");
        priceElement.innerHTML = "&#8377;" + " " + data.price.toString();

        let options = document.createElement("span");
        options.setAttribute("class", "options");

        renderGroceryTabOptions(options, data.id.toString());

        groceryTab.appendChild(imgElement);
        groceryTab.appendChild(nameElement);
        groceryTab.appendChild(priceElement);
        groceryTab.appendChild(options);
        mainConatiner.appendChild(groceryTab);
    }
}

const groceryData = [{ id: 01, groceryName: "Juice", price: 10, type: "snacks" }, { id: 02, groceryName: "Cookies", price: 20, type: "snacks"}, { id: 03, groceryName: "Egg", price: 10, type: "dairy" },
{ id: 04, groceryName: "Milk", price: 20, type: "dairy" }, { id: 05, groceryName: "Meat", price: 10, type: "meat" }, { id: 06, groceryName: "Choclate", price: 20, type: "snacks" },
{ id: 07, groceryName: "Oil", price: 10, type: "personal" }, { id: 08, groceryName: "Soap", price: 20, type: "personal" }, { id: 09, groceryName: "Cleaner", price: 10, type: "personal" },
{ id: 10, groceryName: "Tooth paste", price: 20, type: "personal" }, { id: 11, groceryName: "Rice", price: 10, type: "personal" }, { id: 12, groceryName: "Potato", price: 20, type: "vegetable" },
{ id: 13, groceryName: "Apple", price: 14, type: "fruit" }, { id: 14, groceryName: "Orange", price: 10, type: "fruit" },{ id: 15, groceryName: "Tender Fish", price: 10, type: "meat" },
{ id :16, groceryName: "Perfume", price: 100, type:"personal"}, { id :17, groceryName: "Perfume", price: 100, type:"personal"}];

document.addEventListener("load", this.renderGrocertTab(groceryData));

document.addEventListener("mouseover", function (args) {
    if (args.target.classList.contains("grocery-tab")) {
        let id = args.target.id.replace("grocery-tab-", "");
        showOptionsOnHover(Number(id));
    }
});

function renderGroceryTabOptions(optionsElement, index) {

    if(userType && userType === "seller"){
        let viewItem = document.createElement("lord-icon");
        let editItem = document.createElement("lord-icon");

        viewItem.src = "https://cdn.lordicon.com/nocovwne.json";
        viewItem.id = "view_" + index;
        viewItem.trigger = "hover";
        viewItem.setAttribute("style", "width:40px; height: 40px;");
        viewItem.title = "View Item Details";
        viewItem.addEventListener("click", function view(event){
            viewEditItemDetails(event.target.id);
        });

        editItem.src = "https://cdn.lordicon.com/puvaffet.json";
        editItem.id = "edit_" + index;
        editItem.trigger = "hover";
        editItem.setAttribute("style", "width:40px; height: 40px;");
        editItem.title = "Edit Item Details";
        editItem.addEventListener("click", function edit(event){
            viewEditItemDetails(event.target.id);
        });

        optionsElement.appendChild(viewItem);
        optionsElement.appendChild(editItem);
    } else {
        let cartSpan = document.createElement("lord-icon");
        let buyNowSpan = document.createElement("lord-icon");
        let favouriteSpan = document.createElement("lord-icon");

        cartSpan.src = "https://cdn.lordicon.com/hyhnpiza.json";
        cartSpan.id = "addCart_" + index;
        cartSpan.trigger = "hover";
        cartSpan.title = "Add to cart";
        cartSpan.addEventListener("click", function add(event){
            addToCart(event.target.id);
        });

        buyNowSpan.src = "https://cdn.lordicon.com/medpcfcy.json";
        buyNowSpan.id = "buyNow_" + index;
        buyNowSpan.trigger = "hover";
        buyNowSpan.title = "Buy Now";
        buyNowSpan.addEventListener("click", function buyNow(event){
            buyNowItem(event.target.id);
        });

        favouriteSpan.src = "https://cdn.lordicon.com/pnhskdva.json";
        favouriteSpan.id = "favourite_" + index;
        favouriteSpan.trigger = "hover";
        favouriteSpan.title = "Add to favourites";

        optionsElement.appendChild(cartSpan);
        optionsElement.appendChild(buyNowSpan);
        optionsElement.appendChild(favouriteSpan);
    }
}





