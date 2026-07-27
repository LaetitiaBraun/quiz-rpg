// Storage Manager using IndexedDB - Survives hard refresh (Ctrl+Shift+R)
const DB_NAME = 'QuizRPGDB';
const DB_VERSION = 1;
const STORE_NAME = 'characters';

class StorageManager {
  constructor() {
    this.db = null;
    this.initialized = false;
  }

  // Initialize IndexedDB
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        this.initialized = true;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
    });
  }

  // Sauvegarder les données du personnage
  async saveCharacter(character) {
    if (!this.initialized) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const data = {
        id: 'player_character',
        character: character,
        timestamp: new Date().toISOString()
      };

      const request = store.put(data);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        // Aussi sauvegarder dans localStorage comme backup
        localStorage.setItem('quizrpg_character', JSON.stringify(character));
        resolve(data);
      };
    });
  }

  // Charger les données du personnage
  async loadCharacter() {
    if (!this.initialized) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get('player_character');

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const result = request.result;
        if (result && result.character) {
          resolve(result.character);
        } else {
          // Fallback sur localStorage
          const saved = localStorage.getItem('quizrpg_character');
          if (saved) {
            resolve(JSON.parse(saved));
          } else {
            resolve(null);
          }
        }
      };
    });
  }

  // Sauvegarder le leaderboard
  async saveLeaderboard(leaderboard) {
    if (!this.initialized) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const data = {
        id: 'leaderboard',
        leaderboard: leaderboard,
        timestamp: new Date().toISOString()
      };

      const request = store.put(data);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        localStorage.setItem('quizrpg_leaderboard', JSON.stringify(leaderboard));
        resolve(data);
      };
    });
  }

  // Charger le leaderboard
  async loadLeaderboard() {
    if (!this.initialized) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get('leaderboard');

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const result = request.result;
        if (result && result.leaderboard) {
          resolve(result.leaderboard);
        } else {
          const saved = localStorage.getItem('quizrpg_leaderboard');
          if (saved) {
            resolve(JSON.parse(saved));
          } else {
            resolve([]);
          }
        }
      };
    });
  }

  // Vider COMPLÈTEMENT la base (pour reset)
  async clearAll() {
    if (!this.initialized) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        localStorage.removeItem('quizrpg_character');
        localStorage.removeItem('quizrpg_leaderboard');
        resolve();
      };
    });
  }

  // Vérifier si IndexedDB est supporté
  static isSupported() {
    return !!window.indexedDB;
  }
}

export const storageManager = new StorageManager();
