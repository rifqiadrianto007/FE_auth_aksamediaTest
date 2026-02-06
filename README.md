# Aksamedia Frontend Test App

## Overview

Aksamedia Frontend Test App adalah aplikasi web berbasis ReactJS yang
dibuat untuk memenuhi tech test Frontend Developer Intern di PT
Aksamedia Mulia Digital. Aplikasi ini mensimulasikan sistem autentikasi
dan manajemen data user tanpa menggunakan API eksternal. Semua data
disimpan secara lokal menggunakan IndexedDB.

Aplikasi ini dirancang dengan clean architecture, responsive design,
serta mendukung persistence state dan theme management sesuai
requirement yang diberikan.

------------------------------------------------------------------------

## Demo

Live Demo:\
https://fe-auth-eight.vercel.app/login

Repository Github:\
https://github.com/rifqiadrianto007/FE_auth_aksamediaTest

------------------------------------------------------------------------

## Login Credential

Gunakan credential berikut untuk login:

Username: admin

Password: 123456

------------------------------------------------------------------------

## Features

### Authentication

-   Login tanpa API
-   Credential statis
-   Persistence login menggunakan IndexedDB
-   Protected routes
-   Logout system

### User Management (CRUD)

-   Create user
-   Read user
-   Update user
-   Delete user
-   Search user
-   Query string persistence

### Profile Management

-   Edit nama user login
-   Update realtime di navbar
-   Persistence menggunakan IndexedDB

### Theme Management

-   Light mode
-   Dark mode
-   System mode
-   Auto sync dengan OS
-   Persistence theme menggunakan IndexedDB

### Technical Implementation

-   Tanpa backend
-   Tanpa API
-   Tanpa UI library eksternal
-   Fully responsive (mobile, tablet, desktop)

------------------------------------------------------------------------

## Tech Stack

-   ReactJS (Vite)
-   TailwindCSS
-   React Router DOM
-   IndexedDB (idb)
-   JavaScript (ES6)

------------------------------------------------------------------------

## Installation and Setup

### 1. Clone repository

git clone https://github.com/rifqiadrianto007/FE_auth_aksamediaTest.git

### 2. Masuk ke folder project

cd FE_auth_aksamediaTest

### 3. Install dependencies

npm install

### 4. Jalankan development server

npm run dev

### 5. Buka di browser

http://localhost:5173

------------------------------------------------------------------------

## Build for Production

npm run build

------------------------------------------------------------------------

## Project Structure

src/ ├── app/ \# routing dan protected route\
├── components/ \# reusable components\
├── contexts/ \# auth dan theme context\
├── database/ \# indexedDB config dan repository\
├── hooks/ \# custom hooks\
├── pages/ \# halaman aplikasi\
├── utils/ \# helper dan credential config

------------------------------------------------------------------------

## Author

Nama: Rifqi Adrianto\
Github: https://github.com/rifqiadrianto007
