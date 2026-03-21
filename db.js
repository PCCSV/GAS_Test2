const DB_NAME = "pwa-db";
const STORE = "outbox";

function openDB() {
  return new Promise(resolve => {

    const req = indexedDB.open(DB_NAME, 1);

    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE, {
        autoIncrement: true
      });
    };

    req.onsuccess = () => resolve(req.result);

  });
}

async function saveOffline(data) {

  const db = await openDB();

  const tx = db.transaction(STORE, "readwrite");

  tx.objectStore(STORE).add(data);

}

async function getAllOffline() {

  const db = await openDB();

  return new Promise(resolve => {

    const tx = db.transaction(STORE);

    const req = tx.objectStore(STORE).getAll();

    req.onsuccess = () => resolve(req.result);

  });

}

async function clearOffline() {

  const db = await openDB();

  const tx = db.transaction(STORE, "readwrite");

  tx.objectStore(STORE).clear();

}
