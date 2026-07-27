// Cloud Sync Manager - Supabase
// Nécessite: npm install @supabase/supabase-js

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

let supabase = null;

// Initialiser Supabase (lazy load)
async function initSupabase() {
  if (supabase || !SUPABASE_URL) return null;
  
  try {
    const { createClient } = await import('@supabase/supabase-js');
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    return supabase;
  } catch (error) {
    console.warn('Supabase not available:', error);
    return null;
  }
}

// Authentification
export const cloudAuth = {
  async signup(email, password) {
    const db = await initSupabase();
    if (!db) throw new Error('Cloud sync not available');
    
    const { data, error } = await db.auth.signUp({
      email,
      password
    });
    
    if (error) throw error;
    return data.user;
  },

  async login(email, password) {
    const db = await initSupabase();
    if (!db) throw new Error('Cloud sync not available');
    
    const { data, error } = await db.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data.user;
  },

  async logout() {
    const db = await initSupabase();
    if (!db) return;
    
    await db.auth.signOut();
  },

  async getCurrentUser() {
    const db = await initSupabase();
    if (!db) return null;
    
    const { data: { user } } = await db.auth.getUser();
    return user;
  }
};

// Sauvegarde/Chargement du character
export const cloudStorage = {
  async saveCharacter(character) {
    const db = await initSupabase();
    if (!db) return false;
    
    try {
      const user = await cloudAuth.getCurrentUser();
      if (!user) return false;

      const { error } = await db
        .from('characters')
        .upsert({
          user_id: user.id,
          character_name: character.name,
          data: character,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.warn('Failed to save to cloud:', error);
      return false;
    }
  },

  async loadCharacter() {
    const db = await initSupabase();
    if (!db) return null;
    
    try {
      const user = await cloudAuth.getCurrentUser();
      if (!user) return null;

      const { data, error } = await db
        .from('characters')
        .select('data')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
      return data?.data || null;
    } catch (error) {
      console.warn('Failed to load from cloud:', error);
      return null;
    }
  },

  async deleteCharacter() {
    const db = await initSupabase();
    if (!db) return false;
    
    try {
      const user = await cloudAuth.getCurrentUser();
      if (!user) return false;

      const { error } = await db
        .from('characters')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.warn('Failed to delete from cloud:', error);
      return false;
    }
  }
};

// Export/Import local
export const characterBackup = {
  /**
   * Exporte le character en JSON
   */
  exportToJSON(character) {
    const dataStr = JSON.stringify(character, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `quiz-rpg-backup-${character.name}-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  },

  /**
   * Importe un character depuis un fichier JSON
   */
  importFromJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const character = JSON.parse(e.target.result);
          
          // Validation minimale
          if (!character.name || !character.stats) {
            throw new Error('Format de fichier invalide');
          }
          
          resolve(character);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
      reader.readAsText(file);
    });
  },

  /**
   * Crée un backup local dans localStorage
   */
  createLocalBackup(character) {
    const backups = JSON.parse(localStorage.getItem('quiz-rpg-backups') || '[]');
    
    const backup = {
      id: Date.now(),
      name: character.name,
      level: character.level,
      timestamp: new Date().toISOString(),
      data: character
    };
    
    backups.unshift(backup); // Ajouter au début
    backups.splice(10); // Garder seulement les 10 derniers
    
    localStorage.setItem('quiz-rpg-backups', JSON.stringify(backups));
    return backup.id;
  },

  /**
   * Charge un backup local
   */
  loadLocalBackup(backupId) {
    const backups = JSON.parse(localStorage.getItem('quiz-rpg-backups') || '[]');
    const backup = backups.find(b => b.id === backupId);
    return backup?.data || null;
  },

  /**
   * Liste tous les backups locaux
   */
  listLocalBackups() {
    return JSON.parse(localStorage.getItem('quiz-rpg-backups') || '[]');
  },

  /**
   * Supprime un backup local
   */
  deleteLocalBackup(backupId) {
    const backups = JSON.parse(localStorage.getItem('quiz-rpg-backups') || '[]');
    const filtered = backups.filter(b => b.id !== backupId);
    localStorage.setItem('quiz-rpg-backups', JSON.stringify(filtered));
  }
};

// Auto-sync (chaque 30 secondes si connecté)
export function startAutoSync(character, interval = 30000) {
  const syncInterval = setInterval(async () => {
    const user = await cloudAuth.getCurrentUser();
    if (user) {
      await cloudStorage.saveCharacter(character);
    }
  }, interval);

  return () => clearInterval(syncInterval);
}
