// 1️⃣ 创建一个全局变量 `map`
var map;

document.addEventListener("DOMContentLoaded", function() {
    // 2️⃣ 当网页加载完成后，执行这个函数
map = L.map('map', {
    center: [51.2277, 6.7735],
    zoom: 12,
    zoomControl: true // ✅ 确保放大缩小按钮开启
});

    // 3️⃣ 加载地图瓦片（OpenStreetMap）
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // 4️⃣ 读取 `data.json` 并加载数据
    loadGeoJSON();

    // 🔹 新增：侧边栏控制逻辑
    var menuToggle = document.getElementById("menu-toggle");
    var closeSidebar = document.getElementById("close-sidebar");
    var sidebar = document.getElementById("sidebar-container");

    // 🔹 点击菜单按钮 (☰) 时，打开侧边栏
    menuToggle.addEventListener("click", function() {
        sidebar.classList.add("active");
    });

    // 🔹 点击关闭按钮 (×) 时，隐藏侧边栏
    closeSidebar.addEventListener("click", function() {
        sidebar.classList.remove("active");
    });

    // 🔹 点击页面其他区域时，自动关闭侧边栏
    document.addEventListener("click", function(event) {
        if (!sidebar.contains(event.target) && event.target !== menuToggle) {
            sidebar.classList.remove("active");
        }
    });
});

function loadGeoJSON() {
    fetch('data.json')  // 5️⃣ 发送请求，获取 `data.json`
        .then(response => response.json()) // 6️⃣ 解析 JSON 数据
        .then(data => {
            console.log("Geladene Daten:", data); // 7️⃣ 在 Console 里打印数据，方便调试

            // 8️⃣ 确保 `map` 存在，否则停止执行
            console.log("Map Object:", map);
            if (!map) {
                console.error("❌ Fehler: map ist nicht definiert!");
                return;
            }

            // 9️⃣ 在地图上加载 `data.json` 里的点
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
        .catch(error => console.error("Fehler beim Laden der Daten:", error)); // 10️⃣ 处理错误（比如 `data.json` 文件不存在）
}
