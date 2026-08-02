# 🏕️ Avontuur in Recreatie (Petualangan Dunia Rekreasi)

Een educatieve interactieve webapplicatie ontworpen om verschillende carrièrepaden in de recreatie- en toerismesector te introduceren. Met behulp van een *fail-forward* benadering (zonder strafsysteem), kunnen gebruikers vrij verkennen en leren door middel van interactieve minigames met een virtuele mentor.

## ✨ Belangrijkste Kenmerken
- **Meertalig (i18n):** Ondersteunt Nederlands (NL) als *default* en Indonesisch (ID) dat in *real-time* kan worden gewijzigd.
- **4 Interactieve Carrièregebieden:** Gastvrijheid (Hospitality), Techniek & Onderhoud, Marketing & Evenementen, en Natuur & Veiligheid.
- **Fail-Forward Gameplay:** Geen *Game Over*. Gebruikers zijn vrij om te experimenteren en van fouten te leren zonder bang te hoeven zijn voor strafpunten.
- **Responsieve & Strakke UI/UX:** Modern en gebruiksvriendelijk *chunky-border* en *hard shadow* ontwerp.
- **Progress Sync:** Maakt gebruik van Supabase om de voortgang op te slaan van welke gebieden door de gebruiker zijn voltooid.

## 🛠️ Technologie Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend/Database:** Supabase
- **Deployment:** Vercel

---

## 🗺️ Applicatiestroom (User Flow)
*Dit gedeelte kan worden gebruikt als de belangrijkste referentie voor het maken van de systeemflowchart.*

1. **[Start] Toegang tot de Applicatie**
   - Gebruiker opent de Vercel-link.
   - Systeem laadt de hoofd-UI.

2. **[Proces] Taalkeuze**
   - Systeem leest de *default* taalstatus (NL).
   - *Decision:* Klikt de gebruiker op de taal-*toggle*?
     - Indien Ja -> Verander de *state* naar (ID), *render* alle tekstcomponenten opnieuw.
     - Indien Nee -> Ga door met de huidige taal.

3. **[Hoofdmenu] Carrièregebied Selectie (Field Selector)**
   - Toont 4 opties voor carrièremogelijkheden: Gastvrijheid, Techniek, Marketing en Natuur.
   - *Decision:* Gebruiker kiest een van de deuren.
     - Systeem laadt de gegevens van het gebied (`fields.js`) volgens de keuze.

4. **[Proces] Mentor Dialoogsessie (Dialogue Box)**
   - Systeem toont het bijbehorende mentorkarakter (bijv. Kak Nara voor Gastvrijheid).
   - Toont het inleidende verhaal en de taakinstructies met dynamische *emote*-elementen.
   - Gebruiker drukt op de knop "Verder" (Lanjut) om naar de *puzzle* te gaan.

5. **[Interactie] Mini-Game Sessie (Gebaseerd op Gebiedskeuze)**
   - **Type A (Gastvrijheid):** *Matching Puzzle* -> Gebruiker matcht de klantsituatie met de juiste actie.
   - **Type B (Techniek):** *Sequence Puzzle* -> Gebruiker ordent de stappen voor het repareren van de generator.
   - **Type C (Marketing):** *Word Order Puzzle* -> Gebruiker rangschikt de door elkaar gehusselde woorden tot een promozin.
   - **Type D (Natuur):** *Hotspot Puzzle* -> Gebruiker zoekt en klikt op 3 gevarenzones op een visuele afbeelding.

6. **[Validatie] Fail-Forward Systeem**
   - *Decision:* Is het antwoord/de interactie van de gebruiker correct?
     - Indien Onjuist -> Geef een visueel/animatie effect (bijv. even rood kleuren of geen reactie), reset de keuze, **zonder levens te verminderen**. Gebruiker probeert het opnieuw.
     - Indien Juist -> Ga door naar de volgende fase.

7. **[Output] Feedback & Educatie**
   - Toont een waarderingsbericht en interessante inzichten/feiten over het carrièregebied.
   - Supabase slaat de voortgang op (`completed: true` voor dat gebied).

8. **[Looping / End] Voortgangscontrole**
   - Systeem controleert het totale aantal voltooide gebieden.
   - *Decision:* Zijn alle 4 de gebieden voltooid?
     - Indien Nog niet -> Terug naar [Hoofdmenu] (Stap 3), de voltooide deuren krijgen het label "VOLTOOID" (Klaar).
     - Indien Wel -> Toon het bericht "Alle gebieden zijn verkend! 🎉" en geef toegang tot de link voor vacatures/Open Dag.
