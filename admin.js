// АДМИН-ФУНКЦИИ (добавь после всех переменных)
window.activateAdmin = function(key) {
    if (key === "MineBuffAdmin2024") {
        console.log("%c✅ АДМИН-РЕЖИМ АКТИВИРОВАН!", "color: #00ff00; font-size: 14px;");
        console.log("Доступны: giveDiamonds(N), giveOre(N), setGameLevel(N), showValues()");
        window.isAdmin = true;
    } else {
        console.log("%c❌ Неверный ключ!", "color: #ff0000;");
    }
};

window.giveDiamonds = function(amount) {
    if (!window.isAdmin) { console.log("❌ Сначала активируй админ-режим!"); return; }
    _diamonds += amount;
    saveGame();
    updateUI();
    showToast(`💎 +${amount} алмазов (админ)`, "#aaffdd");
};

window.giveOre = function(amount) {
    if (!window.isAdmin) { console.log("❌ Сначала активируй админ-режим!"); return; }
    _ore += amount;
    saveGame();
    updateUI();
    showToast(`⛏️ +${amount} руды (админ)`, "#ffdd99");
};

window.setGameLevel = function(level) {
    if (!window.isAdmin) { console.log("❌ Сначала активируй админ-режим!"); return; }
    _level = level;
    saveGame();
    updateUI();
    showToast(`⭐ Уровень ${level} (админ)`, "#ffcc66");
};

window.showValues = function() {
    if (!window.isAdmin) { console.log("❌ Сначала активируй админ-режим!"); return; }
    console.log("📊 ТЕКУЩИЕ ЗНАЧЕНИЯ:");
    console.log(`   👤 Имя: ${_playerName}`);
    console.log(`   🆔 ID: ${_playerId}`);
    console.log(`   ⛏️ Руда: ${_ore}`);
    console.log(`   💎 Алмазы: ${_diamonds}`);
    console.log(`   ⭐ Уровень: ${_level}`);
    console.log(`   💥 Ударов сегодня: ${_strikesDone}/${_strikesLimit}`);
    console.log(`   📊 Ударов за неделю: ${_weeklyStrikes}`);
    console.log(`   🔧 Кирка: ${_pickaxeLevel}/5`);
};

window.forceSync = async function() {
    if (!window.isAdmin) { console.log("❌ Сначала активируй админ-режим!"); return; }
    console.log("🔄 Принудительная синхронизация...");
    if (supabaseClient) {
        await syncToSupabase();
        await syncWeeklyStrikes();
        await loadTopFromSupabase();
        await loadWeeklyTop();
        console.log("✅ Синхронизация завершена!");
        showToast("✅ Синхронизация завершена!", "#aaffdd");
    } else {
        console.log("❌ Supabase не подключён!");
    }
};