/* Eidos Lab — interface strings (fr / en / es) and the tiny i18n runtime. */
(function () {
  var E = window.EIDOS;
  var S = {
    fr: {
      'meta.title': "Eidos Lab — un terrain de jeu pour expérimenter avec l'IA",
      'a11y.skip': 'Aller au contenu',
      'nav.lab': 'labo', 'nav.projects': 'projets', 'nav.log': 'journal', 'nav.missions': 'missions', 'nav.about': 'à propos', 'nav.contact': 'contact',
      'nav.lang': 'Langue', 'nav.theme': 'Changer de thème', 'nav.term.title': 'Ouvrir le terminal ( / )',
      'hero.typed': "> un terrain de jeu pour expérimenter avec l'IA, et partager ce qui marche (et ce qui casse)",
      'hero.lead': "Un petit labo où l'on prototype avec l'IA, où l'on évalue les outils pour de vrai, et où tout ce qui tient debout finit publié.",
      'hero.cta.lab': 'explorer le labo', 'hero.cta.projects': 'voir les projets', 'hero.cta.term': 'ouvrir le terminal',
      'boot.1': '[boot] eidos-lab v2 ............ ', 'boot.2': '[load] {n} projets indexés ....... ', 'boot.3': '[wake] robot E1D0 .............. ', 'boot.4': '[scan] bugs trouvés : 0. Suspect.',
      'fetch.projects': 'projets', 'fetch.oss': 'open source', 'fetch.mac': 'apps mac', 'fetch.skills': 'skills claude', 'fetch.agents': 'agents', 'fetch.agents.v': '1 dev + 3 review',
      'fetch.uptime': 'uptime', 'fetch.status': 'statut', 'fetch.status.v': 'tout est nominal',
      'lab.title': 'Le labo', 'lab.lead': "Les projets phares : ce qui tourne, ce qui chauffe, ce qui attend son heure.",
      'projects.title': 'Tous les projets', 'projects.home.title': 'Projets', 'projects.more': 'Voir les {n} projets →', 'projects.page.title': 'Tous les projets — Eidos Lab', 'projects.lead': "Apps Mac, outils web, skills Claude et prototypes. Tout est open source, et la plupart tournent sans compte ni serveur. Survole une carte : le robot la scanne.",
      'projects.filter': 'Filtrer par catégorie', 'projects.search': 'filtrer…', 'projects.count': '{n} résultat(s) sur {t}', 'projects.none': 'Rien ne correspond. Même le robot a cherché.',
      'cat.all': 'tout', 'cat.mac': 'apps mac', 'cat.ai': 'outils IA', 'cat.skill': 'skills claude', 'cat.pm': 'outils produit', 'cat.daily': 'quotidien', 'cat.proto': 'prototypes', 'cat.flag': 'labo',
      'st.dev': 'en dev', 'st.exp': 'expérimental', 'st.oss': 'open source', 'st.live': 'en ligne', 'st.proto': 'prototype',
      'link.open': 'ouvrir →', 'link.download': 'télécharger →', 'link.install': 'installer →', 'link.code': 'code ↗', 'link.soon': 'dépôt privé pour l\'instant',
      'log.title': 'Journal du labo', 'log.lead': "L'activité publique des dépôts, lue en direct sur GitHub. Pas de storytelling : des commits.",
      'log.loading': 'connexion à api.github.com…', 'log.error': 'journal indisponible pour le moment (limite de l\'API GitHub).', 'log.see': 'voir l\'activité sur GitHub ↗',
      'log.push': 'push', 'log.create': 'create', 'log.release': 'release', 'log.pr': 'pr', 'log.public': 'public',
      'missions.title': 'Missions', 'missions.lead': 'Accompagnement en freelance, sur mesure et sans bla-bla.',
      'missions.1.t': 'Audit du portefeuille d\'outils IA', 'missions.1.d': 'Ce que tu paies, qui y a accès, ce qui est conforme et ce qui ne l\'est pas.',
      'missions.2.t': 'Évaluation des risques', 'missions.2.d': 'Avant un nouveau déploiement : données, sécurité, dépendance au fournisseur, coût réel.',
      'missions.3.t': 'Déploiement et onboarding', 'missions.3.d': 'Mise en place des outils, cas d\'usage par métier et prise en main par les équipes.',
      'missions.4.t': 'Ateliers pratiques', 'missions.4.d': 'Des sessions où l\'on fabrique pour de vrai, dont le vibe coding avec des agents.',
      'missions.cta': 'parler d\'une mission',
      'about.title': 'À propos',
      'about.p1': "Eidos Lab est le labo d'Adrien Balcioglu : produit B2B et intégration de l'IA en entreprise le jour, un peu de code la nuit.",
      'about.p2': "Ici on teste les outils sur de vrais problèmes, on publie ce qui marche et on documente ce qui casse. Les projets servent de terrain d'essai pour ce qui est ensuite déployé chez les clients.",
      'about.etym': ': la forme, l\'idée. Le labo sert à donner une forme aux idées.',
      'about.site': 'le site d\'Adrien ↗',
      'about.m1': 'partir d\'un vrai problème', 'about.m2': 'prototyper avec des agents', 'about.m3': 'mesurer avant de généraliser', 'about.m4': 'publier le code',
      'contact.title': 'Contact', 'contact.lead': 'Une question, un projet, un bug à partager ? Écris-moi.',
      'foot.made': 'fait main, avec des agents', 'foot.legal': 'Mentions légales', 'foot.optout': '[ ] Ne pas mesurer mes visites', 'foot.optin': '[x] Visites non mesurées · réactiver',
      'foot.legal.body': "Éditeur et directeur de la publication : Adrien Balcioglu (Eidos Lab), entrepreneur individuel (micro-entreprise) immatriculé au RNE, SIRET 843 288 374 00047, TVA non applicable (art. 293 B du CGI) — contact@eidoslab.fr. Hébergement : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. Ce site ne dépose aucun cookie et n'utilise aucun traceur ; la langue et le thème sont mémorisés dans ton navigateur. Les polices sont hébergées sur ce site. La fréquentation et les clics (projets ouverts, commandes du terminal…) sont mesurés par Umami Cloud (Umami Software, Inc., États-Unis), sans cookie ni identifiant persistant, en statistiques agrégées et anonymes : tu peux la refuser avec le bouton ci-dessous. Seul le journal interroge l'API publique de GitHub, qui reçoit alors ton adresse IP. Pour toute question sur tes données : contact@eidoslab.fr.",
      'bot.aria': 'E1D0, le robot du labo. Clique pour interagir.',
      'bot.s.home': 'Démarrage d\'Eidos Lab… 0 bug trouvé. Suspect.',
      'bot.s.lab': 'Le labo : sept expériences en cours, dont une qui chauffe. Dokimos a bonne mine.',
      'bot.s.projects': 'Les projets : tout le reste de l\'étagère. Survole une carte, je la scanne.',
      'bot.s.log': 'Le journal : les commits, en direct. J\'ai déjà tout lu. Deux fois.',
      'bot.s.missions': 'Missions : mode professionnel activé. Freelance, droit au but.',
      'bot.s.about': 'Qui est derrière ? Quelqu\'un qui donne des noms grecs à ses projets et un matricule à son robot.',
      'bot.s.contact': 'Terminus. Dis bonjour, je ne mords pas. Enfin, presque pas.',
      'bot.scan': 'Scan de {name} : {tags}. Statut : {status}.',
      'bot.hi': 'Salut ! Moi c\'est E1D0. Tape / pour me donner des ordres.',
      'bot.tip': 'Essaie « bot dance » dans le terminal. Ou pas. Je ne juge pas.',
      'bot.dizzy': 'Stop… ça tourne… qui a touché à mon gyroscope ?',
      'bot.sleep': 'Je vais dans mon coin. Réveille-moi s\'il y a une mise en prod.',
      'bot.wake': 'De retour. J\'ai raté quoi ?',
      'bot.idle.1': 'Toujours là ? Tape / et essaie « help ».', 'bot.idle.2': 'Je vérifie mes boulons. Tout va bien.', 'bot.idle.3': 'Pendant ce temps, trois agents relisent une PR.', 'bot.idle.4': 'Astuce : « open ronron » dans le terminal.',
      'bot.lang': 'Langue changée. Je parle aussi le binaire, mais personne ne demande.',
      'bot.theme': 'Thème changé. Mes capteurs s\'adaptent.',
      'bot.follow': 'Suis-moi : {name}.', 'bot.party': 'MODE FÊTE ACTIVÉ.', 'bot.log': '{n} événements récupérés sur GitHub.', 'bot.filter': 'Tri en cours… {n} projet(s) dans « {cat} ».', 'bot.empty': 'Rien trouvé. J\'ai regardé sous le tapis aussi.',
      'bot.open': 'J\'ouvre {name}.',
      'status.term': 'terminal', 'status.corner': 'au coin !', 'status.wake': 'réveiller',
      'state.patrol': 'en patrouille', 'state.walk': 'en route', 'state.scan': 'scan', 'state.sleep': 'en veille', 'state.talk': 'bavarde', 'state.party': 'fête',
      'sh.welcome': 'eidos-sh 2.0 — tape « help » pour la liste des commandes.',
      'sh.help': "commandes :\n  help                 cette aide\n  ls [catégorie]       lister les projets (mac, ai, skill, pm, daily, proto, flag)\n  open <projet>        ouvrir un projet\n  cat <projet>         décrire un projet\n  goto <section>       lab, projects, log, missions, about, contact\n  lang fr|en|es        changer de langue\n  theme dark|light     changer de thème\n  bot <action>         wave, dance, jump, spin, scan <projet>, sleep, wake, say <texte>\n  neofetch · whoami · date · contact · clear · exit",
      'sh.notfound': 'commande introuvable : {c}. Tape « help ».', 'sh.noproject': 'projet introuvable : {c}. Tape « ls ».', 'sh.nosection': 'section introuvable : {c}.',
      'sh.opened': 'ouverture de {c}…', 'sh.private': '{c} n\'a pas encore de page publique.', 'sh.sudo': 'visitor n\'est pas dans le fichier sudoers. Cet incident sera signalé au robot.',
      'sh.whoami': 'visitor — invité du labo, droits : lecture, curiosité.', 'sh.lang': 'usage : lang fr|en|es', 'sh.theme': 'usage : theme dark|light', 'sh.bot': 'usage : bot wave|dance|jump|spin|scan <projet>|sleep|wake|say <texte>', 'sh.ok': 'ok.'
    },
    en: {
      'meta.title': 'Eidos Lab — a playground for AI experiments',
      'a11y.skip': 'Skip to content',
      'nav.lab': 'lab', 'nav.projects': 'projects', 'nav.log': 'log', 'nav.missions': 'missions', 'nav.about': 'about', 'nav.contact': 'contact',
      'nav.lang': 'Language', 'nav.theme': 'Switch theme', 'nav.term.title': 'Open the terminal ( / )',
      'hero.typed': '> a playground for AI experiments, sharing what works (and what breaks)',
      'hero.lead': 'A small lab where we prototype with AI, test the tools for real, and publish whatever still stands at the end.',
      'hero.cta.lab': 'explore the lab', 'hero.cta.projects': 'see the projects', 'hero.cta.term': 'open the terminal',
      'boot.1': '[boot] eidos-lab v2 ............ ', 'boot.2': '[load] {n} projects indexed ..... ', 'boot.3': '[wake] robot E1D0 .............. ', 'boot.4': '[scan] bugs found: 0. Suspicious.',
      'fetch.projects': 'projects', 'fetch.oss': 'open source', 'fetch.mac': 'mac apps', 'fetch.skills': 'claude skills', 'fetch.agents': 'agents', 'fetch.agents.v': '1 dev + 3 review',
      'fetch.uptime': 'uptime', 'fetch.status': 'status', 'fetch.status.v': 'all systems nominal',
      'lab.title': 'The lab', 'lab.lead': 'The flagship projects: what is running, what is heating up, what is waiting for its turn.',
      'projects.title': 'All projects', 'projects.home.title': 'Projects', 'projects.more': 'See all {n} projects →', 'projects.page.title': 'All projects — Eidos Lab', 'projects.lead': 'Mac apps, web tools, Claude skills and prototypes. Everything is open source, and most of it runs with no account and no server. Hover a card: the robot scans it.',
      'projects.filter': 'Filter by category', 'projects.search': 'filter…', 'projects.count': '{n} result(s) out of {t}', 'projects.none': 'Nothing matches. Even the robot looked.',
      'cat.all': 'all', 'cat.mac': 'mac apps', 'cat.ai': 'AI tools', 'cat.skill': 'claude skills', 'cat.pm': 'product tools', 'cat.daily': 'everyday', 'cat.proto': 'prototypes', 'cat.flag': 'lab',
      'st.dev': 'in dev', 'st.exp': 'experimental', 'st.oss': 'open source', 'st.live': 'live', 'st.proto': 'prototype',
      'link.open': 'open →', 'link.download': 'download →', 'link.install': 'install →', 'link.code': 'code ↗', 'link.soon': 'private repository for now',
      'log.title': 'Lab log', 'log.lead': 'Public activity on the repositories, read live from GitHub. No storytelling, just commits.',
      'log.loading': 'connecting to api.github.com…', 'log.error': 'log unavailable right now (GitHub API rate limit).', 'log.see': 'see the activity on GitHub ↗',
      'log.push': 'push', 'log.create': 'create', 'log.release': 'release', 'log.pr': 'pr', 'log.public': 'public',
      'missions.title': 'Missions', 'missions.lead': 'Freelance support, made to measure, no fluff.',
      'missions.1.t': 'AI tool portfolio audit', 'missions.1.d': 'What you pay for, who has access, what is compliant and what is not.',
      'missions.2.t': 'Risk assessment', 'missions.2.d': 'Before a new rollout: data, security, vendor lock-in, real cost.',
      'missions.3.t': 'Rollout and onboarding', 'missions.3.d': 'Setting the tools up, use cases per team, and getting people comfortable with them.',
      'missions.4.t': 'Hands-on workshops', 'missions.4.d': 'Sessions where we build for real, including vibe coding with agents.',
      'missions.cta': 'talk about a mission',
      'about.title': 'About',
      'about.p1': 'Eidos Lab is the lab of Adrien Balcioglu: B2B product and AI integration in companies by day, a bit of code at night.',
      'about.p2': 'Here the tools are tested on real problems, what works gets published and what breaks gets documented. The projects are a proving ground for what is later rolled out with clients.',
      'about.etym': ': form, idea. The lab is where ideas are given a form.',
      'about.site': "Adrien's site ↗",
      'about.m1': 'start from a real problem', 'about.m2': 'prototype with agents', 'about.m3': 'measure before scaling', 'about.m4': 'publish the code',
      'contact.title': 'Contact', 'contact.lead': 'A question, a project, a bug to share? Write to me.',
      'foot.made': 'handmade, with agents', 'foot.legal': 'Legal notice', 'foot.optout': '[ ] Do not measure my visits', 'foot.optin': '[x] Visits not measured · re-enable',
      'foot.legal.body': 'Publisher and publication director: Adrien Balcioglu (Eidos Lab), French sole proprietor (micro-entreprise) registered with the RNE, SIRET 843 288 374 00047, VAT not applicable (art. 293 B CGI) — contact@eidoslab.fr. Hosting: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. This site sets no cookies and uses no trackers; language and theme are remembered in your browser. Fonts are hosted on this site. Traffic and clicks (projects opened, terminal commands…) are measured with Umami Cloud (Umami Software, Inc., USA), with no cookies or persistent identifier, as aggregated anonymous statistics: you can opt out with the button below. Only the log queries the public GitHub API, which then receives your IP address. Questions about your data: contact@eidoslab.fr.',
      'bot.aria': 'E1D0, the lab robot. Click to interact.',
      'bot.s.home': 'Booting Eidos Lab… 0 bugs found. Suspicious.',
      'bot.s.lab': 'The lab: seven experiments running, one on fire. Dokimos is looking good.',
      'bot.s.projects': 'Projects: the rest of the shelf. Hover a card and I will scan it.',
      'bot.s.log': 'The log: commits, live. I already read all of it. Twice.',
      'bot.s.missions': 'Missions: professional mode on. Freelance stuff, straight to the point.',
      'bot.s.about': "Who's behind this? Someone who gives projects Greek names and the robot a serial number.",
      'bot.s.contact': "End of the line. Say hi, I don't bite. Much.",
      'bot.scan': 'Scanning {name}: {tags}. Status: {status}.',
      'bot.hi': "Hi! I'm E1D0. Press / to give me orders.",
      'bot.tip': 'Try "bot dance" in the terminal. Or not. I do not judge.',
      'bot.dizzy': 'Stop… spinning… who touched my gyroscope?',
      'bot.sleep': 'Going to my corner. Wake me if something ships to prod.',
      'bot.wake': 'Back on duty. What did I miss?',
      'bot.idle.1': 'Still here? Press / and try "help".', 'bot.idle.2': 'Checking my bolts. All good.', 'bot.idle.3': 'Meanwhile, three agents are reviewing a PR.', 'bot.idle.4': 'Tip: "open ronron" in the terminal.',
      'bot.lang': 'Language switched. I also speak binary, but nobody asks.',
      'bot.theme': 'Theme switched. Sensors adjusting.',
      'bot.follow': 'Follow me: {name}.', 'bot.party': 'PARTY MODE ON.', 'bot.log': '{n} events fetched from GitHub.', 'bot.filter': 'Sorting… {n} project(s) in "{cat}".', 'bot.empty': 'Nothing found. I checked under the rug too.',
      'bot.open': 'Opening {name}.',
      'status.term': 'terminal', 'status.corner': 'go to your corner', 'status.wake': 'wake up',
      'state.patrol': 'patrolling', 'state.walk': 'on my way', 'state.scan': 'scanning', 'state.sleep': 'standby', 'state.talk': 'chatting', 'state.party': 'party',
      'sh.welcome': 'eidos-sh 2.0 — type "help" for the list of commands.',
      'sh.help': 'commands:\n  help                 this help\n  ls [category]        list projects (mac, ai, skill, pm, daily, proto, flag)\n  open <project>       open a project\n  cat <project>        describe a project\n  goto <section>       lab, projects, log, missions, about, contact\n  lang fr|en|es        switch language\n  theme dark|light     switch theme\n  bot <action>         wave, dance, jump, spin, scan <project>, sleep, wake, say <text>\n  neofetch · whoami · date · contact · clear · exit',
      'sh.notfound': 'command not found: {c}. Type "help".', 'sh.noproject': 'no such project: {c}. Type "ls".', 'sh.nosection': 'no such section: {c}.',
      'sh.opened': 'opening {c}…', 'sh.private': '{c} has no public page yet.', 'sh.sudo': 'visitor is not in the sudoers file. This incident will be reported to the robot.',
      'sh.whoami': 'visitor — lab guest, permissions: read, curiosity.', 'sh.lang': 'usage: lang fr|en|es', 'sh.theme': 'usage: theme dark|light', 'sh.bot': 'usage: bot wave|dance|jump|spin|scan <project>|sleep|wake|say <text>', 'sh.ok': 'ok.'
    },
    es: {
      'meta.title': 'Eidos Lab — un terreno de juego para experimentar con la IA',
      'a11y.skip': 'Ir al contenido',
      'nav.lab': 'labo', 'nav.projects': 'proyectos', 'nav.log': 'diario', 'nav.missions': 'misiones', 'nav.about': 'acerca de', 'nav.contact': 'contacto',
      'nav.lang': 'Idioma', 'nav.theme': 'Cambiar de tema', 'nav.term.title': 'Abrir el terminal ( / )',
      'hero.typed': '> un terreno de juego para experimentar con la IA, compartiendo lo que funciona (y lo que se rompe)',
      'hero.lead': 'Un pequeño laboratorio donde se prototipa con IA, se prueban las herramientas de verdad y se publica todo lo que aguanta en pie.',
      'hero.cta.lab': 'explorar el labo', 'hero.cta.projects': 'ver los proyectos', 'hero.cta.term': 'abrir el terminal',
      'boot.1': '[boot] eidos-lab v2 ............ ', 'boot.2': '[load] {n} proyectos indexados .. ', 'boot.3': '[wake] robot E1D0 .............. ', 'boot.4': '[scan] bugs encontrados: 0. Sospechoso.',
      'fetch.projects': 'proyectos', 'fetch.oss': 'open source', 'fetch.mac': 'apps mac', 'fetch.skills': 'skills claude', 'fetch.agents': 'agentes', 'fetch.agents.v': '1 dev + 3 review',
      'fetch.uptime': 'uptime', 'fetch.status': 'estado', 'fetch.status.v': 'todo en orden',
      'lab.title': 'El labo', 'lab.lead': 'Los proyectos estrella: lo que está en marcha, lo que se calienta y lo que espera su turno.',
      'projects.title': 'Todos los proyectos', 'projects.home.title': 'Proyectos', 'projects.more': 'Ver los {n} proyectos →', 'projects.page.title': 'Todos los proyectos — Eidos Lab', 'projects.lead': 'Apps para Mac, herramientas web, skills de Claude y prototipos. Todo es open source y casi todo funciona sin cuenta ni servidor. Pasa el ratón por una tarjeta: el robot la escanea.',
      'projects.filter': 'Filtrar por categoría', 'projects.search': 'filtrar…', 'projects.count': '{n} resultado(s) de {t}', 'projects.none': 'Nada coincide. Hasta el robot ha buscado.',
      'cat.all': 'todo', 'cat.mac': 'apps mac', 'cat.ai': 'herramientas IA', 'cat.skill': 'skills claude', 'cat.pm': 'producto', 'cat.daily': 'día a día', 'cat.proto': 'prototipos', 'cat.flag': 'labo',
      'st.dev': 'en desarrollo', 'st.exp': 'experimental', 'st.oss': 'open source', 'st.live': 'en línea', 'st.proto': 'prototipo',
      'link.open': 'abrir →', 'link.download': 'descargar →', 'link.install': 'instalar →', 'link.code': 'código ↗', 'link.soon': 'repositorio privado por ahora',
      'log.title': 'Diario del labo', 'log.lead': 'La actividad pública de los repositorios, leída en directo desde GitHub. Sin relato: commits.',
      'log.loading': 'conectando con api.github.com…', 'log.error': 'diario no disponible por ahora (límite de la API de GitHub).', 'log.see': 'ver la actividad en GitHub ↗',
      'log.push': 'push', 'log.create': 'create', 'log.release': 'release', 'log.pr': 'pr', 'log.public': 'public',
      'missions.title': 'Misiones', 'missions.lead': 'Acompañamiento freelance, a medida y sin rodeos.',
      'missions.1.t': 'Auditoría de herramientas de IA', 'missions.1.d': 'Qué pagas, quién tiene acceso, qué cumple la normativa y qué no.',
      'missions.2.t': 'Evaluación de riesgos', 'missions.2.d': 'Antes de un nuevo despliegue: datos, seguridad, dependencia del proveedor, coste real.',
      'missions.3.t': 'Despliegue y onboarding', 'missions.3.d': 'Puesta en marcha de las herramientas, casos de uso por equipo y adopción.',
      'missions.4.t': 'Talleres prácticos', 'missions.4.d': 'Sesiones donde se construye de verdad, incluido el vibe coding con agentes.',
      'missions.cta': 'hablar de una misión',
      'about.title': 'Acerca de',
      'about.p1': 'Eidos Lab es el laboratorio de Adrien Balcioglu: producto B2B e integración de la IA en empresas de día, un poco de código de noche.',
      'about.p2': 'Aquí las herramientas se prueban con problemas reales, se publica lo que funciona y se documenta lo que se rompe. Los proyectos sirven de banco de pruebas para lo que luego se despliega con clientes.',
      'about.etym': ': la forma, la idea. El labo sirve para dar forma a las ideas.',
      'about.site': 'el sitio de Adrien ↗',
      'about.m1': 'partir de un problema real', 'about.m2': 'prototipar con agentes', 'about.m3': 'medir antes de generalizar', 'about.m4': 'publicar el código',
      'contact.title': 'Contacto', 'contact.lead': '¿Una pregunta, un proyecto, un bug que compartir? Escríbeme.',
      'foot.made': 'hecho a mano, con agentes', 'foot.legal': 'Aviso legal', 'foot.optout': '[ ] No medir mis visitas', 'foot.optin': '[x] Visitas no medidas · reactivar',
      'foot.legal.body': 'Editor y director de la publicación: Adrien Balcioglu (Eidos Lab), empresario individual francés (micro-entreprise) inscrito en el RNE, SIRET 843 288 374 00047, IVA no aplicable (art. 293 B del CGI) — contact@eidoslab.fr. Alojamiento: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, EE. UU. Este sitio no usa cookies ni rastreadores; el idioma y el tema se guardan en tu navegador. Las fuentes se alojan en este sitio. Las visitas y los clics (proyectos abiertos, comandos de la terminal…) se miden con Umami Cloud (Umami Software, Inc., EE. UU.), sin cookies ni identificador persistente, en estadísticas agregadas y anónimas: puedes rechazarlo con el botón de abajo. Solo el diario consulta la API pública de GitHub, que recibe entonces tu dirección IP. Preguntas sobre tus datos: contact@eidoslab.fr.',
      'bot.aria': 'E1D0, el robot del labo. Haz clic para interactuar.',
      'bot.s.home': 'Arrancando Eidos Lab… 0 bugs encontrados. Sospechoso.',
      'bot.s.lab': 'El labo: siete experimentos en marcha, uno echando humo. Dokimos tiene buena pinta.',
      'bot.s.projects': 'Los proyectos: el resto de la estantería. Pasa por una tarjeta y la escaneo.',
      'bot.s.log': 'El diario: commits, en directo. Ya lo he leído todo. Dos veces.',
      'bot.s.missions': 'Misiones: modo profesional activado. Freelance, directo al grano.',
      'bot.s.about': '¿Quién está detrás? Alguien que pone nombres griegos a sus proyectos y un número de serie a su robot.',
      'bot.s.contact': 'Fin del trayecto. Saluda, no muerdo. Casi.',
      'bot.scan': 'Escaneando {name}: {tags}. Estado: {status}.',
      'bot.hi': '¡Hola! Soy E1D0. Pulsa / para darme órdenes.',
      'bot.tip': 'Prueba «bot dance» en el terminal. O no. No juzgo.',
      'bot.dizzy': 'Para… todo da vueltas… ¿quién ha tocado mi giroscopio?',
      'bot.sleep': 'Me voy a mi rincón. Despiértame si algo sale a producción.',
      'bot.wake': 'De vuelta. ¿Qué me he perdido?',
      'bot.idle.1': '¿Sigues ahí? Pulsa / y prueba «help».', 'bot.idle.2': 'Revisando mis tornillos. Todo bien.', 'bot.idle.3': 'Mientras tanto, tres agentes revisan una PR.', 'bot.idle.4': 'Truco: «open ronron» en el terminal.',
      'bot.lang': 'Idioma cambiado. También hablo binario, pero nadie pregunta.',
      'bot.theme': 'Tema cambiado. Ajustando sensores.',
      'bot.follow': 'Sígueme: {name}.', 'bot.party': 'MODO FIESTA ACTIVADO.', 'bot.log': '{n} eventos recuperados de GitHub.', 'bot.filter': 'Ordenando… {n} proyecto(s) en «{cat}».', 'bot.empty': 'Nada. También he mirado debajo de la alfombra.',
      'bot.open': 'Abriendo {name}.',
      'status.term': 'terminal', 'status.corner': '¡al rincón!', 'status.wake': 'despertar',
      'state.patrol': 'patrullando', 'state.walk': 'en camino', 'state.scan': 'escaneando', 'state.sleep': 'en reposo', 'state.talk': 'charlando', 'state.party': 'fiesta',
      'sh.welcome': 'eidos-sh 2.0 — escribe «help» para ver los comandos.',
      'sh.help': 'comandos:\n  help                 esta ayuda\n  ls [categoría]       listar proyectos (mac, ai, skill, pm, daily, proto, flag)\n  open <proyecto>      abrir un proyecto\n  cat <proyecto>       describir un proyecto\n  goto <sección>       lab, projects, log, missions, about, contact\n  lang fr|en|es        cambiar de idioma\n  theme dark|light     cambiar de tema\n  bot <acción>         wave, dance, jump, spin, scan <proyecto>, sleep, wake, say <texto>\n  neofetch · whoami · date · contact · clear · exit',
      'sh.notfound': 'comando no encontrado: {c}. Escribe «help».', 'sh.noproject': 'proyecto no encontrado: {c}. Escribe «ls».', 'sh.nosection': 'sección no encontrada: {c}.',
      'sh.opened': 'abriendo {c}…', 'sh.private': '{c} todavía no tiene página pública.', 'sh.sudo': 'visitor no está en el archivo sudoers. Este incidente será comunicado al robot.',
      'sh.whoami': 'visitor — invitado del labo, permisos: lectura, curiosidad.', 'sh.lang': 'uso: lang fr|en|es', 'sh.theme': 'uso: theme dark|light', 'sh.bot': 'uso: bot wave|dance|jump|spin|scan <proyecto>|sleep|wake|say <texto>', 'sh.ok': 'ok.'
    }
  };
  E.strings = S;
  E.langs = ['fr', 'en', 'es'];

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  E.store = store;

  var q = new URLSearchParams(location.search).get('lang');
  var nav = (navigator.language || 'fr').slice(0, 2).toLowerCase();
  E.lang = [q, store('eidos.lang'), nav, 'fr'].filter(function (l) { return E.langs.indexOf(l) >= 0; })[0];

  E.t = function (key, vars) {
    var s = (S[E.lang] && S[E.lang][key]) || S.fr[key] || key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  };

  E.applyI18n = function (root) {
    root = root || document;
    document.documentElement.lang = E.lang;
    document.title = E.t(document.body.dataset.title || 'meta.title');
    root.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = E.t(el.getAttribute('data-i18n')); });
    root.querySelectorAll('[data-i18n-html]').forEach(function (el) { el.textContent = E.t(el.getAttribute('data-i18n-html')); });
    root.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
        var p = pair.split(':'); el.setAttribute(p[0].trim(), E.t(p[1].trim()));
      });
    });
    document.querySelectorAll('.langs button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === E.lang)); });
  };

  E.setLang = function (l, silent) {
    if (E.langs.indexOf(l) < 0) return false;
    E.lang = l; store('eidos.lang', l);
    E.applyI18n();
    E.emit('lang', { lang: l, silent: !!silent });
    return true;
  };
})();
