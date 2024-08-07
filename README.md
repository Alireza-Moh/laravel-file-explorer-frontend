
# Laravel File Explorer

![Laravel File Explorer image](docs/laravel-file-explorer-merged-demo.png)



Laravel File Explorer is a package for easy file management in Laravel apps, offering features like browsing, uploading, and deleting files.





## Features

![](docs/video.gif)

- Frontend made with VueJS 3
- Light/dark mode toggle
- Utilizes Laravel Flysystem standards for file system operations
- Supports Local, FTP, S3, Dropbox, and other storage options
- Supports File System Operations:
  - CURD operations files and directories
  - Multi-upload functionality
  - Download files
  - Image preview
  - Video player
  - Audio player
  - Code editor (Codemirror)
  - Laravel events
  - ACL

## Installation

Install Laravel File Explorer backend with composer

https://github.com/Alireza-Moh/laravel-file-explorer

```bash
  composer require alireza-moh/laravel-file-explorer
```
Publish configuration file

```bash
  php artisan vendor:publish --tag=lfx.config
```
Download the frontend into your project

```bash
  npm i laravel-file-explorer
```
Add the FileExplorer component to the vue app
```js
import LaravelFileExplorer from "laravel-file-explorer";
import "laravel-file-explorer/dist/style.css";

app.use(LaravelFileExplorer);
```
Use the component inside your vue component
```javascript
  <LaravelFileExplorer :setting="{baseUrl: 'http://laravel-wrapper.localhost:8084/api/laravel-file-explorer/'}"/>
```
