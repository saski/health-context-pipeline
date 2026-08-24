# Clarify Health Connect permissions

The Android dashboard currently keeps showing "Conceder permisos" after every
required Health Connect read permission has been granted. Returning from the
permission flow can also trigger the same foreground refresh twice.

Change the permission action to reflect the actual state and refresh only once
when control returns to the app.

