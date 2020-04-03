# Publish an update using electron-builder

Increment package.json version.
```
yarn version --patch (--minor, --major)
```

Push changes remote
```
git push origin <branch>
```

Tag new release
```
git push origin --tags 
```

That will create a release that will be use by the publisher to put  
