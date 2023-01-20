var setItem = function(itemId, value){
    window.sessionStorage.setItem(itemId, value);
}

var getItem = function(itemId){
    return window.sessionStorage.getItem(itemId);
}

var removeItem = function(itemId){
    window.sessionStorage.removeItem(itemId);
}

var clearStorage = function(){
    window.sessionStorage.clear();
}