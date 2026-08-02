import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Save, KeyRound, User, Shield } from 'lucide-react';
import { apiFetch } from '../utils/api';
import { toast } from 'react-toastify';

function Settings() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Profile state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // Extra info (read-only display)
  const [contact, setContact] = useState('');
  const [memberSince, setMemberSince] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/login');
      return;
    }

    apiFetch('/users/me', { suppressToast: true })
      .then((data) => {
        setName(data.name || '');
        setEmail(data.email || '');
        setContact(data.contact || '');
        setProfilePhoto(data.profilePhoto || null);
        setPreviewPhoto(data.profilePhoto || null);
        setMemberSince(
          data.createdAt
            ? new Date(data.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : ''
        );
        setLoading(false);
      })
      .catch(() => {
        navigate('/login');
      });
  }, [navigate]);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 200 * 1024) {
      toast.error('Photo must be under 200KB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewPhoto(reader.result);
      setProfilePhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);

    try {
      const payload = { name, email };
      // Only send photo if it changed
      if (profilePhoto !== previewPhoto || profilePhoto !== null) {
        payload.profilePhoto = profilePhoto;
      }

      const data = await apiFetch('/users/profile', {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      // Update localStorage email if changed
      if (data.email) {
        localStorage.setItem('userEmail', data.email);
      }
    } catch (err) {
      // handled by apiFetch
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    setIsSavingPassword(true);

    try {
      await apiFetch('/users/password', {
        method: 'PUT',
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      // handled by apiFetch
    } finally {
      setIsSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <section className="section-band">
        <div className="shell max-w-2xl">
          <div className="flex h-64 items-center justify-center text-[var(--muted)]">
            Loading your settings...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-band">
      <div className="shell max-w-2xl">
        <div className="mb-8 flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-3xl bg-[var(--surface-2)] text-[var(--accent)]">
            <Shield size={28} aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
              Account
            </p>
            <h1 className="mt-2 text-3xl font-black text-[var(--text)]">Settings</h1>
          </div>
        </div>

        {/* Profile Section */}
        <form onSubmit={handleSaveProfile} className="surface rounded-3xl p-8 sm:p-10 mb-8">
          <div className="mb-6 flex items-center gap-3">
            <User size={20} className="text-[var(--accent)]" />
            <h2 className="text-xl font-bold text-[var(--text)]">Profile</h2>
          </div>

          {/* Avatar */}
          <div className="mb-8 flex flex-col items-center gap-4">
            <div
              className="relative h-28 w-28 cursor-pointer overflow-hidden rounded-full border-4 border-[var(--accent)] bg-[var(--surface-2)] transition hover:opacity-80"
              onClick={() => fileInputRef.current?.click()}
            >
              {previewPhoto ? (
                <img
                  src={previewPhoto}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-4xl font-black text-[var(--accent)]">
                  {name?.charAt(0)?.toUpperCase() || '?'}
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition hover:opacity-100">
                <Camera size={24} className="text-white" />
              </div>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-semibold text-[var(--accent)] hover:text-[var(--text)] transition"
            >
              Change photo (max 200KB)
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          {/* Name */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-[var(--muted)]" htmlFor="settings-name">
              Full name
            </label>
            <input
              id="settings-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-[var(--muted)]" htmlFor="settings-email">
              Email address
            </label>
            <input
              id="settings-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
            />
          </div>

          {/* Read-only info */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div>
              <span className="block text-xs font-semibold text-[var(--muted)]">Phone number</span>
              <span className="mt-1 block text-sm text-[var(--text)]">{contact || '—'}</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-[var(--muted)]">Member since</span>
              <span className="mt-1 block text-sm text-[var(--text)]">{memberSince || '—'}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSavingProfile}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-[var(--accent-2)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={16} />
            {isSavingProfile ? 'Saving…' : 'Save Profile'}
          </button>
        </form>

        {/* Password Section */}
        <form onSubmit={handleChangePassword} className="surface rounded-3xl p-8 sm:p-10">
          <div className="mb-6 flex items-center gap-3">
            <KeyRound size={20} className="text-[var(--accent)]" />
            <h2 className="text-xl font-bold text-[var(--text)]">Change Password</h2>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-[var(--muted)]" htmlFor="old-password">
              Current password
            </label>
            <input
              id="old-password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <div>
              <label className="block text-sm font-semibold text-[var(--muted)]" htmlFor="new-password">
                New password
              </label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--muted)]" htmlFor="confirm-password">
                Confirm new password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSavingPassword}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--surface-2)] border border-[var(--line)] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-[var(--text)] transition hover:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <KeyRound size={16} />
            {isSavingPassword ? 'Updating…' : 'Change Password'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Settings;
