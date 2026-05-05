# Lic. Marcela Martin — Sitio web

Sitio profesional para psicóloga. Stack: **Gulp 4 + Sass (Dart) + BrowserSync**, deploy en **Netlify**.

---

## Estructura del proyecto

```
marcela-martin/
├── src/
│   ├── index.html
│   ├── scss/
│   │   ├── main.scss              ← entrada principal
│   │   ├── abstracts/
│   │   │   ├── _variables.scss    ← paleta, tipografía, espaciado
│   │   │   └── _mixins.scss       ← helpers reutilizables
│   │   ├── base/
│   │   │   ├── _reset.scss
│   │   │   ├── _typography.scss
│   │   │   └── _utilities.scss
│   │   ├── layout/
│   │   │   ├── _nav.scss
│   │   │   └── _sections.scss
│   │   └── components/
│   │       ├── _hero.scss
│   │       ├── _about.scss
│   │       ├── _services.scss
│   │       ├── _modality.scss
│   │       └── _contact.scss
│   ├── js/
│   │   └── main.js
│   └── images/                    ← agregar fotos acá
├── dist/                          ← generado por Gulp (no commitear)
├── gulpfile.js
├── package.json
├── netlify.toml
└── .gitignore
```

---

## Primeros pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Desarrollo con live reload
npm run dev

# 3. Build de producción
npm run build
```

---

## Personalización pendiente

| Qué | Dónde |
|-----|-------|
| Foto de perfil hero | `src/images/marcela.jpg` → descomentar `<img>` en `index.html` |
| Foto sección "Sobre mí" | `src/images/marcela-perfil.jpg` → idem |
| Número de WhatsApp | `index.html` → `href="https://wa.me/549XXXXXXXXXX"` |
| Email de contacto | `index.html` → `href="mailto:..."` y texto visible |
| Matrícula profesional | `index.html` → footer `M.P. XXXXX` |
| Dominio propio | Configurar en Netlify → Domain settings |

---

## Deploy en Netlify

1. Subir el proyecto a GitHub (sin la carpeta `dist/`)
2. Conectar el repo en [netlify.com](https://netlify.com)
3. El `netlify.toml` ya configura automáticamente:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. El formulario de contacto funciona nativamente con Netlify Forms (sin backend)

---

## Colores de la paleta

| Variable | Valor | Uso |
|----------|-------|-----|
| `$color-bg` | `#FAFAF8` | Fondo principal |
| `$color-bg-alt` | `#F2F0EC` | Secciones alternadas |
| `$color-accent` | `#7A6652` | Tierra tostado — énfasis |
| `$color-accent-light` | `#B8A99A` | Tierra claro — decorativo |
| `$color-text` | `#1C1C1A` | Texto principal |
| `$color-text-soft` | `#5C5B58` | Texto secundario |
