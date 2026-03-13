// Sayfa yüklendiğinde çalışacak ana yapı
document.addEventListener('DOMContentLoaded', () => {
    // Kategori butonlarını ve menü elemanlarını seç
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Aktif buton stilini güncelle
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 2. Tıklanan butonun hangi kategoriyi temsil ettiğini bul
            // HTML'de yazdığımız onclick fonksiyonları yerine modern event listener kullanıyoruz.
            // Bunun için HTML'deki butonların metinlerini veya yeni ekleyeceğimiz data-target değerlerini kullanabiliriz.
            // Şimdilik butonun text'inden ilerleyelim (veya daha sağlıklısı HTML'e data-target eklemektir).
            const targetCategory = btn.getAttribute('data-target');

            // 3. Ürünleri filtrele ve animasyonla göster/gizle
            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (targetCategory === 'all' || itemCategory === targetCategory) {
                    // Önce display:flex yapıp görünür kıl, sonra animasyon için opacity ver
                    item.style.display = 'flex';
                    // Tarayıcının render alması için minik bir gecikme (setTimeout)
                    setTimeout(() => {
                        item.classList.remove('hidden');
                    }, 10);
                } else {
                    // Önce görünmez yap (animasyonlu)
                    item.classList.add('hidden');
                    // Animasyon bitince ekrandan tamamen kaldır ki yer kaplamasın
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300); // 300ms CSS'teki transition süremizle aynı olmalı
                }
            });
        });
    });
});
// Sayfa yüklendiğinde çalışacak (Önceki DOMContentLoaded bloğunun içine de koyabilirsin, ayrı da durabilir)
document.addEventListener('DOMContentLoaded', () => {

    const viewMenuBtn = document.getElementById('viewMenuBtn');
    const introScreen = document.getElementById('introScreen');

    if (viewMenuBtn && introScreen) {
        viewMenuBtn.addEventListener('click', () => {
            // Kullanıcı menüyü en üstten görsün diye sayfayı yukarı hizala
            window.scrollTo(0, 0);

            // Animasyonla ekranı yukarı kaydır
            introScreen.classList.add('hidden');

            // CSS animasyonu (0.8s) bittikten sonra arkada boşuna çalışmasın diye display:none yapıyoruz
            setTimeout(() => {
                introScreen.style.display = 'none';
            }, 800);
        });
    }
    // --- WI-FI MODAL İŞLEMLERİ ---
    const wifiBtn = document.getElementById('wifiBtn');
    const wifiModal = document.getElementById('wifiModal');
    const closeWifiBtn = document.getElementById('closeWifiBtn');
    const copyBtn = document.getElementById('copyBtn');
    const wifiPassword = document.getElementById('wifiPassword').innerText;
    const copyFeedback = document.getElementById('copyFeedback');

    // Modalı Aç
    wifiBtn.addEventListener('click', () => {
        wifiModal.classList.add('active');
    });

    // Modalı Kapat
    closeWifiBtn.addEventListener('click', () => {
        wifiModal.classList.remove('active');
        copyFeedback.classList.remove('show'); // Kapatırken yazıyı sıfırla
    });

    // Dışarı tıklayınca modalı kapat
    wifiModal.addEventListener('click', (e) => {
        if (e.target === wifiModal) {
            wifiModal.classList.remove('active');
            copyFeedback.classList.remove('show');
        }
    });

    // Şifreyi Kopyala
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(wifiPassword).then(() => {
            copyFeedback.classList.add('show');
            // 2 saniye sonra "Kopyalandı" yazısını gizle
            setTimeout(() => {
                copyFeedback.classList.remove('show');
            }, 2000);
        }).catch(err => {
            console.error('Kopyalama başarısız oldu:', err);
        });
    });

});
// --- DİNAMİK ARAMA MOTORU ---
const searchBtn = document.getElementById('searchBtn');
const searchContainer = document.getElementById('searchContainer');
const closeSearchBtn = document.getElementById('closeSearchBtn');
const searchInput = document.getElementById('searchInput');
const allMenuItems = document.querySelectorAll('.menu-item'); // Tüm ürünler

if (searchBtn && searchContainer) {
    // Arama ikonuna tıklayınca çubuğu aç/kapat
    searchBtn.addEventListener('click', () => {
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus(); // Açılınca klavyeyi otomatik getir
        }
    });

    // Çarpıya basınca aramayı kapat ve menüyü sıfırla
    closeSearchBtn.addEventListener('click', () => {
        searchContainer.classList.remove('active');
        searchInput.value = ''; // İçini temizle

        // Tüm ürünleri geri getir
        allMenuItems.forEach(item => {
            item.style.display = 'flex';
            setTimeout(() => item.classList.remove('hidden'), 10);
        });
    });

    // Klavyeden harf girildikçe anlık filtreleme (Canlı Arama)
    searchInput.addEventListener('input', (e) => {
        const arananKelime = e.target.value.toLowerCase(); // Büyük/küçük harf duyarlılığını kaldır

        allMenuItems.forEach(item => {
            // Ürün başlığını ve açıklamasını kontrol et
            const baslik = item.querySelector('.item-title').innerText.toLowerCase();
            const aciklama = item.querySelector('.item-desc').innerText.toLowerCase();

            // Eğer aranan kelime başlıkta veya açıklamada geçiyorsa göster
            if (baslik.includes(arananKelime) || aciklama.includes(arananKelime)) {
                item.style.display = 'flex';
                setTimeout(() => item.classList.remove('hidden'), 10);
            } else {
                // Geçmiyorsa gizle
                item.classList.add('hidden');
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    });
}