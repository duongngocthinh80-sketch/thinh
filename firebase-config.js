/**
 * ============================================================================
 * NINH BINH VALLEY HOMESTAY - FIREBASE REAL-TIME CLOUD SYNC & BACKUP ENGINE
 * ============================================================================
 * Dual-layer Architecture:
 * 1. Primary: Google Firebase Cloud Firestore (Real-time multi-device sync)
 * 2. Fallback: Browser LocalStorage (Zero-downtime offline support)
 * ============================================================================
 */

const STORAGE_KEY_FIREBASE_CFG = 'nbv_firebase_config_v1';

// Default Firebase Configuration (Active Project)
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyD03rven8H2guipKOUqnFzrKF-Ln-gD_eQ",
  authDomain: "homestay3-90d1a.firebaseapp.com",
  projectId: "homestay3-90d1a",
  storageBucket: "homestay3-90d1a.firebasestorage.app",
  messagingSenderId: "1067987517850",
  appId: "1:1067987517850:web:9a2aeee132c166c539ba23",
  measurementId: "G-WXRPGQ9S08"
};

let firebaseApp = null;
let firestoreDb = null;
let firebaseAnalytics = null;
let isFirebaseInitialized = false;

/**
 * Get active Firebase Config from localStorage or default template
 */
function getFirebaseConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_FIREBASE_CFG);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('[Firebase] Could not parse saved config:', e);
  }
  return DEFAULT_FIREBASE_CONFIG;
}

/**
 * Save Firebase Config to localStorage
 */
function saveFirebaseConfig(config) {
  localStorage.setItem(STORAGE_KEY_FIREBASE_CFG, JSON.stringify(config));
  return initializeFirebase(true);
}

/**
 * Initialize Firebase Application and Firestore instance
 */
function initializeFirebase(forceReinit = false) {
  if (isFirebaseInitialized && !forceReinit) return firestoreDb;

  if (typeof firebase === 'undefined') {
    console.warn('[Firebase] Firebase SDK script not loaded yet.');
    return null;
  }

  const cfg = getFirebaseConfig();

  // Validate that essential fields exist
  if (!cfg.apiKey || !cfg.projectId) {
    console.log('[Firebase] No custom Firebase config found. Running in LocalStorage-first mode.');
    isFirebaseInitialized = false;
    return null;
  }

  try {
    if (firebase.apps && firebase.apps.length > 0) {
      firebaseApp = firebase.app();
    } else {
      firebaseApp = firebase.initializeApp(cfg);
    }
    firestoreDb = firebase.firestore();
    if (typeof firebase.analytics === 'function' && cfg.measurementId) {
      try {
        firebaseAnalytics = firebase.analytics();
        console.log('[Firebase] Google Analytics initialized:', cfg.measurementId);
      } catch (ae) {
        console.warn('[Firebase] Analytics init notice:', ae);
      }
    }
    isFirebaseInitialized = true;
    console.log('[Firebase] Successfully connected to Firebase Project:', cfg.projectId);
    return firestoreDb;
  } catch (error) {
    console.error('[Firebase] Initialization error:', error);
    isFirebaseInitialized = false;
    return null;
  }
}

/**
 * Test Firebase Connection
 */
async function testFirebaseConnection(customConfig) {
  if (typeof firebase === 'undefined') {
    return { success: false, message: 'Thư viện Firebase SDK chưa được tải.' };
  }

  try {
    const tempName = 'test-app-' + Date.now();
    const testApp = firebase.initializeApp(customConfig, tempName);
    const testDb = testApp.firestore();
    // Test write and delete in a ping document
    const pingRef = testDb.collection('_health_check').doc('ping');
    await pingRef.set({ timestamp: new Date().toISOString(), status: 'connected' });
    await pingRef.delete();
    // Clean up temp app
    await testApp.delete();
    return { success: true, message: 'Kết nối Firebase Firestore thành công 100%!' };
  } catch (err) {
    return { success: false, message: 'Lỗi kết nối: ' + (err.message || err) };
  }
}

/**
 * 1. CLOUD SYNC: BOOKINGS COLLECTION
 */
async function syncBookingToFirebase(booking) {
  const db = initializeFirebase();
  if (!db || !booking) return false;

  try {
    await db.collection('bookings').doc(booking.id).set(booking, { merge: true });
    console.log(`[Firebase] Booking ${booking.id} synced to Cloud Firestore.`);
    return true;
  } catch (err) {
    console.error('[Firebase] Failed to sync booking:', err);
    return false;
  }
}

async function fetchBookingsFromFirebase() {
  const db = initializeFirebase();
  if (!db) return null;

  try {
    const snapshot = await db.collection('bookings').orderBy('createdAt', 'desc').get();
    const list = [];
    snapshot.forEach(doc => {
      list.push(doc.data());
    });
    return list;
  } catch (err) {
    console.error('[Firebase] Failed to fetch bookings from cloud:', err);
    return null;
  }
}

function listenToBookingsRealtime(onUpdateCallback) {
  const db = initializeFirebase();
  if (!db || typeof onUpdateCallback !== 'function') return null;

  try {
    return db.collection('bookings').onSnapshot((snapshot) => {
      const list = [];
      snapshot.forEach(doc => {
        list.push(doc.data());
      });
      // Sort newest first
      list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      onUpdateCallback(list);
    }, (error) => {
      console.warn('[Firebase] Realtime listener error:', error);
    });
  } catch (err) {
    console.error('[Firebase] Error setting up listener:', err);
    return null;
  }
}

async function updateBookingInFirebase(id, updates) {
  const db = initializeFirebase();
  if (!db || !id) return false;

  try {
    await db.collection('bookings').doc(id).update(updates);
    console.log(`[Firebase] Booking ${id} updated on cloud.`);
    return true;
  } catch (err) {
    console.error('[Firebase] Error updating booking:', err);
    return false;
  }
}

async function deleteBookingFromFirebase(id) {
  const db = initializeFirebase();
  if (!db || !id) return false;

  try {
    await db.collection('bookings').doc(id).delete();
    console.log(`[Firebase] Booking ${id} deleted from cloud.`);
    return true;
  } catch (err) {
    console.error('[Firebase] Error deleting booking:', err);
    return false;
  }
}

/**
 * 2. CLOUD SYNC: VISITOR ACCESS LOGS
 */
async function syncVisitorLogToFirebase(log) {
  const db = initializeFirebase();
  if (!db || !log) return false;

  try {
    await db.collection('visitors').add({
      ...log,
      serverTimestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    return true;
  } catch (err) {
    console.warn('[Firebase] Visitor log sync skipped:', err.message);
    return false;
  }
}

async function fetchVisitorsFromFirebase() {
  const db = initializeFirebase();
  if (!db) return null;

  try {
    const snapshot = await db.collection('visitors').limit(50).get();
    const list = [];
    snapshot.forEach(doc => list.push(doc.data()));
    return list;
  } catch (err) {
    return null;
  }
}

/**
 * 3. BACKUP & RESTORE ALL LOCAL DATA TO/FROM FIREBASE
 */
async function backupAllLocalDataToFirebase() {
  const db = initializeFirebase();
  if (!db) {
    return { success: false, message: 'Vui lòng cài đặt và kết nối Firebase trước khi sao lưu.' };
  }

  try {
    // 1. Backup Bookings
    const localBookings = JSON.parse(localStorage.getItem('nbv_bookings_v1')) || [];
    const batch = db.batch();
    localBookings.forEach(b => {
      const docRef = db.collection('bookings').doc(b.id);
      batch.set(docRef, b, { merge: true });
    });

    // 2. Backup Metadata & Bank Settings
    const bankSettings = JSON.parse(localStorage.getItem('nbv_bank_settings_v1')) || {};
    const settingsRef = db.collection('settings').doc('bank_qr');
    batch.set(settingsRef, bankSettings, { merge: true });

    // 3. Backup System Admin Users
    const users = JSON.parse(localStorage.getItem('nbv_admin_users_v1')) || [];
    const usersRef = db.collection('settings').doc('admin_users');
    batch.set(usersRef, { list: users, updatedAt: new Date().toISOString() }, { merge: true });

    await batch.commit();

    return { 
      success: true, 
      message: `Đã sao lưu thành công ${localBookings.length} đơn đặt phòng, cấu hình QR và tài khoản lên Firebase Cloud Firestore!` 
    };
  } catch (err) {
    return { success: false, message: 'Lỗi sao lưu: ' + err.message };
  }
}

async function restoreAllDataFromFirebase() {
  const db = initializeFirebase();
  if (!db) {
    return { success: false, message: 'Vui lòng kết nối Firebase trước.' };
  }

  try {
    // 1. Fetch Bookings
    const bookings = await fetchBookingsFromFirebase();
    if (bookings && bookings.length > 0) {
      localStorage.setItem('nbv_bookings_v1', JSON.stringify(bookings));
    }

    // 2. Fetch Settings
    const bankDoc = await db.collection('settings').doc('bank_qr').get();
    if (bankDoc.exists) {
      localStorage.setItem('nbv_bank_settings_v1', JSON.stringify(bankDoc.data()));
    }

    const usersDoc = await db.collection('settings').doc('admin_users').get();
    if (usersDoc.exists && usersDoc.data().list) {
      localStorage.setItem('nbv_admin_users_v1', JSON.stringify(usersDoc.data().list));
    }

    return {
      success: true,
      message: `Đã khôi phục thành công dữ liệu từ Firebase Cloud về máy của bạn!`
    };
  } catch (err) {
    return { success: false, message: 'Lỗi khôi phục: ' + err.message };
  }
}

// Auto-run initialization attempt on script load
document.addEventListener('DOMContentLoaded', () => {
  initializeFirebase();
});
