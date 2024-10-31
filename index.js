const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({
        // fullscreen: true,
        width: 1300,
        height: 800,
        icon: path.join(__dirname, 'assets', 'icon.ico'),
        webPreferences: {
            nodeIntegration: true, // Mantém o ambiente seguro para navegação na web
            contextIsolation: false  // Isolamento do contexto para segurança adicional
        }
    });

    win.setMenu(null);

    win.maximize();

    // Carrega o site
    //win.loadURL(process.env.APP_URL);
    win.loadURL("");

    win.webContents.on('before-input-event', (event, input) => {
        if (input.key === 'Escape' && win.isFullScreen()) {
            win.setFullScreen(false); // Sai do fullscreen
        }
    });

    // Abrir o DevTools (opcional)
    //win.webContents.openDevTools();
}

// Função para registrar os atalhos
function registerShortcuts() {
    // Atalho para recarregar a página (exemplo: Ctrl + R)
    globalShortcut.register('F5', () => {
        if (win) {
            win.reload();
        }
    });
}

app.whenReady().then(() => {
    createWindow();
    registerShortcuts();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Limpeza de atalhos ao sair do aplicativo
app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
