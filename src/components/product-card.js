/**
 * Product Card Component v2
 * Shows unit, description, margin indicator for admin.
 */

export function createProductTile(product, onClick) {
    const tile = document.createElement('div');
    tile.className = `product-tile${product.stock <= 0 ? ' out-of-stock' : ''}`;
    tile.dataset.id = product.id;

    const stockClass = product.stock <= (product.lowStockThreshold || 5) ? ' low' : '';
    const unitLabel = product.unit && product.unit !== 'pcs' ? `/${product.unit}` : '';

    tile.innerHTML = `
        <span class="pt-emoji">${product.emoji || '📦'}</span>
        <span class="pt-name">${product.name}</span>
        <span class="pt-price">KSh ${product.price.toLocaleString()}${unitLabel}</span>
        <span class="pt-stock${stockClass}">${product.stock} ${product.unit || 'pcs'}</span>
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

    const unitLabel = product.unit || 'pcs';
    const margin = product.costPrice && product.price
        ? Math.round(((product.price - product.costPrice) / product.price) * 100) : null;

    item.innerHTML = `
        <span class="inv-emoji">${product.emoji || '📦'}</span>
        <div class="inv-info">
            <div class="inv-name">${product.name}</div>
            <div class="inv-meta">${product.category || 'General'} · KSh ${product.price.toLocaleString()}/${unitLabel}</div>
            ${product.description ? `<div class="inv-desc">${product.description}</div>` : ''}
            ${product.sku ? `<div class="inv-sku">SKU: ${product.sku}</div>` : ''}
        </div>
        <div class="inv-stock ${stockStatus}">
            <div class="stock-count">${product.stock}</div>
            <div class="stock-label">${unitLabel}</div>
            ${margin !== null ? `<div class="stock-margin ${margin >= 20 ? 'good' : 'low'}">${margin}% margin</div>` : ''}
        </div>
    `;

    if (onClick) {
        item.addEventListener('click', () => onClick(product));
    }

    return item;
}
