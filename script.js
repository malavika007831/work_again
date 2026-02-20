// ============ FIREBASE INITIALIZATION ============
// TODO: Replace with your Firebase configuration from Firebase Console
  const firebaseConfig = {
    apiKey: "AIzaSyA0-SeoBXCHwoJjKakfhioVRlEQbDmxHUQ",
    authDomain: "workagain-92e00.firebaseapp.com",
    projectId: "workagain-92e00",
    storageBucket: "workagain-92e00.firebasestorage.app",
    messagingSenderId: "757847600465",
    appId: "1:757847600465:web:ed0e13c9cce08fc6357770",
    measurementId: "G-F766W927J1"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ============ AUTH STATE MANAGEMENT ============
auth.onAuthStateChanged((user) => {
    const authActions = document.getElementById('auth-actions');
    const userSection = document.getElementById('user-section');
    const userEmail = document.getElementById('userEmail');

    if (user) {
        if (authActions) authActions.style.display = 'none';
        if (userSection) userSection.style.display = 'flex';
        if (userEmail) userEmail.textContent = user.email;
    } else {
        if (authActions) authActions.style.display = 'flex';
        if (userSection) userSection.style.display = 'none';
    }
});

// ============ AUTH FUNCTIONS ============
function handleLogout() {
    auth.signOut().then(() => {
        alert('Logged out successfully!');
        closeAuthModal();
    }).catch(error => {
        alert('Error logging out: ' + error.message);
    });
}

function openAuthModal() {
    document.getElementById('authModal').style.display = 'flex';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

// ============ AUTH MODAL SETUP ============
const authModal = document.getElementById('authModal');
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const closeModalBtn = document.getElementById('closeAuthModal');
const navLoginBtn = document.getElementById('navLoginBtn');

if (navLoginBtn) navLoginBtn.addEventListener('click', openAuthModal);
if (closeModalBtn) closeModalBtn.addEventListener('click', closeAuthModal);

if (loginTab && signupTab && loginForm && signupForm) {
    loginTab.addEventListener('click', () => {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
    });

    signupTab.addEventListener('click', () => {
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
    });
}

// Close modal when clicking outside
if (authModal) {
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            closeAuthModal();
        }
    });
}

// ============ LOGIN HANDLER ============
const loginFormElement = document.getElementById('loginFormElement');
if (loginFormElement) {
    loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Login successful!');
            closeAuthModal();
            document.getElementById('loginFormElement').reset();
            errorDiv.textContent = '';
        })
        .catch((error) => {
            errorDiv.textContent = error.message;
        });
    });
}

// ============ SIGNUP HANDLER ============
const signupFormElement = document.getElementById('signupFormElement');
if (signupFormElement) {
    signupFormElement.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirm').value;
        const errorDiv = document.getElementById('signupError');

        if (password !== confirmPassword) {
            if (errorDiv) errorDiv.textContent = 'Passwords do not match';
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Update user profile with name
                return userCredential.user.updateProfile({
                    displayName: name
                });
            })
            .then(() => {
                alert('Account created successfully!');
                closeAuthModal();
                signupFormElement.reset();
                if (errorDiv) errorDiv.textContent = '';
                if (loginTab) loginTab.click(); // Switch to login tab
            })
            .catch((error) => {
                if (errorDiv) errorDiv.textContent = error.message;
            });
    });
}

// Feature preview: inject content into hero area (no full page navigation)
const featuresContent = {
    mentor: {
        title: '🎓 Mentor Support',
        text: 'One-on-one mentors to guide your re-entry and confidence building.',
        details: '<ul><li>Personal mentor matching</li><li>Mock interviews & CV review</li><li>Monthly check-ins</li></ul>',
        cta: { text: 'Find a Mentor', href: 'pages/mentor.html' }
    },
    skills: {
        title: '📚 Skill Development',
        text: 'Curated learning paths and micro-projects to rebuild skills.',
        details: '<ul><li>Short projects</li><li>Curated courses</li><li>Progress tracking & badges</li></ul>',
        cta: { text: 'Browse Courses', href: 'pages/skills.html' }
    },
    jobs: {
        title: '💼 Job Advertisements',
        text: 'Return-friendly roles and company-backed opportunities.',
        details: '<ul><li>Filter by return-friendly</li><li>Company trial projects</li><li>Flexible hours</li></ul>',
        cta: { text: 'View Jobs', href: 'pages/jobs.html' }
    },
    translator: {
        title: '🔄 Career Break Translator',
        text: 'AI-powered reframing of career breaks into transferable strengths.',
        details: '<p>Example: Caregiving → Time management, crisis handling, budgeting.</p>',
        cta: { text: 'Try Translator', href: 'pages/translator.html' }
    },
    predictor: {
        title: '🔮 Industry Shift Predictor',
        text: 'AI suggests adjacent industries and transition difficulty.',
        details: '<ul><li>Adjacent industry suggestions</li><li>Salary comparison</li><li>Transition roadmap</li></ul>',
        cta: { text: 'Get Predictions', href: 'pages/predictor.html' }
    },
    analytics: {
        title: '📊 Career Analytics',
        text: 'Data-driven insights: re-entry times, market trends, salary impact.',
        details: '<ul><li>Average re-entry time</li><li>Market hiring trends</li><li>Gender gap stats</li></ul>',
        cta: { text: 'View Analytics', href: 'pages/analytics.html' }
    },
    marketplace: {
        title: '🏆 Returnship Marketplace',
        text: 'Companies offering trial projects and flexible internships for returners.',
        details: '<ul><li>Trial projects</li><li>Paid returnships</li><li>Mentor-backed programs</li></ul>',
        cta: { text: 'Browse Programs', href: 'pages/marketplace.html' }
    },
    community: {
        title: '💬 Anonymous Community',
        text: 'Safe community for sharing, mentorship matching and emotional support.',
        details: '<ul><li>Discussion threads</li><li>Support groups</li><li>Success stories</li></ul>',
        cta: { text: 'Join Community', href: 'pages/community.html' }
    }
};

function showFeature(key) {
    const f = featuresContent[key];
    if (!f) return;
    const titleEl = document.getElementById('heroTitle');
    const textEl = document.getElementById('heroText');
    const detailsEl = document.getElementById('heroDetails');
    const ctaBtn = document.getElementById('heroCTA');

    if (titleEl) titleEl.innerHTML = f.title;
    if (textEl) textEl.textContent = f.text;
    if (detailsEl) detailsEl.innerHTML = f.details || '';
    if (ctaBtn) {
        ctaBtn.textContent = f.cta.text || 'Learn More';
        ctaBtn.onclick = () => { if (f.cta.href) window.location.href = f.cta.href; };
    }
}

document.querySelectorAll('.feature-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const page = this.getAttribute('data-page');
        if (page) showFeature(page);
    });
});

// CAREER BREAK TRANSLATOR (Mock Logic)
const form = document.getElementById("translatorForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const input = document.getElementById("breakInput").value;
        const result = document.getElementById("translatorResult");

        result.style.display = "block";

        result.innerHTML = `
            <h3>Translated Career Strengths</h3>
            <ul>
                <li><strong>Transferable Skills:</strong> Time management, organization, multitasking</li>
                <li><strong>Leadership Qualities:</strong> Decision-making, responsibility handling</li>
                <li><strong>Project Management:</strong> Planning, prioritization, execution</li>
                <li><strong>Emotional Intelligence:</strong> Stress handling, empathy, communication</li>
            </ul>
            <p>
                Your career break demonstrates valuable professional strengths that employers value.
            </p>
        `;
    });
}