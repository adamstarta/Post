# PostFinance Stellenausschreibung Mockup - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Erstelle ein interaktives HTML-Mockup mit Tab-Navigation, das die originale PostFinance IT-Stellenausschreibung neben einer überarbeiteten Version zeigt, die alle 5 Handlungsempfehlungen aus der Forschungsarbeit umsetzt.

**Architecture:** Eine einzelne HTML-Datei mit eingebettetem CSS und JavaScript. Tab-Navigation schaltet zwischen Original und überarbeiteter Version. Die überarbeitete Version enthält 5 neue Sektionen (Tech-Stack, Tech-Kultur, Flexibilität, Karrierepfad, Transformation) und überarbeitete bestehende Sektionen. Alle Assets werden lokal aus dem bestehenden `_files` Ordner geladen. SVG-Icons werden inline eingebettet.

**Tech Stack:** HTML5, CSS3 (PostFinance Design-System: Farben #004B5A, #FFCC00, #EEF6F6; Fonts PostFinanceGrotesk), Vanilla JavaScript, Playwright für E2E-Tests

**Testing:** Playwright MCP für E2E-Tests mit Screenshots jeder Sektion. Screenshots werden in `c:\Users\busin\Post\screenshots\` gespeichert.

---

## Task 1: Projekt-Setup und Playwright-Konfiguration

**Files:**
- Create: `c:\Users\busin\Post\package.json`
- Create: `c:\Users\busin\Post\playwright.config.js`

**Step 1: Initialisiere package.json**

```json
{
  "name": "postfinance-mockup",
  "version": "1.0.0",
  "description": "PostFinance Stellenausschreibung Mockup - Alt vs. Neu Vergleich",
  "scripts": {
    "test": "npx playwright test",
    "test:headed": "npx playwright test --headed"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0"
  }
}
```

**Step 2: Erstelle Playwright-Konfiguration**

```javascript
// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'file:///' + __dirname.replace(/\\/g, '/'),
    screenshot: 'on',
    viewport: { width: 1280, height: 720 },
  },
  reporter: [['html', { open: 'never' }]],
});
```

**Step 3: Installiere Dependencies**

Run: `cd "c:\Users\busin\Post" && npm install`
Expected: node_modules erstellt, playwright installiert

**Step 4: Installiere Playwright Browsers**

Run: `cd "c:\Users\busin\Post" && npx playwright install chromium`
Expected: Chromium browser installiert

---

## Task 2: Basis HTML-Struktur mit Tab-Navigation

**Files:**
- Create: `c:\Users\busin\Post\mockup.html`

**Step 1: Erstelle die Basis-HTML-Struktur mit Tab-Navigation**

Die Datei enthält:
- PostFinance Logo und Tab-Navigation oben fixiert
- Container für "Aktuelle Version" (original HTML eingebettet)
- Container für "Überarbeitete Version" (wird in späteren Tasks befüllt)
- CSS für Tab-Styling im PostFinance-Design
- JavaScript für Tab-Switching

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PostFinance Stellenausschreibung - Vergleich Alt vs. Neu</title>
    <link href="./PostFinance_ Software Entwickler (w_m)_files/postfinance-directlink-v2.css" rel="stylesheet">
    <style>
        /* Tab Navigation Styles */
        .tab-navigation {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #004B5A;
            z-index: 1000;
            padding: 20px 50px;
            display: flex;
            align-items: center;
            gap: 40px;
        }

        .tab-navigation .logo img {
            height: 40px;
            width: auto;
        }

        .tab-buttons {
            display: flex;
            gap: 10px;
        }

        .tab-btn {
            padding: 12px 24px;
            border: none;
            border-radius: 100px;
            font-family: "PostFinanceGrotesk-Medium", sans-serif;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .tab-btn.active {
            background: #FFCC00;
            color: #004B5A;
        }

        .tab-btn:not(.active) {
            background: transparent;
            color: white;
            border: 2px solid white;
        }

        .tab-btn:not(.active):hover {
            background: rgba(255, 255, 255, 0.1);
        }

        /* Content Containers */
        .tab-content {
            display: none;
            padding-top: 100px;
        }

        .tab-content.active {
            display: block;
        }

        /* Smooth fade transition */
        .tab-content {
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        /* Version indicator badge */
        .version-badge {
            position: fixed;
            bottom: 80px;
            right: 30px;
            background: #004B5A;
            color: white;
            padding: 10px 20px;
            border-radius: 100px;
            font-family: "PostFinanceGrotesk-Medium", sans-serif;
            font-size: 14px;
            z-index: 999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .version-badge.new {
            background: #FFCC00;
            color: #004B5A;
        }
    </style>
</head>
<body>
    <!-- Tab Navigation -->
    <nav class="tab-navigation">
        <div class="logo">
            <img src="./PostFinance_ Software Entwickler (w_m)_files/logo.svg" alt="PostFinance">
        </div>
        <div class="tab-buttons">
            <button class="tab-btn active" data-tab="original">Aktuelle Version</button>
            <button class="tab-btn" data-tab="new">Überarbeitete Version</button>
        </div>
    </nav>

    <!-- Original Version -->
    <div id="original" class="tab-content active">
        <div class="version-badge">Aktuelle Stellenausschreibung</div>
        <!-- Original content will be embedded here -->
        <div class="wrapper" id="original-wrapper">
            <!-- Placeholder - wird in Task 3 befüllt -->
        </div>
    </div>

    <!-- New Version -->
    <div id="new" class="tab-content">
        <div class="version-badge new">Überarbeitete Version</div>
        <div class="wrapper" id="new-wrapper">
            <!-- Placeholder - wird in Tasks 4-10 befüllt -->
        </div>
    </div>

    <script>
        // Tab switching logic
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Update buttons
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update content
                const tabId = btn.dataset.tab;
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(tabId).classList.add('active');
            });
        });
    </script>
</body>
</html>
```

**Step 2: Verifiziere dass die Datei korrekt erstellt wurde**

Run: `ls -la "c:\Users\busin\Post\mockup.html"`
Expected: Datei existiert

---

## Task 3: Original-Inhalt einbetten

**Files:**
- Modify: `c:\Users\busin\Post\mockup.html`

**Step 1: Extrahiere den Body-Inhalt aus der Original-HTML**

Kopiere den gesamten Inhalt zwischen `<div class="wrapper">` und dem schliessenden `</div>` aus der Original-Datei `PostFinance_ Software Entwickler (w_m).html` in den `#original-wrapper` Container.

Der Inhalt umfasst:
- Header mit Logo, Jobtitel, Subtitle
- Intro-Sektion
- Intro-Bild
- Profile-Tasks (Das kannst du bewirken / Das bringst du mit)
- Salary-Sektion
- Video-Sektion
- Contact-Sektion
- Benefits-Sektion
- Awards-Sektion
- Similar-Jobs-Sektion

**Step 2: Teste dass die Original-Version korrekt angezeigt wird**

Öffne `mockup.html` im Browser und verifiziere:
- Tab-Navigation ist sichtbar
- Original-Inhalt wird korrekt gerendert
- Styling ist korrekt (PostFinance-Farben, Fonts)

---

## Task 4: Überarbeiteter Header mit Tech-Stack Tags

**Files:**
- Modify: `c:\Users\busin\Post\mockup.html`

**Step 1: Füge den neuen Header in #new-wrapper ein**

```html
<header>
    <div class="logo">
        <img class="non-printable" src="./PostFinance_ Software Entwickler (w_m)_files/logo.svg" alt="PostFinance">
    </div>
    <div class="header title">
        <div class="jobtitle">
            <h1>Software Engineer – Payment Platform<br>
            <span>80-100%</span>
            </h1>
        </div>

        <!-- Tech Stack Tags -->
        <div class="tech-tags">
            <span class="tech-tag">Angular</span>
            <span class="tech-tag">Java</span>
            <span class="tech-tag">Spring Boot</span>
            <span class="tech-tag">Kubernetes</span>
            <span class="tech-tag">Kafka</span>
        </div>

        <h2 class="subtitle">
            2 Mio. Transaktionen täglich · Echte Architektur-Entscheidungen · Code der zählt
        </h2>
    </div>

    <div class="subheader">
        <div class="intro">
            <p>Du baust mit uns ein Produktverwaltungssystem, das Händlern ermöglicht, Zahlungen in Echtzeit zu verarbeiten. Unser Stack: Angular 17 im Frontend, Spring Boot 3 im Backend, deployed auf Kubernetes mit GitOps. Der Code ist nicht perfekt – wir haben Legacy-Komponenten, die wir schrittweise modernisieren. Du hast direkten Einfluss auf Architekturentscheidungen und arbeitest in einem Team, das Qualität über Velocity stellt.</p>
        </div>

        <div class="jobinfos">
            <div class="workplace">
                <h3 class="title">Arbeitsort</h3>
                <div class="content">Bern / 80% Remote möglich</div>
            </div>

            <div class="experience">
                <h3 class="title">Berufserfahrung</h3>
                <div class="content">2+ Jahre in Software-Entwicklung</div>
            </div>

            <div class="reference">
                <h3 class="title">Referenznummer</h3>
                <div class="content">72246</div>
            </div>
        </div>
    </div>
</header>
```

**Step 2: Füge CSS für Tech-Tags hinzu**

```css
/* Tech Stack Tags */
.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
}

.tech-tag {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 6px 16px;
    border-radius: 100px;
    font-family: "PostFinanceGrotesk-Medium", sans-serif;
    font-size: 14px;
    border: 1px solid rgba(255, 255, 255, 0.3);
}
```

---

## Task 5: Neue Sektion "Unser Tech-Stack & Arbeitsweise"

**Files:**
- Modify: `c:\Users\busin\Post\mockup.html`

**Step 1: Erstelle SVG-Icons für Tech-Kategorien**

Inline SVGs für: Monitor (Frontend), Server (Backend), Cloud (Infrastructure)

**Step 2: Füge die Tech-Stack Sektion nach dem Intro-Bild ein**

```html
<section class="tech-stack-section" id="section-tech-stack">
    <h2><b>Unser Tech-Stack & Arbeitsweise</b></h2>

    <div class="tech-grid">
        <div class="tech-category">
            <div class="tech-category-header">
                <svg class="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                <h3>Frontend</h3>
            </div>
            <div class="tech-pills">
                <span class="tech-pill">Angular 17</span>
                <span class="tech-pill">TypeScript</span>
                <span class="tech-pill">HTML5</span>
                <span class="tech-pill">SCSS</span>
            </div>
        </div>

        <div class="tech-category">
            <div class="tech-category-header">
                <svg class="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                    <line x1="6" y1="6" x2="6.01" y2="6"></line>
                    <line x1="6" y1="18" x2="6.01" y2="18"></line>
                </svg>
                <h3>Backend</h3>
            </div>
            <div class="tech-pills">
                <span class="tech-pill">Java 17</span>
                <span class="tech-pill">Spring Boot 3</span>
                <span class="tech-pill">PostgreSQL</span>
                <span class="tech-pill">Kafka</span>
            </div>
        </div>

        <div class="tech-category">
            <div class="tech-category-header">
                <svg class="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                </svg>
                <h3>Infrastructure & DevOps</h3>
            </div>
            <div class="tech-pills">
                <span class="tech-pill">Kubernetes</span>
                <span class="tech-pill">OpenShift</span>
                <span class="tech-pill">GitOps</span>
                <span class="tech-pill">ArgoCD</span>
                <span class="tech-pill">Prometheus</span>
            </div>
        </div>
    </div>

    <div class="work-practices">
        <h3>So arbeiten wir</h3>
        <ul class="practice-list">
            <li>
                <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="#FFCC00" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Code Reviews sind Pflicht, nicht Option
            </li>
            <li>
                <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="#FFCC00" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Automatisierte Tests vor jedem Merge
            </li>
            <li>
                <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="#FFCC00" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Pair Programming bei komplexen Features
            </li>
            <li>
                <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="#FFCC00" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Tech-Debt hat festen Platz in jedem Sprint
            </li>
        </ul>
    </div>
</section>
```

**Step 3: Füge CSS für Tech-Stack Sektion hinzu**

```css
/* Tech Stack Section */
.tech-stack-section {
    padding: 80px 50px;
    background: #EEF6F6;
    margin: 50px 0;
    border-radius: 20px;
}

.tech-stack-section h2 {
    margin-bottom: 50px;
}

.tech-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-bottom: 50px;
}

.tech-category {
    background: white;
    border-radius: 16px;
    padding: 30px;
}

.tech-category-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
}

.tech-icon {
    width: 32px;
    height: 32px;
    color: #004B5A;
}

.tech-category h3 {
    font-family: "PostFinanceGrotesk-Medium", sans-serif;
    color: #004B5A;
    margin: 0;
    font-size: 18px;
}

.tech-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tech-pill {
    background: #004B5A;
    color: white;
    padding: 8px 16px;
    border-radius: 100px;
    font-size: 14px;
    font-family: "PostFinanceGrotesk-Light", sans-serif;
}

.work-practices {
    background: white;
    border-radius: 16px;
    padding: 30px;
}

.work-practices h3 {
    font-family: "PostFinanceGrotesk-Medium", sans-serif;
    color: #004B5A;
    margin-bottom: 25px;
    font-size: 20px;
}

.practice-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.practice-list li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 16px;
    color: #333;
}

.check-icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
}

@media (max-width: 900px) {
    .tech-grid {
        grid-template-columns: 1fr;
    }
    .practice-list {
        grid-template-columns: 1fr;
    }
}
```

---

## Task 6: Neue Sektion "Wie wir wirklich arbeiten" (Tech-Kultur)

**Files:**
- Modify: `c:\Users\busin\Post\mockup.html`

**Step 1: Füge die Tech-Kultur Sektion ein**

```html
<section class="culture-section" id="section-culture">
    <h2><b>Wie wir wirklich arbeiten</b></h2>

    <div class="culture-cards">
        <div class="culture-card">
            <svg class="culture-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
            </svg>
            <h3>Hackathons</h3>
            <p>2x jährlich – eigene Ideen umsetzen, neue Technologien ausprobieren, teamübergreifend arbeiten</p>
        </div>

        <div class="culture-card">
            <svg class="culture-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <h3>Open Source</h3>
            <p>Wir nutzen Open Source – und geben zurück. Contributions sind erwünscht und werden unterstützt.</p>
        </div>

        <div class="culture-card">
            <svg class="culture-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <h3>Innovation Time</h3>
            <p>Regelmässig Zeit für Experimente, Prototypen und neue Ansätze – ohne Rechtfertigungsdruck.</p>
        </div>
    </div>

    <div class="culture-quote">
        <blockquote>
            "Bei uns entscheidet das Team, nicht das Management"
        </blockquote>

        <ul class="autonomy-list">
            <li>Du wählst deine Tools selbst – kein vorgeschriebenes IDE oder Setup</li>
            <li>Architekturentscheidungen fallen im Team, nicht im Steering Committee</li>
            <li>Meetings sind optional wenn du fokussiert arbeiten willst – wir respektieren Deep Work</li>
            <li>Bürokratie halten wir bewusst klein: kein Ticket für jeden Handgriff</li>
        </ul>
    </div>

    <div class="culture-honest">
        <h3>Was wir nicht sind</h3>
        <p>Wir sind kein Startup. Wir haben regulatorische Anforderungen und gewachsene Systeme. Aber wir geben dir den Freiraum, innerhalb dieser Realität echte Verbesserungen zu bewirken.</p>
    </div>
</section>
```

**Step 2: Füge CSS für Tech-Kultur Sektion hinzu**

```css
/* Culture Section */
.culture-section {
    padding: 80px 50px;
}

.culture-section h2 {
    margin-bottom: 50px;
}

.culture-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-bottom: 50px;
}

.culture-card {
    background: #EEF6F6;
    border-radius: 20px;
    padding: 40px 30px;
    text-align: center;
    transition: background 0.3s ease;
}

.culture-card:hover {
    background: #D6EBEB;
}

.culture-icon {
    width: 48px;
    height: 48px;
    color: #004B5A;
    margin-bottom: 20px;
}

.culture-card h3 {
    font-family: "PostFinanceGrotesk-Medium", sans-serif;
    color: #004B5A;
    font-size: 22px;
    margin-bottom: 15px;
}

.culture-card p {
    color: #333;
    font-size: 16px;
    line-height: 1.5;
}

.culture-quote {
    background: #004B5A;
    border-radius: 20px;
    padding: 50px;
    margin-bottom: 30px;
}

.culture-quote blockquote {
    color: #FFCC00;
    font-family: "PostFinanceGrotesk-Medium", sans-serif;
    font-size: 28px;
    margin: 0 0 30px 0;
    text-align: center;
}

.autonomy-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.autonomy-list li {
    color: white;
    font-size: 16px;
    padding-left: 30px;
    position: relative;
}

.autonomy-list li::before {
    content: "→";
    position: absolute;
    left: 0;
    color: #FFCC00;
}

.culture-honest {
    background: #EEF6F6;
    border-radius: 20px;
    padding: 40px;
}

.culture-honest h3 {
    font-family: "PostFinanceGrotesk-Medium", sans-serif;
    color: #004B5A;
    margin-bottom: 15px;
}

.culture-honest p {
    color: #333;
    font-size: 18px;
    line-height: 1.6;
    margin: 0;
}

@media (max-width: 900px) {
    .culture-cards {
        grid-template-columns: 1fr;
    }
    .autonomy-list {
        grid-template-columns: 1fr;
    }
}
```

---

## Task 7: Überarbeitete Sektionen "Das kannst du bewirken" & "Das bringst du mit"

**Files:**
- Modify: `c:\Users\busin\Post\mockup.html`

**Step 1: Füge die überarbeiteten Profil-Sektionen ein**

```html
<section class="profile-tasks" id="section-tasks">
    <div class="column">
        <h2><b>Das kannst du bewirken</b></h2>
        <div>
            <ul>
                <li>Du baust Features, die täglich von 2 Millionen Kunden genutzt werden – vom Commit bis Production in unter einer Woche</li>
                <li>Du entscheidest mit über Architektur und Tech-Stack. Keine Elfenbeinturm-Architekten, die dir Vorgaben machen</li>
                <li>Du modernisierst Legacy-Code zu sauberen Microservices – mit echtem Einfluss auf technische Entscheidungen</li>
                <li>Du schreibst Code, der funktioniert: automatisierte Tests, Code Reviews, CI/CD – weil Qualität keine Option ist</li>
                <li>Du teilst Wissen in Tech-Talks und lernst von Kollegen, die genauso ticken wie du</li>
            </ul>
        </div>
    </div>

    <div class="column">
        <h2><b>Das bringst du mit</b></h2>
        <div class="requirements-split">
            <div class="must-have">
                <h4>Must-have</h4>
                <ul>
                    <li>Solide Erfahrung in Java oder Kotlin</li>
                    <li>Frontend-Know-how (Angular, React oder Vue)</li>
                    <li>Cloud-Native Mindset (Container, CI/CD)</li>
                    <li>Gute Deutsch- und Englischkenntnisse</li>
                </ul>
            </div>
            <div class="nice-to-have">
                <h4>Nice-to-have</h4>
                <ul>
                    <li>Erfahrung mit Kafka, Elasticsearch</li>
                    <li>Kubernetes & GitOps Praxis</li>
                    <li>Open-Source Contributions</li>
                    <li>Fintech-Background</li>
                </ul>
            </div>
        </div>
    </div>
</section>
```

**Step 2: Füge CSS für die Requirements-Split Ansicht hinzu**

```css
/* Requirements Split */
.requirements-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 35px;
}

.must-have, .nice-to-have {
    background: #EEF6F6;
    border-radius: 16px;
    padding: 25px;
}

.must-have h4, .nice-to-have h4 {
    font-family: "PostFinanceGrotesk-Medium", sans-serif;
    color: #004B5A;
    margin: 0 0 15px 0;
    font-size: 16px;
}

.must-have {
    border-left: 4px solid #004B5A;
}

.nice-to-have {
    border-left: 4px solid #FFCC00;
}

.must-have ul, .nice-to-have ul {
    margin: 0;
    padding-left: 20px;
}

.must-have li, .nice-to-have li {
    margin-bottom: 10px;
    font-size: 15px;
}

@media (max-width: 600px) {
    .requirements-split {
        grid-template-columns: 1fr;
    }
}
```

---

## Task 8: Neue Sektion "Flexibilität für Developer"

**Files:**
- Modify: `c:\Users\busin\Post\mockup.html`

**Step 1: Lade Icons herunter oder erstelle inline SVGs**

Icons benötigt: Home, Globe/Plane, Clock, Calendar

**Step 2: Füge die Flexibilität Sektion ein**

```html
<section class="flexibility-section" id="section-flexibility">
    <h2><b>Flexibilität, die den Namen verdient</b></h2>

    <div class="flex-cards">
        <div class="flex-card">
            <div class="flex-icon-wrapper">
                <svg class="flex-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            </div>
            <div class="flex-content">
                <h3>Homeoffice</h3>
                <p>Bis zu 80% remote – du entscheidest wann Präsenz sinnvoll ist</p>
            </div>
        </div>

        <div class="flex-card">
            <div class="flex-icon-wrapper">
                <svg class="flex-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
            </div>
            <div class="flex-content">
                <h3>Workation</h3>
                <p>Bis zu 4 Wochen pro Jahr aus dem EU-Ausland arbeiten</p>
            </div>
        </div>

        <div class="flex-card">
            <div class="flex-icon-wrapper">
                <svg class="flex-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
            </div>
            <div class="flex-content">
                <h3>Echte Gleitzeit</h3>
                <p>Keine Kernzeiten. Früh starten und um 15 Uhr Schluss? Kein Problem.</p>
            </div>
        </div>

        <div class="flex-card">
            <div class="flex-icon-wrapper">
                <svg class="flex-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
            </div>
            <div class="flex-content">
                <h3>6 Wochen Ferien + Optionen</h3>
                <p>Zusätzlich: unbezahlter Urlaub für Sabbaticals oder längere Reisen möglich</p>
            </div>
        </div>
    </div>
</section>
```

**Step 3: Füge CSS für Flexibilität Sektion hinzu**

```css
/* Flexibility Section */
.flexibility-section {
    padding: 80px 50px;
    background: #EEF6F6;
    margin: 50px 0;
    border-radius: 20px;
}

.flexibility-section h2 {
    margin-bottom: 50px;
}

.flex-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.flex-card {
    background: white;
    border-radius: 16px;
    padding: 30px;
    display: flex;
    gap: 20px;
    align-items: flex-start;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.flex-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 75, 90, 0.1);
}

.flex-icon-wrapper {
    background: #FFCC00;
    border-radius: 12px;
    padding: 12px;
    flex-shrink: 0;
}

.flex-icon {
    width: 28px;
    height: 28px;
    color: #004B5A;
}

.flex-content h3 {
    font-family: "PostFinanceGrotesk-Medium", sans-serif;
    color: #004B5A;
    font-size: 20px;
    margin: 0 0 8px 0;
}

.flex-content p {
    color: #333;
    font-size: 16px;
    margin: 0;
    line-height: 1.5;
}

@media (max-width: 768px) {
    .flex-cards {
        grid-template-columns: 1fr;
    }
}
```

---

## Task 9: Neue Sektion "Dein IT-Karrierepfad"

**Files:**
- Modify: `c:\Users\busin\Post\mockup.html`

**Step 1: Füge die Karrierepfad Sektion mit visuellem Diagramm ein**

```html
<section class="career-section" id="section-career">
    <h2><b>Dein Karrierepfad in der IT</b></h2>
    <p class="career-intro">Zwei Wege, gleichwertig – du entscheidest, wohin dich deine Karriere führt.</p>

    <div class="career-diagram">
        <div class="career-track technical">
            <h3>Technical Track</h3>
            <div class="career-levels">
                <div class="career-level level-5">
                    <span class="level-title">Principal Engineer</span>
                </div>
                <div class="career-arrow">↑</div>
                <div class="career-level level-4">
                    <span class="level-title">Staff Engineer</span>
                </div>
                <div class="career-arrow">↑</div>
                <div class="career-level level-3">
                    <span class="level-title">Senior Engineer</span>
                </div>
                <div class="career-arrow">↑</div>
                <div class="career-level level-2">
                    <span class="level-title">Engineer</span>
                </div>
                <div class="career-arrow">↑</div>
                <div class="career-level level-1">
                    <span class="level-title">Junior Engineer</span>
                </div>
            </div>
        </div>

        <div class="career-bridge">
            <span>←→</span>
            <span>←→</span>
            <span>←→</span>
        </div>

        <div class="career-track leadership">
            <h3>Leadership Track</h3>
            <div class="career-levels">
                <div class="career-level level-5">
                    <span class="level-title">Head of Engineering</span>
                </div>
                <div class="career-arrow">↑</div>
                <div class="career-level level-4">
                    <span class="level-title">Engineering Manager</span>
                </div>
                <div class="career-arrow">↑</div>
                <div class="career-level level-3">
                    <span class="level-title">Team Lead</span>
                </div>
                <div class="career-spacer"></div>
                <div class="career-spacer"></div>
            </div>
        </div>
    </div>

    <div class="career-details">
        <h3>Was das konkret heisst</h3>
        <ul>
            <li>
                <svg class="career-check" viewBox="0 0 24 24" fill="none" stroke="#FFCC00" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Jährliche Entwicklungsgespräche mit klaren Kriterien
            </li>
            <li>
                <svg class="career-check" viewBox="0 0 24 24" fill="none" stroke="#FFCC00" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Wechsel zwischen Tracks jederzeit möglich
            </li>
            <li>
                <svg class="career-check" viewBox="0 0 24 24" fill="none" stroke="#FFCC00" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Weiterbildungsbudget: CHF 5'000 pro Jahr
            </li>
            <li>
                <svg class="career-check" viewBox="0 0 24 24" fill="none" stroke="#FFCC00" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Konferenzbesuche (intern + extern) erwünscht
            </li>
        </ul>
    </div>
</section>
```

**Step 2: Füge CSS für Karrierepfad Sektion hinzu**

```css
/* Career Section */
.career-section {
    padding: 80px 50px;
}

.career-section h2 {
    margin-bottom: 15px;
}

.career-intro {
    color: #666;
    font-size: 18px;
    margin-bottom: 50px;
}

.career-diagram {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-bottom: 50px;
}

.career-track {
    background: #EEF6F6;
    border-radius: 20px;
    padding: 30px 40px;
    min-width: 220px;
}

.career-track.technical {
    border-top: 4px solid #004B5A;
}

.career-track.leadership {
    border-top: 4px solid #FFCC00;
}

.career-track h3 {
    font-family: "PostFinanceGrotesk-Medium", sans-serif;
    color: #004B5A;
    text-align: center;
    margin-bottom: 30px;
    font-size: 18px;
}

.career-levels {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.career-level {
    background: white;
    padding: 12px 24px;
    border-radius: 8px;
    text-align: center;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.level-title {
    font-family: "PostFinanceGrotesk-Medium", sans-serif;
    color: #004B5A;
    font-size: 14px;
}

.career-arrow {
    color: #004B5A;
    font-size: 18px;
}

.career-spacer {
    height: 44px;
}

.career-bridge {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 80px;
    gap: 52px;
    color: #004B5A;
    font-size: 20px;
    font-weight: bold;
}

.career-details {
    background: #004B5A;
    border-radius: 20px;
    padding: 40px;
}

.career-details h3 {
    color: white;
    font-family: "PostFinanceGrotesk-Medium", sans-serif;
    margin-bottom: 25px;
    font-size: 20px;
}

.career-details ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.career-details li {
    color: white;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 16px;
}

.career-check {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
}

@media (max-width: 768px) {
    .career-diagram {
        flex-direction: column;
        align-items: center;
    }
    .career-bridge {
        flex-direction: row;
        padding: 20px 0;
        gap: 20px;
    }
    .career-details ul {
        grid-template-columns: 1fr;
    }
}
```

---

## Task 10: Neue Sektion "Wohin wir uns entwickeln" (Transformation)

**Files:**
- Modify: `c:\Users\busin\Post\mockup.html`

**Step 1: Füge die Transformations-Sektion ein**

```html
<section class="future-section" id="section-future">
    <h2><b>Wohin wir uns entwickeln</b></h2>
    <p class="future-intro">Wir reden offen über Themen, die andere verschweigen:</p>

    <div class="future-cards">
        <div class="future-card">
            <div class="future-icon-wrapper">
                <svg class="future-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2a4 4 0 0 1 4 4c0 1.1-.4 2.1-1.1 2.9L12 12l-2.9-3.1A4 4 0 0 1 12 2z"></path>
                    <path d="M12 12v8"></path>
                    <path d="M8 16h8"></path>
                    <circle cx="12" cy="6" r="1"></circle>
                </svg>
            </div>
            <h3>Künstliche Intelligenz</h3>
            <p>KI ersetzt bei uns keine Entwickler – sie unterstützt sie. Wir setzen Copilot ein und experimentieren mit LLMs für Code Reviews. Du gestaltest mit, wie wir KI sinnvoll nutzen.</p>
        </div>

        <div class="future-card">
            <div class="future-icon-wrapper">
                <svg class="future-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
            </div>
            <h3>Internationales Team</h3>
            <p>Wir arbeiten mit Kolleg:innen in Nearshore-Standorten. Das bedeutet: internationale Zusammenarbeit, nicht Jobabbau. Unsere Schweizer Teams wachsen weiter.</p>
        </div>

        <div class="future-card">
            <div class="future-icon-wrapper">
                <svg class="future-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
            </div>
            <h3>Tech-Radar</h3>
            <p>Einmal im Quartal reviewen wir unseren Stack öffentlich. Was kommt, was geht, was bleibt – transparent für alle.</p>
        </div>
    </div>
</section>
```

**Step 2: Füge CSS für Transformations-Sektion hinzu**

```css
/* Future Section */
.future-section {
    padding: 80px 50px;
    background: #EEF6F6;
    margin: 50px 0;
    border-radius: 20px;
}

.future-section h2 {
    margin-bottom: 15px;
}

.future-intro {
    color: #666;
    font-size: 18px;
    margin-bottom: 50px;
}

.future-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}

.future-card {
    background: white;
    border-radius: 20px;
    padding: 40px 30px;
}

.future-icon-wrapper {
    background: #004B5A;
    border-radius: 16px;
    padding: 16px;
    display: inline-block;
    margin-bottom: 25px;
}

.future-icon {
    width: 32px;
    height: 32px;
    color: #FFCC00;
}

.future-card h3 {
    font-family: "PostFinanceGrotesk-Medium", sans-serif;
    color: #004B5A;
    font-size: 22px;
    margin-bottom: 15px;
}

.future-card p {
    color: #333;
    font-size: 16px;
    line-height: 1.6;
    margin: 0;
}

@media (max-width: 900px) {
    .future-cards {
        grid-template-columns: 1fr;
    }
}
```

---

## Task 11: Überarbeitete Benefits & Gehalt Sektion

**Files:**
- Modify: `c:\Users\busin\Post\mockup.html`

**Step 1: Füge die überarbeitete Gehalt-Sektion ein**

```html
<section class="salary" id="section-salary">
    <p>
        <strong>CHF 95'000 – 115'000</strong> pro Jahr (100%-Pensum).<br><br>
        Transparent, ohne Verhandlungspoker. Wenn du die Anforderungen erfüllst, liegt dein Gehalt in dieser Range. Bei aussergewöhnlicher Erfahrung auch darüber. Wir glauben an faire Löhne – nicht an Pokerspiele.
    </p>
</section>
```

**Step 2: Füge IT-spezifische Benefits zur Benefits-Sektion hinzu**

Die bestehenden Benefits bleiben, ergänzt um:
- Hardware-Wahl (MacBook oder ThinkPad)
- CHF 5'000 Weiterbildungsbudget
- Konferenzbesuche
- Learning Time

---

## Task 12: Restliche Original-Sektionen einbinden

**Files:**
- Modify: `c:\Users\busin\Post\mockup.html`

**Step 1: Kopiere und passe folgende Sektionen an**

- Video-Sektion (bleibt gleich)
- Kontakt-Sektion (bleibt gleich)
- Benefits-Sektion (mit IT-Ergänzungen)
- Awards-Sektion (bleibt gleich)
- Similar-Jobs-Sektion (bleibt gleich)
- Footer (bleibt gleich)

---

## Task 13: Playwright E2E-Tests erstellen

**Files:**
- Create: `c:\Users\busin\Post\tests\mockup.spec.js`

**Step 1: Erstelle die Testdatei mit Screenshot-Tests für jede Sektion**

```javascript
const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const screenshotDir = path.join(__dirname, '..', 'screenshots');

// Ensure screenshot directory exists
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

test.describe('PostFinance Mockup - Original Version', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/mockup.html');
        await page.click('[data-tab="original"]');
        await page.waitForTimeout(500);
    });

    test('01 - Tab Navigation sichtbar', async ({ page }) => {
        const nav = page.locator('.tab-navigation');
        await expect(nav).toBeVisible();
        await page.screenshot({
            path: path.join(screenshotDir, '01-original-tab-navigation.png'),
            fullPage: false
        });
    });

    test('02 - Original Header', async ({ page }) => {
        const header = page.locator('#original header').first();
        await header.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '02-original-header.png'),
            fullPage: false
        });
    });

    test('03 - Original Intro Sektion', async ({ page }) => {
        const intro = page.locator('#original section.intro').first();
        await intro.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '03-original-intro.png'),
            fullPage: false
        });
    });

    test('04 - Original Profile Tasks', async ({ page }) => {
        const tasks = page.locator('#original .profile-tasks');
        await tasks.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '04-original-profile-tasks.png'),
            fullPage: false
        });
    });

    test('05 - Original Benefits', async ({ page }) => {
        const benefits = page.locator('#original section.benefits');
        await benefits.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '05-original-benefits.png'),
            fullPage: false
        });
    });
});

test.describe('PostFinance Mockup - Überarbeitete Version', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/mockup.html');
        await page.click('[data-tab="new"]');
        await page.waitForTimeout(500);
    });

    test('06 - Neuer Header mit Tech-Tags', async ({ page }) => {
        const header = page.locator('#new header').first();
        await header.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '06-new-header-tech-tags.png'),
            fullPage: false
        });
    });

    test('07 - Tech-Stack Sektion', async ({ page }) => {
        const section = page.locator('#section-tech-stack');
        await section.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '07-new-tech-stack.png'),
            fullPage: false
        });
    });

    test('08 - Tech-Kultur Sektion', async ({ page }) => {
        const section = page.locator('#section-culture');
        await section.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '08-new-tech-culture.png'),
            fullPage: false
        });
    });

    test('09 - Überarbeitete Tasks Sektion', async ({ page }) => {
        const section = page.locator('#section-tasks');
        await section.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '09-new-tasks.png'),
            fullPage: false
        });
    });

    test('10 - Flexibilität Sektion', async ({ page }) => {
        const section = page.locator('#section-flexibility');
        await section.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '10-new-flexibility.png'),
            fullPage: false
        });
    });

    test('11 - Karrierepfad Sektion', async ({ page }) => {
        const section = page.locator('#section-career');
        await section.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '11-new-career-path.png'),
            fullPage: false
        });
    });

    test('12 - Transformation Sektion', async ({ page }) => {
        const section = page.locator('#section-future');
        await section.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '12-new-transformation.png'),
            fullPage: false
        });
    });

    test('13 - Gehalt Sektion', async ({ page }) => {
        const section = page.locator('#section-salary');
        await section.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '13-new-salary.png'),
            fullPage: false
        });
    });
});

test.describe('Tab Navigation Funktionalität', () => {
    test('14 - Tab-Wechsel funktioniert', async ({ page }) => {
        await page.goto('/mockup.html');

        // Start on original
        await expect(page.locator('#original')).toBeVisible();
        await expect(page.locator('#new')).not.toBeVisible();

        // Switch to new
        await page.click('[data-tab="new"]');
        await page.waitForTimeout(300);

        await expect(page.locator('#new')).toBeVisible();
        await expect(page.locator('#original')).not.toBeVisible();

        await page.screenshot({
            path: path.join(screenshotDir, '14-tab-switch.png'),
            fullPage: false
        });
    });

    test('15 - Full Page Original', async ({ page }) => {
        await page.goto('/mockup.html');
        await page.click('[data-tab="original"]');
        await page.waitForTimeout(500);
        await page.screenshot({
            path: path.join(screenshotDir, '15-full-page-original.png'),
            fullPage: true
        });
    });

    test('16 - Full Page New', async ({ page }) => {
        await page.goto('/mockup.html');
        await page.click('[data-tab="new"]');
        await page.waitForTimeout(500);
        await page.screenshot({
            path: path.join(screenshotDir, '16-full-page-new.png'),
            fullPage: true
        });
    });
});
```

**Step 2: Erstelle Screenshot-Beschreibungsdatei**

Nach dem Ausführen der Tests wird eine Beschreibungsdatei erstellt:

```markdown
# Screenshot Beschreibungen

## Original Version
- 01-original-tab-navigation.png: Tab-Navigation mit PostFinance Logo und zwei Buttons
- 02-original-header.png: Original Header mit generischem Text
- 03-original-intro.png: Original Intro-Sektion
- 04-original-profile-tasks.png: Original Anforderungen
- 05-original-benefits.png: Original Benefits

## Überarbeitete Version
- 06-new-header-tech-tags.png: Neuer Header mit Tech-Stack Tags
- 07-new-tech-stack.png: Tech-Stack Sektion mit Pills und Arbeitsweisen
- 08-new-tech-culture.png: Tech-Kultur mit Hackathons, Open Source, Autonomie
- 09-new-tasks.png: Überarbeitete Tasks mit Must-have/Nice-to-have Split
- 10-new-flexibility.png: Flexibilität Cards (Homeoffice, Workation, etc.)
- 11-new-career-path.png: Karrierepfad Diagramm mit zwei Tracks
- 12-new-transformation.png: Transformation Sektion (KI, Nearshoring, Tech-Radar)
- 13-new-salary.png: Überarbeitete Gehalt-Sektion

## Funktionalität
- 14-tab-switch.png: Tab-Wechsel Demonstration
- 15-full-page-original.png: Komplette Original-Seite
- 16-full-page-new.png: Komplette überarbeitete Seite
```

---

## Task 14: Tests ausführen und Screenshots analysieren

**Step 1: Führe alle Playwright Tests aus**

Run: `cd "c:\Users\busin\Post" && npx playwright test`

Expected: Alle 16 Tests bestehen, Screenshots werden in `screenshots/` gespeichert

**Step 2: Analysiere jeden Screenshot und beschreibe den Inhalt**

Für jeden Screenshot:
1. Öffne das Bild
2. Beschreibe was sichtbar ist
3. Dokumentiere in `screenshots/BESCHREIBUNGEN.md`

---

## Task 15: Finale Verifikation und Cleanup

**Step 1: Öffne mockup.html im Browser und teste manuell**

Verifiziere:
- Tab-Navigation funktioniert smooth
- Alle Sektionen werden korrekt gerendert
- Styling ist konsistent (PostFinance-Farben)
- Responsive Verhalten auf verschiedenen Breiten
- Alle Icons werden angezeigt

**Step 2: Erstelle finale Dokumentation**

Erstelle `c:\Users\busin\Post\README.md`:

```markdown
# PostFinance Stellenausschreibung Mockup

Dieses Mockup zeigt den Vergleich zwischen der aktuellen PostFinance IT-Stellenausschreibung und einer überarbeiteten Version basierend auf den 5 Handlungsempfehlungen der Forschungsarbeit.

## Verwendung

Öffne `mockup.html` im Browser.

## Handlungsempfehlungen umgesetzt

1. **Spezifische IT-EVP** → Tech-Stack Tags, konkrete Projektbeschreibung
2. **Technologisches Storytelling** → Tech-Kultur Sektion
3. **Flexible Arbeitsmodelle** → Flexibilität Sektion
4. **Transparente IT-Karrierepfade** → Karrierepfad Diagramm
5. **Transformationen transparent kommunizieren** → Transformation Sektion

## Screenshots

Siehe `screenshots/` Ordner für visuelle Dokumentation aller Sektionen.
```

---

Plan complete and saved to `docs/plans/2025-12-05-postfinance-stellenausschreibung-mockup.md`.

**Zwei Execution-Optionen:**

**1. Subagent-Driven (diese Session)** - Ich dispatche einen frischen Subagent pro Task, Code Review zwischen Tasks, schnelle Iteration

**2. Parallel Session (separat)** - Öffne neue Session im Worktree, Batch-Ausführung mit Checkpoints

**Welchen Ansatz bevorzugst du?**
