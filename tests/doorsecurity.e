var door_sensor pin(4)
var deadbolt_lock pin(12)
var alarm_buzzer pin(A4)

set door_sensor INPUT
set deadbolt_lock OUTPUT
set alarm_buzzer OUTPUT

if door_sensor == HIGH admin_critical
 run deadbolt_lock HIGH
 run alarm_buzzer HIGH
 log "SECURITY: Unauthorized access breach. Perimeter locks engaged."
