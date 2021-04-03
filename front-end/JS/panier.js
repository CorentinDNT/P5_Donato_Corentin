let productSavedInLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(productSavedInLocalStorage);


/*----------------*\
  AFFICHAGE PANIER
\*----------------*/
const cartItemContainer = document.querySelector("#container-cart");
console.log(cartItemContainer);

//Si le panier est vide, afficher : le panier est vide
if (productSavedInLocalStorage === null || productSavedInLocalStorage == 0) {
    const emptyCart = `
    <div class="conatiner-empty-cart">
        <div>Le panier est vide</div>
    </div>`;
    cartItemContainer.innerHTML = emptyCart;

} else {
    let cartItemStructure = [];

    for (let i = 0; i < productSavedInLocalStorage.length; i++) {
        cartItemStructure = cartItemStructure + `
        <div class="container-recap">
            <div>${productSavedInLocalStorage[i].quantite} ${productSavedInLocalStorage[i].nomPrduit} - ${productSavedInLocalStorage[i].option_produit}</div>
            <div>prix total : ${productSavedInLocalStorage[i].prix} Euors - <button class="btn-delete">supprimer</button> ${productSavedInLocalStorage[i].nomPrduit} ?</div>
        </div>`;
        cartItemContainer.innerHTML = cartItemStructure;
    }
}

/*-------------------------------------*\
            SUPPRESSION PANIER
\*-------------------------------------*/

//selection des éléments a supprimer avec le bouton qui contient la classe="btn-delete"
let deleteButton = document.querySelectorAll(".btn-delete");
console.log(deleteButton);

for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", (e) => {
        e.preventDefault();

        //selection de l'ID a supprimer en cliquant sur le BTN
        let slectedIdToDelete = productSavedInLocalStorage[i].id_ProduitSelectionner;
        console.log(slectedIdToDelete);

        //avec la methode .filter je selectionne les éléments a garder et je retire celui qui a été cliqué
        productSavedInLocalStorage = productSavedInLocalStorage.filter( el => el.id_ProduitSelectionner !== slectedIdToDelete);
        console.log(productSavedInLocalStorage);

        //on evoie la var dans le local storage
        localStorage.setItem("produit", JSON.stringify(productSavedInLocalStorage));
        window.location.href = "../pages/panier.html"
    })
}

//-----------------------------------------|
//------------VIDER TOUT LE PANIER---------|
//-----------------------------------------|

//Le code du bouton a afficher dans la page
const buttonDeleteAllCartHTML = `
    <button class="deleteAllCart">Vider le panier !</button>
`;

//Insertion du bouton dans le HTML du panier
cartItemContainer.insertAdjacentHTML("beforeend", buttonDeleteAllCartHTML);

//Selection de la classe buttonDeleteAllCartHTML
const buttonDeleteAllCart = document.querySelector(".deleteAllCart");

//Suppression de la clé produit dans le localStorage
buttonDeleteAllCart.addEventListener("click", (e) => {
    e.preventDefault();

    //.removeItem pour vider le localStorage
    localStorage.removeItem("produit");

    //recharger la page
    window.location.href = "../pages/panier.html"
});