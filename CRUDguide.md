## Svarbu:

Prieš naudojant, užtikrinkite, kad būtų paleistas serveris: `npm run start`

## Pavadinimai:

- user (vartotojas)
- account (sąskaita)

## Folderiai:

- middleware: autorizacija ir autentifikacija
- config: duomenų bazės prisijungimas su mongoose
- routes: HTTP maršrutai susieti su funkcijomis
- models: schemos, duomenų struktūra
- controllers: užklausų valdymas ir "smegenys"
- app.js: serveris, prisijungimas prie DB, struktūra

## Postman operacijos:

### VARTOTOJAI (USERS):

#### Sukurti naują vartotoją:

- Metodas: POST
- Adresas: http://localhost:3000/api/users
- Body: raw, JSON
  {
  "firstname": "...",
  "email": "...",
  "password": "..."
  }

#### Prisijungti prie vartotojo:

- Metodas: POST
- Adresas: http://localhost:3000/api/users/login
- Body: raw, JSON
  {
  "email": "...",
  "password": "..."
  }

#### Gauti vartotojo duomenis:

- Metodas: POST
- Adresas: http://localhost:3000/api/users/user
- Headers:
  - Key: authorization
  - Value: Bearer + Token (gaunamas prisijungiant)
- Kam leidžiama ši operacija: visiems

#### Gauti visus vartotojus ir jų duomenis:

- Metodas: POST
- Adresas: http://localhost:3000/api/users/list
- Headers:
  - Key: authorization
  - Value: Bearer + Token (gaunamas prisijungiant)
- Kam leidžiama ši operacija: admin

### SĄSKAITOS (ACCOUNTS):

#### Sukurti sąskaitą vartotojui:

- Metodas: POST
- Adresas: http://localhost:3000/api/accounts
- Headers:
  - Key: authorization
  - Value: Bearer + jwtToken (gaunamas prisijungiant)
- Body: raw, JSON
  {
  "accountNumber": "...",
  "balance": "...", (type: Number)
  "status": "..."
  }
- Kam leidžiama ši operacija: visiems

#### Gauti vartotojo sąskaitas:

- Metodas: GET
- Adresas: http://localhost:3000/api/accounts
- Headers:
  - Key: authorization
  - Value: Bearer + jwtToken (gaunamas prisijungiant)
- Kam leidžiama ši operacija: visiems

#### Redaguoti sąskaitą:

- Metodas: PUT
- Adresas: http://localhost:3000/api/accounts/:id
- Headers:
  - Key: authorization
  - Value: Bearer + jwtToken (gaunamas prisijungiant)
- Kam leidžiama ši operacija: visiems

#### Ištrinti sąskaitą:

- Metodas: DELETE
- Adresas: http://localhost:3000/api/accounts/:id
- Headers:
  - Key: authorization
  - Value: Bearer + jwtToken (gaunamas prisijungiant)
- Kam leidžiama ši operacija: visiems

## [>> Screenshotai su testavimu <<](https://docs.google.com/presentation/d/1QaUpaLDVA9Na-2hCP99Sl070LJfxaonmJ60svLGtbis/edit#slide=id.g2aafeda88d4_0_0)

-- kestulka
