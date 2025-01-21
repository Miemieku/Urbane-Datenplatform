document.addEventListener("DOMContentLoaded", function() {
    // 1️⃣ 创建地图，中心点设为 Düsseldorf
    var map = L.map('map').setView([49.8728, 8.6512], 12);

    // 2️⃣ 添加 OpenStreetMap 瓦片图层
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
});
