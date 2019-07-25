## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    assets/
        images/
    components
        header/
            header.jsx
        modals/
            add-track/
                modal-add.track.jsx
            delete-track/
                modal-delete-track.jsx
        track/
            track-no-image.jsx
            track.jsx
        notFoundPage.jsx
        thumbnails.jsx
    content-layout/
        footer.jsx
    pages/
        playlist/
            playlist.jsx
        track-page/
            track-page.jsx
    redux/
        redusers/
        selectors/
        action.js
        actionTypes.js
        sagas.js
        store.js
    routes/
        Routes.jsx
    service/
        common.js
        constant.js
        deep-objects.js
        history.js
        sort.js
    App.js
    index.css
    index.js
```

## Note

If you use http://localhost:3000. 
Use chrome extension: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi or another.
Because server MusicMatch doesn't work without https.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Copiryght

This demo for Harel company