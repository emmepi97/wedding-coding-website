window.STORY_CONFIG = {
  title: "Il matrimonio di Harry e Kate",
  intro: "Una storia d'amore simulata, elegante e romantica, costruita per un chatbot semantico. Harry e Kate si sono trovati quasi per caso, hanno imparato a scegliersi davvero e oggi trasformano quella complicità in una promessa.",
  coupleLabel: "Harry & Kate",
  chatTitle: "Fai una domanda sulla loro storia d'amore 💖",
  quickQuestions: [
    "Come si sono conosciuti?",
    "Com'è andato il primo appuntamento?",
    "Quando hanno capito di amarsi?",
    "Raccontami la proposta di matrimonio",
    "Qual è stata la difficoltà più grande?",
    "Perché hanno deciso di sposarsi?"
  ],
  fallback: "Non sono sicuro di aver colto bene la domanda, ma posso raccontarti come si sono conosciuti, il primo appuntamento, il momento in cui hanno capito di amarsi, la proposta, le difficoltà superate, il motivo per cui si sposano oppure i loro sogni per il futuro.",
  welcomeMessage: "Ciao 💖\nSono il piccolo chatbot della storia di Harry e Kate.\nPuoi chiedermi come si sono conosciuti, com'è nato l'amore, come è arrivata la proposta o perché hanno deciso di sposarsi.",
  intents: [
    {
      id: "conoscenza",
      tags: ["inizio", "incontro", "conoscersi", "origine", "come tutto e iniziato"],
      patterns: [
        "come si sono conosciuti",
        "come si sono incontrati",
        "dove si sono conosciuti",
        "raccontami l'inizio",
        "come e iniziata la loro storia"
      ],
      response: "Harry e Kate si sono conosciuti durante una serata di fine estate organizzata da amici comuni. Non fu uno di quegli incontri rumorosi e teatrali, ma qualcosa di più sottile: una conversazione semplice, naturale, che però sembrava avere un ritmo diverso dal resto della stanza. Harry fu colpito dalla calma luminosa di Kate, mentre Kate notò subito il modo in cui Harry sapeva ascoltare davvero. Da quel primo scambio nacque una curiosità reciproca che nei giorni successivi si trasformò nel desiderio di risentirsi e cercarsi ancora."
    },
    {
      id: "primo_appuntamento",
      tags: ["primo appuntamento", "uscita", "prima volta insieme", "prima cena"],
      patterns: [
        "com e andato il primo appuntamento",
        "raccontami il primo appuntamento",
        "prima uscita insieme",
        "prima cena",
        "prima volta da soli"
      ],
      response: "Il loro primo appuntamento fu in una piccola libreria con caffetteria nel centro storico. Avevano scelto un posto tranquillo per potersi parlare senza fretta, e proprio lì capirono che il tempo insieme sembrava scorrere in un modo tutto loro. La conversazione partì da cose leggere, poi entrò naturalmente nei sogni, nelle paure e nelle ambizioni. Quando uscirono, nessuno dei due voleva davvero interrompere quel momento, e fu in quell'istante che entrambi compresero che non si trattava di una semplice uscita riuscita bene."
    },
    {
      id: "innamorarsi",
      tags: ["amore", "innamorarsi", "capire", "sentimenti", "quando"],
      patterns: [
        "quando hanno capito di amarsi",
        "quando si sono innamorati",
        "come hanno capito di essere innamorati",
        "quando e nato l amore"
      ],
      response: "Non ci fu un giorno preciso in cui Harry e Kate si dissero interiormente adesso è amore. Fu più un'accumulazione di piccole conferme. Kate capì che Harry era diventato essenziale quando iniziò a cercarlo spontaneamente in ogni notizia bella o difficile della giornata. Harry capì di essere innamorato quando si accorse che accanto a Kate non sentiva il bisogno di sembrare diverso da ciò che era. L'amore arrivò così: senza clamore, ma con una profondità che cresceva ogni volta che si sceglievano con sincerità."
    },
    {
      id: "ricordo",
      tags: ["ricordo", "momento bello", "speciale", "memoria"],
      patterns: [
        "qual e il ricordo piu bello",
        "momento piu bello",
        "ricordo speciale",
        "episodio piu importante"
      ],
      response: "Uno dei ricordi più belli di Harry e Kate è un viaggio improvvisato al mare in una giornata di vento, nato quasi per sfida e finito per diventare uno dei simboli della loro relazione. Non era perfetto: il tempo cambiava, il programma saltava continuamente e nulla seguiva i piani iniziali. Eppure proprio in quella giornata scoprirono quanto fosse semplice stare bene insieme anche nell'imprevisto. Per loro quel ricordo rappresenta la gioia di trovare casa l'uno nell'altra, indipendentemente dal contesto."
    },
    {
      id: "proposta",
      tags: ["proposta", "anello", "vuoi sposarmi", "matrimonio"],
      patterns: [
        "raccontami la proposta",
        "come e arrivata la proposta",
        "com e andata la proposta di matrimonio",
        "quando c e stata la proposta"
      ],
      response: "La proposta arrivò durante un weekend in una villa circondata da ulivi, in un pomeriggio quieto e dorato. Harry non volle costruire una scena eccessiva, perché sapeva che Kate avrebbe amato soprattutto la verità del momento. Le parlò con semplicità, ricordandole come la loro storia avesse trasformato la quotidianità in qualcosa di prezioso, e poi le chiese di continuare a costruire quella vita insieme. Kate si commosse prima ancora di rispondere, perché in quella domanda c'era tutto il cammino fatto fino ad allora."
    },
    {
      id: "difficolta",
      tags: ["difficolta", "ostacoli", "crisi", "momento difficile", "litigio"],
      patterns: [
        "qual e stata la difficolta piu grande",
        "avete superato un momento difficile",
        "come hanno affrontato i problemi",
        "hanno avuto una crisi"
      ],
      response: "La difficoltà più grande non fu un litigio clamoroso, ma un periodo in cui Harry e Kate si trovarono schiacciati da ritmi di vita molto intensi. Avevano meno tempo, più stanchezza e il rischio silenzioso di darsi per scontati. Invece di allontanarsi, decisero di affrontare quel momento con sincerità, riconoscendo che l'amore non vive solo di emozione spontanea ma anche di cura consapevole. Fu una fase importante, perché insegnò loro che una relazione solida non è quella senza problemi, ma quella che sa proteggersi quando la vita si fa più complessa."
    },
    {
      id: "perche_sposarsi",
      tags: ["sposarsi", "scelta", "matrimonio", "perche"],
      patterns: [
        "perche hanno deciso di sposarsi",
        "perche si sposano",
        "cosa significa per loro il matrimonio",
        "come hanno capito di volersi sposare"
      ],
      response: "Harry e Kate hanno deciso di sposarsi perché a un certo punto la loro storia ha smesso di essere soltanto una bellissima relazione e ha iniziato a somigliare con forza a una direzione di vita. Per loro il matrimonio non è un trofeo romantico, ma una forma di scelta piena, adulta e luminosa. Significa dire con ancora più chiarezza che vogliono affrontare il futuro dalla stessa parte, continuando a costruire insieme una casa emotiva fatta di fiducia, ironia, ascolto e presenza."
    },
    {
      id: "testimoni",
      tags: ["testimoni", "amici", "persone importanti", "vicini"],
      patterns: [
        "perche hanno scelto questi testimoni",
        "chi e stato importante per loro",
        "cosa significano i testimoni",
        "chi li ha accompagnati fin qui"
      ],
      response: "I testimoni, per Harry e Kate, sono persone che non rappresentano solo un ruolo cerimoniale ma una parte autentica del loro cammino. Sono amici che hanno visto nascere la relazione, che l'hanno sostenuta nei passaggi delicati e che hanno riconosciuto con naturalezza la bontà di quel legame. Averli accanto nel giorno del matrimonio significa rendere visibile anche la gratitudine per chi ha custodito pezzi veri della loro storia."
    },
    {
      id: "futuro",
      tags: ["futuro", "sogni", "domani", "progetti"],
      patterns: [
        "quali sono i loro sogni",
        "come immaginano il futuro",
        "dove si vedono tra dieci anni",
        "che progetti hanno"
      ],
      response: "Harry e Kate immaginano il futuro come una costruzione fatta di grandi desideri e piccole fedeltà quotidiane. Sognano una vita in cui continuare a ridere molto, a proteggere i momenti semplici e a non perdere mai la capacità di parlarsi davvero. Non vogliono una perfezione irreale; vogliono una complicità resistente, capace di adattarsi ai cambiamenti della vita senza smarrire il senso profondo del loro stare insieme."
    }
  ]
};
