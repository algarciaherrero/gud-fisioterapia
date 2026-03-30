# GUD Fisioterapia — Web Corporativa

Web corporativa de **GUD Fisioterapia**, clínica de Pablo Ruiz ubicada en Chamartín, Madrid.

## Tecnología

HTML5 semántico + CSS modular con variables + JS vanilla. Sin frameworks, sin dependencias, sin mantenimiento mensual.

## Estructura

```
gud-fisioterapia/
├── index.html                        # Home — Español
├── styles.css                        # Estilos globales
├── service.css                       # Estilos páginas de servicio
├── script.js                         # JS: menú, idiomas, animaciones
│
├── en/index.html                     # Home — English
├── fr/index.html                     # Home — Français
├── de/index.html                     # Home — Deutsch
│
├── terapia-manual/index.html         # Página de servicio
├── osteopatia/index.html             # Página de servicio
├── terapia-invasiva/index.html       # Página de servicio
├── fisioterapia-deportiva/index.html # Página de servicio
│
└── img/                              # ⚠️ Añadir manualmente (ver abajo)
    ├── pablo-hero.jpg
    ├── pablo-portrait.jpg
    ├── logo-gud.png
    ├── logo-gud-white.png
    ├── servicio-terapia-manual.png
    ├── servicio-osteopatia.png
    ├── servicio-terapia-invasiva.png
    └── servicio-lesiones-deportivas.png
```

## Imágenes — añadir manualmente

Las imágenes no están en el repositorio. Copia y renombra los archivos originales de Pablo:

| Archivo original | Renombrar como | Uso |
|---|---|---|
| `DSC05436scaled.jpg` | `pablo-hero.jpg` | Hero home |
| `DSC054041scaled.jpg` | `pablo-portrait.jpg` | Sección Sobre mí |
| `gudlogomedium06.png` | `logo-gud.png` | Header |
| `GUD_FISIOTERAPIA_203.png` | `logo-gud-white.png` | Footer |
| `fisio.png` | `servicio-terapia-manual.png` | Tarjeta servicio |
| `osteopatia.png` | `servicio-osteopatia.png` | Tarjeta servicio |
| `terapiamanualinvasiva.png` | `servicio-terapia-invasiva.png` | Tarjeta servicio |
| `lesionesbiomecanicas.png` | `servicio-lesiones-deportivas.png` | Tarjeta servicio |

## Cosas pendientes antes del lanzamiento

- [ ] Añadir carpeta `img/` con todas las fotos renombradas
- [ ] Actualizar `GOOGLE_PLACE_ID` en la sección de reseñas (buscar en el HTML)
- [ ] Actualizar dirección en Google Business Profile a Calle Apolonio Morales 10
- [ ] Crear páginas de aviso legal y política de privacidad
- [ ] Configurar dominio en Netlify / GitHub Pages
- [ ] Activar HTTPS
- [ ] Dar de alta en Google Search Console y enviar sitemap

## Hosting recomendado

**Netlify** (gratuito para webs estáticas):
1. Ir a [netlify.com](https://netlify.com)
2. Conectar con GitHub → seleccionar este repositorio
3. Deploy automático en cada push a `main`

**GitHub Pages** (alternativa):
1. Settings → Pages → Branch: `main` → Folder: `/`
2. URL: `usuario.github.io/nombre-repo/`

## SEO implementado

- H1 con keyword geolocalizada en cada página
- Schema.org `MedicalBusiness` + `Person` + `MedicalTherapy` + `BreadcrumbList`
- hreflang para ES, EN, FR, DE
- Meta description optimizada en cada página
- Canonical URLs configurados
- WhatsApp flotante con mensaje predefinido por servicio
- Google Maps embed con coordenadas exactas

## Contacto del cliente

**Pablo Ruiz — GUD Fisioterapia**
- Dirección: C/ Apolonio Morales 10, local F · La Fábrica · Madrid 28036
- Teléfono / WhatsApp: +34 642 490 167
- Horario: Lunes a Viernes · 7:00–20:00

---

Desarrollado por [Sakit Digital](https://sakitdigital.com)
