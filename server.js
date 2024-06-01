const express = require('express');
const path = require('path');
const browserSync = require('browser-sync').create();
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    browserSync.init({
        proxy: `http://localhost:${port}`,
        files: ['public/**/*.*'],
        port: 3001,
        open: false,
        notify: false
    });
});
