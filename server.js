const express = require('express');
const path = require('path');
const browserSync = require('browser-sync').create();
const app = express();
const port = 7771;

const isDevelopment = process.env.NODE_ENV === 'development';
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    if (isDevelopment) {
        browserSync.init({
            proxy: `http://localhost:${port}`,
            files: ['public/**/*.*'],
            open: false,
            notify: false
        });
    }
});
