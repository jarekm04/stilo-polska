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

### ✅ Etap 4 — Oferta: przewijanie poziome + tilt 3D

> `Etap 4: oferta na przewijaniu poziomym z tiltem 3D`

- [x] Sekcja przykleja się na pełnym ekranie, projekty jadą **poziomo**, gdy przewijasz w dół.
      Droga toru mierzona `ResizeObserver`-em i doklejana do wysokości sekcji, więc jazda kończy
      się dokładnie na ostatnim kafelku
- [x] **Tilt 3D** (`TiltCard`) — karta pod kursorem pochyla się w przestrzeni, numer, badge
      z metrażem i tytuł leżą na różnych `translateZ`, więc rozjeżdżają się względem zdjęcia.
      Dochodzi refleks światła wodzony kursorem
- [x] Przycinanie zamknięte w warstwie ze zdjęciem — `overflow: hidden` spłaszcza kontekst 3D,
      więc nie może stać na kontenerze z `preserve-3d`
- [x] Ostatni kafelek toru to wyjście do pełnej oferty, zamiast przycisku pod sekcją
- [x] Pasek pokazujący, ile drogi tor ma jeszcze do przejechania
- [x] Na dotyku zamiast pinowania — poziomy snap-scroll palcem, bez tiltu (`useMediaQuery`)
- [x] Tabulator: fokus na kafelku poza ekranem dojeżdża sam, bo tor jedzie transformacją
      i przeglądarka nie ma czego przewinąć

### ✅ Etap 5 — Realizacje: stos kart 3D

> `Etap 5: realizacje jako stos kart w 3D`

- [x] Karty **nakładają się na siebie**: wszystkie przyklejone do góry jednego wysokiego
      kontenera, kolejna wjeżdża na poprzednią, a tamta odchyla się w głąb (`rotateX`),
      kurczy i przygasa, zamiast po prostu zniknąć
- [x] Każda karta cofa się stopniowo z każdą kolejną, która na nią wchodzi — stąd punkty
      pośrednie w `useTransform`, a nie dwa skrajne
- [x] Skalowanie od górnej krawędzi (`originY: 0`) plus przesunięcie 1,9 rem na kartę, żeby
      spod wierzchniej karty wystawał pasek poprzedniej — inaczej stos byłby niewidoczny
- [x] Ogon 45 svh na końcu kontenera, żeby ostatnia karta miała chwilę na scenie
- [x] Lightbox przestylowany na pełnoekranowy i ciemny, miniatury w pigułce z rozmyciem
      (biblioteka `react-image-gallery` zostaje)
- [x] Wspólna oprawa podglądu (`Lightbox`) dla galerii z lokalnych plików i z WordPressa —
      jedno miejsce na wygląd, dwa źródła zdjęć
- [x] Licznik zdjęć i wejście do galerii bez zmian

### ✅ Etap 6 — Technologia, CTA, stopka

> `Etap 6: technologia na bębnie 3D, magnetyczne CTA, odklejana stopka`

- [x] **Technologia** — numer `01 / 02 / 03` przyklejony po lewej, obraca się jak **bęben 3D**:
      ścianki stoją na bokach graniastosłupa (obrót o 360°/n i odsunięcie od osi o promień),
      a obrót całej bryły ustawia wybraną na wprost — jak w liczniku przebiegu
- [x] Szyna z nazwami filarów pod bębnem pokazuje, przy którym jesteśmy
- [x] Na telefonie bęben znika, numer wraca do nagłówka filaru
- [x] **CTA** — magnetyczne przyciski (ruch zaczyna się, zanim kursor dojedzie) i plama
      światła chodząca za kursorem po całym paśmie
- [x] **Stopka** — efekt „odklejania": stopka leży przyklejona do dołu okna, treść przykrywa
      ją swoim tłem i wyższą warstwą, a pod koniec przewijania wychodzi spod niej
- [x] Stopka przeniesiona z podstron do szablonu — musi być **rodzeństwem** treści, nie jej
      dzieckiem: element pozycjonowany wewnątrz treści rysowałby się nad nią, nie pod
- [x] Efekt odpada, gdy stopka nie mieści się w oknie (telefon, niskie okno) — przyklejona
      treść wyższa niż ekran byłaby nie do przewinięcia

Sprawdzone na żywo w całości. Magnetyzm: przy kursorze 70 px w lewo i 30 px w górę od środka
przycisk przesuwa się o −22,4 i −9,6 px (dokładnie 0,32 odległości), a po zjechaniu wraca
sprężyną do zera. Plama światła dojeżdża do pozycji kursora względem pasma.

Uwaga na przyszłość: ukryty panel podglądu wstrzymuje `requestAnimationFrame`, więc **żadna
animacja się nie rusza, a kod wygląda na zepsuty**. Zanim zacznie się szukać błędu w animacji,
warto sprawdzić, czy panel jest widoczny.

### ✅ Etap 6.1 — Poprawki po przeglądzie

Przegląd po Etapie 6 wyłapał rzeczy, które trzeba naprawić, zanim ruszymy dalej.
Diagnoza każdej jest poniżej — kilka miało inną przyczynę, niż wyglądało.

**Wycofania**

- [x] **Kurtyna przejścia między stronami** — do usunięcia (`PageCurtain`)
- [x] **Magnetyczne przyciski w CTA** — do usunięcia. Strona ma być designerska, ale
      profesjonalna; uciekający przycisk działa przeciwko temu. `Magnetic` wylatuje,
      plama światła za kursorem zostaje
- [x] **Pasek nawigacji znów zawsze widoczny** — chowanie przy przewijaniu w dół wylatuje.
      Zostaje kurczenie się po opuszczeniu hero

**Usterki**

- [x] **Czarny ekran między slajdami hero.** Przyczyna: `AnimatePresence` nie usuwa
      poprzednich slajdów — w DOM-ie wisi ich pięć, cztery z `clip-path: inset(100%)`,
      czyli całkowicie przycięte. Nowy slajd odsłania się więc nad pustką, a nie nad
      poprzednim zdjęciem. Naprawa: trzymamy dwie warstwy — poprzedni slajd stoi
      nieruchomo i w pełni widoczny pod spodem, nowy wjeżdża nad nim
- [x] **Pasek czasu slajdu niewidoczny.** Jest, ale ma 1 px i leży w ostatnim rzędzie
      pikseli okna (y 899 przy oknie 900). Do podniesienia i pogrubienia
- [x] **Kreski wyboru slajdu ledwo widoczne** — do zamiany na pigułkę z rozmyciem tła
      (`backdrop-blur` + delikatna ramka + nasycenie), czytelną na każdym zdjęciu
- [x] **Atuty podświetlają się przypadkowo.** Przyczyna: `useInView` z progiem 60%
      wysokości. Kafle mają różne wysokości, więc kilka bywa „w kadrze” naraz, a wygrywa
      ten, który zgłosił się ostatni. Naprawa: aktywny jest ten, którego środek leży
      najbliżej linii odniesienia (ok. 45% wysokości okna) — jeden wynik, zawsze ten sam
- [x] **Spis treści w technologii znika w połowie.** Przyczyna: kolumna ma 264 px przy
      siatce 1146 px i przyklejeniu na 144 px, więc przyklejona jest tylko przez 738 px,
      a potem odjeżdża z sekcją. Naprawa: kolumna na pełną wysokość okna z treścią
      wyśrodkowaną w pionie — wtedy trzyma się przez całą sekcję. Ten sam zabieg
      w atutach (tam przyklejenie starcza na 338 px)
- [x] **Puste białe pole pod realizacjami.** Przyczyna: karta ma 594 px w ekranie 900 px
      i zaczyna się 90 px od góry, więc pod nią zostaje 216 px pustki, a na końcu stosu
      dochodzi 405 px ogona. Naprawa: karta wyżej i wyraźnie większa, ogon mocno skrócony
- [x] **Stos realizacji wygląda źle** — karta urosła z 66 do 74 svh i siedzi wyżej, paski
      poprzednich kart szersze (2,2 rem) i jaśniejsze, doszła cienka obwódka. Stos czyta się
      teraz jako trzy karty jedna na drugiej, a nie ciemne kreski

Sprawdzone na żywo: w trakcie przejścia hero są dokładnie dwie warstwy, dolna w pełni
widoczna (koniec z czernią); szyna atutów wskazuje jeden punkt naraz i zmienia go zgodnie
z kierunkiem przewijania (y 3300 → 03, y 3600 i 4000 → 04); przyklejona kolumna trzyma się
przez 774 px w technologii i 948 px w atutach, czyli przez całą sekcję.

### ✅ Etap 6.2 — Strona główna od nowa, z WebGL

Hero i rytm strony głównej przemyślane jeszcze raz: ma być nowocześnie, efektownie
i zachęcająco — ale bez cyrku.

**Hero**

- [x] **Przejścia między zdjęciami na WebGL** — zamiast przycinania, przenikanie przez
      shader z mapą przemieszczenia: jedno zdjęcie rozpływa się w drugie, jakby przez
      falującą taflę. To jest ten moment „wow”, a przy okazji rozwiązuje problem
      amatorskiego cięcia
- [x] Delikatna reakcja kadru na ruch myszy (parallaks liczony w shaderze, nie w CSS)
- [x] **Biblioteka: `ogl`** (ok. 20 KB gzip) zamiast `three.js` (ok. 150 KB) — potrzebny
      jest jeden prostokąt z shaderem, nie cały silnik 3D
- [x] **Awaryjnie zawsze CSS** — brak WebGL, słaby sprzęt albo `prefers-reduced-motion`
      i wraca zwykłe przenikanie. Zdjęcia i tekst są te same, więc nic nie znika
- [x] Nagłówek przeniesiony do dolnej części kadru (układ edytorski), licznik slajdów
      i pasek czasu w jednej, spójnej belce na dole

**Rytm strony głównej**

- [x] **Liczby wtopione w hero** jako szklana belka na dole zdjęcia, zamiast osobnej
      ciemnej sekcji. Pierwszy ekran od razu mówi: 2004, 20+ lat, 450 m², świerk alpejski
- [x] Dzięki temu znika ciąg trzech ciemnych sekcji pod rząd (hero → liczby → o firmie)
      i strona szybciej dochodzi do zdjęć domów
- [x] Na telefonie belka pokazuje tylko wybór slajdu, a liczby dostają własny wąski pasek
      pod hero — w jednym rzędzie nad zdjęciem nie mieszczą się bez ścinania etykiet
- [x] Wskaźnik „Przewiń” usunięty — nowa belka domyka kadr i zajmuje jego miejsce

Dwie rzeczy wyszły dopiero przy sprawdzaniu na żywo:

**Płótno utykało na 300×150.** `setSize` wpisuje rozmiar w styl płótna, a w trybie
deweloperskim arkusz stylów dochodzi po pierwszym pomiarze — płótno mierzyło więc samo
siebie bez klas i przypinało się do domyślnego rozmiaru na zawsze. Mierzymy teraz owijkę
i po każdym `setSize` przywracamy rozciąganie na 100%.

**Stopka prześwitywała przez stronę.** `main` miało animowane krycie przy wejściu, a przy
kryciu poniżej 1 widać to, co leży pod spodem — czyli przyklejoną stopkę. Animacja wejścia
całej strony wyleciała; wejście grają sekcje, nie cała warstwa.

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

Te trzy okazały się za słabe jako efekt — stąd **Etap 6.2 i WebGL w hero**: przenikanie
zdjęć przez shader z mapą przemieszczenia, na bibliotece `ogl` (ok. 20 KB gzip) zamiast
`three.js` (ok. 150 KB). Potrzebny jest jeden prostokąt z shaderem, nie cały silnik 3D.
Przy braku WebGL albo przy ograniczonych animacjach wraca zwykłe przenikanie w CSS.
