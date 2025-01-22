document.addEventListener("DOMContentLoaded", function() {
    // 1️⃣ 创建地图，中心点设为 Düsseldorf
    var map = L.map('map').setView([51.2277, 6.7735], 12);

    // 2️⃣ 添加 OpenStreetMap 瓦片图层
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // 3️⃣ 从 data.json 读取数据并添加到地图
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // 4️⃣ 添加 GeoJSON 数据到地图
            L.geoJSON(data, {
                onEachFeature: function (feature, layer) {
                    layer.bindPopup(`
                        <b>${feature.properties.name}</b><br>
                        Luftqualität: ${feature.properties.air_quality}<br>
                        Verkehrslage: ${feature.properties.traffic}
                    `);
                }
            }).addTo(map);
        })
        .catch(error => console.error("Fehler beim Laden der Daten:", error));
});

