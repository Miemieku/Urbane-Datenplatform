// 1️⃣ 让 `map` 成为全局变量
var map;

document.addEventListener("DOMContentLoaded", function() {
    // 2️⃣ 初始化地图，并赋值给全局变量 `map`
    map = L.map('map').setView([51.2277, 6.7735], 12);

    // 3️⃣ 添加 OpenStreetMap 图层
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // 4️⃣ 读取 `data.json` 并添加到地图
    loadGeoJSON();
});

function loadGeoJSON() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            console.log("Geladene Daten:", data); // ✅ 输出数据检查

            // 5️⃣ 确保 `map` 变量已定义
            console.log("Map Object:", map);
            if (!map) {
                console.error("❌ Fehler: map ist nicht definiert!");
                return;
            }

            // 6️⃣ 解析 GeoJSON 并添加到地图
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
}
