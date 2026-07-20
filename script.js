// --- DATA MANAGEMENT CORE ENGINE ---
const SaveSphereDB = {
    shoppingList: [
        { name: "Organic Bananas (1kg)", price: 3.20 },
        { name: "Free Range Chicken Breast (1kg)", price: 9.50 },
        { name: "Full Cream Milk (2L)", price: 2.18 },
        { name: "Wholemeal White Bread (700g)", price: 1.60 },
        { name: "Large Eggs (12 pack)", price: 4.80 }
    ],
    itemsStock: ["Organic Bananas (1kg)", "Free Range Chicken Breast (1kg)", "Full Cream Milk (2L)", "Wholemeal White Bread (700g)", "Large Eggs (12 pack)", "Greek Yogurt 1kg", "Avocado Hass Basket"],
    transactions: [
        { entity: "Woolworths Metro", amount: "-$54.20", date: "Jul 18", category: "Groceries" },
        { entity: "Pizza Palace Dine", amount: "-$33.50", date: "Jul 16", category: "Dining Out" },
        { entity: "Coles Supermarket", amount: "-$39.75", date: "Jul 15", category: "Groceries" }
    ],
    reviews: [
        { title: "Pizza Palace Venue Discount", rating: "⭐⭐⭐⭐⭐ 5.0", text: "Great family size pizzas and stellar price reduction matching using our dashboard coupon tier structure.", source: "Dine Out Log" },
        { title: "SaveSphere Automated Generator", rating: "⭐⭐⭐⭐ 4.0", text: "Generating grocery matrix checklists instantly from the meal calendar saved me almost $45 this layout pass.", source: "User Verification Platform" }
    ],
    meals: {
        Mon: ["Oatmeal & Berries", "Chicken Salad Wrap", "Grilled Salmon & Asparagus"],
        Tue: ["Greek Yogurt Mix", "Tuna Avocado Boat", "Beef Stir Fry Array"],
        Wed: ["Sourdough Toast Pack", "Quinoa Veggie Mix", "Pan-Seared Steak Crust"],
        Thu: ["Protein Berry Smoothie", "Turkey Toast Slice", "Garlic Prawn Skewers"],
        Fri: ["Soft Boiled Eggs", "Classic Caesar Toss", "Hearty Minestrone Bowl"],
        Sat: ["Buttermilk Hotcakes", "Spicy Chicken Bowl", "Cripsy Snapper Fish Tacos"],
        Sun: ["Poached Egg Hash", "Creamy Basil Pesto", "Slow Cooked Lamb Roast"]
    }
};

// --- CORE NAVIGATION UTILITIES ---
function navigateTo(viewId) {
    // Switch Active View Card Elements
    document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));
    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) targetView.classList.add('active');

    // Sync Sidebar Active Button State Indicators
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-nav-${viewId}`);
    if (activeBtn) activeBtn.classList.add('active');
}

// --- RENDERING SUBSYSTEM COMPONENTS ---
function renderShoppingList() {
    const mount = document.getElementById('shopping-list-mount');
    let totalCost = 0;
    
    if (SaveSphereDB.shoppingList.length === 0) {
        mount.innerHTML = `<p class="text-muted" style="text-align:center; padding: 2rem 0;">Your shopping list is empty.</p>`;
        document.getElementById('grocery-total-cost').innerText = "$0.00";
        return;
    }

    mount.innerHTML = SaveSphereDB.shoppingList.map((item, index) => {
        totalCost += item.price;
        return `
            <div class="item-entry">
                <span>${item.name}</span>
                <div>
                    <span style="color:var(--text-muted); margin-right:12px;">$${item.price.toFixed(2)}</span>
                    <button class="del-node" data-index="${index}">×</button>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('grocery-total-cost').innerText = `$${totalCost.toFixed(2)}`;

    // Attach deletion logic click sequences instantly to fresh rendering runs
    mount.querySelectorAll('.del-node').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-index'));
            SaveSphereDB.shoppingList.splice(idx, 1);
            renderShoppingList();
            showToast("Item removed from list");
        });
    });
}

function renderPriceMatrix() {
    const mount = document.getElementById('price-matrix-mount');
    mount.innerHTML = SaveSphereDB.itemsStock.map(item => {
        let base = 4.50;
        let pColes = base + (item.length % 3) * 1.2;
        let pWoolies = pColes * 0.95;
        let pAldi = pColes * 0.82;
        let pIga = pColes * 1.15;
        return `
            <tr>
                <td style="font-weight:700;">${item}</td>
                <td>$${pColes.toFixed(2)}</td>
                <td>$${pWoolies.toFixed(2)}</td>
                <td class="best-cell">$${pAldi.toFixed(2)} ★</td>
                <td>$${pIga.toFixed(2)}</td>
            </tr>
        `;
    }).join('');
}

function renderMealPlanner() {
    const mount = document.getElementById('calendar-days-mount');
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let totalMeals = 0;
    
    mount.innerHTML = days.map(day => {
        const slots = SaveSphereDB.meals[day] || [];
        totalMeals += slots.length;
        return `
            <div class="day-column-box">
                <h4>${day}</h4>
                ${slots.map(meal => `
                    <div class="meal-slot">${meal}<span class="kcal-badge">🔥 340 kcal</span></div>
                `).join('')}
            </div>
        `;
    }).join('');

    document.getElementById('planner-meals-count').innerText = `${totalMeals} meals`;
    document.getElementById('dash-meals-count').innerText = totalMeals;
    document.getElementById('prof-stat-meals').innerText = totalMeals;
}

function renderTransactions() {
    const mount = document.getElementById('transaction-mount');
    mount.innerHTML = SaveSphereDB.transactions.map(t => `
        <li class="transaction-item">
            <div><span>${t.entity}</span><p>${t.date} • ${t.category}</p></div>
            <strong style="font-variant-numeric: tabular-nums;">${t.amount}</strong>
        </li>
    `).join('');
    document.getElementById('prof-stat-ledger').innerText = SaveSphereDB.transactions.length;
}

function renderReviewsDeck() {
    const mount = document.getElementById('reviews-deck-mount');
    mount.innerHTML = SaveSphereDB.reviews.map(r => `
        <div class="review-node-card">
            <div class="review-top-meta"><h4>${r.title}</h4><span class="stars-badge">${r.rating}</span></div>
            <p>"${r.text}"</p>
            <span class="review-source-tag">Verified Flow Pipeline • ${r.source}</span>
        </div>
    `).join('');
}

function showToast(msg) {
    const wrapper = document.getElementById('toast-wrapper');
    wrapper.innerText = msg;
    wrapper.classList.add('show');
    setTimeout(() => wrapper.classList.remove('show'), 3000);
}

// --- EVENT ROUTING & DOM EVENT REGISTER HOOKS ---
document.addEventListener("DOMContentLoaded", () => {
    
    // Initialize Platform Layout Framework Views
    renderShoppingList();
    renderPriceMatrix();
    renderMealPlanner();
    renderTransactions();
    renderReviewsDeck();

    // 1. SIDEBAR ROUTING HANDLERS
    const navMapping = ['dashboard', 'groceries', 'dining', 'planner', 'tracker', 'reviews', 'profile', 'settings'];
    navMapping.forEach(view => {
        document.getElementById(`btn-nav-${view}`).addEventListener('click', () => navigateTo(view));
    });

    // 2. ENTRY GATE SECURITY AUTHORIZATION TRIGGERS
    document.getElementById('to-register-view').addEventListener('click', () => {
        document.getElementById('auth-card-login').classList.add('hidden');
        document.getElementById('auth-card-register').classList.remove('hidden');
    });

    document.getElementById('to-login-view').addEventListener('click', () => {
        document.getElementById('auth-card-register').classList.add('hidden');
        document.getElementById('auth-card-login').classList.remove('hidden');
    });

    // Handle standard user credentials form dispatch sequences
    document.getElementById('form-login').addEventListener('submit', (e) => {
        e.preventDefault();
        const userEmail = document.getElementById('login-email').value;
        
        document.getElementById('dashboard-welcome-banner').innerText = "Welcome back, Emma! 👋";
        document.getElementById('prof-name').innerText = "Emma Johnson";
        document.getElementById('prof-email').innerText = userEmail;
        document.getElementById('global-header-avatar').src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80";
        document.getElementById('profile-main-avatar').src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80";
        document.getElementById('prof-badge-family').innerText = "3 members";
        document.getElementById('prof-badge-cards').innerText = "2 cards saved";
        
        document.getElementById('auth-gate-canvas').classList.remove('active');
        document.getElementById('app-workspace-shell').classList.remove('app-locked');
        showToast("Access token authenticated successfully.");
        navigateTo('dashboard');
    });

    // Handle new account registration dispatches
    document.getElementById('form-register').addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = document.getElementById('reg-name').value;
        const newEmail = document.getElementById('reg-email').value;
        
        document.getElementById('dashboard-welcome-banner').innerText = `Welcome to SaveSphere, ${newName}! 🎉`;
        document.getElementById('prof-name').innerText = newName;
        document.getElementById('prof-email').innerText = newEmail;
        document.getElementById('global-header-avatar').src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80";
        document.getElementById('profile-main-avatar').src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";
        document.getElementById('prof-badge-family').innerText = "0 members";
        document.getElementById('prof-badge-cards').innerText = "No cards linked";

        document.getElementById('auth-gate-canvas').classList.remove('active');
        document.getElementById('app-workspace-shell').classList.remove('app-locked');
        showToast("Account created successfully!");
        navigateTo('dashboard');
    });

    // Guest Account entry bypass mechanism
    document.getElementById('btn-guest-login').addEventListener('click', () => {
        document.getElementById('dashboard-welcome-banner').innerText = "Welcome Explorer (Guest Mode) 🕶️";
        document.getElementById('prof-name').innerText = "Anonymous Explorer Mode";
        document.getElementById('prof-email').innerText = "guest@savesphere.local";
        document.getElementById('global-header-avatar').src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80";
        document.getElementById('profile-main-avatar').src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";
        document.getElementById('prof-badge-family').innerText = "0 members";
        document.getElementById('prof-badge-cards').innerText = "No cards linked";

        document.getElementById('auth-gate-canvas').classList.remove('active');
        document.getElementById('app-workspace-shell').classList.remove('app-locked');
        showToast("Bypassed layout gate to guest shell.");
        navigateTo('dashboard');
    });

    // OAuth simulated endpoints
    document.getElementById('btn-oauth-google').addEventListener('click', () => showToast("Google authentication endpoint loaded."));
    document.getElementById('btn-oauth-apple').addEventListener('click', () => showToast("Apple secure account handshake loaded."));
    document.getElementById('btn-forgot-pass').addEventListener('click', () => showToast("Password reset link dispatched to input address."));

    // Secure workspace log-out sequence
    document.getElementById('btn-logout').addEventListener('click', () => {
        document.getElementById('app-workspace-shell').classList.add('app-locked');
        document.getElementById('auth-gate-canvas').classList.add('active');
        showToast("Session discarded. Workspace re-locked.");
    });

    // 3. HEADER PLATFORM INTERFACE INTERACTION KEYS
    document.getElementById('btn-bell').addEventListener('click', () => showToast("No new savings notifications right now. Everything is optimized!"));
    document.getElementById('btn-header-profile').addEventListener('click', () => navigateTo('profile'));
    
    // Global fuzzy matching layout logic
    document.getElementById('global-search').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            showToast(`Searching across systems for query parameters: "${this.value}"`);
            this.value = '';
        }
    });

    // 4. QUICK ACTIONS & DASHBOARD ACTION DISPATCH LINKS
    document.getElementById('qa-shopping-list').addEventListener('click', () => navigateTo('groceries'));
    document.getElementById('qa-meal-planner').addEventListener('click', () => navigateTo('planner'));
    document.getElementById('qa-budget-tracker').addEventListener('click', () => navigateTo('tracker'));
    document.getElementById('qa-local-gems').addEventListener('click', () => navigateTo('dining'));
    document.getElementById('btn-dash-see-all-deals').addEventListener('click', () => navigateTo('dining'));

    document.querySelectorAll('.deal-trigger-btn').forEach(card => {
        card.addEventListener('click', function() {
            const store = this.getAttribute('data-store');
            showToast(`Copied exclusive target coupon deal code from ${store} straight to checking tray!`);
        });
    });

    // 5. GROCERY MATRIX USER DISPATCH FORM
    document.getElementById('form-add-grocery-item').addEventListener('submit', (e) => {
        e.preventDefault();
        const targetNode = document.getElementById('list-input-node');
        const itemName = targetNode.value.trim();
        
        if (itemName) {
            const simulatedCost = parseFloat((Math.random() * 8 + 1.25).toFixed(2));
            SaveSphereDB.shoppingList.push({ name: itemName, price: simulatedCost });
            renderShoppingList();
            showToast(`Added: ${itemName} to checklist`);
            targetNode.value = '';
        }
    });

    // Chip active toggle matrix selector loops
    document.getElementById('store-filter-container').querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', function() {
            document.getElementById('store-filter-container').querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            showToast(`Filtered comparison lists for target store: [${this.innerText.toUpperCase()}]`);
        });
    });

    // 6. DINING TARGET TILES EVENT CLICKS
    document.querySelectorAll('.dynamic-deal-card').forEach(card => {
        card.addEventListener('click', function() {
            showToast(`Activated voucher mapping array validation check for venue: "${this.getAttribute('data-restaurant')}"`);
        });
    });

    document.querySelectorAll('.gem-action-trigger').forEach(card => {
        card.addEventListener('click', function() {
            showToast(`Loading community directions and menu index options for local treasure: "${this.getAttribute('data-gem')}"`);
        });
    });

    // 7. MEAL PLANNER DISPATCH ACTION CHAINS
    document.getElementById('btn-add-meal-prompt').addEventListener('click', () => {
        const mealTitle = prompt("Enter meal recipe details to drop into tracking array:");
        if (mealTitle) {
            const targetDay = prompt("Which day element? (Mon, Tue, Wed, Thu, Fri, Sat, Sun):", "Mon");
            if (SaveSphereDB.meals[targetDay]) {
                SaveSphereDB.meals[targetDay].push(mealTitle);
                renderMealPlanner();
                showToast(`Appended: ${mealTitle} straight to ${targetDay} schedule matrix`);
            } else {
                alert("Invalid Day selection index parameter error.");
            }
        }
    });

    document.getElementById('btn-auto-generate-list').addEventListener('click', () => {
        SaveSphereDB.shoppingList.push(
            { name: "Fresh Salmon Steaks", price: 14.20 },
            { name: "Avocado Basket", price: 6.00 },
            { name: "Stir Fry Vegetable Packs", price: 4.50 }
        );
        renderShoppingList();
        showToast("Appended items directly from active calendar recipes grid!");
        navigateTo('groceries');
    });

    // 8. BUDGET LEDGER SYSTEM CLEAR DISPATCH KEY
    document.getElementById('btn-reset-tracker').addEventListener('click', () => {
        SaveSphereDB.transactions = [];
        renderTransactions();
        document.getElementById('tracker-spend-val').innerText = "$0.00";
        document.getElementById('tracker-budget-text').innerText = "of $500 budget used (Cleared Ledger)";
        document.getElementById('tracker-progress-bar').style.width = "0%";
        showToast("Cleared transaction history logs.");
    });

    // 9. REVIEWS WRITE TRIGGER PANEL DROPDOWNS
    document.getElementById('btn-write-review').addEventListener('click', () => {
        document.getElementById('review-form-block').classList.toggle('hidden');
    });

    document.getElementById('form-submit-review').addEventListener('submit', (e) => {
        e.preventDefault();
        const t = document.getElementById('rev-input-title').value;
        const r = document.getElementById('rev-input-rating').value;
        const txt = document.getElementById('rev-input-text').value;

        SaveSphereDB.reviews.unshift({ title: t, rating: r, text: txt, source: "Direct Input" });
        renderReviewsDeck();
        
        // Reset and tuck back away smoothly
        document.getElementById('form-submit-review').reset();
        document.getElementById('review-form-block').classList.add('hidden');
        showToast("Review dispatched to workspace grid display logs.");
    });

    // 10. PROFILE DEEP PANEL SIMULATIONS
    document.getElementById('btn-profile-edit').addEventListener('click', () => showToast("Modifying demographic configurations locked during active session loops."));
    document.querySelectorAll('.prof-action-item').forEach(item => {
        item.addEventListener('click', function() {
            showToast(`Opening sub-profile window settings directory for action: [${this.getAttribute('data-action').toUpperCase()}]`);
        });
    });

    // 11. GLOBAL SETTINGS PARAMETER MANIPULATION HOOKS
    document.getElementById('set-currency').addEventListener('change', function() {
        showToast(`Base active ledger tracking array value transformed directly to currency node: ${this.value}`);
    });

    document.getElementById('set-store').addEventListener('change', function() {
        showToast(`Preferred target indexing priority matching configured to lookups targeting: ${this.value.toUpperCase()}`);
    });

    document.getElementById('toggle-stock').addEventListener('change', function() {
        showToast(`Out of stock search visibility parameter set directly to boolean status: ${this.checked}`);
    });

    // High Contrast Theme Switch variable logic updates
    document.getElementById('dark-theme-toggle').addEventListener('change', function() {
        if(this.checked) {
            document.documentElement.style.setProperty('--bg-workspace', '#0f172a');
            document.documentElement.style.setProperty('--bg-card', '#1e293b');
            document.documentElement.style.setProperty('--text-main', '#f8fafc');
            document.documentElement.style.setProperty('--border', '#334155');
            showToast("Dark mode parameters active.");
        } else {
            document.documentElement.style.setProperty('--bg-workspace', '#f4f6f8');
            document.documentElement.style.setProperty('--bg-card', '#ffffff');
            document.documentElement.style.setProperty('--text-main', '#1e293b');
            document.documentElement.style.setProperty('--border', '#e2e8f0');
            showToast("Light mode design active.");
        }
    });
});
