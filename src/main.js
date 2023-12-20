var electron = require('electron');
var path = require('path');
var url = require('url');

var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var win;

function createWindow () {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    }
  });
  win.setMenuBarVisibility(false); 
  console.log(__dirname);
  

  win.setIcon(path.join(__dirname, '../dist/browser/assets/icons/icon.png')); // Icono de la aplicación

  //win.maximize(); // Maximiza la ventana

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, '../dist/browser/index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  //win.webContents.openDevTools(); // Abre las herramientas de desarrollo
  
  win.on('closed', function() {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (win === null) {
    createWindow();
  }
});