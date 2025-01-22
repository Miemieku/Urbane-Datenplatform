document.addEventListener("DOMContentLoaded", function() {
    // 1️⃣ 创建地图，中心点设为 Düsseldorf
    var map = L.map('map').setView([51.2277, 6.7735], 12);

    // 2️⃣ 添加 OpenStreetMap 瓦片图层
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
});
// 读取 data.json 并加载到地图
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        console.log("Geladene Daten:", data); // 🔹 先输出 JSON 数据到 Konsole

        // 检查数据是否符合 GeoJSON 规范
        if (!data || !data.features || !Array.isArray(data.features)) {
            console.error("Fehler: Die Daten sind kein gültiges GeoJSON-Format", data);
            return;
        }

        let geoLayer = L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                console.log("Feature:", feature); // 🔹 输出每个地理对象
                layer.bindPopup(`
                    <b>${feature.properties.name}</b><br>
                    Luftqualität: ${feature.properties.air_quality}<br>
                    Verkehrslage: ${feature.properties.traffic}
                `);
            }
        }).addTo(map);
        
        console.log("GeoJSON Layer:", geoLayer);
    })
    .catch(error => console.error("Fehler beim Laden der Daten:", error));

