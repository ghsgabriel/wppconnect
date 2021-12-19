/*
 * This file is part of WPPConnect.
 *
 * WPPConnect is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * WPPConnect is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with WPPConnect.  If not, see <https://www.gnu.org/licenses/>.
 */
const wppconnect = require('../../dist');

wppconnect
  .create({
    session: 'groupmanager',
    folderNameToken: './tokens/',
    puppeteerOptions: {
      userDataDir: './userDataDir/groupmanager',
    }, // Will be passed to puppeteer.launch
    catchQR: (base64Qr, asciiQR, attempts, urlCode) => {},
    statusFind: (statusSession, session) => {
      console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
      //Create session wss return "serverClose" case server for close
      console.log('Session name: ', session);
    },
    // whatsappVersion: "2.2134.10",
    headless: true, // Headless chrome
    devtools: false, // Open devtools by default
    useChrome: true, // If false will use Chromium instance
    debug: true, // Opens a debug session
    logQR: true, // Logs QR automatically in terminal
    browserWS: '', // If u want to use browserWSEndpoint
    browserArgs: [
      '--disable-web-security',
      '--no-sandbox',
      '--aggressive-cache-discard',
      '--disable-cache',
      '--disable-application-cache',
      '--disable-offline-load-stale-cache',
      '--disk-cache-size=0',
      '--disable-background-networking',
      '--disable-default-apps',
      '--disable-extensions',
      '--disable-sync',
      '--disable-translate',
      '--hide-scrollbars',
      '--metrics-recording-only',
      '--mute-audio',
      '--no-first-run',
      '--safebrowsing-disable-auto-update',
      '--ignore-certificate-errors',
      '--ignore-ssl-errors',
      '--ignore-certificate-errors-spki-list',
    ], // Parameters to be added into the chrome browser instance
    disableWelcome: false, // Option to disable the welcoming message which appears in the beginning
    updatesLog: true, // Logs info updates automatically in terminal
    autoClose: 60000, // Automatically closes the wppconnect only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
    tokenStore: 'file', // Define how work with tokens, that can be a custom interface
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if (message.body.indexOf('/all') !== -1 && message.isGroupMsg) {
      client.getGroupMembersIds(message.chatId).then((groupMembers) => {
        client.reply(
          message.chatId,
          groupMembers.map((e) => '@' + e.user).join(' '),
          message.id.toString(),
          groupMembers.map((e) => e.user)
        );
      });
    } else if (message.body.indexOf('/pew') !== -1) {
      client.reply(
        message.chatId,
        '🔥🔥🎇🔥🎇🔥🎇🔥🎇🎇🎆🎇🎆🎇🎆🎇🎇🎆🎇🎆🎇🎆🎇🎆🎆🎆🎆',
        message.id.toString()
      );
    } else if (
      message.body.toLowerCase().indexOf('perdi') !== -1 ||
      message.body.toLowerCase().indexOf('jogo') !== -1 ||
      message.body.toLowerCase().indexOf('game') !== -1
    ) {
      client.reply(message.chatId, 'Perdi =(', message.id.toString());
    } else if (message.body.indexOf('/pangua') !== -1) {
      client.reply(
        message.chatId,
        '🐔 pogó pogó 🐔 pogó pogó 🐔 pogó pogó 🐔 pogó pogó 🐔 pogó pogó 🐔 pogó pogó ' +
          '🐔 pogó pogó 🐔 pogó pogó 🐔 pogó pogó 🐔 pogó pogó 🐔 pogó pogó 🐔 pogó pogó ' +
          '🐔 pogó pogó 🐔 pogó pogó 🐔 pogó pogó 🐔 pogó pogó 🐔 pogó pogó 🐔 pogó pogó ' +
          '🐔 pogó pogó 🐔 pogó pogó 🐔 pogó pogó 🐔 pogó pogó 🐔 pogó pogó 🐔 pogó pogó ' +
          '🐔 pogó pogó 🐔 pogó pogó 🐔 pogó pogó 🐔 pogó pogó 🐔 pogó pogó 🐔 pogó pogó ',
        message.id.toString()
      );
    } else if (message.body.indexOf('bad bot') !== -1) {
      client.reply(message.chatId, '=(', message.id.toString());
    } else if (message.body.indexOf('/help') !== -1) {
      client.reply(
        message.chatId,
        '*/all* - Marca todos os contatos do grupo.\n' +
          '*/pew* - Envia fogos.\n' +
          '*/perdi* - O bot perde também :(.\n' +
          '*/jogo* - O bot perde também :(.\n' +
          '*/game* - O bot perde também :(.\n' +
          '*/help* - Lista de comandos.',
        message.id.toString()
      );
    } else if (message.body.indexOf('/sticker') !== -1) {
      console.log(message.chatId);
      client.sendImageAsSticker(
        message.chatId,
        'https://oticapaulocuja.com.br/sticker.webp'
      );
    }
  });
}
