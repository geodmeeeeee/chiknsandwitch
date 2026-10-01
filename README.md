# Games

A simple static game grid for GitHub Pages.

## Main page password

The site opens on a dedicated password page before showing the game grid. To change the password, edit `SITE_PASSWORD` near the top of `access.js`. Access stays unlocked in the current tab until it is closed.

This is a browser-side gate, not secure website authentication: the password is included in the site's JavaScript, and direct game-page URLs are not protected. Use server-side or hosting-provider authentication if the content must be private.

## Adding a game

Open `games.js` and add:

```js
{
  title: "My Game",
  image: "images/my-game.jpg",
  url: "games/my-game/index.html"
}
```

The whole card is clickable, so there is no separate play button.

No build step or server is required.
