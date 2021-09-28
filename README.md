# GitHub Actions Auto Build and Deploy Next.js APP with CRON JOB

We Have two different nextjs config for dev and github pages
## Next Config for Dev Environment

Update the next.config.js as given below for development environment
```javascript
// next.config.js

module.exports = {
    reactStrictMode: true,
    //  basePath: '/github-cron',
}
```

## Run the local server
```bash
npm run dev
```
Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.


## Next Config for Github Pages
Update the next.config.js accordingly before deploy to github.
```javascript
// next.config.js
module.exports = {
    reactStrictMode: true,
    // only needed when you are not hosting this project from root directory
    basePath: '/github-cron',
}
```

## Static Build
```bash
npm run export
```
This will generate all the static files in ```/docs``` folder. You can directly push all the changes including ```/docs``` folder to GitHub and you GitHub site will be automatically updated.

> Remember to update your GitHub Pages Build Directory to ```/docs``` in GitHub Settings.