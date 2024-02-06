<!-- @format -->

## Funkciniai reikalavimai

1. **Vartotojų valdymas:**

   - Sistema turi leisti vartotojams kurti sąskaitas.
   - Vartotojai turi turėti galimybę prisijungti prie savo sąskaitų naudojant unikalius prisijungimo duomenis (pvz., vartotojo vardą ir slaptažodį).

2. **Sąskaitų valdymas:**

   - Vartotojai gali peržiūrėti savo sąskaitų likučius ir sąskaitos išrašus.
   - Sistema turi leisti vartotojams atlikti pavedimus tarp savo sąskaitų arba į kitas vartotojų sąskaitas.
   - Vartotojai gali užšaldyti arba atšaukti savo sąskaitas.

3. **Pavedimų vykdymas:**

   - Sistema turi užtikrinti, kad pavedimai būtų vykdomi tik su tinkamais autentifikacijos duomenimis ir patikrinti, ar sąskaitos turi pakankamai lėšų pavedimui atlikti.
   - Pavedimai turi būti įrašomi į transakcijų žurnalą ir suteikti vartotojams galimybę peržiūrėti savo pavedimų istoriją.

4. **Duomenų saugumas:**

   - Visi vartotojų duomenys, įskaitant prisijungimo informaciją ir finansinius duomenis, turi būti saugomi šifruotu formatu.
   - Sistema turi turėti atitinkamus apsaugos mechanizmus, kad būtų išvengta neautorizuoto prieigos prie vartotojų duomenų.

5. **Pranešimų ir perspėjimų sistema:**
   - Sistema turi turėti pranešimų sistemą, kuri informuotų vartotojus apie svarbius įvykius, tokius kaip įvykę pavedimai, būtinų veiksmų reikalavimai ir kt.
   - Vartotojai gali pasirinkti, kaip nori gauti pranešimus: el. paštu, SMS žinutėmis arba tiesiogiai per sistemos sąsają.

## User Stories

1. **Vartotojas nori sukurti sąskaitą:**

   - Kaip vartotojas, noriu turėti galimybę sukurti naują sąskaitą, kad galėčiau pradėti naudotis finansų valdymo sistema.
   - Kaip vartotojas, noriu įvesti savo asmens informaciją ir pasirinkti prisijungimo duomenis, kad galėčiau saugiai prisijungti prie savo sąskaitos vėliau.

2. **Vartotojas nori peržiūrėti sąskaitos likutį:**

   - Kaip vartotojas, noriu matyti savo sąskaitos likutį pagrindiniame ekrane, kad galėčiau greitai sužinoti, kiek pinigų turėčiau.

3. **Vartotojas nori atlikti pavedimą:**

   - Kaip vartotojas, noriu turėti galimybę peržiūrėti sąrašą su sąskaitomis, į kurias galiu atlikti pavedimą, kad galėčiau pasirinkti tinkamą sąskaitą.
   - Kaip vartotojas, noriu įvesti pavedimo sumą ir gauti patvirtinimą, kad pavedimas buvo sėkmingai įvykdytas.

4. **Administratorius nori užšaldyti sąskaitą:**

   - Kaip administratorius, noriu turėti galimybę užšaldyti vartotojo sąskaitą, jei pastebiu neįprastą veiklą ar įtarimų dėl sukčiavimo.
   - Kaip administratorius, noriu turėti prieigą prie sąrašo su užšaldytomis sąskaitomis, kad galėčiau juos peržiūrėti ir priimti atitinkamus veiksmus.

5. **Vartotojas nori gauti pranešimą apie sėkmingą pavedimą:**
   - Kaip vartotojas, noriu gauti pranešimą, kai mano pavedimas buvo sėkmingai įvykdytas, kad galėčiau būti tikras, jog pinigai buvo pervesti į tinkamą sąskaitą.
