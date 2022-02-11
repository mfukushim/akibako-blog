# akibako-nuxt  
My blog's build project. Open, but my private use.

### Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm dev

# build for production and launch server
$ npm build
$ npm start

# generate static project
$ npm generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

### Function  
This project based nuxt/content with ipfs import customize.

ipfs markdown articles.
-> akibako-nuxt (import markdown articles/export html,js)
-> host static

### Settings  
.env
```
ROOT_CID=markdown articles root cid (e.g. bafyreifarcflnngmrzoeiaefh4ubwrst6rfcxlrfdjh565r4fmp2utv53e )
IPFS_API_ENDPOINT=(ipfs api endpoint. if not set,it run own ipfs client. e.g http://127.0.0.1:5002)
ANALYTICS= google analytics code
ADSENSE= google adsense code
AD_SLOT=google adsense ad slot id
NODE_ENV=production
```

### Articles structure

reference https://github.com/mfukushim/content#ipfs-document-structure
