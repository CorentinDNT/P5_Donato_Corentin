const promise0 = fetch('http://localhost:3000/api/teddies');
let main = document.querySelector('#main');
let _id = [];

//promet que si la promesse est résolue, on a une reponse (response)
promise0.then((response) => {
    console.log(response);
    //la response indique le code 200
    response.json().then((teddies) => {
        for(let i = 0; i < teddies.length; i++) {
            const ours = teddies[i];
            console.log(ours, "ourson numéro : ", + i+1);
    
            const norbertItem = `
            <a href="./pages/produit.html?id=${ours._id}" class="link-id">
                <figure class="figure">
                    <img src="${ours.imageUrl}" alt="image du petit ourson ${ours.name}" />
                    <figcaption class="caption">
                        <p>Nom : ${ours.name}</p>
                        <p>Prix : ${ours.price/ 100} euros</p>
                    </figcaption>
                </figure>
            </a>
            `;
    
            main.insertAdjacentHTML("beforeend", norbertItem);
            
        }
    });
}).catch((e) => {
    window.alert("Désolé, le contenue de l'artcle n'as pas put être chargé")
});



/* //promet que si la promesse est résolue, on a une reponse dans la fonction (response) =>
promise0.then((response) => {
    // la reponse affiche le code 200(ok) donc la promsse est remplie
    console.log(response);

    //Promet qu'il vas renvoyer la reponse sous format JSON
    const dataUser = response.json();
    console.log(dataUser);

    //Remplis sa promesse et donne le resultat en JSON
    dataUser.then((response) => {
        console.log(response)
    })

    //si la promesse n'est pas remplie alors on affiche un erreur dans la console
}).catch((e) => console.log(erreur)); */

/* promise0.then((response) => {
    console.log(response);
    //la response indique le code 200
    response.json().then((teddies) => {
        console.log(response.json);

        const norbert = teddies[0];
        console.log(teddies);

        const norbertItem = `
        <a href="./pages/produit.html?id=5be9c8541c9d440000665243" class="link-id">
            <figure class="figure">
                <img src="${norbert.imageUrl}" alt="#" />
                <figcaption class="caption">
                    <p>Nom :${norbert.name}</p>
                    <p>Prix :${norbert.price/ 100} euros</p>
                </figcaption>
            </figure>
        </a>
        `;

        const arnold = teddies[1];
        console.log(arnold);

        const arnoldItem = `
        <a href="./pages/produit.html?id=5beaa8bf1c9d440000a57d94" class="link-id">
            <figure class="figure">
            <img src="${arnold.imageUrl}" alt="#">
            <figcaption class="caption">
                <p>Nom :${arnold.name}</p>
                <p>Prix :${arnold.price/ 100} euros</p>
            </figcaption>
            </figure>
        </a>
        `;

        const LandC = teddies[2];
        console.log(LandC);

        const LennyAndCarlItem = `
        <a href="./pages/produit.html?id=5beaaa8f1c9d440000a57d95" class="link-id">
            <figure class="figure">
            <img src="${LandC.imageUrl}" alt="#">
            <figcaption class="caption">
                <p>Nom :${LandC.name}</p>
                <p>Prix :${LandC.price/ 100} euros</p>
            </figcaption>
            </figure>
        </a>
        `;

        const Gustav = teddies[3];
        console.log(Gustav);

        const GustavItem = `
        <a href="./pages/produit.html?id=5beaabe91c9d440000a57d96" class="link-id">
            <figure class="figure">
            <img src="${Gustav.imageUrl}" alt="#">
            <figcaption class="caption">
                <p>Nom :${Gustav.name}</p>
                <p>Prix :${Gustav.price/ 100} euros</p>
            </figcaption>
            </figure>
        </a>
        `;

        const Garfunkel = teddies[4]; 
        console.log(Garfunkel);
        console.log(Garfunkel._id);

        const GarfunkelItem = `
        <a href="./pages/produit.html?id=5beaacd41c9d440000a57d97" class="link-id">
            <figure class="figure">
            <img src="${Garfunkel.imageUrl}" alt="#">
            <figcaption class="caption">
                <p>Nom :${Garfunkel.name}</p>
                <p>Prix :${Garfunkel.price/ 100} euros</p>
            </figcaption>
            </figure>
        </a>
        `;

        main.insertAdjacentHTML("beforeend", norbertItem);
        main.insertAdjacentHTML("beforeend", arnoldItem);
        main.insertAdjacentHTML("beforeend", LennyAndCarlItem);
        main.insertAdjacentHTML("beforeend", GustavItem);
        main.insertAdjacentHTML("beforeend", GarfunkelItem);
    });
}); */