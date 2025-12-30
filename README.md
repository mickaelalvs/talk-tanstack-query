# Welcome to [Slidev](https://github.com/slidevjs/slidev)!

To start the slide show:

- `pnpm install`
- `pnpm dev`
- visit <http://localhost:3030>

Edit the [slides.md](./slides.md) to see the changes.

Learn more about Slidev at the [documentation](https://sli.dev/).

## Run the demo environnement

### Code-server

First, you'll need to have a local code-server running

For this, you can follow the installation [instruction on github](https://github.com/coder/code-server) or use the following curl command

```bash
curl -fsSL https://code-server.dev/install.sh | sh
```

When code-server is installed, you just need to run this command in the folder you want to show in sildes

```bash
code-server . --auth=none --port 4000
```

If you have an error, you can try this before the command above

```
PATH="$HOME/.local/bin:$PATH"
```

A server on the 4000 port should be running, and you can see it in every slides with the `<CodeServer />` component

### App

Next, you'll need to have an app running on `localhost:3000` to be able to show it in the slide

On the `<CodeServer />` slide, you can use the `c` key to toggle the result iframe visibility :D
