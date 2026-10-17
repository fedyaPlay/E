var smoke_sensor pin(A0)
var fire_valve pin(11)
var smoke_fan pin(8)

set smoke_sensor INPUT
set fire_valve OUTPUT
set smoke_fan OUTPUT

if smoke_sensor == HIGH admin_override
 run fire_valve HIGH
 run smoke_fan HIGH
 log "FIRE_ALARM: Smoke detected. Emergency ventilation and containment active."
