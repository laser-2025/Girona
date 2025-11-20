// جلب المنتجات من التخزين أو إنشاء مصفوفة جديدة
let products = JSON.parse(localStorage.getItem('photoProducts')) || [];

// عرض المنتجات عند تحميل الصفحة
displayProducts();

document.getElementById('addForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const newProduct = {
        id: Date.now(),
        before: document.getElementById('beforeImg').value,
        after: document.getElementById('afterImg').value,
        video: document.getElementById('video').value || '',
        titleAr: document.getElementById('titleAr').value,
        titleEs: document.getElementById('titleEs').value,
        descAr: document.getElementById('descAr').value,
        descEs: document.getElementById('descEs').value,
        priceAr: document.getElementById('priceAr').value,
        priceEs: document.getElementById('priceEs').value
    };

    products.push(newProduct);
    localStorage.setItem('photoProducts', JSON.stringify(products));
    
    displayProducts();
    this.reset();
    alert('تمت الإضافة بنجاح! المنتج ظهر تلقائياً في الموقع الرئيسي');
});

function displayProducts() {
    const list = document.getElementById('productsList');
    if (products.length === 0) {
        list.innerHTML = '<p style="text-align:center; color:#999;">لا توجد منتجات مضافة بعد</p>';
        return;
    }

    list.innerHTML = products.map(p => `
        <div class="product-card">
            <button class="delete-btn" onclick="deleteProduct(${p.id})">×</button>
            <div class="product-info">
                <h3>${p.titleAr}</h3>
                <p><strong>كيفية التعديل:</strong> ${p.descAr}</p>
                <div class="price-display">${p.priceAr} | ${p.priceEs}</div>
                <small>قبل: ${p.before} | بعد: ${p.after}</small>
                ${p.video ? `<br><small>فيديو: ${p.video}</small>` : ''}
            </div>
        </div>
    `).join('');
}

function deleteProduct(id) {
    if (confirm('متأكدة أنكِ تريدين حذف هذا المنتج؟')) {
        products = products.filter(p => p.id !== id);
        localStorage.setItem('photoProducts', JSON.stringify(products));
        displayProducts();
    }
}
