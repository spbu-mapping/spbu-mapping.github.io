// ===== BAGIAN 1: KONFIGURASI & INISIALISASI PETA =====

// Konfigurasi utama untuk memudahkan perubahan
const config = {
    map: {
        center: [-3.9985, 122.5126], // Koordinat Kendari
        zoom: 13,
        maxZoom: 19,
    },
    distanceCategories: {
        Dekat: { color: "#2ecc71", maxDist: 2 },  // Jarak < 2 km
        Sedang: { color: "#f1c40f", maxDist: 5 }, // Jarak < 5 km
        Jauh: { color: "#e74c3c", maxDist: Infinity }, // Jarak >= 5 km
    },
    clusterOptions: {
        disableClusteringAtZoom: 16,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
    }
};

// Inisialisasi peta
const map = L.map("map").setView(config.map.center, config.map.zoom);

// Base layers
const baseLayers = {
    OpenStreetMap: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
    }),
    Satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Esri, DigitalGlobe, GeoEye, etc.",
    }),
    Topographic: L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenTopoMap contributors",
    }),
};

// Menambahkan layer default dan kontrol
baseLayers.OpenStreetMap.addTo(map);
L.control.layers(baseLayers).addTo(map);
L.control.scale({ imperial: false }).addTo(map);

// Membuat cluster group dan ikon secara dinamis dari konfigurasi
const clusters = {};
const icons = {};
Object.keys(config.distanceCategories).forEach(category => {
    clusters[category] = L.markerClusterGroup(config.clusterOptions);
    icons[category] = L.divIcon({
        className: "custom-marker",
        html: `<div class="marker-icon" style="color: ${config.distanceCategories[category].color};"><i class="fas fa-gas-pump"></i></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
    });
});

// ===== BAGIAN 2: DATA SPBU (LENGKAP) =====

// Variabel state aplikasi
let userLocation = null;
const spbuDataStore = {
  type: "FeatureCollection",
  features: [
     {
       type: "Feature",
       properties: {
         id: "spbu-1",
         name: "SPBU Pertamina Anggoya",
         alamat: "2H68+6PX, Jl. Banwula Sinapoy, Anggoya, Kendari, Matabubu, Kec. Poasia, Kota Kendari, Sulawesi Tenggara 93231",
         jenis: "Pertamina",
         jam_operasional: "24 Jam",
         fasilitas: "ATM, Toilet, Musholla, Minimarket",
       },
       geometry: {
         type: "Point",
         coordinates: [122.56685299481194, -3.9891835448391766],
       },
     },
     {
       type: "Feature",
       properties: {
         id: "spbu-2",
         name: "SPBU Pertamina Wua-Wua",
         alamat: "Jl. Andi Djemma, Wua-wua, Kec. Wua-Wua, Kota Kendari, Sulawesi Tenggara",
         jenis: "Pertamina",
         jam_operasional: "24 Jam",
         fasilitas: "Toilet, Minimarket",
       },
       geometry: {
         type: "Point",
         coordinates: [122.5133, -3.9783],
       },
     },
     {
       type: "Feature",
       properties: {
         id: "spbu-3",
         name: "SPBU Pertamina Kadia",
         alamat: "Jl. Drs. H. Abdullah Silondae, Kadia, Kec. Kadia, Kota Kendari, Sulawesi Tenggara",
         jenis: "Pertamina",
         jam_operasional: "24 Jam",
         fasilitas: "ATM, Toilet, Musholla",
       },
       geometry: {
         type: "Point",
         coordinates: [122.5236, -3.9913],
       },
     },
     {
       type: "Feature",
       properties: {
         id: "spbu-4",
         name: "SPBU Pertamina Abeli",
         alamat: "Jl. Poros Bandara, Abeli, Kec. Abeli, Kota Kendari, Sulawesi Tenggara",
         jenis: "Pertamina",
         jam_operasional: "06.00 - 22.00",
         fasilitas: "Toilet, Musholla, Minimarket",
       },
       geometry: {
         type: "Point",
         coordinates: [122.5894, -4.0102],
       },
     },
     {
       type: "Feature",
       properties: {
         id: "spbu-5",
         name: "SPBU Pertamina Baruga",
         alamat: "Jl. Brigjen M. Yusuf, Baruga, Kec. Baruga, Kota Kendari, Sulawesi Tenggara",
         jenis: "Pertamina",
         jam_operasional: "06.00 - 22.00",
         fasilitas: "ATM, Toilet, Café",
       },
       geometry: {
         type: "Point",
         coordinates: [122.4996, -3.9726],
       },
     },
     {
       type: "Feature",
       properties: {
         id: "spbu-6",
         name: "SPBU Pertamina Mandonga",
         alamat: "Jl. MT Haryono, Mandonga, Kec. Mandonga, Kota Kendari, Sulawesi Tenggara",
         jenis: "Pertamina",
         jam_operasional: "24 Jam",
         fasilitas: "ATM, Toilet, Musholla, Minimarket",
       },
       geometry: {
         type: "Point",
         coordinates: [122.5066, -3.9669],
       },
     },
     {
       type: "Feature",
       properties: {
         id: "spbu-7",
         name: "SPBU Pertamina Poasia",
         alamat: "Jl. Poasia, Rahandouna, Kec. Poasia, Kota Kendari, Sulawesi Tenggara",
         jenis: "Pertamina",
         jam_operasional: "06.00 - 22.00",
         fasilitas: "Toilet, Minimarket",
       },
       geometry: {
         type: "Point",
         coordinates: [122.5521, -4.0057],
       },
     },
     {
       type: "Feature",
       properties: {
         id: "spbu-8",
         name: "SPBU Puuwatu",
         alamat: "Jl. Prof. M. Yamin, Puuwatu, Kec. Puuwatu, Kota Kendari, Sulawesi Tenggara",
         jenis: "Pertamina",
         jam_operasional: "",
         fasilitas: "",
       },
       geometry: {
         type: "Point",
         coordinates: [122.46411808527172, -3.9662851365435916],
       },
     },
     {
       type: "Feature",
       properties: {
         id: "spbu-9",
         name: "SPBU Pertamina Ponggolaka",
         alamat: "Mandonga, Kendari City, Kec. Mandonga, Kota Kendari, Sulawesi Tenggara",
         jenis: "Pertamina",
         jam_operasional: "",
         fasilitas: "",
       },
       geometry: {
         type: "Point",
         coordinates: [122.51511564310616, -3.960734982617977],
       },
     },
     {
       type: "Feature",
       properties: {
         id: "spbu-10",
         name: "SPBU Teratai Kendari",
         alamat: "Jl. Ir. H. Alala No.154, Watu-Watu, Kec. Kendari Barat, Kota Kendari, Sulawesi Tenggara",
         jenis: "Pertamina",
         jam_operasional: "",
         fasilitas: "",
       },
       geometry: {
         type: "Point",
         coordinates: [122.53744783005033, -3.966256463113213],
       },
     },
     {
       type: "Feature",
       properties: {
         id: "spbu-11",
         name: "SPBU Pertamina Kota Lama",
         alamat: "Jl. W.r. Supratman No.25, Kandai, Kec. Kendari, Kota Kendari, Sulawesi Tenggara",
         jenis: "Pertamina",
         jam_operasional: "",
         fasilitas: "",
       },
       geometry: {
         type: "Point",
         coordinates: [122.58284380548814, -3.972434988181267],
       },
     },
     {
       type: "Feature",
       properties: {
         id: "spbu-12",
         name: "SPBU Pertamina",
         alamat: "Jl. Mayjen. Sutoyo, Tipulu, Kec. Kendari Barat, Kota Kendari, Sulawesi Tenggara",
         jenis: "Pertamina",
         jam_operasional: "",
         fasilitas: "",
       },
       geometry: {
         type: "Point",
         coordinates: [122.54728187640548, -3.963922691722357],
       },
     },
     {
       type: "Feature",
       properties: {
         id: "spbu-13",
         name: "SPBU Saranani",
         alamat: "Jl. Malik Raya No.38, Korumba, Kec. Mandonga, Kota Kendari, Sulawesi Tenggara",
         jenis: "Pertamina",
         jam_operasional: "",
         fasilitas: "",
       },
       geometry: {
         type: "Point",
         coordinates: [122.51956428913641, -3.9716412489858635],
       },
     },
     {
       type: "Feature",
       properties: {
         id: "spbu-14",
         name: "SPBU Tapak Kuda",
         alamat: "Jl. Tapak Kuda, Korumba, Kec. Mandonga, Kota Kendari, Sulawesi Tenggara",
         jenis: "Pertamina",
         jam_operasional: "",
         fasilitas: "",
       },
       geometry: {
         type: "Point",
         coordinates: [122.52671759915629, -3.974839969082551],
       },
     },
     {
       type: "Feature",
       properties: {
         id: "spbu-15",
         name: "SPBU Rabam",
         alamat: "Jl. Jend. Ahmad Yani, Bende, Kec. Kadia, Kota Kendari, Sulawesi Tenggara",
         jenis: "Pertamina",
         jam_operasional: "",
         fasilitas: "",
       },
       geometry: {
         type: "Point",
         coordinates: [122.51049565656223, -3.981457311162206],
       },
     },
     {
       type: "Feature",
       properties: {
         id: "spbu-16",
         name: "SPBU THR",
         alamat: "Jl. Budi Utomo No.34, Mataiwoi, Kec. Wua-Wua, Kota Kendari, Sulawesi Tenggara",
         jenis: "Pertamina",
         jam_operasional: "",
         fasilitas: "",
       },
       geometry: {
         type: "Point",
         coordinates: [122.5019428154757, -3.98637676942329],
       },
     },
     {
       type: "Feature",
       properties: {
         id: "spbu-18",
         name: "SPBU Anduonohu",
         alamat: "Jl. Malaka, Kambu, Kec. Kambu, Kota Kendari, Sulawesi Tenggara",
         jenis: "Pertamina",
         jam_operasional: "",
         fasilitas: "",
       },
       geometry: {
         type: "Point",
         coordinates: [122.53345377360337, -4.000269847167749],
       },
     },
     {
       type: "Feature",
       properties: {
         id: "spbu-19",
         name: "SPBU Bonggoeya",
         alamat: "Bonggoeya, Wua-Wua, Kec. Wua-Wua, Kota Kendari, Sulawesi Tenggara",
         jenis: "Pertamina",
         jam_operasional: "",
         fasilitas: "",
       },
       geometry: {
         type: "Point",
         coordinates: [122.49923051725979, -4.005320015332027],
       },
     },
     {
       type: "Feature",
       properties: {
         id: "spbu-20",
         name: "SPBU Pertamina Ade",
         alamat: "Wundudopi, Baruga, Kec. Kambu, Kota Kendari, Sulawesi Tenggara",
         jenis: "Pertamina",
         jam_operasional: "",
         fasilitas: "",
       },
       geometry: {
         type: "Point",
         coordinates: [122.50571066164717, -4.021401035697424],
       },
     },
     {
       type: "Feature",
       properties: {
         id: "spbu-21",
         name: "SPBU Baruga",
         alamat: "Baruga, Kec. Baruga, Kota Kendari, Sulawesi Tenggara",
         jenis: "Pertamina",
         jam_operasional: "",
         fasilitas: "",
       },
       geometry: {
         type: "Point",
         coordinates: [122.48849644655176, -4.035869518905007],
       },
     },
     {
       type: "Feature",
       properties: {
         id: "spbu-22",
         name: "SPBU Patrick (Konda)",
         alamat: "Jl. Brigjen Katamso, Baruga, Kec. Baruga, Kota Kendari, Sulawesi Tenggara",
         jenis: "Pertamina",
         jam_operasional: "",
         fasilitas: "",
       },
       geometry: {
         type: "Point",
         coordinates: [122.48417502662095, -4.053046179784338],
       },
     }
  ]
};
let processedSpbu = []; // Menyimpan data SPBU yang sudah diproses (dengan jarak dll.)

// Referensi elemen DOM
const spbuListEl = document.getElementById("spbu-list");
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebar-toggle");

// ===== BAGIAN 3: FUNGSI UTAMA & LOGIKA =====

/**
 * Menghitung jarak Haversine antara dua koordinat.
 * @returns {number} Jarak dalam kilometer.
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius Bumi dalam km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * Menentukan kategori jarak berdasarkan jarak yang dihitung.
 * @param {number} distance - Jarak dalam km.
 * @returns {string} Nama kategori ('Dekat', 'Sedang', 'Jauh').
 */
function getDistanceCategory(distance) {
    if (distance < config.distanceCategories.Dekat.maxDist) return "Dekat";
    if (distance < config.distanceCategories.Sedang.maxDist) return "Sedang";
    return "Jauh";
}

/**
 * Memproses data SPBU: menghitung jarak, menentukan kategori, dan mengurutkan.
 */
function processAndSortSpbuData() {
    if (!userLocation) return;

    processedSpbu = spbuDataStore.features.map(spbu => {
        const [lng, lat] = spbu.geometry.coordinates;
        const distance = calculateDistance(userLocation.lat, userLocation.lng, lat, lng);
        const category = getDistanceCategory(distance);
        
        return {
            ...spbu,
            properties: {
                ...spbu.properties,
                jarak: distance,
                kategori_jarak: category,
            },
        };
    }).sort((a, b) => a.properties.jarak - b.properties.jarak);
}

/**
 * Merender (menampilkan) marker SPBU di peta.
 */
function renderMarkers() {
    Object.values(clusters).forEach(cluster => cluster.clearLayers());

    processedSpbu.forEach(spbu => {
        const { id, name, alamat, jam_operasional, jarak, kategori_jarak } = spbu.properties;
        const [lng, lat] = spbu.geometry.coordinates;

        const popupContent = `
            <div class="popup-content">
                <h3>${name}</h3>
                <p><strong>Alamat:</strong> ${alamat}</p>
                <p><strong>Jarak:</strong> ${jarak.toFixed(2)} km (${kategori_jarak})</p>
                <p><strong>Jam Operasional:</strong> ${jam_operasional || 'Tidak tersedia'}</p>
                <div class="popup-actions">
                    <a href="#" class="popup-btn view-details" data-id="${id}">Lihat Detail</a>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" target="_blank" class="popup-btn">Rute</a>
                </div>
            </div>`;
        
        const marker = L.marker([lat, lng], { icon: icons[kategori_jarak] });
        marker.bindPopup(popupContent);
        
        spbu.marker = marker; // Simpan referensi marker
        clusters[kategori_jarak].addLayer(marker);
    });
    
    updateLayerVisibility();
}

/**
 * Merender daftar SPBU di sidebar.
 */
function renderSidebar() {
    spbuListEl.innerHTML = "";
    const fragment = document.createDocumentFragment();

    processedSpbu.forEach(spbu => {
        const { id, name, alamat, jarak, kategori_jarak } = spbu.properties;
        const listItem = document.createElement("li");
        listItem.className = "spbu-item";
        listItem.dataset.id = id;
        listItem.innerHTML = `
            <h3>${name}</h3>
            <p>${alamat}</p>
            <p><strong>Jarak:</strong> ${jarak.toFixed(2)} km (${kategori_jarak})</p>`;
        
        listItem.addEventListener("click", () => {
            const [lng, lat] = spbu.geometry.coordinates;
            map.setView([lat, lng], 17);
            spbu.marker.openPopup();
            showInfoPanel(id);
            if (window.innerWidth <= 768) toggleSidebar();
        });

        fragment.appendChild(listItem);
    });

    spbuListEl.appendChild(fragment);
    updateSidebarVisibility();
}

/**
 * Alur utama untuk memperbarui seluruh UI.
 */
function updateUI() {
    processAndSortSpbuData();
    renderMarkers();
    renderSidebar();
}

// ===== BAGIAN 4: FUNGSI UI & HELPER LAINNYA =====

/**
 * Mengatur visibilitas layer cluster di peta berdasarkan checkbox.
 */
function updateLayerVisibility() {
    Object.keys(clusters).forEach(category => {
        const checkbox = document.getElementById(`${category.toLowerCase()}-layer`);
        if (checkbox && checkbox.checked) {
            map.addLayer(clusters[category]);
        } else {
            map.removeLayer(clusters[category]);
        }
    });
}

/**
 * Memfilter visibilitas item di sidebar berdasarkan filter dan pencarian.
 */
function updateSidebarVisibility() {
    const filters = {
        Dekat: document.getElementById("dekat-layer").checked,
        Sedang: document.getElementById("sedang-layer").checked,
        Jauh: document.getElementById("jauh-layer").checked,
    };
    const searchText = document.getElementById("search-input").value.toLowerCase();

    Array.from(spbuListEl.children).forEach(item => {
        const spbu = processedSpbu.find(s => s.properties.id === item.dataset.id);
        if (!spbu) return;

        const { name, alamat, kategori_jarak } = spbu.properties;
        const isCategoryVisible = filters[kategori_jarak];
        const isSearchVisible = searchText === "" || name.toLowerCase().includes(searchText) || alamat.toLowerCase().includes(searchText);

        item.style.display = isCategoryVisible && isSearchVisible ? "block" : "none";
    });
}

/**
 * Menampilkan panel informasi detail.
 */
function showInfoPanel(id) {
    const spbu = processedSpbu.find(s => s.properties.id === id);
    if (!spbu) return;

    const { name, alamat, jenis, jam_operasional, fasilitas, jarak, kategori_jarak } = spbu.properties;
    const [lng, lat] = spbu.geometry.coordinates;

    document.getElementById("info-title").textContent = name;
    document.getElementById("info-name").textContent = name;
    document.getElementById("info-address").textContent = alamat;
    document.getElementById("info-type").textContent = jenis;
    document.getElementById("info-hours").textContent = jam_operasional || "N/A";
    document.getElementById("info-facilities").textContent = fasilitas || "N/A";
    document.getElementById("info-coordinates").textContent = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    document.getElementById("info-distance").textContent = `${jarak.toFixed(2)} km (${kategori_jarak})`;
    document.getElementById("info-panel").style.display = "block";
}

function toggleSidebar() {
    sidebar.classList.toggle("active");
    sidebarToggle.innerHTML = sidebar.classList.contains("active") ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
}

function findNearestSpbu() {
    if (!userLocation) {
        alert("Lokasi Anda tidak tersedia. Pastikan GPS aktif.");
        return;
    }
    const nearest = processedSpbu[0]; // Data sudah diurutkan, ambil yang pertama
    if (nearest) {
        map.setView(nearest.marker.getLatLng(), 16);
        nearest.marker.openPopup();
        showInfoPanel(nearest.properties.id);
    }
}

function exportToCSV() {
    let csv = "Nama,Alamat,Jenis,Jam Operasional,Fasilitas,Jarak (km),Kategori Jarak\n";
    processedSpbu.forEach(spbu => {
        const props = spbu.properties;
        // Ganti koma di dalam string untuk mencegah kerusakan CSV
        const safeAlamat = `"${props.alamat.replace(/"/g, '""')}"`;
        const safeFasilitas = `"${(props.fasilitas || '').replace(/"/g, '""')}"`;

        csv += `"${props.name}",${safeAlamat},"${props.jenis}","${props.jam_operasional}",${safeFasilitas},${props.jarak.toFixed(2)},"${props.kategori_jarak}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "spbu_kendari.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ===== BAGIAN 5: INISIALISASI LOKASI & EVENT LISTENERS =====

/**
 * Mendapatkan lokasi pengguna dan menginisialisasi peta.
 */
function initializeUserLocation() {
    const setLocation = (lat, lng) => {
        userLocation = { lat, lng };
        L.marker([lat, lng], {
            icon: L.divIcon({
                className: "custom-marker",
                html: `<div class="marker-icon" style="color: #3498db;"><i class="fas fa-user-location"></i></div>`,
                iconSize: [30, 30], iconAnchor: [15, 15]
            })
        }).addTo(map).bindPopup("<strong>Lokasi Anda</strong>").openPopup();
        updateUI();
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => setLocation(position.coords.latitude, position.coords.longitude),
            (error) => {
                console.error("Gagal mendapatkan lokasi:", error.message);
                setLocation(config.map.center[0], config.map.center[1]); // Gagal, gunakan lokasi default
            }
        );
    } else {
        console.error("Geolocation tidak didukung oleh browser ini.");
        setLocation(config.map.center[0], config.map.center[1]); // Browser tidak mendukung, gunakan lokasi default
    }
}

/**
 * Menyiapkan semua event listener untuk interaksi pengguna.
 */
function setupEventListeners() {
    // Filter checkbox
    document.querySelectorAll('#filter-controls input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            updateLayerVisibility();
            updateSidebarVisibility();
        });
    });

    // Pencarian
    document.getElementById("search-input").addEventListener("input", updateSidebarVisibility);

    // Tombol Kontrol
    document.getElementById("locate-btn").addEventListener("click", initializeUserLocation);
    document.getElementById("nearest-btn").addEventListener("click", findNearestSpbu);
    document.getElementById("export-btn").addEventListener("click", exportToCSV);

    // Panel Info
    document.getElementById("close-info").addEventListener("click", () => document.getElementById("info-panel").style.display = "none");

    // Sidebar Toggle
    sidebarToggle.addEventListener("click", toggleSidebar);
    
    // Popup (Event Delegation)
    map.on("popupopen", (e) => {
        const detailsButton = e.popup.getElement().querySelector(".view-details");
        if (detailsButton) {
            // Hapus listener lama jika ada untuk mencegah duplikasi
            const newButton = detailsButton.cloneNode(true);
            detailsButton.parentNode.replaceChild(newButton, detailsButton);

            newButton.addEventListener("click", (event) => {
                event.preventDefault();
                showInfoPanel(event.target.dataset.id);
            });
        }
    });
}

// ===== BAGIAN 6: EKSEKUSI AWAL =====

setupEventListeners();
initializeUserLocation();

// Tampilkan sidebar secara default saat pertama kali dimuat
sidebar.classList.add("active");
sidebarToggle.innerHTML = '<i class="fas fa-times"></i>';