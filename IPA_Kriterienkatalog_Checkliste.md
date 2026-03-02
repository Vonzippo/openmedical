# IPA Kriterienkatalog - Dokumentations-Checkliste

> Basierend auf dem Kriterienkatalog Qualifikationsverfahren Informatiker/in 2023 (PK19 / MBA ZH / PkOrg)
> Ergänzt mit projektspezifischen Kriterien

---

## Projektspezifische Kriterien

### C02 - Datenmodelle entwickeln

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Geeignete Datenmodellierungsmethodik gewählt (relational, objektorientiert, ER), Wahl sinnvoll begründet | [ ] | |
| 2 | Spezifische Geschäftsanforderungen im Datenmodell korrekt widerspiegelt | [ ] | |
| 3 | Grundsätze der Normalisierung sinnvoll angewandt | [ ] | |
| 4 | Datenmodell ist flexibel und skalierbar | [ ] | |
| 5 | Datenmodell ausreichend dokumentiert für andere Entwickler | [ ] | |
| 6 | Performanceanforderungen dokumentiert und entsprochen (z.B. Indexierungen) | [ ] | |

---

### C08 - Planung und Implementierung eines Rollenkonzepts

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Entsprechende Rollen korrekt identifiziert und beschrieben | [ ] | |
| 2 | Einsetzbares Berechtigungsmanagement entwickelt (Rollen mit Zugriffsrechten verknüpft) | [ ] | |
| 3 | Prinzip der geringsten Privilegien (Least Privilege) korrekt angewandt | [ ] | |
| 4 | Konzept erfolgreich implementiert | [ ] | |

---

### A13 - Erhebung und Dokumentation der Bedürfnisse und Umfeld

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Strukturiertes Vorgehen bei Bedürfniserhebung (Befragungstechniken, Erhebungen, Modelle), dokumentiert | [ ] | |
| 2 | Relevante Bedürfnisse (Kosten, Zeit, Qualität, Funktionen) präzise erhoben und dokumentiert | [ ] | |
| 3 | Bedürfnisse nach Relevanz oder Dringlichkeit priorisiert/strukturiert | [ ] | |
| 4 | Systeme, Umfeld und relevante Schnittstellen korrekt identifiziert und dokumentiert | [ ] | |

---

### G01 - Dokumentation fachlicher und technischer Anforderungen

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Fachliche und technische Anforderungen vollständig, verständlich und nachvollziehbar dokumentiert | [ ] | |
| 2 | Anforderungen lösungsneutral beschrieben und nach Relevanz/Priorität gekennzeichnet | [ ] | |
| 3 | Anforderungen klar formuliert, eindeutig abgegrenzt, bei Bedarf mit Beispielen/Akzeptanzkriterien | [ ] | |
| 4 | Einheitliche Begriffsdefinitionen und klare Struktur für Stakeholder | [ ] | |

---

### G02 - Validierung und Abstimmung von Anforderungen mit Stakeholdern

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Anforderungen mit allen relevanten Stakeholdern (inkl. Endnutzer) überprüft und validiert | [ ] | |
| 2 | Rückmeldungen und Änderungswünsche aufgenommen, dokumentiert und berücksichtigt | [ ] | |
| 3 | Endgültige Anforderungen gemeinsam abgestimmt und nachvollziehbar festgehalten | [ ] | |
| 4 | Dokumentation aktuell, inklusive aller Änderungen während des Entwicklungsprozesses | [ ] | |

---

### G04 - Überprüfung der technischen Machbarkeit

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Technische Machbarkeit überprüft (Schnittstellen, Datenstrukturen, Technologien, Abhängigkeiten) | [ ] | |
| 2 | Potenzielle Risiken/technische Einschränkungen früh erkannt und dokumentiert | [ ] | |
| 3 | Mit Stakeholdern/Fachpersonen machbare Alternativen oder Optimierungen besprochen | [ ] | |
| 4 | Gewählte Lösung technisch realisierbar und entspricht definierten Anforderungen | [ ] | |

---

### G10 - Einrichtung der Entwicklungs- und Laufzeitumgebung

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Auswahl/Konfiguration basiert auf Realisierungskonzept und Firmenvorgaben | [ ] | |
| 2 | Alle Tools und Dienste installiert und funktionsfähig (IDEs, Datenbanken, Versionierung) | [ ] | |
| 3 | Umgebung unterstützt Back-End und Front-End, berücksichtigt Sicherheitsanforderungen | [ ] | |
| 4 | Effiziente, strukturierte Programmierung möglich, unterstützt Tests und Debugging | [ ] | |

---

### G12 - Testkonzepterstellung und Testfalldefinition

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Testumfeld vollständig beschrieben (System, Akteure, Daten, Benutzer, Berechtigungen) - reproduzierbar | [ ] | |
| 2 | Geeignete Testarten gewählt (Unit, Integration, Sicherheit etc.), Begründung dokumentiert | [ ] | |
| 3 | Testfälle klar beschrieben, wiederholbar (automatisiert oder manuell) | [ ] | |
| 4 | Erwartete Ergebnisse definiert, Fehler souverän behoben | [ ] | |

---

### H01 - Komponenten-Abhängigkeiten und deren Auswahl

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Alle relevanten Abhängigkeiten identifiziert (Mikroservices, Software, Schnittstellen/APIs) | [ ] | |
| 2 | Potenzielle Risiken und Einschränkungen durch Abhängigkeiten analysiert und dokumentiert | [ ] | |
| 3 | Abhängigkeiten bewertet für Auswahl geeigneter Plattformen/Technologien | [ ] | |
| 4 | Analyse nachvollziehbar dokumentiert und für Stakeholder verständlich | [ ] | |

---

### H09 - Überwachung der Sicherheit von Applikationen

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Relevante Sicherheitsmetriken/Ereignisse definiert (fehlerhafte Logins, Berechtigungsänderungen, kritische Zugriffe) | [ ] | |
| 2 | Monitoring-Mechanismen oder Logs eingerichtet | [ ] | |
| 3 | Sicherheitsrelevante Vorfälle regelmässig überprüft und dokumentiert | [ ] | |
| 4 | Bei Problemen angemessene Massnahmen umgesetzt/vorgeschlagen | [ ] | |

---

## Teil A: Kriterien Fachkompetenz (Standard)

### A1 - Projektmanagement und Planung

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Projektmanagement-Methode ist benannt und passt zum Auftrag | [ ] | |
| 2 | Methode wurde in der praktischen Arbeit korrekt angewandt | [ ] | |
| 3 | Korrekte Anwendung ist im IPA-Bericht ersichtlich | [ ] | |
| 4 | Auftrag wurde ausgehend von Aufgabenstellung analysiert und verfeinert | [ ] | |

**Gütestufen:** 4 Punkte = Stufe 3 | 3 Punkte = Stufe 2 | 2 Punkte = Stufe 1 | <2 Punkte = Stufe 0

---

### A2 - Wissensbeschaffung

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Nachweis durch Arbeitsjournal, Projektbericht oder Protokolle dokumentiert | [ ] | |
| 2 | Informationsquellen aufgabenbezogen ausgewählt | [ ] | |
| 3 | Relevante Informationen identifiziert und genutzt (Transferleistung) | [ ] | |
| 4 | Referenzierte Quellen sind existent und rekonstruierbar | [ ] | |

**Gütestufen:** 4 Punkte = Stufe 3 | 3 Punkte = Stufe 2 | 2 Punkte = Stufe 1 | <2 Punkte = Stufe 0

---

### A3 - Zeitplan

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Absolute Zeitachse definiert (Datum) | [ ] | |
| 2 | Vernünftige Auflösung (1, 2- oder 4-Stundenblöcke) | [ ] | |
| 3 | Zweckmässige Tätigkeiten decken ganze Arbeit ab | [ ] | |
| 4 | Reihenfolge der Tätigkeiten ist sinnvoll | [ ] | |
| 5 | Zeitaufwände realistisch geplant | [ ] | |
| 6 | Soll/Ist-Vergleich ist transparent und korrekt | [ ] | |

**Gütestufen:** 6-5 Punkte = Stufe 3 | 5-4 Punkte = Stufe 2 | 3-2 Punkte = Stufe 1 | <2 Punkte = Stufe 0

---

### A4 - Konzeptionelle Umsetzung

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Konzepte/Modelle für Aufgabenstellung (vereinfachte Darstellung) | [ ] | |
| 2 | Konzepte/Modelle für Lösung (vereinfachte Darstellung) | [ ] | |
| 3 | Teilsysteme und Abhängigkeiten identifiziert und dokumentiert | [ ] | |
| 4 | Abbildung des Gesamtsystems orientiert sich an Punkten 1-3 | [ ] | |

**Gütestufen:** 4-3 Punkte = Stufe 3 | 3-2 Punkte = Stufe 2 | 1 Punkt = Stufe 1 | 0 Punkte = Stufe 0

---

### A5 - Projektumfeld: Systemgrenzen / Schnittstellen

| Gütestufe | Beschreibung | Status |
|-----------|--------------|--------|
| 3 | Abgrenzung zum Umfeld bekannt und beschrieben, Schnittstellen im Detail bekannt und dokumentiert | [ ] |
| 2 | Schnittstellen bekannt, aber nur teilweise dokumentiert was "aussen" geschieht | [ ] |
| 1 | Nur vage Vorstellung vom Umfeld, Schnittstellen nicht/kaum dokumentiert | [ ] |
| 0 | Nur eigener Auftrag sichtbar, kein Wissen über Umfeld | [ ] |

---

### A6 - Testkonzept

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Zu testendes System und Umgebung beschrieben | [ ] | |
| 2 | Relevante Testfälle inkl. erwarteter Ergebnisse beschrieben | [ ] | |
| 3 | Nachvollziehbare Begründung, was bewusst nicht getestet wird | [ ] | |
| 4 | Relevante Testmittel beschrieben (Hardware, Netzwerk etc.) | [ ] | |
| 5 | Verwendete Testmethode(n) beschrieben | [ ] | |

**Gütestufen:** 5 Punkte = Stufe 3 | 4 Punkte = Stufe 2 | 3-2 Punkte = Stufe 1 | <2 Punkte = Stufe 0

---

### A7 - Leistungsfähigkeit

| # | Kriterium | Status | Notizen |
|---|-----------|--------|---------|
| 1 | Durchwegs engagiert gearbeitet, keine Gleichgültigkeit | [ ] | |
| 2 | Keine Stresssituationen oder souveräner Umgang damit | [ ] | |
| 3 | Zielorientiert gearbeitet | [ ] | |
| 4 | Zeitliche Vorgaben berücksichtigt | [ ] | |
| 5 | Über Aufgabenstellung hinaus gedacht, fehlende Elemente ergänzt | [ ] | |

**Gütestufen:** 5 Punkte = Stufe 3 | 4 Punkte = Stufe 2 | 3-2 Punkte = Stufe 1 | <2 Punkte = Stufe 0

---

### A8 - Selbständiges Arbeiten

| # | Kriterium | Status | Notizen |
|---|-----------|--------|---------|
| 1 | Wesentliches von Unwesentlichem trennen, Prioritäten setzen | [ ] | |
| 2 | Selbständig zu Informationen kommen, Lösungsvarianten aufzeigen | [ ] | |
| 3 | Arbeit gut einteilen, keine ungerechtfertigte Unterstützung benötigt | [ ] | |
| 4 | Arbeit selbständig organisieren, Ziele trotz Problemen erreicht | [ ] | |

**Gütestufen:** 4 Punkte = Stufe 3 | 3 Punkte = Stufe 2 | 2 Punkte = Stufe 1 | <2 Punkte = Stufe 0

---

### A9 - Fachkenntnisse und Anwendungskompetenz

| Gütestufe | Beschreibung | Status |
|-----------|--------------|--------|
| 3 | Technische/fachliche Grundlagen bekannt und situationsgerecht angewandt. Produkte sicher, zielgerichtet, routiniert und fehlerfrei angewendet. | [ ] |
| 2 | Schwächen durch unsichere Aussagen oder ungeschickte Anwendung. Umgang teilweise umständlich. | [ ] |
| 1 | Grosse Lücken in Fachkenntnissen. Produkte nur unvollständig und unsicher genutzt. | [ ] |
| 0 | Fachtechnische Grundlagen nicht bekannt. Sehr unsicherer Umgang mit Produkten. | [ ] |

---

### A10 - Anwendung der Fachsprache

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Fachbegriffe konsequent für spezifische Sachverhalte eingesetzt | [ ] | |
| 2 | Richtige Fachbegriffe präzise eingesetzt | [ ] | |
| 3 | Fachbegriffe an benötigten Stellen, bei Nachfrage erläuterbar | [ ] | |
| 4 | Erklärung zu Fachbegriffen fachlich korrekt | [ ] | |

**Gütestufen:** 4 Punkte = Stufe 3 | 3 Punkte = Stufe 2 | 2 Punkte = Stufe 1 | <2 Punkte = Stufe 0

---

### A11 - Arbeits- und Fachmethodik

| Gütestufe | Beschreibung | Status |
|-----------|--------------|--------|
| 3 | Geeignete Fachmethoden/Arbeitstechniken ausgewählt, korrekt angewandt und vollständig umgesetzt | [ ] |
| 2 | Geeignete Methoden ausgewählt und korrekt angewandt, jedoch unvollständig umgesetzt | [ ] |
| 1 | Geeignete Methoden ausgewählt, aber inkorrekt angewandt | [ ] |
| 0 | Keine oder ungeeignete Fachmethoden/Arbeitstechniken ausgewählt | [ ] |

---

### A12 - Organisation der Arbeitsergebnisse

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Arbeitsergebnisse angemessen versioniert | [ ] | |
| 2 | Auf alle Versionen jederzeit zugreifbar | [ ] | |
| 3 | Tägliche Sicherung der Arbeitsergebnisse | [ ] | |
| 4 | Wiederherstellung der Sicherungen sichergestellt | [ ] | |
| 5 | Punkte 1-4 im IPA-Bericht beschrieben und nachvollziehbar | [ ] | |

**Gütestufen:** 5 Punkte = Stufe 3 | 4 Punkte = Stufe 2 | 3 Punkte = Stufe 1 | <3 Punkte = Stufe 0

---

### A13-Standard - IPA-Erfüllungsgrad

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Resultat entspricht Anforderungen gemäss Aufgabenstellung | [ ] | |
| 2 | Resultat entspricht der Arbeit einer Fachperson | [ ] | |
| 3 | Potential im Rahmen der vorgegebenen Zeit ausgeschöpft | [ ] | |

**Gütestufen:** 3 Punkte = Stufe 3 | 2 Punkte = Stufe 2 | 1 Punkt = Stufe 1 | 0 Punkte = Stufe 0

---

## Teil B: Dokumentation

### B1 - Kurzfassung des IPA-Berichtes

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Richtet sich an fachlich kompetente Leser | [ ] | |
| 2 | Enthält: Kurze Ausgangssituation - Umsetzung - Ergebnis | [ ] | |
| 3 | Zu jedem Punkt die wesentlichen Aspekte enthalten | [ ] | |
| 4 | Nicht länger als eine A4-Seite Text, keine Grafik | [ ] | |

**Gütestufen:** 4 Punkte = Stufe 3 | 3 Punkte = Stufe 2 | 2 Punkte = Stufe 1 | <2 Punkte = Stufe 0

---

### B2 - Führung des Arbeitsjournals

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Darstellung übersichtlich, klar und verständlich | [ ] | |
| 2 | Alle Aktivitäten gemäss Zeitplan sowie Überzeiten/ungeplante Arbeiten erwähnt | [ ] | |
| 3 | Erfolge und Misserfolge erwähnt | [ ] | |
| 4 | Alle beanspruchten Hilfestellungen erwähnt und begründet | [ ] | |

**Gütestufen:** 4 Punkte = Stufe 3 | 3 Punkte = Stufe 2 | 2 Punkte = Stufe 1 | <2 Punkte = Stufe 0

---

### B3 - Reflexionsfähigkeit

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Im Arbeitsjournal Vorgehensweise und Ergebnis kritisch hinterfragt | [ ] | |
| 2 | Lösungs-Varianten verglichen oder begründet warum keine existieren | [ ] | |
| 3 | Im Schlusswort nachvollziehbare Schlüsse aus eigener Reflexion | [ ] | |
| 4 | Schlusswort enthält persönliche Bilanz | [ ] | |

**Gütestufen:** 4 Punkte = Stufe 3 | 3 Punkte = Stufe 2 | 2 Punkte = Stufe 1 | <2 Punkte = Stufe 0

---

### B4 - Gliederung

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Passende Kapitelstruktur zu Themen und Schwerpunkten | [ ] | |
| 2 | Übersichtlich gegliedert, Überschriften mit entsprechenden Inhalten | [ ] | |
| 3 | Reihenfolge der Themen aufeinander abgestimmt | [ ] | |
| 4 | Gestaltung erleichtert Lesefluss (behindert ihn nicht) | [ ] | |

**Gütestufen:** 4 Punkte = Stufe 3 | 3 Punkte = Stufe 2 | 2 Punkte = Stufe 1 | <2 Punkte = Stufe 0

---

### B5 - Prägnanz

| Gütestufe | Beschreibung | Status |
|-----------|--------------|--------|
| 3 | Bestmöglich gestaltet, max. 1 Ausnahme. So ausführlich wie nötig, kein Ballast/Redundanz | [ ] |
| 2 | Max. 2 Stellen mit Schwächen (zu lang/redundant/irrelevant/fehlende Infos) | [ ] |
| 1 | Max. 3 Stellen mit Schwächen | [ ] |
| 0 | Mehr als 3 Stellen mit Schwächen | [ ] |

---

### B6 - Formale Vollständigkeit des IPA-Berichts

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Teil 1 (obligatorische Kapitel) und Teil 2 (Projekt-Dokumentation), Quellcode im Anhang | [ ] | |
| 2 | Teil 1 enthält: Projektaufbauorganisation, Zeitplan, Arbeitsjournal | [ ] | |
| 3 | Aktuelles Inhaltsverzeichnis | [ ] | |
| 4 | Schriftlicher Nachweis zu allen Quellen, Quellen gültig und verlässlich | [ ] | |
| 5 | Kopf-/Fusszeile mit aktuellem Druckdatum und Name auf allen Seiten (optional Titelblatt) | [ ] | |
| 6 | Alphabetisch sortiertes Glossar mit korrekten Erläuterungen | [ ] | |

**Gütestufen:** 6 Punkte = Stufe 3 | 5 Punkte = Stufe 2 | 4-3 Punkte = Stufe 1 | <3 Punkte = Stufe 0

---

### B7 - Sprachlicher Ausdruck und Stil / Rechtschreibung und Grammatik

| # | Kriterium | Status | Notizen |
|---|-----------|--------|---------|
| 1 | Sprache klar verständlich, flüssiger Stil, vollständige Sätze | [ ] | |
| 2 | Fachbegriffe korrekt und adressatengerecht eingesetzt | [ ] | |
| 3 | Nur wenige Rechtschreib- oder Grammatikfehler | [ ] | |

**Gütestufen:** 3 Punkte = Stufe 3 | 2 Punkte = Stufe 2 | 1 Punkt = Stufe 1 | 0 Punkte = Stufe 0

---

### B8 - Darstellung

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Geeignete Seitennummerierung | [ ] | |
| 2 | Sinnvoller Seitenumbruch (behindert Lesefluss nicht) | [ ] | |
| 3 | Jede Seite enthält Informationen (nicht nur einzelne Zeile/Überschrift) | [ ] | |
| 4 | Zweckmässige und saubere Darstellung | [ ] | |

**Gütestufen:** 4 Punkte = Stufe 3 | 3 Punkte = Stufe 2 | 2 Punkte = Stufe 1 | <2 Punkte = Stufe 0

---

### B9 - Grafiken, Bilder, Diagramme und Tabellen

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | An vernünftigen Stellen eingesetzt zur besseren Darstellung | [ ] | |
| 2 | Wahl der Darstellungen durchgehend geeignet | [ ] | |
| 3 | Kontrastreich und optisch gut lesbar (A4-Ausdruck als Referenz) | [ ] | |
| 4 | Inhaltlich verständlich | [ ] | |
| 5 | Aussagekräftig | [ ] | |
| 6 | Im Text oder in Legende erklärt | [ ] | |
| 7 | Passen zum Kontext | [ ] | |

**Gütestufen:** 7 Punkte = Stufe 3 | 6 Punkte = Stufe 2 | 5-4 Punkte = Stufe 1 | <4 Punkte = Stufe 0

---

### B10 - Durchführung und Auswertung der Tests

| # | Kriterium | Status | Nachweis/Ort |
|---|-----------|--------|--------------|
| 1 | Testdurchführung basiert auf Testkonzept, dokumentiert (inkl. Abweichungen) | [ ] | |
| 2 | Alle Testresultate korrekt und übersichtlich dokumentiert | [ ] | |
| 3 | Testprotokoll mit Testzeitpunkt, Testperson, spezifische Informationen | [ ] | |
| 4 | Aussagekräftiges Fazit pro Testfall, allfällige Massnahmen/Empfehlungen | [ ] | |

**Gütestufen:** 4 Punkte = Stufe 3 | 3 Punkte = Stufe 2 | 2 Punkte = Stufe 1 | <2 Punkte = Stufe 0

---

## Teil C: Fachgespräch und Präsentation

### C1 - Präsentation: Zeitmanagement, Struktur

| # | Kriterium | Status | Notizen |
|---|-----------|--------|---------|
| 1 | Einstieg mit Überblick, Mittelteil, Abschluss mit kritischer Würdigung | [ ] | |
| 2 | Wesentliche Aspekte der IPA-Ergebnisse gezeigt | [ ] | |
| 3 | Relevante Schwerpunkte gesetzt | [ ] | |
| 4 | Logisch und zusammenhängend aufgebaut | [ ] | |
| 5 | Zeitrahmen eingehalten (15-20 Min) | [ ] | |

---

### C2 - Präsentation: Medieneinsatz, technische Aspekte

| # | Kriterium | Status | Notizen |
|---|-----------|--------|---------|
| 1 | Geeignete Mittel zur Unterstützung des Vortrages eingesetzt | [ ] | |
| 2 | Eingesetzte Mittel korrekt bedient | [ ] | |
| 3 | Sprache und Medieneinsatz aufeinander abgestimmt | [ ] | |
| 4 | Technische Hilfsmittel vorab getestet, laufen einwandfrei | [ ] | |

---

### C3 - Präsentationstechnik

| # | Kriterium | Status | Notizen |
|---|-----------|--------|---------|
| 1 | Aussagen tadellos formuliert | [ ] | |
| 2 | Sätze verständlich aufgebaut, vollständig und sprachlich korrekt | [ ] | |
| 3 | Deutliche Aussprache | [ ] | |
| 4 | Gestik/Mimik dem Zielpublikum angepasst | [ ] | |
| 5 | Regelmässiger Blickkontakt zum Publikum | [ ] | |

---

### C4 - Demonstration / Vorführung des Produktes

| # | Kriterium | Status | Notizen |
|---|-----------|--------|---------|
| 1 | Grundlegende Funktionen der Facharbeit gezeigt | [ ] | |
| 2 | Inhaltlich und fachlich gut vorbereitet | [ ] | |
| 3 | Für Zuschauer verständlich und nachvollziehbar | [ ] | |
| 4 | Roten Faden nicht verloren | [ ] | |

**Richtwert:** ca. 10 Minuten für die Demonstration

---

### C5-C10 - Fachgespräch: Themenkomplexe 1-6

| Themenkomplex | Thema | Status | Notizen |
|---------------|-------|--------|---------|
| C5 | _________________ | [ ] | |
| C6 | _________________ | [ ] | |
| C7 | _________________ | [ ] | |
| C8 | _________________ | [ ] | |
| C9 | _________________ | [ ] | |
| C10 | _________________ | [ ] | |

---

## Schnell-Checkliste für die tägliche Arbeit

### Täglich
- [ ] Arbeitsjournal führen (Aktivitäten, Erfolge, Misserfolge, Hilfestellungen)
- [ ] Soll/Ist-Vergleich im Zeitplan aktualisieren
- [ ] Arbeitsergebnisse sichern (Backup)
- [ ] Git Commit mit aussagekräftiger Message

### Wöchentlich
- [ ] Zeitplan noch realistisch?
- [ ] Alle Quellen dokumentiert?
- [ ] Glossar aktualisiert?
- [ ] Screenshots/Diagramme erstellt?

### Vor Abgabe
- [ ] Kurzfassung (max. 1 A4-Seite, nur Text)
- [ ] Inhaltsverzeichnis aktualisiert
- [ ] Kopf-/Fusszeilen auf allen Seiten
- [ ] Glossar alphabetisch sortiert
- [ ] Rechtschreibprüfung
- [ ] Testkonzept und Testdurchführung dokumentiert
- [ ] Schlusswort mit persönlicher Bilanz
- [ ] Quellcode im Anhang

---

## Notizen

### Projektmanagement-Methode
**Gewählte Methode:** ____________________

**Begründung:** ____________________

---

### Informationsquellen

| # | Quelle | Typ | Verwendet für |
|---|--------|-----|---------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |

---

### Hilfestellungen

| Datum | Von wem | Wofür | Begründung |
|-------|---------|-------|------------|
| | | | |

---

### Lösungsvarianten

| Variante | Vorteile | Nachteile | Gewählt? |
|----------|----------|-----------|----------|
| | | | |

---

### Glossar (alphabetisch)

| Begriff | Erklärung |
|---------|-----------|
| | |

---

*Dokument basierend auf IPA Kriterienkatalog 2023 (PK19 / MBA ZH / PkOrg) + projektspezifische Kriterien*
