## Svarbu:

Prieš naudojant, užtikrinkite, kad būtų paleistas serveris: `npm run start`

## Modeliai:

-   user (vartotojas)
-   income (įplaukos)
-   outcome (išplaukos)

## Folderiai:

-   middleware: autorizacija ir autentifikacija
-   config: duomenų bazės prisijungimas su mongoose
-   routes: HTTP maršrutai susieti su funkcijomis
-   models: schemos, duomenų struktūra
-   controllers: užklausų valdymas ir "smegenys"
-   app.js: serveris, prisijungimas prie DB, struktūra

## Postman operacijos

### VARTOTOJAI (USERS):

#### Sukurti naują vartotoją:

-   Metodas: POST
-   Adresas: http://localhost:3000/api/users
-   Body: raw, JSON
    {
    "firstname": "...",
    "email": "...",
    "password": "..."
    }

#### Prisijungti prie vartotojo:

-   Metodas: POST
-   Adresas: http://localhost:3000/api/users/login
-   Body: raw, JSON
    {
    "email": "...",
    "password": "..."
    }

#### Gauti vartotojo duomenis:

-   Metodas: POST
-   Adresas: http://localhost:3000/api/users/user
-   Headers:
    -   Key: authorization
    -   Value: Bearer + Token (gaunamas prisijungiant)
-   Kam leidžiama ši operacija: visiems

#### Gauti visus vartotojus ir jų duomenis:

-   Metodas: POST
-   Adresas: http://localhost:3000/api/users/list
-   Headers:
    -   Key: authorization
    -   Value: Bearer + Token (gaunamas prisijungiant)
-   Kam leidžiama ši operacija: admin

### INCOMES/OUTCOMES (įplaukos/išplaukos):

#### Sukurti įplauka/išplauka vartotojui:

#### Pavyzdžiai duoti "outcomes" operacijoms, norint naudoti incomes, pakeisti outcomes žodį į incomes. Pvz: http://localhost:3000/api/incomes

-   Metodas: POST
-   Adresas: http://localhost:3000/api/outcomes
-   Headers:
    -   Key: authorization
    -   Value: Bearer + jwtToken (gaunamas prisijungiant)
-   Body: raw, JSON
    {
    "title": "...", (not mendatory)
    "category": "...", (from list)
    "amount": "..." (type: Number)
    "description": "..." (not mendatory)
    }
-   Kam leidžiama ši operacija: visiems

#### Gauti vartotojo įmoka/išmoka:

-   Metodas: GET
-   Adresas: http://localhost:3000/api/outcomes/:id
-   Headers:
    -   Key: authorization
    -   Value: Bearer + jwtToken (gaunamas prisijungiant)
-   Kam leidžiama ši operacija: visiems

#### Gauti vartotojo įmokas/išmokas:

-   Metodas: GET
-   Adresas: http://localhost:3000/api/outcomes/:id/all
-   Headers:
    -   Key: authorization
    -   Value: Bearer + jwtToken (gaunamas prisijungiant)
-   Kam leidžiama ši operacija: visiems

#### Gauti visu vartotojų įmokas/išmokas:

-   Metodas: GET
-   Adresas: http://localhost:3000/api/outcomes/all
-   Headers:
    -   Key: authorization
    -   Value: Bearer + jwtToken (gaunamas prisijungiant)
-   Kam leidžiama ši operacija: visiems

#### Pakeisti vartotojo įmokas/išmokas:

-   Metodas: PUT
-   Adresas: http://localhost:3000/api/outcomes/:id
-   Headers:
    -   Key: authorization
    -   Value: Bearer + jwtToken (gaunamas prisijungiant)
        Body: raw, JSON
        {
        "title": "...", (not mendatory)
        "amount": "..." (type: Number)
        "description": "..." (not mendatory)
        }
-   (Galima pasirinkti ir tik vieną pakeisti)
-   Kam leidžiama ši operacija: visiems

#### Ištrinti vartotojo įmokas/išmokas:

-   Metodas: DELETE
-   Adresas: http://localhost:3000/api/outcomes/:id
-   Headers:
-   Kam leidžiama ši operacija: visiems

## TO BE CONTINUED... (update/delete)

## [>> Screenshotai su testavimu <<](https://docs.google.com/presentation/d/1QaUpaLDVA9Na-2hCP99Sl070LJfxaonmJ60svLGtbis/edit#slide=id.g2aafeda88d4_0_0)

-- kestulka
