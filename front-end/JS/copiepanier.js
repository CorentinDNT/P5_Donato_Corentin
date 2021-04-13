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
//-----------------------------------------|
//------------PRIX TOTAL DU PANIER---------|
//-----------------------------------------|

//Declatarion de la variable pour le prix total du panier
let totalPriceCart = [];

for (let i = 0; i < productSavedInLocalStorage.length; i++) {
    let productPriceInCart = productSavedInLocalStorage[i].prix;

    //metttre les prix du panier dans la variable totalPriceCart
    totalPriceCart.push(productPriceInCart)
    console.log(totalPriceCart);

}

//additionner les prix du tableau totalPriceCart avec la methode .reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = totalPriceCart.reduce(reducer);

//Afficher le HTML
const totalPriceHTML = `
    <div class="showHTMLPrice">Le prix total est de : ${totalPrice}</div>
`;

cartItemContainer.insertAdjacentHTML("beforeend", totalPriceHTML);

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

//-----------------------------------------|
//--------LE FORMUMAIRE DE COMMANDE--------|
//-----------------------------------------|
const showFormCommandHTML = () => {

    const insertFormCommandHTML = document.querySelector("#container");

    const formStructure = `
    <div id="container-commande">
        <div id="formulaire-commande">
        <h2 id="title-command">Remplissez le formulaire pour valider la commande</h2>
        
        <form action="#" id="command-form">
            <label for="nom">Nom :</label>
            <input class="imput-command" type="text" id="nom" name="nom" required>
            
            <label for="prenom">Prénom :</label>
            <input class="imput-command" type="text" id="prenom" name="prenom" required>
            
            <label for="mail">e-mail :</label>
            <input class="imput-command" type="text" id="mail" name="mail" required>
            
            <label for="adresse">Adresse :</label>
            <textarea class="imput-command" id="adresse" name="adresse" required></textarea>
            
            <label for="ville">Ville :</label>
            <input class="imput-command" type="text" id="ville" name="ville" required>
            
            <button id="envoyerFormulaire" type="submit" name="envoyerFormulaire">Valider la commande</button>
        </form>
        </div>
    </div>
    `;

    insertFormCommandHTML.insertAdjacentHTML("afterend", formStructure);
};

showFormCommandHTML();

//-----------------------------------------|
//--------CONFIRMATION DE COMMANDE---------|
//-----------------------------------------|

//selection du bouton pour envoyer le fomrulaire
const buttonSendForm = document.querySelector("#envoyerFormulaire");

buttonSendForm.addEventListener("click", (e) => {
e.preventDefault();

//Recuperation des valeurs du form
    const formValues = {
        nom : document.querySelector("#nom").value,
        prenom : document.querySelector("#prenom").value,
        mail : document.querySelector("#mail").value,
        adresse : document.querySelector("#adresse").value,
        ville : document.querySelector("#ville").value
    }
//-----------------------------------------\
//--------VALIDATION DU FORMULAIRE---------|
//-----------------------------------------/
function regexNomPrenomVille(value) {
    return /^[A-Za-z]{3,20}$/.test(value);
}
//Créer l'espression Régulière qui va valider l'e-mail.
/*^commence par et peut en avoir plusieurs, doit contenir un seul @ puis encore A-Za-z0-9_-. plusieurs fois et un seul point et des carateres enre a-z entre 2 et 10fois*/
let mailRegex = new RegExp('^[A-Za-z0-9_-.]+[@]{1}[A-Za-z0-9_-.]+[.]{1}[a-z]{2,10}$', 'g');

function textAlert(value) {
    return value + " : Chiffre et symboles ne sont pas accéptés. \n Merci de ne pas dépasser 20 caractères";
}
function nomControle() {
    //Controle caractériel nom
    const leNom = formValues.nom;
    if(regexNomPrenomVille(leNom)) {
        return true;
    }else{
        alert(textAlert("Nom :"))
        return false;
    }
}
function prenomControle() {
    //Controle caractériel prenom
    const lePrenom = formValues.prenom;
    if(regexNomPrenomVille(lePrenom)) {
        return true;
    }else{
        alert(textAlert("Prenom :"))
        return false;
    }
}
function villeControle() {
    //Controle caractériel prenom
    const laVille = formValues.ville;
    if(regexNomPrenomVille(laVille)) {
        return true;
    }else{
        alert(textAlert("Ville :"))
        return false;
    }
}
let formPost = duc.querySelector("command-form");
if (nomControle() && prenomControle() && villeControle()) {
    //Mettre "formValues" dans le localStorage
    localStorage.setItem("formValues", JSON.stringify(formValues));
    formPost.addEventListener("submit", (e) => {
        fetch('http://localhost:3000/api/teddies/order', {
            method: 'POST',
            headers: {"content-type" : "application/json"},
            body: JSON.stringify{prod},
        })
    });
} else {
    window.alert("Merci de remplir correctement le formulaire de commande :D")
}



//mettre les items du panier et le formulaire dans un objet pret à être envoyer sur le serveur
    const toSend = {
        productSavedInLocalStorage,
        formValues
    }

    console.log("toSend");
    console.log(toSend);
})

/*-------------------------------------*\
        LOCAL STORAGE DANS LE FORM
\*-------------------------------------*/

//Prendre les keys du local storage et les mettres dans une variable
const dataLocalStorage = localStorage.getItem("formValues");

//Convertir en JS
const dataLocalStorageJS = JSON.parse(dataLocalStorage);
console.log("dataLocalStorageJS");
console.log(dataLocalStorageJS );

//mettre dataLocalStorageJS dans les champ du formulaire
document.querySelector("#nom").value = dataLocalStorageJS.nom;
document.querySelector("#prenom").value = dataLocalStorageJS.prenom;
document.querySelector("#mail").value = dataLocalStorageJS.mail;
document.querySelector("#adresse").value = dataLocalStorageJS.adresse;
document.querySelector("#ville").value = dataLocalStorageJS.ville;