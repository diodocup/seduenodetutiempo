# Configuracion de Kit para las descargas

Esta web esta preparada para cambiar las descargas directas por formularios de Kit. Faltan los enlaces reales de Kit, porque se generan dentro de tu cuenta.

## Lo recomendado

Crea dos formularios o landing pages en Kit:

1. `Descarga Excel - Se dueno de tu tiempo`
2. `Descarga App Android - Se dueno de tu tiempo`

Asi podras etiquetar a cada persona segun lo que haya pedido.

## Ajustes sugeridos en Kit

- Activa confirmacion por email o doble opt-in.
- Usa un email de incentivo/confirmacion con el enlace de descarga.
- Anade una etiqueta a cada formulario: `descarga_excel` y `descarga_app_android`.
- Anade otra etiqueta general si quieres: `seduenodetutiempo`.
- Incluye una frase clara de consentimiento si tambien enviaras newsletter.

Texto sugerido para el formulario:

> Recibe la calculadora y apuntate a la newsletter de Ruben Soro sobre patrimonio, inversion y libertad financiera. Podras darte de baja cuando quieras.

## Enlaces de descarga que puedes usar en Kit

Excel:

```text
https://diodocup.github.io/seduenodetutiempo/assets/Calculadora_v2.xlsx
```

App Android:

```text
https://drive.google.com/file/d/17hr4lD9b17loOZgSNKeo1AwPjThspwOu/view?usp=drive_link
```

Para proteger mas el Excel, lo ideal seria subirlo tambien a Kit, Drive u otro servicio y quitar el enlace directo del repositorio publico.

## Lo que hay que pegar despues en la web

Cuando Kit te de las URLs publicas de los formularios o landing pages, hay que pegarlas en `kit-downloads.js`:

```js
const KIT_DOWNLOADS = {
  excelUrl: "https://...",
  androidUrl: "https://...",
  newsletterUrl: "https://...",
};
```

Con eso, los botones de la web dejaran de ir directamente al archivo y pasaran por Kit.
