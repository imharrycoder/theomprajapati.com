import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, UserCircle2 } from 'lucide-react';
import { apiFetch } from '../utils/api';
import { toast } from 'react-toastify';

function getDeviceInfo() {
  if (typeof navigator === 'undefined') return 'unknown device';
  const platform = navigator.platform || 'unknown platform';
  const agent = navigator.userAgent || 'unknown agent';
  return `${platform} · ${agent}`;
}

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [instaId, setInstaId] = useState('');
  const [city, setCity] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [profession, setProfession] = useState('student');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const endpoint = useMemo(() => (isRegistering ? '/users/register' : '/users/login'), [isRegistering]);
  const title = isRegistering ? 'Create an account' : 'Log in to your account';
  const primaryAction = isRegistering ? 'Register' : 'Login';
  const secondaryAction = isRegistering ? 'Already have an account?' : 'Need an account?';
  const secondaryActionLink = isRegistering ? 'Sign in' : 'Register';

  const sendOtp = async () => {
    if (!email && !contact) {
      toast.error('Please provide email or contact before requesting OTP.');
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await apiFetch('/auth/send-otp', {
        method: 'POST',
        body: JSON.stringify({ email, contact }),
      });
      setOtpSent(true);
      toast.info(`OTP sent. For local testing, use code: ${data.otp}`);
    } catch (err) {
      // error is already handled and displayed by apiFetch
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        email,
        password,
        name: isRegistering ? name : undefined,
        contact: isRegistering ? contact : undefined,
        instaId: isRegistering ? instaId : undefined,
        city: isRegistering ? city : undefined,
        state: isRegistering ? stateCode : undefined,
        profession: isRegistering ? profession : undefined,
        otp: isRegistering ? otp : undefined,
        location: typeof window !== 'undefined' ? window.location.href : undefined,
        device: getDeviceInfo(),
      };

      const data = await apiFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (data.token) {
        localStorage.setItem('userToken', data.token);
      }
      localStorage.setItem('userEmail', data.email);
      navigate('/');
    } catch (err) {
      // error is already handled and displayed by apiFetch
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-band">
      <div className="shell max-w-2xl">
        <div className="surface rounded-3xl p-8 sm:p-10">
          <div className="mb-8 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-3xl bg-[var(--surface-2)] text-[var(--accent)]">
              <UserCircle2 size={28} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">User access</p>
              <h1 className="mt-2 text-3xl font-black text-[var(--text)]">{title}</h1>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {isRegistering ? (
              <>
                <div>
                  <label className="block text-sm font-semibold text-[var(--muted)]" htmlFor="name">
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    placeholder="Your name"
                    className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--muted)]" htmlFor="contact">
                    Contact number
                  </label>
                  <input
                    id="contact"
                    type="tel"
                    value={contact}
                    onChange={(event) => setContact(event.target.value)}
                    required
                    placeholder="+91 98765 43210"
                    className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--muted)]" htmlFor="instaId">
                    Instagram handle (optional)
                  </label>
                  <input
                    id="instaId"
                    type="text"
                    value={instaId}
                    onChange={(event) => setInstaId(event.target.value)}
                    placeholder="@yourhandle"
                    className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--muted)]" htmlFor="city">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      required
                      placeholder="City"
                      className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--muted)]" htmlFor="state">
                      State
                    </label>
                    <input
                      id="state"
                      type="text"
                      value={stateCode}
                      onChange={(event) => setStateCode(event.target.value)}
                      required
                      placeholder="State"
                      className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--muted)]" htmlFor="profession">
                    Profession
                  </label>
                  <select
                    id="profession"
                    value={profession}
                    onChange={(event) => setProfession(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                  >
                    <option value="student">Student</option>
                    <option value="business owner">Business owner</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--muted)]" htmlFor="otp">
                      Verification code
                    </label>
                    <input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(event) => setOtp(event.target.value)}
                      required
                      placeholder="Enter OTP"
                      className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={isSubmitting}
                    className="mt-6 rounded-2xl bg-[var(--surface-2)] px-4 py-3 text-sm font-bold text-[var(--text)] transition hover:bg-[var(--surface)] disabled:opacity-60"
                  >
                    {isSubmitting ? 'Sending…' : 'Send OTP'}
                  </button>
                </div>
              </>
            ) : null}

            <div>
              <label className="block text-sm font-semibold text-[var(--muted)]" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--muted)]" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                placeholder="••••••••"
                className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-[var(--accent)] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-[var(--accent-2)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Working…' : primaryAction}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm text-[var(--muted)]">
            <div className="flex items-center gap-2">
              <Lock size={16} aria-hidden="true" />
              <span>Your device details are stored securely with the account.</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
              }}
              className="font-bold text-[var(--accent)] hover:text-[var(--text)]"
            >
              {secondaryActionLink}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
