/**
 * Product Card Component
 * Reusable product tile for sales and inventory views.
 */

export function createProductTile(product, onClick) {
    const tile = document.createElement('div');
    tile.className = `product-tile${product.stock <= 0 ? ' out-of-stock' : ''}`;
    tile.dataset.id = product.id;

    const stockClass = product.stock <= (product.lowStockThreshold || 5) ? ' low' : '';

    tile.innerHTML = `
        <span class="pt-emoji">${product.emoji || '📦'}</span>
        <span class="pt-name">${product.name}</span>
        <span class="pt-price">KSh ${product.price.toLocaleString()}</span>
        <span class="pt-stock${stockClass}">${product.stock} left</span>
        <span class="pt-add-badge">+</span>
    `;

    if (onClick) {
        tile.addEventListener('click', () => onClick(product));
    }

    return tile;
}

export function createInventoryItem(product, onClick) {
    const item = document.createElement('div');
    item.className = 'inventory-item';
    item.dataset.id = product.id;

    const stockStatus = product.stock <= 0 ? 'out'
        : product.stock <= (product.lowStockThreshold || 5) ? 'low' : '';

    item.innerHTML = `
        <span class="inv-emoji">${product.emoji || '📦'}</span>
        <div class="inv-info">
            <div class="inv-name">${product.name}</div>
            <div class="inv-meta">${product.category || 'General'} · KSh ${product.price.toLocaleString()}</div>
        </div>
        <div class="inv-stock ${stockStatus}">
            <div class="stock-count">${product.stock}</div>
            <div class="stock-label">in stock</div>
        </div>
    `;

    if (onClick) {
        item.addEventListener('click', () => onClick(product));
    }

    return item;
}
