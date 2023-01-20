
var showOptionsOnHover = function (id) {
      const grocery = groceryData.find(a => a.id === id);
      let mainConatiner = document.getElementById("container");
      let groceryTabElement = document.getElementById("grocery-tab-" + id.toString());
      mainConatiner.childNodes.forEach(a => a.children[3].style.visibility = "hidden");
      groceryTabElement.children[3].style.visibility = "visible";
}

function filterGroceries(type) {
      const grocery = type === "all" ? groceryData : groceryData.filter(a => a.type === type);
      let options = document.getElementsByClassName("filterOption");
      for (var option of options) {
            if (type === option.id) {
                  option.classList.add("filterOptionActive");
            } else {
                  option.classList.remove("filterOptionActive");
            }
      }
      renderGrocertTab(grocery);
}



// Method to add groceries to cart.

var addToCart = function (id) {
      let oldList = getItem("cartList");
      if (oldList && oldList.length > 0) {
            oldList = JSON.parse(oldList);
            if (!oldList.includes(id)) {
                  oldList.push(id.replace("addCart_", ""));
                  setItem("cartList", JSON.stringify(oldList));
            }
      } else {
            let newList = [id.replace("addCart_", "")];
            newList = JSON.stringify(newList);
            setItem("cartList", newList);
      }
      alert("Item Added to cart!")
}

var removeFromCart = function (id) {
      let oldList = getItem("cartList");
      if (oldList && oldList.length > 0) {
            id = id.match(/\d+/)[0];
            oldList = JSON.parse(oldList);
            oldList = oldList.filter(a => a.replace("addCart_", "") !== id);
            setItem("cartList", JSON.stringify(oldList));
      }
      alert("Item removed from cart!");
      window.location.reload();
}

var createElement = function (tagName) {
      return document.createElement(tagName);
}


var buyNowItem = function(id){
      id = id.replace("buyNow_", "");
      window.location.href = "../html/buyNow.html" + "?productId=" + id;
}


var getGroceryData = function(id){
      return groceryData.find(a => a.id === Number(id));
}

var viewEditItemDetails = function(id){
      id = id.replace("view_", "");
      window.location.href = "../html/seller.html" + "?productId=" + id;
}
