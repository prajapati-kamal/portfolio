# To‑Do List (Local Storage)

This folder contains a small, accessible single‑page To‑Do application that persists tasks in the browser using localStorage.

Files included

- index.html — main HTML page. Open this in a browser to run the app.
- styles.css — styles for the app.
- app.js — JavaScript logic. Uses localStorage key `todos-v1` to persist tasks.

How it works

- Tasks are stored as a JSON array in localStorage under the key `todos-v1`.
- Add tasks via the input and press Enter (or click Add).
- Toggle completion by clicking the checkbox on a task.
- Edit a task by double‑clicking it (or clicking the pencil icon). Press Enter or blur to save.
- Delete a task with the trash icon.
- Filter tasks: All / Active / Completed.
- Clear all completed tasks with the "Clear completed" button.

Running locally

1. Clone the repository:

   git clone https://github.com/prajapati-kamal/portfolio.git

2. Open the file `index.html` in a browser (double‑click or serve it using a static server).

Notes

- To reset the saved tasks in your browser, remove the `todos-v1` key in DevTools > Application > Local Storage or change the STORAGE_KEY in app.js.
- The app is intentionally small and dependency‑free — it runs purely in the browser.

Enhancements you could add

- Drag‑to‑reorder tasks
- Due dates, reminders, and priorities
- Sync across devices using a backend API
- Convert to a React/Next.js component and integrate into the portfolio site

If you want, I can add these features or integrate the To‑Do app into the Next.js portfolio — tell me which direction you prefer.