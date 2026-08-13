# Mazda 3 2010 i Touring — Diagrama interactivo a escala real

Diagrama técnico interactivo de la carrocería y las partes mecánicas de un **Mazda 3 2010 i Touring 2.0** (generación BL). Construido en HTML, CSS y JavaScript puro, sin dependencias externas.

🔗 **Ver en vivo:** https://ferna4ndo26.github.io/mazda3-diagrama/

## Descripción

El diagrama muestra dos vistas del vehículo:

- **Carrocería (vista lateral):** 18 piezas — defensas, faros, cofre, puertas, techo, cajuela, salpicaderas, rines, etc.
- **Partes mecánicas (vista en planta):** 17 componentes — motor, transmisión, radiador, suspensión, frenos, sistema de escape, tanque de combustible, entre otros.

Cada punto numerado en el plano es interactivo: al tocarlo (o tocar la ficha correspondiente en la lista) se resalta y muestra el nombre y una breve descripción de la pieza.

## Escala real

Las coordenadas del SVG están definidas en **milímetros reales** (1 unidad del plano = 1 mm), usando las medidas oficiales de fábrica:

| Medida | Valor |
|---|---|
| Largo | 4,590 mm |
| Ancho | 1,755 mm |
| Alto | 1,470 mm |
| Distancia entre ejes (batalla) | 2,640 mm |
| Llanta | 16" (205/55R16) |

Ambas vistas comparten el mismo eje de largo, por lo que un componente en la vista lateral queda alineado verticalmente con su posición en la vista de planta, como en un plano de ingeniería. Las curvas de la carrocería son esquemáticas; el contorno general (largo, alto, batalla) respeta las medidas reales.

## Estructura del proyecto

```
mazda3-diagrama/
├── index.html   # Estructura y contenido de la página
├── styles.css   # Estilos (tema tipo plano técnico / blueprint)
├── script.js    # Datos de las piezas y lógica interactiva del SVG
└── README.md
```

## Uso local

No requiere instalación ni build. Basta con clonar el repo y abrir `index.html` en el navegador:

```bash
git clone https://github.com/Ferna4ndo26/mazda3-diagrama.git
cd mazda3-diagrama
open index.html   # o doble clic en el archivo
```

## Publicado con GitHub Pages

Este repositorio se publica automáticamente desde la rama `main` (carpeta raíz) usando GitHub Pages. Cualquier cambio en `main` se refleja en el sitio en 1–2 minutos.

## Tecnología

- HTML5 + SVG (diagramas dibujados dinámicamente vía JavaScript)
- CSS puro (sin frameworks)
- JavaScript vainilla (sin librerías)
- Tipografías: Big Shoulders Display, IBM Plex Mono, IBM Plex Sans (Google Fonts)

## Licencia

MIT — libre para usar, modificar y compartir.
