document.addEventListener("load", loadMyCartDetails());

function loadMyCartDetails() {
    var cartList = getItem("cartList");
    if (cartList && cartList !== "[]" && cartList.length > 0) {
        cartList = JSON.parse(cartList);
        renderCartGroceries(cartList);
    } else {
        let cartContainer = document.getElementById("myCart-container");
        let heading = document.getElementsByTagName("h1");
        if(!heading || !cartContainer){return}
        heading[0].innerHTML = "Empty Cart! Add the groceries to see the list!"
        cartContainer.style.boxShadow = "none";
        cartContainer.style.backgroundColor = "#ffffff"
        let emptyCart = document.createElement("img");
        let center = document.createElement("center");
        emptyCart.src = "../static/emptyCart.png";
        emptyCart.style.width = "40%";
        center.appendChild(emptyCart);
        cartContainer.appendChild(center);
        
    }
}

function renderCartGroceries(groceries) {
    let cartContainer = document.getElementById("myCart-container");
    let table = document.createElement("div");
    table.setAttribute("class", "cartGroceriesTable");
    for (var i = 0; i < groceries.length; i++) {
        const data = getGroceryData(groceries[i]);
        let rowEl = document.createElement("div");
        rowEl.className = "cartRow"

        let nameColumn = document.createElement("span");
        nameColumn.className = "nameColumn";
        nameColumn.innerHTML = data.groceryName;

        let priceColumn = document.createElement("span");
        priceColumn.className = "priceColumn";
        priceColumn.innerHTML =  "&#8377;" + " " + data.price;

        let optionsColumn = document.createElement("span");
        optionsColumn.className = "optionsColumn";
        renderCartGroceryOptions(optionsColumn, data.id.toString())

        rowEl.appendChild(nameColumn);
        rowEl.appendChild(priceColumn);
        rowEl.appendChild(optionsColumn);

        table.appendChild(rowEl);
    }
    if(cartContainer !=null){
        cartContainer.appendChild(table);
    }
}

function getGroceryData(id){
    id = id.replace("addCart_", "")
    return groceryData.find(a => a.id === Number(id));
}

function renderCartGroceryOptions(optionsElement, index) {
    let buyDiv = document.createElement("span");
    let cartDiv = document.createElement("span");
    let cartSpan = document.createElement("lord-icon");
    let buyNowSpan = document.createElement("lord-icon");
    let removeContent = document.createElement("span");
    let buyContent = document.createElement("span");

    cartSpan.src = "https://cdn.lordicon.com/slkvcfos.json";
    cartSpan.id = "addCart_" + index;
    cartSpan.trigger = "hover";
    

    removeContent.innerHTML = "Remove From Cart"
    cartDiv.className = "optionsCartRemove";
    cartDiv.id = "optionsCartRemove_" + index;
    cartDiv.appendChild(cartSpan);
    cartDiv.appendChild(removeContent);
    cartDiv.title = "Remove from cart";
    cartDiv.addEventListener("click", function remove(event){
        let id = event.target.classList.contains("optionsCartRemove") ? event.target.id : event.target.parentElement.id; 
        removeFromCart(id)
    });

    buyNowSpan.src = "https://cdn.lordicon.com/medpcfcy.json";
    buyNowSpan.id = "buyNow_" + index;
    buyNowSpan.trigger = "hover";
    buyNowSpan.title = "Buy Now";
    buyContent.innerHTML = "Buy Now"
    buyDiv.className = "optionsCartBuy";
    buyDiv.id = "optionsCartBuy_" + index;
    buyDiv.appendChild(buyNowSpan);
    buyDiv.appendChild(buyContent);
    buyDiv.title = "Buy Now";
    buyDiv.addEventListener("click", function buyNow(event){
        let id = event.target.classList.contains("optionsCartBuy") ? event.target.id : event.target.parentElement.id; 
        buyNowItem(id);
    });

    optionsElement.appendChild(buyDiv);
    optionsElement.appendChild(cartDiv);
} 
