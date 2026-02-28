/**
 * PIN Lock Screen Logic v2
 * Admin-aware profile creation, crown badge for admin.
 */
import { getProfiles, createProfile, verifyPin, isFirstProfile } from '../db/database.js';
import { showToast } from './toast.js';

let _selectedProfile = null;
let _currentPin = '';
let _newPin = '';
let _onUnlock = null;

function getElements() {
    return {
        pinLock: document.getElementById('pin-lock'),
        mainApp: document.getElementById('main-app'),
        pinProfiles: document.getElementById('pin-profiles'),
        pinEntry: document.getElementById('pin-entry'),
        pinDots: document.querySelector('#pin-entry .pin-dots'),
        addProfileBtn: document.getElementById('add-profile-btn'),
        newProfileForm: document.getElementById('new-profile-form'),
        profileNameInput: document.getElementById('profile-name'),
        newPinDots: document.getElementById('new-pin-dots'),
        newPinKeypad: document.getElementById('new-pin-keypad'),
        createProfileBtn: document.getElementById('create-profile-btn'),
        cancelProfileBtn: document.getElementById('cancel-profile-btn'),
        pinCancel: document.getElementById('pin-cancel'),
        activeUser: document.getElementById('active-user'),
    };
}

async function renderProfiles() {
    const els = getElements();
    const profiles = await getProfiles();

    if (profiles.length === 0) {
        els.pinProfiles.innerHTML = `
            <div class="empty-state" style="padding: 16px;">
                <p style="font-size: 0.85rem; color: var(--text-muted);">
                    Create the admin profile to get started
                </p>
            </div>`;
        if (els.addProfileBtn) els.addProfileBtn.textContent = '+ Create Admin';
        return;
    }

    els.pinProfiles.innerHTML = profiles.map(p => `
        <div class="profile-circle" data-id="${p.id}">
            <div class="profile-avatar" style="background: ${p.color}">
                ${p.name.charAt(0).toUpperCase()}
                ${p.role === 'admin' ? '<span class="admin-crown">👑</span>' : ''}
            </div>
            <span class="profile-name">${p.name}</span>
            <span class="profile-role-badge ${p.role}">${p.role === 'admin' ? 'Admin' : 'Staff'}</span>
        </div>
    `).join('');

    // Hide "New Profile" on lock screen (only admin can create via admin panel)
    if (els.addProfileBtn) {
        els.addProfileBtn.style.display = 'none';
    }

    // Click handlers
    els.pinProfiles.querySelectorAll('.profile-circle').forEach(el => {
        el.addEventListener('click', () => selectProfile(el.dataset.id, profiles));
    });
}

function selectProfile(id, profiles) {
    const els = getElements();
    _selectedProfile = profiles.find(p => p.id === id);
    _currentPin = '';

    // Highlight selected
    els.pinProfiles.querySelectorAll('.profile-circle').forEach(el => {
        el.classList.toggle('selected', el.dataset.id === id);
    });

    // Show PIN entry
    els.pinEntry.classList.remove('hidden');
    if (els.addProfileBtn) els.addProfileBtn.classList.add('hidden');
    updatePinDots(els.pinDots, _currentPin.length);
}

function updatePinDots(container, filledCount) {
    const dots = container.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('filled', i < filledCount);
        dot.classList.remove('error');
    });
}

function showPinError(container) {
    container.querySelectorAll('.dot').forEach(dot => {
        dot.classList.add('error');
    });
    setTimeout(() => {
        container.querySelectorAll('.dot').forEach(dot => dot.classList.remove('error'));
    }, 500);
}

async function handlePinInput(key) {
    const els = getElements();

    if (key === 'back') {
        _currentPin = _currentPin.slice(0, -1);
        updatePinDots(els.pinDots, _currentPin.length);
        return;
    }

    if (_currentPin.length >= 4) return;
    _currentPin += key;
    updatePinDots(els.pinDots, _currentPin.length);

    if (_currentPin.length === 4) {
        // Verify PIN
        const valid = await verifyPin(_selectedProfile.id, _currentPin);
        if (valid) {
            unlock(_selectedProfile);
        } else {
            showPinError(els.pinDots);
            _currentPin = '';
            setTimeout(() => updatePinDots(els.pinDots, 0), 500);
        }
    }
}

function handleNewPinInput(key) {
    const els = getElements();

    if (key === 'back') {
        _newPin = _newPin.slice(0, -1);
        updatePinDots(els.newPinDots, _newPin.length);
        els.createProfileBtn.disabled = true;
        return;
    }

    if (_newPin.length >= 4) return;
    _newPin += key;
    updatePinDots(els.newPinDots, _newPin.length);

    if (_newPin.length === 4) {
        els.createProfileBtn.disabled = false;
    }
}

function unlock(profile) {
    const els = getElements();
    els.pinLock.classList.remove('active');
    els.mainApp.classList.add('active');

    const roleBadge = profile.role === 'admin' ? ' 👑' : '';
    els.activeUser.textContent = profile.name + roleBadge;

    if (_onUnlock) _onUnlock(profile);
}

export function lock() {
    const els = getElements();
    els.mainApp.classList.remove('active');
    els.pinLock.classList.add('active');
    _selectedProfile = null;
    _currentPin = '';
    els.pinEntry.classList.add('hidden');
    els.newProfileForm.classList.add('hidden');
    if (els.addProfileBtn) {
        els.addProfileBtn.classList.remove('hidden');
    }
    renderProfiles();
}

export function initPinLock(onUnlockCallback) {
    _onUnlock = onUnlockCallback;
    const els = getElements();

    // PIN keypad for login
    const loginKeypad = els.pinEntry.querySelector('.pin-keypad');
    loginKeypad.addEventListener('click', (e) => {
        const key = e.target.closest('.key')?.dataset?.key;
        if (key) handlePinInput(key);
    });

    // Cancel PIN entry
    els.pinCancel.addEventListener('click', () => {
        _currentPin = '';
        els.pinEntry.classList.add('hidden');
        if (els.addProfileBtn) els.addProfileBtn.classList.remove('hidden');
        els.pinProfiles.querySelectorAll('.profile-circle').forEach(el => {
            el.classList.remove('selected');
        });
    });

    // New profile button (only shown when no profiles exist)
    els.addProfileBtn.addEventListener('click', async () => {
        els.addProfileBtn.classList.add('hidden');
        els.pinProfiles.classList.add('hidden');
        els.newProfileForm.classList.remove('hidden');
        _newPin = '';
        els.profileNameInput.value = '';
        els.createProfileBtn.disabled = true;
        updatePinDots(els.newPinDots, 0);
        els.profileNameInput.focus();
    });

    // New profile keypad
    els.newPinKeypad.addEventListener('click', (e) => {
        const key = e.target.closest('.key')?.dataset?.key;
        if (key) handleNewPinInput(key);
    });

    // Create profile
    els.createProfileBtn.addEventListener('click', async () => {
        const name = els.profileNameInput.value.trim();
        if (!name || _newPin.length !== 4) return;

        try {
            const profile = await createProfile(name, _newPin);
            els.newProfileForm.classList.add('hidden');
            els.pinProfiles.classList.remove('hidden');
            if (els.addProfileBtn) els.addProfileBtn.classList.remove('hidden');
            showToast(
                profile.role === 'admin'
                    ? `Admin profile "${name}" created! 👑`
                    : `Profile "${name}" created!`,
                'success'
            );
            unlock(profile);
        } catch (err) {
            showToast(err.message, 'error');
        }
    });

    // Cancel new profile
    els.cancelProfileBtn.addEventListener('click', () => {
        els.newProfileForm.classList.add('hidden');
        els.pinProfiles.classList.remove('hidden');
        if (els.addProfileBtn) els.addProfileBtn.classList.remove('hidden');
        _newPin = '';
    });

    renderProfiles();
}
