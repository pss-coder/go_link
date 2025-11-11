# Go Link Shortener

A simple URL shortener with a Go backend and a React + Vite frontend.

---

## Project Structure

```
backend/    # Go backend server
frontend/   # React + Vite frontend
static/     # Static HTML demo
```

---

## Backend (Go)

- **Location:** [`backend/`](backend/)
- **Entry Point:** [`backend/main.go`](backend/main.go)
- **Port:** `8085` (default)

### Run Backend

```sh
cd backend
go run main.go
```

---

## Frontend (React + Vite)

- **Location:** [`frontend/`](frontend/)
- **Entry Point:** [`frontend/src/main.tsx`](frontend/src/main.tsx)

### Install Dependencies

```sh
cd frontend
npm install
```

### Start Development Server

```sh
npm run dev
```

### Build for Production

```sh
npm run build
```

---

## Static Demo

A minimal HTML demo is available at [`static/index.html`](static/index.html).

---

## Usage

1. **Start the backend** (`go run main.go` in `backend/`).
2. **Start the frontend** (`npm run dev` in `frontend/`).
3. Open the frontend in your browser (default: [http://localhost:5173](http://localhost:5173) for Vite).
4. Enter a URL to shorten. The backend will generate a short link.
5. Use the short link to be redirected to the original URL.

---

## Notes

- The backend uses in-memory storage for links (data will be lost on restart).
- Adjust ports or endpoints as needed for your deployment.

---

## License

MIT