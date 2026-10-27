# 💍 Preventivo Matrimonio — Wedding Coding

Uno strumento web gratuito per calcolare il preventivo del matrimonio, creato da [Wedding Coding](https://www.weddingcoding.it).

## ✨ Funzionalità

- **10 categorie** di spesa precompilate (Location, Catering, Fotografia, Fiori, Abiti, Musica, Cancelleria, Trasporti, Viaggio di nozze, Altro)
- **Budget totale** con barra di avanzamento e indicatore di sforamento
- **Contatore ospiti** con calcolo automatico del costo per persona
- **Aggiunta/rimozione voci** personalizzate per ogni categoria
- **Riepilogo tabellare** con percentuale per categoria
- **Esportazione CSV** del preventivo completo
- **Stampa / salvataggio PDF** tramite dialog di stampa del browser
- **100% offline** — nessun database, nessun login, nessun tracciamento
- **Responsive** — funziona su desktop e mobile

## 🚀 Come usarlo

È una semplice app HTML/CSS/JS **senza dipendenze**. Basta aprire `index.html` nel browser.

### Oppure pubblicala su GitHub Pages:

1. Carica i file su un repository GitHub
2. Vai su **Settings → Pages**
3. Seleziona `main` come branch sorgente
4. L'app sarà disponibile su `https://tuonome.github.io/nome-repo/`

## 📁 Struttura file

```
wedding-budget/
├── index.html   # Struttura HTML
├── style.css    # Stili e layout
├── app.js       # Logica applicazione
└── README.md    # Questo file
```

## 🎨 Personalizzazione

Per cambiare il link al tuo sito, cerca `https://www.weddingcoding.it` nei file e sostituiscilo con il tuo URL.

Per cambiare i colori, modifica le variabili CSS in cima a `style.css`:
```css
:root {
  --gold: #C9A96E;
  --charcoal: #2C2825;
  /* ... */
}
```

## 📄 Licenza

Strumento gratuito realizzato da [Wedding Coding](https://www.weddingcoding.it) — siti web per sposi.
