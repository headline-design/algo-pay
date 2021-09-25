# Experimental Algorand transaction widget

A project to directly embed an Algorand React app in standard html via `<script>` tag.

## Widget Embed code:

```html
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <link href="https://unpkg.com/algo-pay@0.1.3/build/static/css/algopay.css" rel="stylesheet">
    <div id="root"></div>
    <script>
        window.details = {
            amount: 1, // in smallest unit (i.e. microAlgos)
            note: "Hello World!",
            index: 0, // Asset index number, otherwise, enter 0 for Algorand
            recipient: "LMKFQIPL3VQCZGGFK4WZ7FPCQWLNBTJQ3UWSTA7D7QZSPJTZQKTDVT7WG4"
        }
    </script>
    <script src="https://unpkg.com/algo-pay@0.1.3/build/static/algopay.js"></script>
```

## Modifying the widget

```bash
cd algo-pay
npm install
npm run start
npm run build
```

After building the app, navigate to the `build/static/css` folder and remove the css filename hashes if desired. Upload the `build` folder to your site and edit the `src` and `href` base urls to point to your site. 

