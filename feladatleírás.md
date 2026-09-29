# Tanulói gyakorlat lépésről lépésre

## Profilkártya-szerkesztő JavaScripttel, Gittel és GitHubbal

### A feladat végére elkészül

- egy működő profilkártya-szerkesztő;
- egy legalább három értelmes commitból álló Git-történet;
- egy GitHubon elérhető repository;
- egy `feature/sotet-tema` branch;
- egy kitöltött pull request, amelyből a funkció a `main` ágba kerül.

> A parancsokat a szerkesztő beépített termináljában futtasd. A `$` vagy `>` promptjelet ne gépeld be. Minden parancs után olvasd el a választ; ne csak sorban másold a parancsokat.

---

# I. tanóra – JavaScript és helyi Git

## 1. A megfelelő projektmappa megnyitása

1. Csomagold ki az oktatási csomagot.
2. Nyisd meg a `01_kiindulo_projekt` mappát Visual Studio Code-ban.
3. Nyiss terminált: **Terminal → New Terminal**.
4. Nézd meg a terminálban látható útvonalat. Annak `01_kiindulo_projekt` végűnek kell lennie.
5. Ellenőrizd a fájlokat:

```bash
git --version
```

A mappában ezeknek kell szerepelniük:

```text
.github/
  pull_request_template.md
.gitignore
README.md
app.js
index.html
styles.css
```

6. Nyisd meg az `index.html` fájlt böngészőben. A felület már látható, de a gombokhoz tartozó saját JavaScript-működés még hiányzik.

## 2. Személyes Git-adatok ellenőrzése

Nézd meg, be van-e állítva a commitok szerzője:

```bash
git config --global --get user.name
git config --global --get user.email
```

Ha valamelyik parancs nem ad választ, állítsd be:

```bash
git config --global user.name "Vezetéknév Keresztnév"
git config --global user.email "tanulo@example.com"
```

Közös iskolai számítógépen kérdezd meg az oktatót, hogy használhatsz-e globális beállítást. Csak az aktuális projektre a `--global` elhagyásával állítható be az adat.

## 3. A README személyre szabása

1. Nyisd meg a `README.md` fájlt.
2. A **Készítő** részben cseréld ki a helyőrzőt a saját nevedre.
3. Mentsd el a fájlt.

Ez mutatja majd a GitHubon, ki készítette a gyakorlóprojektet.

## 4. Helyi repository létrehozása

Futtasd egyenként:

```bash
git init
git branch -M main
git status
```

Mit tettél?

- A `git init` bekapcsolta a verziókövetést ebben a mappában.
- A `git branch -M main` az alapágat `main` névre állította.
- A `git status` megmutatta, hogy a fájlok még nincsenek követve.

Ellenőrizd a stage-elés előtt:

```bash
git add .
git status
git diff --staged
```

A `git diff --staged` hosszú lehet. A terminálban `q` billentyűvel léphetsz ki a lapozóból.

### 1. commitpont – a kiinduló állapot

Ha csak a projekt szükséges fájljai láthatók, készíts commitot:

```bash
git commit -m "chore: inicializálja a profilkártya projektet"
```

Ellenőrzés:

```bash
git status
git log --oneline
```

Elvárt: `working tree clean`, és egy commit jelenik meg.

## 5. DOM-elemek kiválasztása

Nyisd meg az `app.js` fájlt. A meglévő első megjegyzés alá írd:

```js
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
```

Miért `const`? Ezekhez a változókhoz később nem rendelünk másik DOM-elemet.

Mentsd el, frissítsd a böngészőt, majd nézd meg az `F12` → **Console** lapot. Nem lehet piros hiba.

## 6. Alapadat és változó állapot

A második jelölt részhez írd:

```js
const defaultProfile = {
  name: "Kódoló Kata",
  role: "Junior frontend fejlesztő",
  technology: "JavaScript"
};

let updateCount = 0;
```

- A `defaultProfile` objektum összefogja az alapértékeket.
- Az `updateCount` értéke változni fog, ezért `let`.

## 7. Az űrlapadatok beolvasása

A függvények részéhez add hozzá:

```js
function readProfileFromForm() {
  return {
    name: nameInput.value.trim(),
    role: roleInput.value.trim(),
    technology: technologyInput.value.trim()
  };
}
```

A függvény mindig az űrlap pillanatnyi állapotából készít egy új objektumot. A `trim()` eltávolítja a szélső szóközöket.

## 8. Egyszerű ellenőrzés

Az előző függvény alá írd:

```js
function isProfileValid(profile) {
  return profile.name !== "" &&
    profile.role !== "" &&
    profile.technology !== "";
}
```

Ez csak akkor ad `true` értéket, ha mindhárom adat tartalmaz látható karaktert.

## 9. A profil megjelenítése

Add hozzá:

```js
function renderProfile(profile) {
  cardName.textContent = profile.name;
  cardRole.textContent = profile.role;
  cardTechnology.textContent = profile.technology;
}
```

Felhasználótól érkező értékhez `textContent` használatos. Ne cseréld `innerHTML`-re.

## 10. Státuszüzenet megjelenítése

Add hozzá:

```js
function showStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("status--error", isError);
}
```

Az `isError = false` alapértelmezett paraméter. Ha a második argumentum `true`, a piros hibastílus bekapcsol.

## 11. Az űrlap elküldési eseménye

Az eseménykezelők részéhez írd:

```js
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
```

Teszteld most:

1. írj új nevet;
2. módosítsd a szerepkört;
3. válassz technológiát;
4. kattints a **Profil frissítése** gombra;
5. ismételd meg, és figyeld a számlálót;
6. a névmezőbe írj csak szóközöket, majd próbáld elküldeni;
7. ellenőrizd a konzolt.

## 12. Alaphelyzet visszaállítása

Az előző eseménykezelő alá írd:

```js
resetButton.addEventListener("click", function () {
  form.reset();
  renderProfile(defaultProfile);

  updateCount = 0;
  updateCountOutput.textContent = String(updateCount);
  showStatus("Az alapértékek visszaálltak.");
  nameInput.focus();
});
```

Teszt:

1. frissítsd a profilt legalább kétszer;
2. kattints az **Alapértékek** gombra;
3. az űrlap és a kártya ismét a kezdőadatokat mutassa;
4. a számláló legyen `0`;
5. a billentyűkurzor kerüljön a névmezőbe.

## 13. Változások áttekintése és második commit

Először ne commitolj vakon:

```bash
git status
git diff
```

Az `app.js` módosítása és a `README.md` korábbi személyre szabása jelenhet meg attól függően, mikor mentetted. Ha a README már az első commit része, most csak az `app.js` legyen módosított.

Opcionális szintaktikai ellenőrzés, ha telepítve van a Node.js:

```bash
node --check app.js
```

Stage-eld célzottan a kódot:

```bash
git add app.js
git diff --staged
```

### 2. commitpont – működő JavaScript

```bash
git commit -m "feat: működő profilkártyát készít"
git status
git log --oneline
```

Elvárt: két commit, tiszta munkakönyvtár, működő alapfunkciók.

---

# II. tanóra – GitHub, branch és pull request

## 14. Üres repository létrehozása a GitHubon

1. Jelentkezz be a [GitHub](https://github.com/) oldalra.
2. A jobb felső létrehozás menüben válaszd a **New repository** lehetőséget.
3. **Owner:** a saját fiókod.
4. **Repository name:** `javascript-profilkartya`.
5. **Description:** `JavaScript és Git alapozó profilkártya projekt`.
6. Válassz láthatóságot:
   - **Public:** a link birtokában bárki megtekintheti;
   - **Private:** csak te és a meghívottak láthatják.
7. Ne jelöld be a README, `.gitignore` vagy license előzetes létrehozását. Ezek már helyben léteznek; a távoli repository maradjon üres.
8. Kattints a **Create repository** gombra.

Ne zárd be az elkészült oldal lapját.

## 15. A helyi és a távoli repository összekapcsolása

A terminálban előbb ellenőrizd:

```bash
git status
git branch
```

Tiszta munkakönyvtár és aktív `main` ág szükséges. Add meg a saját URL-edet:

```bash
git remote add origin https://github.com/FELHASZNALONEV/javascript-profilkartya.git
git remote -v
```

A `FELHASZNALONEV` helyére a saját GitHub-neved kerüljön. A GitHub oldalán a **Quick setup** részből a pontos HTTPS URL is kimásolható.

Első feltöltés:

```bash
git push -u origin main
```

A Git kérhet hitelesítést. Kövesd a böngészős bejelentkezést vagy az oktató által megadott intézményi eljárást. A GitHub-fiók jelszavát ne írd be hagyományos Git-jelszóként.

Frissítsd a GitHub-oldalt. Ellenőrizd:

- látható-e az `index.html`, `styles.css`, `app.js` és `README.md`;
- a `main` az alapértelmezett branch;
- a commitlistában két saját commit szerepel;
- a README megjelenik a fájllista alatt.

## 16. A projekt megosztása

### Ha nyilvános a repository

Másold ki a böngésző címsorából:

```text
https://github.com/FELHASZNALONEV/javascript-profilkartya
```

Nyisd meg privát/inkognitó ablakban. Ha bejelentkezés nélkül is látható, a megosztás működik. A link megtekintési lehetőséget ad, de írási jogosultságot nem.

### Ha privát a repository

1. Nyisd meg a repository **Settings** lapját.
2. Az **Access** területen válaszd a **Collaborators** vagy **Collaborators & teams** pontot.
3. Kattints az **Add people** gombra.
4. Keresd meg az oktató vagy társ GitHub-felhasználónevét.
5. Küldd el a meghívást.

A másik félnek el kell fogadnia a meghívást. Ismeretlen személyt ne adj hozzá, és jelszót vagy tokent soha ne írj a repository fájljaiba.

## 17. Feature branch létrehozása

A sötét témát nem közvetlenül a `main` ágon készítjük el.

```bash
git switch main
git pull --ff-only
git switch -c feature/sotet-tema
git branch
git status
```

Elvárt: a `git branch` kimenetében a csillag a `feature/sotet-tema` mellett áll.

## 18. Témaváltó gomb hozzáadása a HTML-hez

Az `index.html` fájlban keresd meg az `Alapértékek` gomb záró `</button>` elemét. Közvetlenül utána, még a `.button-row` elemen belül add hozzá:

```html
<button
  class="button button--theme"
  id="themeButton"
  type="button"
  aria-pressed="false"
>
  Sötét téma
</button>
```

Miért `type="button"`? Mert a gomb az űrlapon belül van, de nem küldheti el az űrlapot.

Miért `aria-pressed`? A kapcsoló jellegű gomb aktuális be/ki állapotát közli a segítő technológiákkal.

## 19. A sötét téma CSS-e

A `styles.css` fájlban a `.button--secondary` blokk után add hozzá:

```css
.button--theme {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: transparent;
}
```

A fájl végére add hozzá:

```css
body.dark-theme {
  color-scheme: dark;
  --color-bg: #0f172a;
  --color-surface: #182338;
  --color-surface-muted: #24324a;
  --color-text: #f8fafc;
  --color-text-muted: #cbd5e1;
  --color-primary: #818cf8;
  --color-primary-hover: #6366f1;
  --color-border: #41506a;
  --color-success: #86efac;
  --color-error: #fda4af;
  --shadow: 0 18px 45px rgb(0 0 0 / 28%);
}
```

A meglévő szabályok CSS-változókat használnak, ezért egyetlen body-osztály más értékeket adhat nekik.

## 20. A témaváltás JavaScriptje

Az `app.js` DOM-kiválasztásai között, a `resetButton` után add hozzá:

```js
const themeButton = document.querySelector("#themeButton");
```

A fájl végére add hozzá:

```js
themeButton.addEventListener("click", function () {
  const darkThemeEnabled = document.body.classList.toggle("dark-theme");

  themeButton.setAttribute("aria-pressed", String(darkThemeEnabled));
  themeButton.textContent = darkThemeEnabled ? "Világos téma" : "Sötét téma";
  showStatus(
    darkThemeEnabled ? "A sötét téma bekapcsolva." : "A világos téma bekapcsolva."
  );
});
```

A feltételes operátor alakja:

```js
feltétel ? érték_ha_igaz : érték_ha_hamis
```

Itt ettől függ a gombfelirat és a státuszüzenet.

## 21. A branch tesztelése

Végezd el mindegyiket:

- [ ] A témagomb első kattintása sötét témát ad.
- [ ] A gomb felirata ekkor „Világos téma”.
- [ ] Az `aria-pressed` értéke `true` lesz; ezt az Elements lapon ellenőrizheted.
- [ ] A második kattintás világos témára vált vissza.
- [ ] A profilfrissítés mindkét témában működik.
- [ ] Az Alapértékek gomb mindkét témában működik.
- [ ] A konzolban nincs hiba.
- [ ] Keskeny nézetben nincs vízszintes görgetés.

Ellenőrizd a Git-változásokat:

```bash
git status
git diff
git diff --check
```

A `git diff --check` nem ad kimenetet, ha nem talál fölösleges sorvégi szóközt vagy hasonló formázási hibát.

## 22. Harmadik commit és a branch feltöltése

```bash
git add index.html styles.css app.js
git diff --staged
```

Nézd át, hogy csak a témaváltáshoz tartozó módosítások kerültek-e a stage-be.

### 3. commitpont – a branch új funkciója

```bash
git commit -m "feat: hozzáadja a sötét témát"
git status
git push -u origin feature/sotet-tema
```

Most a GitHubon a `main` mellett a `feature/sotet-tema` branch is létezik. A `main` még nem tartalmazza a sötét témát.

## 23. Pull request létrehozása

1. Nyisd meg vagy frissítsd a repository GitHub-oldalát.
2. Kattints a felajánlott **Compare & pull request** gombra. Ha nem jelenik meg, nyisd meg a **Pull requests** lapot, majd **New pull request**.
3. Ellenőrizd:
   - **base:** `main`;
   - **compare:** `feature/sotet-tema`.
4. Cím:

```text
feat: sötét téma hozzáadása
```

5. A repositoryban lévő sablon automatikusan megjelenhet. Töltsd ki például így:

```markdown
## Mit változtattam?

- Témaváltó gombot adtam az űrlaphoz.
- CSS-változókkal elkészítettem a sötét színpalettát.
- JavaScriptből kapcsolom a dark-theme osztályt és az aria-pressed állapotot.

## Miért készült a változtatás?

- A branch- és pull request-munkafolyamat gyakorlásához.
- A felület kényelmesebb használatához sötét környezetben.

## Hogyan teszteltem?

- [x] A témaváltó gomb sötét témára vált.
- [x] A második kattintás visszaállítja a világos témát.
- [x] A profilfrissítés mindkét témában működik.
- [x] Az Alapértékek gomb mindkét témában működik.
- [x] A böngésző konzolja nem jelez hibát.
- [x] Keskeny nézetben sincs vízszintes görgetés.
```

6. Kattints a **Create pull request** gombra.
7. A **Files changed** lapon nézd át a változásokat soronként.
8. Ha hibát találsz, javítsd ugyanazon a helyi branchen, készíts új commitot és futtasd a `git push` parancsot. A pull request automatikusan frissül.

## 24. Merge és ágak rendezése

Ha a pull request minden ellenőrzése rendben van:

1. Kattints a **Merge pull request** gombra.
2. Erősítsd meg a merge-et.
3. Kattints a **Delete branch** gombra a távoli feature branch törléséhez.

Ezután a helyi terminálban:

```bash
git switch main
git pull --ff-only
git branch -d feature/sotet-tema
git fetch --prune
git status
git log --graph --oneline --decorate --all
```

Mit jelentenek az utolsó lépések?

- `git switch main`: visszatérés a stabil ágra;
- `git pull --ff-only`: a GitHubon elvégzett merge letöltése;
- `git branch -d ...`: a már beolvasztott helyi feature branch törlése;
- `git fetch --prune`: a törölt távoli ág elavult nyomkövető hivatkozásának eltávolítása;
- `git log --graph ...`: a teljes történet megjelenítése.

## 25. Végső beadási és megosztási ellenőrzőlista

- [ ] A GitHub-repository neve `javascript-profilkartya`.
- [ ] A `main` ág tartalmazza a sötét témát is.
- [ ] Legalább három értelmes commit látható.
- [ ] A pull request leírása és tesztlistája ki van töltve.
- [ ] A pull request sikeresen merged állapotú.
- [ ] A `feature/sotet-tema` branch törölve lett a merge után.
- [ ] A README tartalmazza a készítő nevét és a projekt leírását.
- [ ] A repository linkje megnyitható a megfelelő személy számára.
- [ ] A böngésző konzolja hibamentes.
- [ ] A helyi `git status` szerint a munkakönyvtár tiszta.

Beadandó hivatkozás:

```text
https://github.com/FELHASZNALONEV/javascript-profilkartya
```

## 26. Rövid önellenőrző kérdések

1. Mi a különbség a `git add`, a `git commit` és a `git push` között?
2. Miért nem közvetlenül a `main` ágon készült a sötét téma?
3. Mit jelent az `origin` név?
4. Miért a form `submit` eseményét kezeltük a gomb `click` eseménye helyett?
5. Miért `textContent` segítségével írjuk ki a felhasználó szövegét?
6. Miért `let` az `updateCount`, miközben a DOM-hivatkozások `const` változók?
7. Mire szolgál a pull request egy egyszemélyes projektben?
