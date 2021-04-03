const RequestChain_UrlId = window.location.search;
/* console.log(RequestChain_UrlId); */

//Extraire l'ID sans le "?" en .coupant un caractère dans le texte ciblé
/* let leId = RequestChain_UrlId.slice(4); */

/*---------------------------------------------------------------------------------------*\
\*-------------------------------------------------------------------------------------- */
//Methode 2
const urlSearchParameters = new URLSearchParams(RequestChain_UrlId);

const _id = urlSearchParameters.get("id");
console.log(_id);


//affichage du produit (de l'objet) séléctionné par l'ID
fetch("http://localhost:3000/api/teddies").then((response) => {
    //console.log(response);
    //la response indique le code 200
    response.json().then((teddies) => {
        //affiche sous forme de JSON tout les éléments du tableau teddies
        //console.log(teddies); 
        const idSelectedProduct = teddies.find((element) => element._id === _id);
        console.log(idSelectedProduct);

        
        
        const SelectedItem = `
        <figure class="figure-product">
            <img src="${idSelectedProduct.imageUrl}" alt="image du petit ourson ${idSelectedProduct.name}" />
            <figcaption class="caption-product">
                <p>Nom : ${idSelectedProduct.name}</p>
                <p>Prix : ${idSelectedProduct.price/ 100} euros</p>
                <p>Description de ${idSelectedProduct.name} : ${idSelectedProduct.description}</p>

                <from>
                    <label for="color-product"></label>
                        <select name="color-product" id="color-product" class="list">
                        </select>
                        <span>Quantité : </span><button id="plusButton" class="btn">+</button><span id="qantityContainer"></span><button id="minusButton" class="btn">-</button>
                    <br>
                    <span id="showPrice"></span>
                    <br>
                </from>
                    <button type="submit" name="btn-envoyer" id="btn-envoyer">Ajouter au panier</button>
            </figcaption>
        </figure>
        `;
        
        let container = document.querySelector('#container');
        container.insertAdjacentHTML("beforeend", SelectedItem); 

        let optionCouleur = document.querySelector("#color-product");
        
        for (let i = 0; i < idSelectedProduct.colors.length; i++) {
            const itemColorArray = idSelectedProduct.colors[i];

            const couleurItem = `<option value="${itemColorArray}">${itemColorArray}</option>`;
            optionCouleur.insertAdjacentHTML("beforeend", couleurItem);
        }


        /*---------------------------------------------------------------------------------------*\
        ------------------------------------NOM DU DOCUMENT----------------------------------------
        \*-------------------------------------------------------------------------------------- */
        let modifTitleProduct = document.querySelector('#DocumentTitle');
        modifTitleProduct.innerHTML = `Page produit de l'ourson ${idSelectedProduct.name}`
        
        /*---------------------------------------------------------------------------------------*\
        ------------------------VARIABLE BOUTON QUANTITE ET AFFICHAGE DU PRIX----------------------
        \*-------------------------------------------------------------------------------------- */
        let showQantity = document.querySelector("#qantityContainer");
        let plus = document.querySelector("#plusButton");
        let minus = document.querySelector("#minusButton");

        let quantity = 1
        showQantity.innerHTML = quantity;
        let showPrice = document.querySelector('#showPrice');
        console.log(showPrice);

        let price = (idSelectedProduct.price/ 100)* quantity;
        showPrice.innerHTML = `Le prix est de ${price} euros`
        
        plus.addEventListener('click', (e) => {
            if (quantity < 10) {
                quantity++
                showQantity.innerHTML = quantity;
                showPrice.innerHTML = `le prix est de ${(quantity*price)} euros`;
            }
        });
        minus.addEventListener('click', (e) => {
            if (quantity > 1) {
                quantity--
                showQantity.innerHTML = quantity;
                showPrice.innerHTML = `le prix est de ${(price*quantity)} euros`;
            }
        })
        
        /*---------------------------------------------------------------------------------------*\
        ---------------RECUPERATION DES DONNES SAISIES PAR L'USER ET ENVOIE DU PANIER--------------
        \*-------------------------------------------------------------------------------------- */

        const formId = document.querySelector("#color-product");

        //selection du bouton ajouter l'article au panier
        const btn_sendToCart = document.querySelector("#btn-envoyer");
        console.log(btn_sendToCart);

        //----------------Ecouter le bounton et envoyer le panier
        btn_sendToCart.addEventListener('click', (e) => {
            e.preventDefault();

            //mettre le choix de l'user dans un variable
            const choixUserForm = formId.value;
            console.log(choixUserForm)
            
            //recup de la valeur du fromulaire
            let optionProduit = {
                nomPrduit: idSelectedProduct.name,
                id_ProduitSelectionner: idSelectedProduct._id,
                option_produit: choixUserForm,
                quantite: quantity,
                prix: (idSelectedProduct.price/ 100)* quantity
            }
            console.log(optionProduit);

            /*---------------------------------------------------------------------------------------*\
            ---------------------------------------LE LOCAL STORAGE------------------------------------
            \*-------------------------------------------------------------------------------------- */
            //Fonction Popup
            const popupConfirm = () => {
                if (window.confirm(`${quantity} petit ${idSelectedProduct.name} de la couleur : ${choixUserForm} ajouté au panier pour un prix de ${(idSelectedProduct.price/ 100)* quantity} Euros.
Pour consultter le panier appuyez sur OK, sinon pour rester sur cette page cliquer sur ANNULER`)){
                    window.location.href = "../pages/panier.html";
                }
            }


            //Fiare une variable "productSavedInLocalStorage" dans laquelle on va mettre les keys et les values qui sont dans le local storage
            let productSavedInLocalStorage = JSON.parse(localStorage.getItem("produit"));
            //JSON.parse c'est pour convertir les donées au format JSON qui sont dans le localStorage en donées JS
            
            //Function ajout produit localStorage
            function addItemInLocalStorage() {
                productSavedInLocalStorage.push(optionProduit);
                localStorage.setItem("produit", JSON.stringify(productSavedInLocalStorage));
            }
            //SI il y a deja des produits dans le local storage
            if (productSavedInLocalStorage) {
                addItemInLocalStorage();
                popupConfirm();
            }
            //s'il n'y a pas de produit enregistré dans le local storage
            else{
                productSavedInLocalStorage = [];
                addItemInLocalStorage();
                popupConfirm();
            }
        });

    });
});