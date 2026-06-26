# Configuracion de Kit para las descargas

Esta web esta preparada para cambiar las descargas directas por un unico formulario de Kit. Falta el enlace real de Kit, porque se genera dentro de tu cuenta.

## Lo recomendado

Usa un solo formulario o landing page en Kit:

```text
Descarga calculadora - Se dueno de tu tiempo
```

En el email de incentivo puedes ofrecer las dos opciones: Excel y app Android.

## Ajustes sugeridos en Kit

- Activa confirmacion por email o doble opt-in.
- Usa un email de incentivo/confirmacion con los dos enlaces de descarga.
- Anade una etiqueta general: `seduenodetutiempo`.
- Anade otra etiqueta si quieres distinguir el origen: `descarga_calculadora`.
- Incluye una frase clara de consentimiento si tambien enviaras newsletter.

Texto sugerido para el formulario:

> Recibe la calculadora y apuntate a la newsletter de Ruben Soro sobre patrimonio, inversion y libertad financiera. Podras elegir entre la hoja Excel y la app Android, y darte de baja cuando quieras.

## Enlaces de descarga que puedes usar en el email de Kit

Excel:

```text
https://diodocup.github.io/seduenodetutiempo/assets/Calculadora_v2.xlsx
```

App Android:

```text
https://drive.google.com/file/d/17hr4lD9b17loOZgSNKeo1AwPjThspwOu/view?usp=drive_link
```

Texto sugerido para el email de incentivo:

```text
Gracias por apuntarte.

Aqui tienes la calculadora de Se dueno de tu tiempo en los dos formatos disponibles:

- Hoja Excel: https://diodocup.github.io/seduenodetutiempo/assets/Calculadora_v2.xlsx
- App Android: https://drive.google.com/file/d/17hr4lD9b17loOZgSNKeo1AwPjThspwOu/view?usp=drive_link

Espero que te ayude a aterrizar las ideas del libro en numeros concretos.

Un saludo,
Ruben
```

Para proteger mas el Excel, lo ideal seria subirlo tambien a Kit, Drive u otro servicio y quitar el enlace directo del repositorio publico.

## Lo que hay que pegar despues en la web

Cuando Kit te de la URL publica del formulario o landing page, hay que pegarla en `kit-downloads.js`:

```js
const KIT_DOWNLOADS = {
  formUrl: "https://...",
};
```

Con eso, los botones de la web dejaran de ir directamente a los archivos y pasaran por Kit.
