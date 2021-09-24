# Experimental Algorand transaction widget

A project to directly embed an Algorand React app in standard html via `<script>` tag.

## Widget Embed code:

```html
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <link href="https://unpkg.com/algo-pay@0.1.1/build/static/css/algopay.css" rel="stylesheet">
    <div id="root"></div>
    <script src="https://unpkg.com/algo-pay@0.1.1/build/static/algopay.js"></script>
```

## Modifying the widget

```bash
cd algo-pay
npm install
npm run start
npm run build
```

After building the app, navigate to the `build/static/css folder` and remove the css filename hashes if desired. 

