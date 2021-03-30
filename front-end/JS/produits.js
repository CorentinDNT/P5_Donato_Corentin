const RequestChain_UrlId = window.location.search;
/* console.log(RequestChain_UrlId); */

//Extraire l'ID sans le "?" en .coupant un caractère dans le texte ciblé
/* let leId = RequestChain_UrlId.slice(4); */

/*---------------------------------------------------------------------------------------*\
\*-------------------------------------------------------------------------------------- */
//Methode 2
const urlSearchParameters = new URLSearchParams(RequestChain_UrlId);
console.log(urlSearchParameters);

const _id = urlSearchParameters.get("id");
console.log(_id);


//affichage du produit (de l'objet) séléctionné par l'ID
fetch("http://localhost:3000/api/teddies").then((response) => {
    console.log(response);
    //la response indique le code 200
    response.json().then((teddies) => {
        console.log(teddies); 
        const idSelectedProduct = teddies.find((element) => element._id === _id);
        console.log(idSelectedProduct);

        
        const SelectedItem = `
        <figure class="figure-product">
            <img src="${idSelectedProduct.imageUrl}" alt="image du petit ourson ${idSelectedProduct.name}" />
        <figcaption class="caption-product">
            <p>Nom : ${idSelectedProduct.name}</p>
            <p>Prix : ${idSelectedProduct.price/ 100} euros</p>
            <p>Description de ${idSelectedProduct.name} : ${idSelectedProduct.description}</p>
            <label for="color"></label>
                <select id="color" class="list">
                    <option selected hidden>Couleur</option>
                    <option value="volvo">Tan (défaut)</option>
                    <option value="saab">Chocolate</option>
                    <option value="opel">Black</option>
                    <option value="audi">White</option>
                </select>
            <button id="plusButton" class="btn">+</button><span id="qantityContainer"></span><button id="minusButton" class="btn">-</button>
            <button id="addToCart" class="btn">Ajouter au panier</button>
        </figcaption>
        </figure>
        `;
        
        let container = document.querySelector('#container');
        container.insertAdjacentHTML("beforeend", SelectedItem); 
        
        let showQantity = document.querySelector("#qantityContainer");
        let plus = document.querySelector("#plusButton");
        let minus = document.querySelector("#minusButton");

        let quantity = 1
        showQantity.innerHTML = quantity;

        plus.addEventListener('click', (e) => {
            if (quantity < 10) {
                quantity++
                showQantity.innerHTML = quantity;
            }
        });
        minus.addEventListener('click', (e) => {
            if (quantity > 1) {
                quantity--
                showQantity.innerHTML = quantity;
            }
        })
    });
});