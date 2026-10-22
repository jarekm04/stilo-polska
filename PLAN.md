# Przeprojektowanie stilopolska.pl — plan

Myśl przewodnia: **„Bal po balu"** — strona składa się w trakcie przewijania, tak jak dom
z bala składa się z warstw. Każda sekcja ma jeden mocny, przemyślany ruch, a przejścia między
nimi są ciągłe: kamera nigdy nie przeskakuje.

**Zasady, które obowiązują na każdym etapie:**

- Cały tekst zostaje obecny — zmienia się wyłącznie sposób jego odsłaniania. Dopisywane są
  tylko `alt` i `aria-label`.
- Tożsamość zostaje: bursztyn `#ec8117`, Playfair Display, ciepła paleta.
- Animacje wyłącznie na `transform` i `opacity`, odpalane przez IntersectionObserver.
- `prefers-reduced-motion` wycina ruch w całym drzewie (`MotionConfig reducedMotion="user"`).
- Commity robi Jarek. Po każdym etapie dostaje gotowy tytuł commita.

---

## Nowa kolejność sekcji na stronie głównej

Stara kolejność prowadziła przez firmę, zanim pokazała choć jeden dom. Nowa opowiada:
*zobacz → kim jesteśmy → co budujemy → co już stoi → jak to robimy → zadzwoń.*

| # | Sekcja | Było | Jest |
|---|---|---|---|
| 1 | Hero | 1 | 1 |
| 2 | Liczby (2004 / 20+ / 450 / 100%) | część „O nas" | wydzielone, ciemny pasek pod hero |
| 3 | O firmie — tekst zapalany słowami | 4 | 3 |
| 4 | Atuty (4 kafle) | część „O nas" | sticky split zaraz pod opisem |
| 5 | Oferta — przewijanie poziome | 3 | 5 |
| 6 | Realizacje — stos kart 3D | 5 | 6 |
| 7 | Technologia — bęben 3D | 6 | 7 |
| 8 | CTA + stopka | 7, 8 | bez zmian |

---

## Etapy

### ✅ Etap 1 — Fundament ruchu

> `Etap 1: fundament ruchu – Lenis, Framer Motion, ziarno, kurtyna`

- [x] **Lenis** — płynne przewijanie z bezwładnością (`src/lib/smoothScroll.ts`)
- [x] **Framer Motion** — animacje spięte z pozycją scrolla, nie z timerem
- [x] **Ziarno** — warstwa szumu SVG na całej stronie, `soft-light`, zero requestów
- [x] **Pasek postępu** — bursztynowa nitka pod paskiem nawigacji
- [x] **Kurtyna przejść** — panel z logo zakrywa podmianę trasy i zjeżdża w górę
- [x] **Header** — chowa się przy przewijaniu w dół, wraca przy geście w górę, kurczy się po hero
- [x] **Strzałki** — przepisane na Framer Motion, „Przewiń" jako spływająca kreska
- [x] ~~Własny kursor~~ — **wycofane na prośbę Jarka, kursor zostaje domyślny**

### ✅ Etap 2 — Hero jako jedno ciągłe ujęcie

> `Etap 2: hero jako jedno ciągłe ujęcie kamery`

- [x] Zdjęcie jedzie wolniej niż treść i przybliża się; całość przygasa przy wyjeździe
- [x] Zmiana slajdu kurtyną `clip-path` od dołu zamiast przesuwania w bok (koniec z Embla w hero)
- [x] Tytuł odsłaniany **literą po literze spod maski wiersza**, podpis słowo po słowie
- [x] Stopień pisma liczony z długości słowa — zawsze jeden wiersz, ok. ⅔ szerokości kolumny
- [x] Kreski wyboru slajdu przy prawej krawędzi + pasek czasu slajdu na dole

### ✅ Etap 3 — Liczby, opis firmy, atuty

> `Etap 3: liczby odometrem, opis zapalany słowami, atuty na sticky split`

- [x] **Liczby** — ciemny pasek tuż pod hero; cyfry wjeżdżają rolką spod maski, hairline rysuje
      się w poziomie wraz z postępem przewijania (górna kreska od lewej, dolna od prawej)
- [x] **O firmie** — ciemna sekcja, dwa istniejące akapity rozbite na słowa; każde słowo
      przechodzi z `opacity .16` do `1` dokładnie w rytm scrolla, zakresy sąsiednich słów
      nachodzą na siebie, więc po tekście idzie fala. Typografia z 0,95 rem na 1,75 rem
- [x] W tle dwie bursztynowe poświaty dryfujące w pętli 34 s i 42 s + ziarno
- [x] **Atuty** — lewa kolumna z nagłówkiem przyklejona, prawa przewija cztery atuty; aktywny
      podświetla się bursztynem (ikona, tytuł, pionowa kreska), po lewej szyna postępu `01–04`
- [x] Sekcja `About` rozbita na `Stats` i `Highlights`, kolejność na stronie głównej przestawiona
- [x] Logo w atutach na wariancie bez tła — `logo.png` ma białą podkładkę, która na kremowym
      tle odcinała się jako obcy kafelek

### ⬜ Etap 4 — Oferta: przewijanie poziome + tilt 3D

> `Etap 4: oferta na przewijaniu poziomym z tiltem 3D`

- [ ] Sekcja przykleja się na pełnym ekranie, cztery projekty jadą **poziomo**, gdy przewijasz w dół
- [ ] **Tilt 3D** — karta pod kursorem pochyla się w przestrzeni (`perspective` + `rotateX/rotateY`),
      a zdjęcie, badge z metrażem i tytuł leżą na różnych `translateZ`, więc rozjeżdżają się
      paralaktycznie względem siebie
- [ ] Zdjęcie w karcie ma własny, wolniejszy parallax
- [ ] Na telefonie zamiast pinowania — poziomy snap-scroll palcem, bez tiltu

### ⬜ Etap 5 — Realizacje: stos kart 3D

> `Etap 5: realizacje jako stos kart w 3D`

- [ ] Karty **nakładają się na siebie**: kolejna wjeżdża na poprzednią, która odchyla się
      w głąb (`rotateX` + `translateZ` + przyciemnienie) zamiast po prostu zniknąć
- [ ] Lightbox przestylowany na pełnoekranowy, ciemny (biblioteka `react-image-gallery` zostaje)
- [ ] Licznik zdjęć i wejście do galerii jak dotąd

### ⬜ Etap 6 — Technologia, CTA, stopka

> `Etap 6: technologia na bębnie 3D, magnetyczne CTA, odklejana stopka`

- [ ] **Technologia** — numer `01 / 02 / 03` przyklejony po lewej, obraca się jak **bęben 3D**
      (`rotateX` na osi) przy przejściu do kolejnego filaru; pionowa linia postępu się wypełnia
- [ ] **CTA** — magnetyczny przycisk (przyciąga kursor), gradient reagujący na pozycję myszy
- [ ] **Stopka** — efekt „odklejania": treść zjeżdża z przyklejonej pod spodem stopki,
      w tle wielki znak wodny z logo

### ⬜ Etap 7 — Podstrony

> `Etap 7: podstrony w nowym języku wizualnym`

- [ ] **PageHero** — edytorski: duży tytuł, pasek zdjęcia z parallaxem
- [ ] **Oferta / Realizacje** — siatka o zmiennych wysokościach, wejście kaskadowe w kolumnach,
      blur-up przy ładowaniu (warianty `*FCP.jpg` jako placeholdery)
- [ ] **Video** — przełącznik z przesuwającym się wskaźnikiem, kadry z parallaxem
- [ ] **Kontakt** — przyklejona karta danych, mapa w ciemnej ramce
- [ ] **404** — detektyw na warstwach parallaxu

### ⬜ Etap 8 — Assety

> `Etap 8: konwersja assetów i kadry pod nowy layout`

- [ ] Miniatury PNG (5–6 MB każda) → WebP, ok. 150 KB
- [ ] Zdjęcia hero i oferty → WebP w dwóch szerokościach + kadry 9:16 pod telefon
- [ ] Blur-up: użycie istniejących `*FCP.jpg` jako placeholderów
- [ ] **Do decyzji Jarka:** `house.mp4` 128 MB, `inside.mp4` 142 MB, `residence.mp4` 147 MB —
      przy tej wadze żaden efekt nie zdąży się pokazać. Proponowana kompresja albo przeniesienie
      na streaming

### ⬜ Etap 9 — Domknięcie

> `Etap 9: reduced-motion, degradacja na telefonie, pomiar`

- [ ] Pełny przegląd `prefers-reduced-motion` na wszystkich nowych efektach
- [ ] Degradacja na telefonie: fade/slide zamiast pinowania i tiltu
- [ ] Lighthouse przed/po, sprawdzenie braku przesuwania layoutu (CLS)
- [ ] Przegląd dostępności: fokus klawiaturą, kontrasty, `aria-*`

---

## Gdzie wchodzi 3D

Bez dodatkowych bibliotek — `perspective` + `transform-style: preserve-3d` na CSS, sterowane
przez Framer Motion. Zero WebGL, zero kilobajtów ponad to, co już jest.

| Miejsce | Efekt |
|---|---|
| Oferta (Etap 4) | karta pochyla się za kursorem, warstwy na różnych `translateZ` |
| Realizacje (Etap 5) | stos kart odchylających się w głąb przy przewijaniu |
| Technologia (Etap 6) | numery filarów na obracającym się bębnie |

Jeśli po tych trzech 3D okaże się za mało — kolejny krok to prawdziwa scena WebGL
(`react-three-fiber`, ok. 150 KB gzip). To osobna decyzja, poza tym planem.
