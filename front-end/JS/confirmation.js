const orderIdLocalStorage = localStorage.getItem("orderCommand");
const orderIdLocalStorageParsed = JSON.parse(orderIdLocalStorage);

console.log("Id de commande");
console.log(orderIdLocalStorageParsed);

const nameInLocalStorage = localStorage.getItem("contact");
const nameInLocalStorageParsed = JSON.parse(nameInLocalStorage);

console.log("contact form");
console.log(nameInLocalStorageParsed);



let mainContainer = document.querySelector("#main-confirm");

const commandCard = `
    <div id="carte-commande">
        <h2>Merci pour votre commande <span id="lastNameUP">${nameInLocalStorageParsed.lastName}</span> <span id="firstNameCapitalize">${nameInLocalStorageParsed.firstName}</span> !</h2>
        <p>Votre id de commande est : <span id="spanShowId">${orderIdLocalStorageParsed}</span></p>
        <p>Orinoco espère vous revoir très rapidement !</p>
    </div>
`;

mainContainer.insertAdjacentHTML("beforeend", commandCard);