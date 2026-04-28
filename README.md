# 📒 OOODIFY Frontend Dokumentáció

## 🗒️ Tartalomjegyzék

- [Bevezetés](#bevezetés)
- [Szerkezet](#projekt-szerkezet)
- [Telepítés](#telepítés)
- [Használat](#használat)
- [Dokumentáció](#dokumentáció)
- [Fejlesztési lehetőségek](#Fejlesztési-lehetőségek)

## 🏪 Bevezetés
- Az OOODIFY egy olyan weboldal, ahol zenéket hallgathatsz vagy tölthetsz fel te magad is akár, bármikor! A felhasználók könnyedén böngészhetnek különböző műfajok között, kedvelhetnek zenéket és felfedezhetnek új előadókat, ami lehetővé teszi hogy mindenki gyorsan megtalálja a hangulatának megfelelő zenét.

## 📁 Projekt szerkezet

```markdown
├── src/
│   ├── components/
│       └── Card.jsx
│       └── FeketeGomb.jsx
│       └── InputMezo.jsx
│       └── MyButton.jsx
│       └── SongInfo.jsx
│       └── UserInfo.jsx
│   ├── context/
│       └── AdminRoute.jsx
│       └── AuthContext.jsx
│       └── MusicContext.jsx
│   ├── css/
│       └── Admin.css
│       └── Home.css
│       └── Logged.css
│       └── Login.css
│       └── Register.css
│   ├── pages/
│       └── Admin.jsx
│       └── Home.jsx
│       └── Like.jsx
│       └── Login.jsx
│       └── Register.jsx
│   ├── main.jsx/
│   └── api.js
├── package.json
├── .gitignore
├── index.html
├── eslint.config.js
├── netlify.toml.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## ⬇️ Telepítés
```markdown
git clone https://github.com/durocsongor/oooodify_frontend_backup.git (GitHub-ról letöltés)
```

## 🛍️ Használat 
- A regisztrációt követően a felhasználók saját fiókkal rendelkeznek, amin keresztül elérhetik a már feltöltött zenéket. A felhasználó kedve szerint játszhat le zenéket, vagy mentheti azokat a kedvelt zenéi közé. Az admin jogú felhasználók tölthetnek fel zenéket, törölhetnek vagy módosíthatnak felhasználók vagy éppen zenék nevét.

- A kedvencek megtekintésekor a felhasználó csak az általa kedvelt zenéket találja az oldalon. A zene kártyán lévő kis szív ikonra kattintva bármikor levehet vagy felvehet új kedvenc zenéket is.

- Az admin jogú felhasználóknak az oldalba történő belépés után megjelenik egy új gomb "Admin oldal" névvel, ahol elérik a felhasználókat és a zenéket is.

 ## Dokumentáció
#### 🚀 Netlify
| Netlify Deployed Page | [Megtekintés](https://oooodify-music.netlify.app/) |

| Admin teszt | Admin:   | Jelszó:  |

| Felhasználó teszt | Felhasználó: 1  | Jelszó: 1  |


| 🎞️ Figma | Dizájnt készítő alkalmazás | [Megtekintés](https://www.figma.com/design/xS6OXQawL5sDU8fKqCRybk/Untitled?node-id=0-1&t=FyUP40nWbCGs7OWw-1) |

### Register.jsx, Login.jsx,

- Ahhoz, hogy a felhasználó tudjon zenéket lejátszani regisztrálnia kell egy fiókkal és be kell jelentkeznie.

- Itt lehet regisztrálni felhasználót.

- Itt lehet bejelentkezni, már létező felhasználói fiókkal.
- Bejelentkezéskor történik egy ellenőrzés, hogy a bejelentkező fiók admin-e vagy nem.
  Ha az az állítás igaz akkor az oldalon megjelenik egy "Admin oldal" névvel ellátott gomb, ahonnan az admin felületre dob az oldal.

  Bejelentkezés:
  
  ![Alternatív szöveg](https://github.com/durocsongor/ooodify_kepek/blob/main/kepek/K%C3%A9perny%C5%91felv%C3%A9tel%20(44).png?raw=true)
  
  Regisztráció:
  
  ![Alternatív szöveg](https://github.com/durocsongor/ooodify_kepek/blob/main/kepek/K%C3%A9perny%C5%91felv%C3%A9tel%20(45).png?raw=true)

### Home.jsx

- Itt láthatóak a zenék és elérhetőek a menüpontok a kedvencek megtekintéséhez. (Adminnak az admin panel is)

  Felhasználók esetében:
  
  ![Alternatív szöveg](https://github.com/durocsongor/ooodify_kepek/blob/main/kepek/K%C3%A9perny%C5%91felv%C3%A9tel%20(46).png?raw=true)

  Admin esetében:
  
  ![Alternatív szöveg](https://github.com/durocsongor/ooodify_kepek/blob/main/kepek/K%C3%A9perny%C5%91felv%C3%A9tel%20(48).png?raw=true)
  

### Like.jsx
- Itt lehet megtekinteni a felhasználó által kedvelt zenéket és lehet törölni őket akár.

  ![Alternatív szöveg](https://github.com/durocsongor/ooodify_kepek/blob/main/kepek/K%C3%A9perny%C5%91felv%C3%A9tel%20(47).png?raw=true)

### Admin.jsx
- Itt lehet módosítani a feltöltött zenéket és a felhasználók adatait is. Egy táblázatban látjuk a felhasználókat és alatta külön egy másik táblázatban láthatjuk a zenéket is.
- Változtatható a felhasználó neve valamint jogosultsága.
- Megtekinthetőek a feltöltött zenék és módosítható a neve valamint az előadója is.
- A zenéket lehet törölni is.

 ![Alternatív szöveg](https://github.com/durocsongor/ooodify_kepek/blob/main/kepek/K%C3%A9perny%C5%91felv%C3%A9tel%20(49).png?raw=true)

 ### Az oldal mobilos nézetben:

 ![Alternatív szöveg](https://github.com/durocsongor/ooodify_kepek/blob/main/kepek/K%C3%A9perny%C5%91felv%C3%A9tel%20(50).png?raw=true)
 

## 📇 Fejlesztési lehetőségek

```markdown
- Aktív lejátszási lista
- Saját profil oldal
- Keresés funkció
```
