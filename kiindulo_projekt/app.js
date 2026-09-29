"use strict";

/*
 * JavaScript + Git alapozó projekt
 *
 * Az oldal HTML- és CSS-része készen áll. A feladatod az alábbi lépések
 * megvalósítása a 03_LEPESROL_LEPESRE_GYAKORLAT.md útmutató alapján.
 *
 * 1. Válaszd ki a szükséges DOM-elemeket querySelector() segítségével.
 * 2. Hozz létre egy változó állapotot a sikeres frissítések számához.
 * 3. Írd meg az űrlap adatait beolvasó függvényt.
 * 4. Írd meg az adatellenőrző függvényt.
 * 5. Írd meg a kártyát frissítő és a státuszt jelző függvényt.
 * 6. Kezeld az űrlap submit és az Alapértékek gomb click eseményét.
 * 7. A feature/sotet-tema branchen add hozzá a témaváltást.
 */

// 1. DOM-elemek kiválasztása következik itt.
const form = document.querySelector("#profileForm");
const nameInput = document.querySelector("#displayName");
const roleInput = document.querySelector("#role");
const technologyInput = document.querySelector("#technology");
const resetButton = document.querySelector("#resetButton");
const cardName = document.querySelector("#cardName");
const cardRole = document.querySelector("#cardRole");
const cardTechnology = document.querySelector("#cardTechnology");
const updateCountOutput = document.querySelector("#updateCount");
const statusMessage = document.querySelector("#statusMessage");

// 2. A program változó állapota következik itt.
const defaultProfile = {
    name: "Kódoló Kata",
    role: "Junior frontend fejlesztő",
    technology: "JavaScript"
  };
  
  let updateCount = 0;

// 3. A kisebb, egy feladatú függvények következnek itt.
function readProfileFromForm() {
    return {
      name: nameInput.value.trim(),
      role: roleInput.value.trim(),
      technology: technologyInput.value.trim()
    };
  }

  function isProfileValid(profile) {
    return profile.name !== "" &&
      profile.role !== "" &&
      profile.technology !== "";
  }

  function renderProfile(profile) {
    cardName.textContent = profile.name;
    cardRole.textContent = profile.role;
    cardTechnology.textContent = profile.technology;
  }

  function showStatus(message, isError = false) {
    statusMessage.textContent = message;
    statusMessage.classList.toggle("status--error", isError);
  }

// 4. Az eseménykezelők következnek itt.
form.addEventListener("submit", function (event) {
    event.preventDefault();
  
    const profile = readProfileFromForm();
  
    if (!isProfileValid(profile)) {
      showStatus("Minden mező kitöltése kötelező.", true);
      return;
    }
  
    renderProfile(profile);
    updateCount += 1;
    updateCountOutput.textContent = String(updateCount);
    showStatus("A profil sikeresen frissült.");
  });

  resetButton.addEventListener("click", function () {
    form.reset();
    renderProfile(defaultProfile);

    const themeButton = document.querySelector("#themeButton");
  
    updateCount = 0;
    updateCountOutput.textContent = String(updateCount);
    showStatus("Az alapértékek visszaálltak.");
    nameInput.focus();
  });

// 5. A témaváltó eseménykezelő csak a feature/sotet-tema ágon készül el.
themeButton.addEventListener("click", function () {
    const darkThemeEnabled = document.body.classList.toggle("dark-theme");
  
    themeButton.setAttribute("aria-pressed", String(darkThemeEnabled));
    themeButton.textContent = darkThemeEnabled ? "Világos téma" : "Sötét téma";
    showStatus(
      darkThemeEnabled ? "A sötét téma bekapcsolva." : "A világos téma bekapcsolva."
    );
  });