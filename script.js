// --- CENTRAL ENVIRONMENT REGISTRY DATA POOL ---
const SaveSphereDB = {
    shoppingList: [
        { name: "Organic Bananas (1kg)", price: 3.20, category: "Produce" },
        { name: "Free Range Chicken Breast (1kg)", price: 9.50, category: "Meat" },
        { name: "Full Cream Milk (2L)", price: 2.18, category: "Dairy" },
        { name: "Wholemeal White Bread (700g)", price: 1.60, category: "Bakery" },
        { name: "Large Eggs (12 pack)", price: 4.80, category: "Dairy" }
    ],
    itemsStock: ["Organic Bananas (1kg)", "Free Range Chicken Breast (1kg)", "Full Cream Milk (2L)", "Wholemeal White Bread (700g)", "Large Eggs (12 pack)", "Greek Yogurt 1kg", "Avocado Hass Basket"],
    restaurants: [
        { name: "Pizza Palace", type: "Italian", dist: "0.8 km", rating: "4.6", discount: "20% off orders over $25", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80" },
        { name: "Sushi Hub", type: "Japanese", dist: "1.2 km", rating: "4.7", discount: "15% off all sushi rolls", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80" },
        { name: "Burger Town", type: "Burgers", dist: "1.5 km", rating: "4.3", discount: "$5 off orders over $20", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80" },
        { name: "Thai Delight", type: "Asian", dist: "1.7 km", rating: "4.5", discount: "10% off all dine-in arrays", image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=400&q=80" }
    ],
    transactions: [
        { entity: "Woolworths Metro", amount: "-$54.20", date: "Jul 18", category: "Groceries" },
        { entity: "Pizza Palace Dine", amount: "-$33.50", date: "Jul 16", category: "Dining Out" },
        { entity: "Coles Supermarket", amount: "-$39.75", date: "Jul 15", category: "Groceries" }
    ],
    reviews: [
        { title: "Pizza Palace Venue Discount", rating: "⭐⭐⭐⭐⭐ 5.0", text: "Great family size pizzas and stellar price reduction matching using our dashboard coupon tier structure.", source: "Dine Out Log" },
        { title: "SaveSphere Automated Generator", rating: "⭐⭐⭐⭐ 4.0", text: "Generating grocery matrix checklists instantly from the meal calendar saved me almost $45 this layout pass.", source: "User Verification Platform" }
    ],
    notifications: [
        { id: 1, title: "Price Drop Alert", body: "Organic Bananas dropped 12% at ALDI.", time: "10m ago", unread: true },
        { id: 2, title: "Voucher Confirmed", body: "Pizza Palace coupon successfully generated.", time: "2h ago", unread: true },
        { id: 3, title: "Budget Balance Warning", body: "You have reached 64% of your monthly safety threshold.", time: "1d ago", unread: false }
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
    document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));
    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) targetView.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-nav-${viewId}`);
    if (activeBtn) activeBtn.classList.add('active');
}

// --- GLOBAL FUZZY RUNTIME ENGINE SEARCH (REWORKED MULTI-VIEW FILTER) ---
function executeGlobalSearch(query) {
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) {
        renderPriceMatrix();
        renderDiningCards();
        document.getElementById('search-count-badge').innerText = "Clear View";
        return;
    }

    // 1. Filter Grocery Inventory Matrix array references
    const matchedStock = SaveSphereDB.itemsStock.filter(item => item.toLowerCase().includes(cleanQuery));
    const matrixMount = document.getElementById('price-matrix-mount');
    
    if (matchedStock.length === 0) {
        matrixMount.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:2rem;">No matching stock inventory records found.</td></tr>`;
    } else {
        matrixMount.innerHTML = matchedStock.map(item => {
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

    // 2. Filter Dining Cards array targets
    const matchedDining = SaveSphereDB.restaurants.filter(r => 
        r.name.toLowerCase().includes(cleanQuery) || r.type.toLowerCase().includes(cleanQuery)
    );
    const diningMount = document.getElementById('dining-deals-card-mount');
    
    if (matchedDining.length === 0) {
        diningMount.innerHTML = `<p class="text-muted" style="grid-column: span 4; text-align:center; padding:3rem 0;">No restaurant channels matched query parameters.</p>`;
    } else {
        diningMount.innerHTML = matchedDining.map(r => `
            <div class="restaurant-card dynamic-deal-card" data-restaurant="${r.name}">
                <div class="img-frame" style="background-image: url('${r.image}')"></div>
                <div class="rest-details">
                    <h4>${r.name}</h4>
                    <p>${r.type} • ${r.dist} • ⭐ ${r.rating}</p>
                    <span class="badge green">${r.discount}</span>
                </div>
            </div>
        `).join('');
    }

    // Provide contextual navigation update flags
    const matchCount = matchedStock.length + matchedDining.length;
    document.getElementById('search-count-badge').innerText = `${matchCount} Dynamic Matches`;
    showToast(`Filtered database registers: Found ${matchCount} matches`);
}

// --- RENDERING REGISTER SYSTEM SUB-UNITS ---
function renderShoppingList() {
    const mount = document.getElementById('shopping-list-mount');
    let totalCost = 0;
    
    if (SaveSphereDB.shoppingList.length === 0) {
        mount.innerHTML = `<p class="text-muted" style="text-align:center; padding: 3rem 0;">Your active catalog list remains blank.</p>`;
        document.getElementById('grocery-total-cost').innerText = "$0.00";
        return;
    }

    mount.innerHTML = SaveSphereDB.shoppingList.map((item, index) => {
        totalCost += item.price;
        return `
            <div class="item-entry">
                <span>${item.name}</span>
                <div>
                    <span style="color:var(--text-muted); margin-right:16px;">$${item.price.toFixed(2)}</span>
                    <button class="del-node" data-index="${index}">×</button>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('grocery-total-cost').innerText = `$${totalCost.toFixed(2)}`;

    mount.querySelectorAll('.del-node').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-index'));
            SaveSphereDB.shoppingList.splice(idx, 1);
            renderShoppingList();
            showToast("Asset stripped from dynamic total compilation array.");
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

function renderDiningCards() {
    const mount = document.getElementById('dining-deals-card-mount');
    mount.innerHTML = SaveSphereDB.restaurants.map(r => `
        <div class="restaurant-card dynamic-deal-card" data-restaurant="${r.name}">
            <div class="img-frame" style="background-image: url('${r.image}')"></div>
            <div class="rest-details">
                <h4>${r.name}</h4>
                <p>${r.type} • ${r.dist} • ⭐ ${r.rating}</p>
                <span class="badge green">${r.discount}</span>
            </div>
        </div>
    `).join('');

    mount.querySelectorAll('.dynamic-deal-card').forEach(card => {
        card.addEventListener('click', function() {
            showToast(`Redeemed coupon key structure for: "${this.getAttribute('data-restaurant')}"`);
        });
    });
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
                    <div class="meal-slot">${meal}<span class="kcal-badge">🔥 340 kcal logged</span></div>
                `).join('')}
            </div>
        `;
    }).join('');

    document.getElementById('planner-meals-count').innerText = `${totalMeals} planned dishes`;
    document.getElementById('dash-meals-count').innerText = totalMeals;
    document.getElementById('prof-stat-meals').innerText = totalMeals;
}

function renderTransactions() {
    const mount = document.getElementById('transaction-mount');
    mount.innerHTML = SaveSphereDB.transactions.map(t => `
        <li class="transaction-item">
            <div><span>${t.entity}</span><p style="font-size:0.8rem; color:var(--text-muted);">${t.date} • Verification Channel [${t.category}]</p></div>
            <strong style="font-variant-numeric: tabular-nums; color: var(--accent-red);">${t.amount}</strong>
        </li>
    `).join('');
    document.getElementById('prof-stat-ledger').innerText = `${SaveSphereDB.transactions.length} Active`;
}

function renderReviewsDeck() {
    const mount = document.getElementById('reviews-deck-mount');
    mount.innerHTML = SaveSphereDB.reviews.map(r => `
        <div class="review-node-card">
            <div class="review-top-meta"><h4>${r.title}</h4><span class="badge orange">${r.rating}</span></div>
            <p>"${r.text}"</p>
            <span class="review-source-tag">Verified Log Pathway • ${r.source}</span>
        </div>
    `).join('');
    document.getElementById('review-total-count-label').innerText = `${SaveSphereDB.reviews.length} Logs`;
}

function renderNotificationTray() {
    const mount = document.getElementById('noti-list-mount');
    const unreadCount = SaveSphereDB.notifications.filter(n => n.unread).length;
    
    const counterBadge = document.getElementById('noti-counter-badge');
    if (unreadCount === 0) {
        counterBadge.classList.add('hidden');
    } else {
        counterBadge.classList.remove('hidden');
        counterBadge.innerText = unreadCount;
    }

    if (SaveSphereDB.notifications.length === 0) {
        mount.innerHTML = `<p class="text-muted" style="text-align:center; padding:2rem 0; font-size:0.85rem;">No notifications recorded.</p>`;
        return;
    }

    mount.innerHTML = SaveSphereDB.notifications.map(n => `
        <div class="noti-item ${n.unread ? 'unread' : ''}" data-id="${n.id}">
            <h5>${n.title}</h5>
            <p>${n.body}</p>
            <span class="time-stamp">${n.time}</span>
        </div>
    `).join('');

    mount.querySelectorAll('.noti-item').forEach(item => {
        item.addEventListener('click', function() {
            const targetedId = parseInt(this.getAttribute('data-id'));
            const match = SaveSphereDB.notifications.find(n => n.id === targetedId);
            if (match && match.unread) {
                match.unread = false;
                renderNotificationTray();
                showToast(`Marked alert "${match.title}" checked.`);
            }
        });
    });
}

function showToast(msg) {
    const wrapper = document.getElementById('toast-wrapper');
    wrapper.innerText = msg;
    wrapper.classList.add('show');
    setTimeout(() => wrapper.classList.remove('show'), 3000);
}

// --- SYSTEM BINDINGS & CONTEXT TRIGGER HOOKS ---
document.addEventListener("DOMContentLoaded", () => {
    
    // Core Layout Boot Pipeline Initialization
    renderShoppingList();
    renderPriceMatrix();
    renderDiningCards();
    renderMealPlanner();
    renderTransactions();
    renderReviewsDeck();
    renderNotificationTray();

    // 1. GLOBAL INSTANT INTERACTIVE TOP BAR CONTROLS
    document.getElementById('global-search').addEventListener('input', function() {
        executeGlobalSearch(this.value);
    });

    document.getElementById('btn-bell').addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('noti-dropdown-tray').classList.toggle('hidden');
    });

    document.getElementById('btn-clear-notifications').addEventListener('click', (e) => {
        e.stopPropagation();
        SaveSphereDB.notifications = [];
        renderNotificationTray();
        showToast("Notification dynamic storage vectors cleared completely.");
    });

    document.addEventListener('click', () => {
        document.getElementById('noti-dropdown-tray').classList.add('hidden');
    });

    // 2. SIDEBAR RUNTIME ENVIRONMENT SWITCH CHANNELS
    const navMapping = ['dashboard', 'groceries', 'dining', 'planner', 'tracker', 'reviews', 'profile', 'settings'];
    navMapping.forEach(view => {
        document.getElementById(`btn-nav-${view}`).addEventListener('click', () => navigateTo(view));
    });

    // 3. SECURE AUTH PATHWAY LOGIC INTERFACES
    document.getElementById('to-register-view').addEventListener('click', () => {
        document.getElementById('auth-card-login').classList.add('hidden');
        document.getElementById('auth-card-register').classList.remove('hidden');
    });

    document.getElementById('to-login-view').addEventListener('click', () => {
        document.getElementById('auth-card-register').classList.add('hidden');
        document.getElementById('auth-card-login').classList.remove('hidden');
    });

    document.getElementById('form-login').addEventListener('submit', (e) => {
        e.preventDefault();
        const userEmail = document.getElementById('login-email').value;
        document.getElementById('dashboard-welcome-banner').innerText = "Welcome back, Emma! 👋";
        document.getElementById('prof-name').innerText = "Emma Johnson";
        document.getElementById('prof-email').innerText = userEmail;
        
        document.getElementById('auth-gate-canvas').classList.remove('active');
        document.getElementById('app-workspace-shell').classList.remove('app-locked');
        showToast("Access Token validated across authorization lines.");
        navigateTo('dashboard');
    });

    document.getElementById('btn-guest-login').addEventListener('click', () => {
        document.getElementById('dashboard-welcome-banner').innerText = "Welcome Explorer (Guest Session Mode) 🕶️";
        document.getElementById('prof-name').innerText = "Anonymous Explorer Mode";
        document.getElementById('prof-email').innerText = "guest@savesphere.local";
        
        document.getElementById('auth-gate-canvas').classList.remove('active');
        document.getElementById('app-workspace-shell').classList.remove('app-locked');
        showToast("Bypassed credential checking gateway.");
        navigateTo('dashboard');
    });

    document.getElementById('btn-logout').addEventListener('click', () => {
        document.getElementById('app-workspace-shell').classList.add('app-locked');
        document.getElementById('auth-gate-canvas').classList.add('active');
        showToast("Session security variables dropped. Canvas locked.");
    });

    // 4. QUICK ROUTING DASHBOARD ANCHOR HOOKS
    document.getElementById('qa-shopping-list').addEventListener('click', () => navigateTo('groceries'));
    document.getElementById('qa-meal-planner').addEventListener('click', () => navigateTo('planner'));
    document.getElementById('qa-budget-tracker').addEventListener('click', () => navigateTo('tracker'));
    document.getElementById('qa-local-gems').addEventListener('click', () => navigateTo('dining'));
    document.getElementById('btn-dash-see-all-deals').addEventListener('click', () => navigateTo('dining'));
    document.getElementById('btn-header-profile').addEventListener('click', () => navigateTo('profile'));

    document.querySelectorAll('.deal-trigger-btn').forEach(card => {
        card.addEventListener('click', function() {
            showToast(`Copied exclusive target coupon deal code from ${this.getAttribute('data-store')} directly to system clipboard!`);
        });
    });

    // 5. SHOPPING MATRIX FORM ADDITIONS
    document.getElementById('form-add-grocery-item').addEventListener('submit', (e) => {
        e.preventDefault();
        const targetNode = document.getElementById('list-input-node');
        const itemName = targetNode.value.trim();
        
        if (itemName) {
            const simulatedCost = parseFloat((Math.random() * 8 + 1.50).toFixed(2));
            SaveSphereDB.shoppingList.push({ name: itemName, price: simulatedCost });
            renderShoppingList();
            showToast(`Inserted "${itemName}" entry into layout metrics.`);
            targetNode.value = '';
        }
    });

    document.getElementById('store-filter-container').querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', function() {
            document.getElementById('store-filter-container').querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            showToast(`Filtered comparison calculations down to parameters matching: [${this.innerText.toUpperCase()}]`);
        });
    });

    // 6. MEAL ARRANGEMENT LOGIC TRIPS
    document.getElementById('btn-add-meal-prompt').addEventListener('click', () => {
        const mealTitle = prompt("Provide item names or recipes description text to map:");
        if (mealTitle) {
            const targetDay = prompt("Identify targeted target day node array (Mon, Tue, Wed, Thu, Fri, Sat, Sun):", "Mon");
            if (SaveSphereDB.meals[targetDay]) {
                SaveSphereDB.meals[targetDay].push(mealTitle);
                renderMealPlanner();
                showToast(`Appended recipe match record down to "${targetDay}" calendar rows.`);
            } else {
                alert("Day indicator argument error mismatch validation.");
            }
        }
    });

    document.getElementById('btn-auto-generate-list').addEventListener('click', () => {
        SaveSphereDB.shoppingList.push(
            { name: "Fresh Salmon Crust Fillets", price: 15.60 },
            { name: "Avocado Hass Basket", price: 6.50 },
            { name: "Crisp Green Salad Arrays", price: 4.20 }
        );
        renderShoppingList();
        showToast("Synchronized calendar item ingredients list to groceries dashboard metrics!");
        navigateTo('groceries');
    });

    // 7. TRANSACTION RESET CONTROLS
    document.getElementById('btn-reset-tracker').addEventListener('click', () => {
        SaveSphereDB.transactions = [];
        renderTransactions();
        document.getElementById('tracker-spend-val').innerText = "$0.00";
        document.getElementById('tracker-budget-text').innerText = "All tracking registers dropped to empty.";
        document.getElementById('tracker-progress-bar').style.width = "0%";
        document.getElementById('dash-budget-text').innerText = "$0.00";
        document.getElementById('dash-budget-progress').style.width = "0%";
        document.getElementById('dash-budget-percentage').innerText = "0% Expended";
        showToast("Historical tracking indexes cleared successfully.");
    });

    // 8. COMMUNITY SATISFACTION REVIEW REGISTRY DISPATCHERS
    document.getElementById('btn-write-review').addEventListener('click', () => {
        document.getElementById('review-form-block').classList.toggle('hidden');
    });

    document.getElementById('form-submit-review').addEventListener('submit', (e) => {
        e.preventDefault();
        const t = document.getElementById('rev-input-title').value;
        const r = document.getElementById('rev-input-rating').value;
        const txt = document.getElementById('rev-input-text').value;

        SaveSphereDB.reviews.unshift({ title: t, rating: r, text: txt, source: "Direct Entry Grid" });
        renderReviewsDeck();
        
        document.getElementById('form-submit-review').reset();
        document.getElementById('review-form-block').classList.add('hidden');
        showToast("Review published directly onto public metrics stack!");
    });

    // 9. PROFILE & SYSTEM SETTINGS EVENT ATTRIBUTES
    document.getElementById('btn-profile-edit').addEventListener('click', () => showToast("Profile variables manipulation temporarily locked in standard runtime sandbox environment."));
    document.querySelectorAll('.prof-action-item').forEach(item => {
        item.addEventListener('click', function() {
            showToast(`Accessing secure variable storage pipeline data points for: [${this.getAttribute('data-action').toUpperCase()}]`);
        });
    });

    document.getElementById('set-currency').addEventListener('change', function() {
        showToast(`Transformed accounting metrics matrix data configurations over into target currency: ${this.value}`);
    });

    document.getElementById('set-store').addEventListener('change', function() {
        showToast(`Optimized matching algorithmic parameters shifted to target: ${this.value.toUpperCase()}`);
    });

    document.getElementById('toggle-stock').addEventListener('change', function() {
        showToast(`Out-of-stock data checking options modified directly to value: ${this.checked}`);
    });

    // WIDESCREEN REAL ESTATE THEME TUNNEL INVERTER
    document.getElementById('dark-theme-toggle').addEventListener('change', function() {
        if(this.checked) {
            document.documentElement.style.setProperty('--bg-workspace', '#0f172a');
            document.documentElement.style.setProperty('--bg-card', '#1e293b');
            document.documentElement.style.setProperty('--text-main', '#f8fafc');
            document.documentElement.style.setProperty('--border', '#334155');
            showToast("Environment parameters shifted to deep high contrast dark layout values.");
        } else {
            document.documentElement.style.setProperty('--bg-workspace', '#f8fafc');
            document.documentElement.style.setProperty('--bg-card', '#ffffff');
            document.documentElement.style.setProperty('--text-main', '#0f172a');
            document.documentElement.style.setProperty('--border', '#e2e8f0');
            showToast("Light high contrast clean environment theme reactivated.");
        }
    });
});
