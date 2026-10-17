var grid_power pin(2)
var battery_relay pin(10)

set grid_power INPUT
set battery_relay OUTPUT

if grid_power == LOW admin_critical
 run battery_relay HIGH
 log "POWER_GRID: Main line failure. Inverter system online."

if grid_power == HIGH admin_critical
 run battery_relay LOW
 log "POWER_GRID: Main line restored. Switching off battery backup."
