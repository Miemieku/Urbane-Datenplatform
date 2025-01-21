document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([49.8728, 8.6512], 12); // 设置初始中心（达姆施塔特）

    // 添加 OpenStreetMap 瓦片图层
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
});

