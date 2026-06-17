// --- CENTRAL PIPELINE APPLICATION STATE ENGINE ---
const SaveSphereState = {
    user: {
        name: "Emma Johnson",
        email: "emma.j@gmail.com",
        familySize: 4,
        weeklyBudget: 150,
        stores: ["Coles", "Woolworths", "Aldi"],
        diet: "none"
    },
    shoppingList: [
        { id: 1, name: "3L Full Cream Milk", price: 4.50 },
        { id: 2, name: "Whole White Bread Loaf", price: 3.20 }
    ],
    restaurants: [
        { id: "kfc", name: "KFC Sector Node", type: "Fast Food", deals: "Free Large Chips with 20 Buckets purchase", rating: 4.2, image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac2313?auto=format&fit=crop&w=120&q=80", items: ["Zinger Box $11.95", "3pc Original Tender $4.95"], reviews: [{user: "Mark T.", stars: 5, comment: "Crispy chicken nodes matched preferences perfectly."}] },
        { id: "mcdonalds", name: "McDonald's Hub", type: "Fast Food", deals: "2 For 1 McChicken Meal Sets", rating: 4.5, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=120&q=80", items: ["Big Mac Lunch $7.50", "Cheeseburger Pack $5.00"], reviews: [{user: "Sarah K.", stars: 4, comment: "Quick turnaround, savings updated on ledger instantly."}] },
        { id: "burgerhub", name: "Burger Hub Local Gem", type: "Healthy / Gourmet", deals: "20% Off First App Checkout", rating: 4.9, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=120&q=80", items: ["Classic Wagyu $14.20", "Sweet Potato Fries $6.00"], reviews: [{user: "Alex M.", stars: 5, comment: "Absolute hidden diamond! Budget parameters completely cleared."}] }
    ],
    selectedRestaurant: null
};

// --- WIZARD ONBOARDING FLOW MANAGEMENT (Wireframe Row 1) ---
function nextStep(stepNumber) {
    document.querySelectorAll('.wizard-step').forEach(step => step.classList.remove('active'));
    document.getElementById(`step-${stepNumber}`).classList.add('active');

    // Parse data progressively
    if(stepNumber === 3) {
        const checkedStores = [];
        document.querySelectorAll('#step-2 input[type="checkbox"]:checked').forEach(cb => checkedStores.push(cb.value));
        if(checkedStores.length > 0) SaveSphereState.user.stores = checkedStores;
    }
}

function updateBudgetVal(val) {
    document.getElementById('budget-val').innerText = `$${val}`;
    SaveSphereState.user.weeklyBudget = parseInt(val);
}

function updateFamily(direction) {
    let current = SaveSphereState.user.familySize + direction;
    if(current < 1) current = 1;
    SaveSphereState.user.familySize = current;
    document.getElementById('family-val').innerText = `${current} ${current === 1 ? 'Person' : 'People'}`;
}

function toggleTag(element) {
    element.classList.toggle('active');
}

function closeOnboarding() {
    // Commit variables from input nodes
    SaveSphereState.user.diet = document.getElementById('pref-diet').value;
    
    // UI assignments
    document.getElementById('onboarding-overlay').style.display = 'none';
    
    // Sync setup preferences directly to profile page visual nodes
    document.getElementById('settings-name-header').innerText = SaveSphereState.user.name;
    document.getElementById('settings-email-header').innerText = SaveSphereState.user.email;
    
    showToast("Setup Wizard complete! Welcome to SaveSphere.");
    initializeDataMatrix();
}

// --- VIEW VIEWPORT CONTROLLER (Clean Tab Navigation) ---
function switchView(viewId) {
    // Pane swapping instances
    document.querySelectorAll('.view-panel').forEach(panel => panel.classList.remove('active'));
    document.getElementById(`view-${viewId}`).classList.add('active');

    // Menu state alterations
    document.querySelectorAll('.tab-item').forEach(tab => tab.classList.remove('active'));
    document.getElementById(`tab-${viewId}`).classList.add('active');

    if(viewId === 'dining' && !SaveSphereState.selectedRestaurant) {
        selectRestaurantNode('burgerhub'); // Auto focus instance
    }
}

// --- MOCK SIMULATED ENGINE FOR REALTIME DATA MATRIX ---
function initializeDataMatrix() {
    // Generate Deal stream instances on main dashboard viewport
    const dealsContainer = document.getElementById('top-deals-container');
    const catalogData = [
        { name: "3L Standard Farmhouse Milk", desc: "Lowest price variance detected at Aldi", price: "$3.10", source: "aldi" },
        { name: "Premium Lean Beef Mince 1kg", desc: "Save $4.20 off retail price index", price: "$12.00", source: "coles" },
        { name: "Organic Avocado Mesh Bag", desc: "Buy 2 Get 1 Promotion active", price: "$4.50", source: "woolworths" },
        { name: "Gourmet Wagyu Stack Node", desc: "20% direct application baseline mapping", price: "$14.20", source: "dining" }
    ];

    dealsContainer.innerHTML = catalogData.map(deal => `
        <div class="deal-node-card">
            <div class="deal-top">
                <span class="deal-source ${deal.source}">${deal.source.toUpperCase()}</span>
                <span class="live-tag">MATCHED</span>
            </div>
            <h4>${deal.name}</h4>
            <p>${deal.desc}</p>
            <div class="deal-price-row">
                <span>Current Rate</span>
                <strong>${deal.price}</strong>
            </div>
        </div>
    `).join('');

    // Generate Global Comparative Table (Groceries catalog view matrix)
    const itemsList = ["3L Full Cream Milk", "White Artisan Bread", "Free Range Eggs 12pk", "Chicken Breast Fillets 1kg", "Brown Jasmine Rice 1kg"];
    const matrixBody = document.getElementById('grocery-matrix-body');

    matrixBody.innerHTML = itemsList.map(item => {
        let p1 = (Math.random() * 4 + 2);
        let p2 = (p1 + (Math.random() * 0.8 - 0.4));
        let p3 = (p1 - (Math.random() * 0.6 + 0.1));
        
        let minPrice = Math.min(p1, p2, p3);
        let tagBest = minPrice === p3 ? 'ALDI' : (minPrice === p1 ? 'COLES' : 'WOOLWORTHS');

        return `
            <tr>
                <td style="font-weight:600;">${item}</td>
                <td>$${p1.toFixed(2)}</td>
                <td>$${p2.toFixed(2)}</td>
                <td class="text-green" style="font-weight:600;">$${p3.toFixed(2)}</td>
                <td><span class="best-tag">${tagBest} OPTIMAL</span></td>
            </tr>
        `;
    }).join('');

    renderShoppingListUI();
    renderDiningHubUI();
    startAutomatedAlertStream();
}

// --- SMART GROCERY LIST TRACKER LOGIC ---
function addGroceryListItem() {
    const input = document.getElementById('grocery-item-input');
    const val = input.value.trim();
    if(!val) return;

    const pseudoPrice = (Math.random() * 8 + 2);
    SaveSphereState.shoppingList.push({
        id: Date.now(),
        name: val,
        price: pseudoPrice
    });

    input.value = '';
    renderShoppingListUI();
    showToast(`Added ${val} to sync ledger.`);
}

function removeGroceryItem(id) {
    SaveSphereState.shoppingList = SaveSphereState.shoppingList.filter(item => item.id !== id);
    renderShoppingListUI();
}

function renderShoppingListUI() {
    const listContainer = document.getElementById('shopping-list-items');
    let cumulativeSum = 0;

    listContainer.innerHTML = SaveSphereState.shoppingList.map(item => {
        cumulativeSum += item.price;
        return `
            <li class="list-item-node">
                <span>${item.name}</span>
                <div>
                    <span style="margin-right:12px; font-weight:700; color:var(--text-muted);">$${item.price.toFixed(2)}</span>
                    <button class="remove-btn" onclick="removeGroceryItem(${item.id})">×</button>
                </div>
            </li>
        `;
    }).join('');

    document.getElementById('list-total-cost').innerText = `$${cumulativeSum.toFixed(2)}`;
}

function optimizeShoppingList() {
    showToast("Route matrices aligned. Shopping routing set to ALDI sector.");
}

// --- DINING INTERACTION HUB LOGIC (Row 2 Wireframe Nodes) ---
function renderDiningHubUI() {
    const container = document.getElementById('restaurant-cards-container');
    container.innerHTML = SaveSphereState.restaurants.map(rest => `
        <div class="restaurant-item ${SaveSphereState.selectedRestaurant === rest.id ? 'selected' : ''}" onclick="selectRestaurantNode('${rest.id}')">
            <img src="${rest.image}" alt="Rest" class="rest-img-placeholder">
            <div class="rest-info-mini">
                <h4>${rest.name}</h4>
                <p>${rest.type} • ⭐ ${rest.rating}</p>
                <span style="font-size:0.75rem; color:var(--primary-dark); font-weight:700;">${rest.deals}</span>
            </div>
        </div>
    `).join('');
}

function selectRestaurantNode(id) {
    SaveSphereState.selectedRestaurant = id;
    renderDiningHubUI(); // Update selection outlines

    const target = SaveSphereState.restaurants.find(r => r.id === id);
    const detailPane = document.getElementById('restaurant-detail-view');

    detailPane.innerHTML = `
        <div class="detail-header-hero">
            <div>
                <h2>${target.name}</h2>
                <p style="color:var(--text-muted); font-size:0.9rem;">${target.type} Sector Hub • Mapped within 2km perimeter</p>
            </div>
            <div class="rating-badge-large">⭐ ${target.rating}</div>
        </div>

        <div class="detail-deal-banner">
            🎯 ACTIVE PROMO: ${target.deals}
        </div>

        <h4>Highly Budget-Matched Menu Items</h4>
        <ul style="list-style:none; margin: 1rem 0; display:flex; flex-direction:column; gap:8px;">
            ${target.items.map(item => `<li style="padding:0.6rem; background:var(--bg-main); border-radius:8px; font-weight:600;">⚡ ${item}</li>`).join('')}
        </ul>

        <div class="review-composer-box">
            <h3>Community Reviews</h3>
            <div id="reviews-list-mount" style="margin-top:1rem; display:flex; flex-direction:column; gap:10px;">
                ${target.reviews.map(rev => `
                    <div style="background:var(--bg-main); padding:0.85rem; border-radius:10px;">
                        <div style="display:flex; justify-content:between; font-weight:700; font-size:0.85rem;">
                            <span>${rev.user}</span>
                            <span style="color:var(--orange-warning)">${'★'.repeat(rev.stars)}</span>
                        </div>
                        <p style="font-size:0.88rem; color:var(--text-dark); margin-top:4px;">"${rev.comment}"</p>
                    </div>
                `).join('')}
            </div>

            <h4 style="margin-top:1.5rem;">Write a Review</h4>
            <div class="stars-input-row" id="rating-composer-stars">
                <span class="active" onclick="setReviewScore(1)">★</span>
                <span class="active" onclick="setReviewScore(2)">★</span>
                <span class="active" onclick="setReviewScore(3)">★</span>
                <span class="active" onclick="setReviewScore(4)">★</span>
                <span class="active" onclick="setReviewScore(5)">★</span>
            </div>
            <textarea id="review-comment-txt" placeholder="Share food menu layout items, real price variances, or hidden gem indicators..."></textarea>
            <button class="btn btn-primary" onclick="submitReviewNode()">Submit Review Ledger</button>
        </div>
    `;
}

let activeComposerScore = 5;
function setReviewScore(score) {
    activeComposerScore = score;
    const stars = document.querySelectorAll('#rating-composer-stars span');
    stars.forEach((star, index) => {
        if(index < score) star.classList.add('active');
        else star.classList.remove('active');
    });
}

function submitReviewNode() {
    const txtNode = document.getElementById('review-comment-txt');
    if(!txtNode.value.trim()) return;

    const currentRest = SaveSphereState.restaurants.find(r => r.id === SaveSphereState.selectedRestaurant);
    currentRest.reviews.unshift({
        user: "You (Admin)",
        stars: activeComposerScore,
        comment: txtNode.value.trim()
    });

    showToast("Review committed securely to the ledger database array.");
    selectRestaurantNode(SaveSphereState.selectedRestaurant);
}

// --- INTELLIGENT AI GENERATOR HANDLERS ---
function generateAiShoppingList() {
    showToast("AI mapping engine analyzing calorie parameters... Shopping list updated.");
}

// --- REAL-TIME LIVE NOTIFICATION RADAR TICKER ---
function startAutomatedAlertStream() {
    const alertText = document.getElementById('alert-text');
    const alertScenarios = [
        "3L milk is $1.50 cheaper and is on buy 2 get one free at Aldi this week",
        "4 nearby dining spots in your budget have 2 for 1 deals matching your preferences",
        "Warning: Discretionary purchase items approaching weekly budget limit threshold",
        "Hidden Gem Match: Burger Hub just initialized a 20% system coupon code matching profile location"
    ];

    setInterval(() => {
        const checkNotificationsActive = document.getElementById('toggle-notifications').checked;
        if(checkNotificationsActive) {
            const pick = alertScenarios[Math.floor(Math.random() * alertScenarios.length)];
            alertText.innerText = pick;
        }
    }, 7000);
}

function triggerAlertModal() {
    const currentAlert = document.getElementById('alert-text').innerText;
    alert(`[SaveSphere Push Radar Alert Stream]\n\nTrigger Log: "${currentAlert}"`);
}

// --- SYSTEM UTILITIES & COMPONENT WRAPPERS ---
function showToast(message) {
    const toast = document.getElementById('toast-notification');
    toast.innerText = message;
    toast.classList.add('visible');
    setTimeout(() => { toast.classList.remove('visible'); }, 3000);
}

function resetWizard() {
    document.getElementById('onboarding-overlay').style.display = 'flex';
    nextStep(1);
}

function triggerSignOut() {
    alert("Signing session authentication structures offline.");
    resetWizard();
}

// Initialize system dependencies on viewport instantiation
window.onload = () => {
    // Keep onboarding overlay initial sequence active on startup
    document.getElementById('onboarding-overlay').style.display = 'flex';
};
