# Laravel (file-storage) + React CRUD

This workspace contains scaffolding to implement a Laravel API that uses local file storage (no DB) and a React frontend.

Overview:
- Backend: Laravel API endpoints that read/write `storage/app/users.json` for CRUD on users (name, email, password). Passwords are hashed.
- Admin login: simple admin auth middleware using hardcoded credentials. Admin can view all users.
- Frontend: `frontend` React app that talks to the Laravel API for CRUD and admin login.

Important: This repository contains helper files to add into a real Laravel project. Run the commands below to create a Laravel project and wire these files in.

Windows (cmd.exe) quick setup

1) Install Composer and Node.js if not installed.

2) Create Laravel project (in `backend` folder):

```cmd
cd C:\Programming\Laravel
composer create-project --prefer-dist laravel/laravel backend
```

3) Copy the files from this scaffold into the Laravel project. The scaffold files are prepared under `backend_scaffold` in this workspace; move these files into the `backend` project created above (merge with Laravel project):
- `app/Http/Controllers/UserController.php`
- `app/Http/Middleware/AdminAuth.php`
- `app/Services/JsonStorage.php`
- `routes/api.php` (replace or merge routes)

4) Install PHP dev server dependencies (if needed) and start backend:

```cmd
cd backend
php artisan serve --host=127.0.0.1 --port=8000
```

5) Frontend setup:

```cmd
cd C:\Programming\Laravel\frontend
npm install
npm start
```

The React app will run on `http://localhost:3000` and call the API at `http://127.0.0.1:8000/api`.

Admin credentials (hardcoded):
- email: `admin@example.com`
- password: `adminpassword`

Security note: This scaffold is for local/demo purposes only. Do not use hardcoded credentials or file-based storage for production.
