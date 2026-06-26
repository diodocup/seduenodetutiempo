# Configuracion de Kit para las descargas

La web ya redirige los botones de descarga a este formulario de Kit:

```text
https://ruben-soro-esteban.kit.com/b2a4add913
```

Tambien existe una pagina propia para entregar las descargas despues de confirmar el email:

```text
https://diodocup.github.io/seduenodetutiempo/descargas.html
```

## Flujo recomendado

1. El usuario pulsa el boton de descarga en la web.
2. Se abre el formulario de Kit.
3. El usuario deja su email.
4. Kit envia el correo de confirmacion.
5. Al confirmar, Kit debe enviar o redirigir a la pagina de descargas.

## Ajustes sugeridos en Kit

- Mantener confirmacion por email o doble opt-in.
- Buscar en el formulario una opcion como `After confirming`, `Redirect`, `Success page`, `Incentive URL` o `Confirmation settings`.
- Usar esta URL como destino despues de confirmar:

```text
https://diodocup.github.io/seduenodetutiempo/descargas.html
```

- Anadir una etiqueta general: `seduenodetutiempo`.
- Anadir otra etiqueta si quieres distinguir el origen: `descarga_calculadora`.
- Incluir una frase clara de consentimiento si tambien enviaras newsletter.

Texto sugerido para el formulario:

> Recibe la calculadora y apuntate a la newsletter de Ruben Soro sobre patrimonio, inversion y libertad financiera. Podras elegir entre la hoja Excel y la app Android, y darte de baja cuando quieras.

## Enlaces de descarga incluidos en la pagina

Excel:

```text
https://diodocup.github.io/seduenodetutiempo/assets/Calculadora_v2.xlsx
```

App Android:

```text
https://drive.google.com/file/d/17hr4lD9b17loOZgSNKeo1AwPjThspwOu/view?usp=drive_link
```

## Alternativa si no encuentras la redireccion

Puedes editar el texto del email de confirmacion o incentivo en Kit y poner directamente esta pagina:

```text
https://diodocup.github.io/seduenodetutiempo/descargas.html
```

Texto sugerido:

```text
Gracias por apuntarte.

Cuando confirmes tu email, aqui tienes la pagina con la calculadora de Se dueno de tu tiempo en los dos formatos disponibles:

https://diodocup.github.io/seduenodetutiempo/descargas.html

Un saludo,
Ruben
```

La pagina de descargas no esta enlazada en el menu y esta marcada como `noindex`, pero sigue siendo una URL publica. Para una proteccion fuerte habria que usar enlaces privados o temporales desde otra plataforma.
