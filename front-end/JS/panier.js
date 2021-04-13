let productSavedInLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log("produit sauvegardé dans le LocalStorage");
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
    cartItemStructure =
      cartItemStructure +
      `
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
  totalPriceCart.push(productPriceInCart);
}
console.log("Prix des articles du panier");
console.log(totalPriceCart);

//additionner les prix du tableau totalPriceCart avec la methode .reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = totalPriceCart.reduce(reducer);
console.log("calcul du total du panier");
console.log("le résultat est de", + totalPrice, 
 "euros");

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

for (let i = 0; i < deleteButton.length; i++) {
  deleteButton[i].addEventListener("click", (e) => {
    e.preventDefault();

    //selection de l'ID a supprimer en cliquant sur le BTN
    let slectedIdToDelete =
      productSavedInLocalStorage[i].id_ProduitSelectionner;

    //avec la methode .filter je selectionne les éléments a garder et je retire celui qui a été cliqué
    productSavedInLocalStorage = productSavedInLocalStorage.filter(
      (el) => el.id_ProduitSelectionner !== slectedIdToDelete
    );

    //on evoie la var dans le local storage
    localStorage.setItem("produit", JSON.stringify(productSavedInLocalStorage));
    window.location.href = "../pages/panier.html";
  });
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
  window.location.href = "../pages/panier.html";
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
  const contact = {
    firstName: document.querySelector("#nom").value,
    lastName: document.querySelector("#prenom").value,
    email: document.querySelector("#mail").value,
    address: document.querySelector("#adresse").value,
    city: document.querySelector("#ville").value,
  };

  //-----------------------------------------\
  //--------TABLEAU PRODUCT         ---------|
  //-----------------------------------------/
  let products = [];
  productSavedInLocalStorage.forEach(el => {
    products.push(el.id_ProduitSelectionner);
  });

  console.log("id des produit du panier prêt à être envoyé au localStorage");
  console.log(products);

  //-----------------------------------------\
  //--------VALIDATION DU FORMULAIRE---------|
  //-----------------------------------------/
  function regexNomPrenomVille(value) {
    return /^[A-Za-z]{3,20}$/.test(value);
  }

  function textAlert(value) {
    return (
      value +
      " : Chiffre et symboles ne sont pas accéptés. \n Merci de ne pas dépasser 20 caractères"
    );
  }
  function nomControle() {
    //Controle caractériel nom
    const leNom = contact.lastName;
    if (regexNomPrenomVille(leNom)) {
      return true;
    } else {
      alert(textAlert("Nom :"));
      return false;
    }
  }
  function prenomControle() {
    //Controle caractériel prenom
    const lePrenom = contact.fisrtName;
    if (regexNomPrenomVille(lePrenom)) {
      return true;
    } else {
      alert(textAlert("Prenom :"));
      return false;
    }
  }
  function villeControle() {
    //Controle caractériel prenom
    const laVille = contact.city;
    if (regexNomPrenomVille(laVille)) {
      return true;
    } else {
      alert(textAlert("Ville :"));
      return false;
    }
  }

  //mettre les items du panier et le formulaire dans un objet pret à être envoyer sur le serveur
  const toSend = {
    products,
    contact,
  };
  console.log("Tableau du formulaire de validation et des id de produits");
  console.log(toSend);

  let formPost = document.querySelector("command-form");
  if (nomControle() && prenomControle() && villeControle()) {
    //Mettre "contact" dans le localStorage
    localStorage.setItem("contact", JSON.stringify(contact));
    fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(toSend),
    })
      .then((response) => response.json())
      .then((responseId) => {
        console.log("responseId");
        console.log(responseId);
        console.log(responseId.orderId);
        const serverOrderId = responseId.orderId;
        localStorage.setItem("orderCommand", JSON.stringify(serverOrderId));
        
        if (window.confirm("Voulez-vous vous rendre sur la page commande ?")) {
          window.open("../pages/confirmation.html", "Nouvelle fenêtre", "");
        }
      });
  } else {
    window.alert("Merci de remplir correctement le formulaire de commande :D");
  }
});
/*-------------------------------------*\
LOCAL STORAGE DANS LE FORM
\*-------------------------------------*/

//Prendre les keys du local storage et les mettres dans une variable
const dataLocalStorage = localStorage.getItem("contact");

//Convertir en JS
const dataLocalStorageJS = JSON.parse(dataLocalStorage);
console.log("donées du formulaire convertis en JS");
console.log(dataLocalStorageJS);

//mettre dataLocalStorageJS dans les champ du formulaire
document.querySelector("#nom").value = dataLocalStorageJS.firstName;
document.querySelector("#prenom").value = dataLocalStorageJS.lastName;
document.querySelector("#mail").value = dataLocalStorageJS.email;
document.querySelector("#adresse").value = dataLocalStorageJS.address;
document.querySelector("#ville").value = dataLocalStorageJS.city;
