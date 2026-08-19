# Guía de uso: contexto diario de salud

## Qué resuelve este proyecto

El objetivo es que puedas hablar en el proyecto ChatGPT **health** sobre tu
estado reciente sin recopilar capturas ni copiar datos cada día. La conversación
debe saber qué datos tiene, de qué fecha son y qué partes faltan.

No es una herramienta de diagnóstico ni sustituye a un profesional sanitario.

## Estado actual

La carpeta conectada de Google Drive se llama **Health context**. La app Android
puede escribir allí un resumen diario explícito y ChatGPT Health ha demostrado
que puede leer uno real, conservando su procedencia y sus huecos.

La exportación manual en primer plano ya está validada. La siguiente versión
añade sincronización diaria opcional: tras conceder una vez la lectura de
Health Connect en segundo plano, Android exportará el día anterior durante una
ventana flexible por la mañana. La app no envía datos mediante una conexión
propia; escribe a través del proveedor de documentos en la carpeta elegida.

## Formato para conversar

El formato seleccionado para conversar es un archivo Markdown por día:

```text
health-context-AAAA-MM-DD.md
```

Ejemplo: `health-context-2026-08-18.md` describiría ese día y se guardaría en
la carpeta **Health context** conectada al proyecto ChatGPT **health**.

ChatGPT leyó correctamente tanto este formato como una hoja sintética
equivalente. Se elige Markdown porque cada día queda como un snapshot completo
e inmutable y se puede generar sin mantener una API, fórmulas ni reglas de
actualización de Google Sheets. Una hoja de cálculo podrá añadirse más adelante
para análisis personal, pero no será una segunda copia canónica de los datos.

Sea cual sea el formato final, el contexto para conversar contendrá únicamente
lo necesario, no una copia completa de todos los registros. Incluirá:

- la fecha a la que se refiere;
- cuándo se creó el resumen;
- hasta qué momento llegan los datos;
- si está completo o parcial;
- actividad diaria, entrenamientos, sueño, cuerpo, nutrición e indicadores
  cuando estén disponibles;
- la fuente de cada bloque; y
- datos ausentes, retrasados o conflictivos.

## Rutina diaria recomendada

Después de instalar y activar la sincronización automática una vez:

1. Android intentará exportar **ayer** cada mañana, aproximadamente a las
   09:00; la hora exacta puede retrasarse por batería o planificación del sistema.
2. Comprueba la app solo si el archivo de ayer no aparece dentro del plazo
   diario esperado.
3. En el proyecto ChatGPT **health**, pide el resumen del archivo de ayer y sus
   huecos. Solo trata como conclusión los dominios disponibles o parciales.

Los botones de actualización y exportación manual quedan como recuperación.
Puedes exportar **Hoy** para una consulta puntual, pero el propio archivo se
declarará un snapshot parcial: no representa el día completo.

## Dónde consumir la información

Abre el proyecto ChatGPT **health** y empieza un chat nuevo. Formula la pregunta
directamente; no necesitas adjuntar el archivo si la fuente aparece conectada.

Ejemplos útiles:

```text
Usa las fuentes del proyecto. Resume el contexto de salud del último día
completo e indica primero qué datos faltan o están retrasados.
```

```text
Usa las fuentes del proyecto. ¿Qué cambió entre los últimos siete resúmenes de
sueño y actividad? Distingue los datos observados de cualquier interpretación.
```

```text
Usa las fuentes del proyecto. ¿La nutrición del último día está completa? No
supongas cero cuando falte un nutriente.
```

## Cómo interpretar el estado del archivo

| Campo | Significado | Qué hacer |
| --- | --- | --- |
| `Data covered through` | Último instante que alcanzan los datos. | No saques conclusiones posteriores a ese instante. |
| `Overall status: complete` | Todas las secciones incluidas llegaron y no reportan huecos. | Es apto para una conversación de ese día. |
| `Overall status: partial` | Falta alguna sección, hay retraso o hay un hueco conocido. | Pide a ChatGPT que señale primero las limitaciones. |
| `Freshness: stale` | Esa sección no está al día. | No la trates como información actual. |
| `Coverage: unavailable` | No hay datos utilizables para esa sección. | No equivale a cero ni a una ausencia de actividad. |
| `Synthetic data: yes` | Archivo de prueba. | Nunca lo uses para valorar tu salud. |

## Si no aparece el resumen esperado

1. Comprueba que estás dentro del proyecto **health**, no en un chat general.
2. Pide a ChatGPT el archivo del día exacto, por ejemplo
   `health-context-AAAA-MM-DD.md`.
3. Si no lo localiza, espera hasta el siguiente día antes de tratarlo como un
   fallo: la fuente está diseñada para datos diarios, no para actualización
   inmediata.
4. Si pasado el límite diario acordado sigue sin aparecer, comunica la fecha y
   la hora. No hace falta compartir valores de salud.

## Privacidad

No subas exportaciones, capturas, credenciales ni valores médicos a este
repositorio. La app escribe el resumen únicamente en la carpeta que eliges con
el selector Android; el repositorio no guarda los datos reales.

## Fuentes confirmadas hasta ahora

Sin guardar valores personales, la comprobación en el teléfono confirmó estas
fuentes visibles:

- actividad: Fit, Nothing X, Nothing Phone 3a Pro y Zepp;
- sueño e indicadores: Nothing X;
- cuerpo y nutrición: Zepp.

La actividad se resumirá mediante los agregados diarios de Health Connect para
evitar elegir erróneamente entre fuentes que se solapan. Las rutas de ejercicio
están fuera de alcance: el proyecto no las solicitará ni las incluirá. Las
sesiones de entrenamiento sí forman parte del contexto y se leen sin rutas:
tipo, intervalo, duración, fuente y métricas asociadas disponibles.

La versión de cobertura amplia agrupa los datos así:

- actividad: pasos, calorías, distancia, desnivel, pisos y cadencia;
- entrenamientos: todas las sesiones del día, incluidas elíptica, carrera,
  fuerza, ciclismo y otras actividades que escriba la fuente;
- sueño: todas las sesiones y su duración;
- cuerpo: peso y composición corporal disponible;
- nutrición: cada alimento distinto, nutrientes presentes e hidratación;
- indicadores: pulso, pulso en reposo, HRV, SpO2, respiración, VO2 max y
  mediciones clínicas disponibles.

Después de instalar esta ampliación hay que abrir la app una vez y conceder los
nuevos permisos de lectura. No se solicita ubicación, GPS ni rutas de ejercicio.

## Cobertura actual

El sistema no debe fingir que todos los bloques están disponibles. Ahora mismo
hay pasos recientes desde el teléfono; sueño y pulso en reposo no están llegando
porque Nothing X no se está llevando. Cuando la lleves y sincronice, esos datos
vuelven a ser esperables. El peso aparece solo en días de medición, lo cual es
normal. La nutrición funciona cuando la registras en Zepp: si no hay registro,
el informe debe decirlo con claridad.

Por tanto, un resumen real puede ser **parcial** y sigue siendo útil. Ausencia
de sueño, pulso o nutrición no significa cero ni un fallo de la app: significa
que ese bloque no puede respaldar una conclusión ese día.

## Qué viene ahora

El siguiente hito es validar en el teléfono que el archivo de ayer aparece sin
abrir la app. La iteración posterior hará accionables las tarjetas disponibles
y simplificará la interfaz; cuando un dominio tenga varias fuentes, pedirá cuál
abrir en vez de escoger una silenciosamente.
