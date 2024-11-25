# Contributing Guidelines

## Support the original game

- Do not modify code which might affect the revenue stream to the original game.
  1. Do not remove ads.
  2. Do not remove tracking.
- Keep modifications that gives unfair advantage over other players private for now.

## Set-up Dev Environment

1. Create a folder to store local file overrides for chrome.

```
mkdir -p ~/Projects/overrides; cd ~/Projects/overrides
```

2. Clone this repo and this specific branch inside that folder.

```
git clone https://github.com/ragavpr/overrides-wings.io.git wings.io
```

3. Open an editor of your choice, use following command for VSCode

```
code wings.io
```

Optionally, use below VScode settings to enable display of Types inline for TypeScript files

```
  "typescript.inlayHints.parameterNames.enabled": "all",
  "typescript.inlayHints.variableTypes.enabled": true,
  "typescript.inlayHints.propertyDeclarationTypes.enabled": true,
  "typescript.inlayHints.parameterTypes.enabled": true,
  "typescript.inlayHints.functionLikeReturnTypes.enabled": true,
```

### Recommendations after setting-up

- Fork this project and add a new remote pointing to your fork, use SSH if possible

```
git remote add forkrepo [[your-github-repo-url]]
```

- Edit, commit and push to your own fork

```
git push -u forkrepo [[branch-name]]
```

## Building version

Use bun to build the project, refresh the browser to use the newly built file.

### To build `client.js`

#### For debugging

```
bun build src/client.ts --outfile build/client.js --target browser
```
