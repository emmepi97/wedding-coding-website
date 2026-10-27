HARRY & KATE - CHATBOT STORIA D'AMORE
=====================================

STRUTTURA FILE
- index.html            -> struttura pagina
- css/style.css         -> stile grafico
- js/app.js             -> logica del chatbot semantico
- js/storyData.js       -> domande, pattern, tag e risposte

COME USARLO
1. Apri index.html nel browser.
2. Oppure carica l'intera cartella su GitHub / Netlify / Vercel.
3. Per modificare il contenuto del bot, lavora soprattutto su js/storyData.js.

COME AGGIUNGERE UNA NUOVA DOMANDA
Dentro js/storyData.js, nel blocco STORY_CONFIG.intents, aggiungi un nuovo oggetto con:
- id
- tags
- patterns
- response

ESEMPIO
{
  id: "casa",
  tags: ["casa", "convivenza"],
  patterns: ["dove vivranno", "parlami della casa"],
  response: "..."
}
