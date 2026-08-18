# Primera validación en el teléfono

## Objetivo

Comprobar qué aplicaciones aportan cada tipo de dato a Health Connect y si hay
datos de un día reciente. No se recopilan valores, alimentos, horas exactas,
rutas ni capturas con mediciones.

No necesitas instalar Android Studio, ADB ni una aplicación nueva para este
paso.

## Qué hacer

1. Abre **Health Connect** en el teléfono. En Android 14 o posterior también
   puedes llegar desde Ajustes > Seguridad y privacidad > Privacidad > Health
   Connect.
2. Abre **Permisos de aplicaciones** y comprueba qué aplicaciones tienen acceso
   a los grupos de datos relevantes.
3. En la vista de datos de Health Connect, revisa solamente estas categorías
   exactas de la pantalla: **Steps**, **Sleep**, **Weight**, **Nutrition** y
   **Resting heart rate**. Para cada una, abre las entradas y revisa ayer y
   anteayer. Apunta solo si ambos días aparecen y el nombre de la aplicación
   que figura como fuente.
4. Comprueba que no has dado permisos de rutas de ejercicio para este proyecto.
   No abras ni compartas rutas.

## Respuesta que necesito

Pega este formulario y completa solo nombres de aplicaciones y presencia de
datos. No incluyas cifras, fechas exactas, alimentos, peso, capturas de valores
ni capturas de mapas.

```text
Steps — ayer y anteayer: ambos / solo uno / ninguno; fuentes visibles:
Sleep — ayer y anteayer: ambos / solo uno / ninguno; fuentes visibles:
Weight — ayer y anteayer: ambos / solo uno / ninguno; fuentes visibles:
Nutrition — ayer y anteayer: ambos / solo uno / ninguno; fuentes visibles:
Nutrition — energía/proteína/carbohidratos/grasa: completas / parciales:
Resting heart rate — ayer y anteayer: ambos / solo uno / ninguno; fuentes visibles:
```

## Qué haremos con el resultado

El primer lector de Health Connect solicitará solo los grupos confirmados y
conservará la procedencia de cada bloque. Si un grupo no tiene datos, el resumen
diario dirá `unavailable`; no lo convertirá en cero.

Los nombres visibles de aplicaciones son suficientes para esta validación. Una
implementación posterior resolverá la procedencia técnica en tiempo de
ejecución, porque Health Connect guarda un origen de datos por registro.

## Referencias

- [Acceso a Health Connect en Android 14+](https://developer.android.com/health-and-fitness/health-connect/availability)
- [Origen y atribución de datos](https://developer.android.com/health-and-fitness/health-connect/ui/data)
- [Formato de datos y origen de cada registro](https://developer.android.com/health-and-fitness/health-connect/data-format)
