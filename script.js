  // ─── CART STATE ───────────────────────────────────────────
  let cart = [];
  let cartTotal = 0;

  function addToCart(name, price, colorClass, silent = false) {
    if (price === 0) return; // skip zero-price add-ons

    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, colorClass, qty: 1, id: Date.now() });
    }
    cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

    updateCartUI();
    if (!silent) {
      showToast('Added to bag — ' + name.split(' ').slice(0,3).join(' '));
      openCart();
    }
  }

  function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    updateCartUI();
  }

  function updateCartUI() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    document.getElementById('cartCount').textContent = count;

    const body = document.getElementById('cartBody');
    const empty = document.getElementById('cartEmpty');
    const footer = document.getElementById('cartFooter');
    const total = document.getElementById('cartTotal');

    if (cart.length === 0) {
      empty.style.display = 'flex';
      footer.style.display = 'none';
      // Remove all cart items
      body.querySelectorAll('.cart-item').forEach(el => el.remove());
    } else {
      empty.style.display = 'none';
      footer.style.display = 'block';
      total.textContent = '₹' + cartTotal.toLocaleString('en-IN');

      // Rebuild cart items
      body.querySelectorAll('.cart-item').forEach(el => el.remove());
      cart.forEach(item => {
        const el = document.createElement('div');
        el.className = 'cart-item';
        el.innerHTML = `
          <div class="cart-item-img ${item.colorClass}">${item.name.split(' ').pop()}</div>
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-size">Qty: ${item.qty} · Size: M</div>
            <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
        `;
        body.appendChild(el);
      });
    }
  }

  // ─── CART DRAWER ─────────────────────────────────────────
  function openCart() {
    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('cartBackdrop').classList.add('open');
  }
  function closeCart() {
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('cartBackdrop').classList.remove('open');
  }

  // ─── MODALS ───────────────────────────────────────────────
  function openModal(id) {
    document.getElementById(id).classList.add('open');
  }
  function closeModal(id) {
    document.getElementById(id).classList.remove('open');
  }
  function closeModalOutside(e, id) {
    if (e.target === document.getElementById(id)) closeModal(id);
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
      closeCart();
    }
  });

  // ─── TOAST ────────────────────────────────────────────────
  let toastTimer;
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = '✓ ' + msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
  }

  // ─── PRODUCT FILTER ───────────────────────────────────────
  function setFilter(btn, cat) {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.product-card').forEach(card => {
      if (cat === 'all') {
        card.style.display = 'block';
      } else if (cat === 'sale') {
        const hasSale = card.querySelector('.orig');
        card.style.display = hasSale ? 'block' : 'none';
      } else {
        card.style.display = (card.dataset.category === cat) ? 'block' : 'none';
      }
    });
  }

  function filterProducts(vibe) {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    // simulate vibe filter
    setTimeout(() => showToast('Showing ' + vibe.toUpperCase() + ' collection'), 500);
  }

  // ─── SCROLL REVEAL ────────────────────────────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .vibe-card, .review-card, .story-pillar').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
