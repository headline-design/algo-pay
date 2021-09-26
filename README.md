# Experimental Algorand transaction widget

A project to directly embed an Algorand React app in standard html via `<script>` tag.

## Widget Embed code:

```html
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <link href="https://unpkg.com/algo-pay@0.1.6/build/static/css/algopay.css" rel="stylesheet">
    <div id="root"></div>
    <script>
        window.details = {
            amount: 1, // in smallest unit (i.e. microAlgos)
            note: "Hello World!",
            index: 0, // Asset index number, otherwise, enter 0 for Algorand
            recipient: "K3NSXYMHPRCK7PMYT3QUQXUGPZJ4MKWJXW2HJRYPVMQUMKJAOJEIEO4HK4"
        }
    </script>
    <script src="https://unpkg.com/algo-pay@0.1.5/build/static/algopay.js"></script>
```

NOTE: Ensure that the version codes in the CSS and JavaScript `src=` urls match the latest version code of this project.

## Modifying the widget

```bash
cd algo-pay
npm install
npm run start
npm run build
```

After building the app, navigate to the `build/static/css` folder and remove the css filename hashes if desired. Upload the `build` folder to your site and edit the `src` and `href` base urls for the JavaScript and CSS to point to your site. 

## Testing the widget

After building the app, navigate to build/index.html. In your code editor, select and format the html for ease of editing. Above the `<script>` tag for the algopay.js file, add the following lines: 

```jsx
    <script>
        window.details = {
            amount: 1, // in smallest unit (i.e. microAlgos)
            note: "Hello World!",
            index: 0, // Asset index number, otherwise, enter 0 for Algorand
            recipient: "LMKFQIPL3VQCZGGFK4WZ7FPCQWLNBTJQ3UWSTA7D7QZSPJTZQKTDVT7WG4"
        }
    </script>
```

Change the variables of the window object `details` to customize your test widget. After saving changes, from the root of the algo-pay folder, run:

```bash
serve build
```


