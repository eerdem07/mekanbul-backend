mekan-bul-backend-gjsv4uyrw-jacobss7s-projects.vercel.app

# Backend API Projesi

Bu proje, RESTful API hizmeti sunan bir **Node.js** uygulamasıdır. Proje, **Express.js** ve **Mongoose** kullanılarak geliştirilmiş ve MongoDB ile veri yönetimi sağlamaktadır. Ayrıca, `dotenv` ile çevre değişkenleri desteklenmektedir.

---

## 📁 Proje Yapısı

```
backend/
├── app.js                # Ana uygulama dosyası
├── routes/               # Uygulama yönlendirme dosyaları
│   ├── index.js          # Genel rotalar
│   ├── users.js          # Kullanıcı rotaları
├── app_api/              # API rotaları ve iş mantığı
│   ├── controllers/      # Controller (iş mantığı) dosyaları
│   ├── models/           # Mongoose şemaları
│   ├── routes/           # API yönlendirme dosyaları
├── public/               # Statik dosyalar
│   ├── stylesheets/      # CSS dosyaları
│   ├── images/           # Görseller
├── .env                  # Çevre değişkenleri (env)
├── vercel.json           # Vercel yapılandırma dosyası
├── package.json          # Proje bağımlılıkları ve betikleri
```

---

## 🚀 Kurulum ve Çalıştırma

### Gerekli Bağımlılıkların Kurulumu

Projenin çalışabilmesi için gerekli bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:

```bash
npm install
```

### Çevre Değişkenleri (Environment Variables)

Projenin `MongoDB` bağlantı adresini ve diğer gerekli bilgileri içeren bir `.env` dosyası oluşturun. Örnek `.env` dosyası:

```
DB_URL=mongodb+srv://kullanici:sifre@host/your-database
PORT=3000
```

### Geliştirme Ortamında Çalıştırma

Projenizi geliştirme ortamında çalıştırmak için:

```bash
npm start
```

---

## 🛠️ Vercel Üzerinde Yayınlama

1. **GitHub’a Yükleme:** Projenizi bir GitHub repository'sine push edin.
2. **Vercel Üzerinde Dağıtım:** [Vercel](https://vercel.com/) üzerinde bir hesap oluşturup projenizi deploy edin.
3. **`vercel.json` Ayarları:** Projede Vercel’in doğru çalışması için `vercel.json` yapılandırma dosyası eklenmiştir. Bu dosya, uygulamanın düzgün bir şekilde dağıtılmasını sağlar.

---

## 📌 API Endpoint'leri

### `GET /api/venues`

Tüm mekanları listeler.

### `POST /api/venues`

Yeni bir mekan ekler. **Body:**

```json
{
  "name": "Mekan Adı",
  "location": "Lokasyon",
  "capacity": 100
}
```

### `GET /api/venues/:venueId`

Belirtilen bir mekanın detaylarını getirir.

### `PUT /api/venues/:venueId`

Bir mekanı günceller. **Body:**

```json
{
  "name": "Yeni Mekan Adı",
  "location": "Yeni Lokasyon",
  "capacity": 150
}
```

### `DELETE /api/venues/:venueId`

Belirtilen bir mekanı siler.

### `POST /api/venues/:venueId/comments`

Belirtilen bir mekan için yorum ekler. **Body:**

```json
{
  "text": "Harika bir mekan!",
  "author": "Kullanıcı Adı"
}
```

### `GET /api/venues/:venueId/comments/:commentId`

Belirli bir yorumu getirir.

---

## 🛠️ Kullanılan Teknolojiler

- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose ile)
- **dotenv** (Çevre değişkenleri için)
- **Vercel** (Dağıtım için)

---

## ✨ Katkıda Bulunma

1. Bu repository'yi fork edin.
2. Yeni bir dal oluşturun: `git checkout -b feature/ozellik`
3. Değişikliklerinizi commit edin: `git commit -m "Yeni özellik ekle"`
4. Dalınıza push edin: `git push origin feature/ozellik`
5. Bir **Pull Request** açın.

---

## 📄 Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasını inceleyin.
