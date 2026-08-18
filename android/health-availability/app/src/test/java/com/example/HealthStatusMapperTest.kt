package com.example

import com.example.data.model.GenericRecordData
import com.example.data.model.HealthAvailabilityStatus
import com.example.data.model.HealthDomain
import com.example.data.model.HealthStatusMapper
import com.example.data.model.StepsDomainData
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import java.time.LocalDate
import java.time.ZoneId

class HealthStatusMapperTest {

    @Test
    fun `when permission is missing for steps domain status is PERMISSION_NEEDED`() {
        val result = HealthStatusMapper.mapStepsDomain(
            StepsDomainData(
                isPermissionGranted = false,
                totalSteps = null
            )
        )
        assertEquals(HealthAvailabilityStatus.PERMISSION_NEEDED, result.status)
        assertEquals(HealthStatusMapper.SOURCE_NOT_AVAILABLE, result.source)
        assertEquals(HealthStatusMapper.NO_USABLE_RECORD, result.coveredThrough)
        assertEquals("Permiso de lectura de pasos no concedido", result.reason)
    }

    @Test
    fun `when steps record is missing status is UNAVAILABLE and never maps to zero as error`() {
        val result = HealthStatusMapper.mapStepsDomain(
            StepsDomainData(
                isPermissionGranted = true,
                totalSteps = null
            )
        )
        assertEquals(HealthAvailabilityStatus.UNAVAILABLE, result.status)
        assertEquals(HealthStatusMapper.SOURCE_NOT_AVAILABLE, result.source)
        assertEquals(HealthStatusMapper.NO_USABLE_RECORD, result.coveredThrough)
        assertNull(result.metricSummary)
    }

    @Test
    fun `when aggregate steps are present status is AVAILABLE with correct aggregate provenance`() {
        val result = HealthStatusMapper.mapStepsDomain(
            StepsDomainData(
                isPermissionGranted = true,
                totalSteps = 7500L,
                dataOrigins = setOf("com.google.android.apps.fitness", "com.samsung.health")
            )
        )
        assertEquals(HealthAvailabilityStatus.AVAILABLE, result.status)
        assertTrue(result.source.contains("com.google.android.apps.fitness"))
        assertTrue(result.source.contains("com.samsung.health"))
        assertEquals("7500 pasos agregados", result.metricSummary)
    }

    @Test
    fun `when sleep wearable was not worn or did not sync status is UNAVAILABLE not error`() {
        val result = HealthStatusMapper.mapSleepDomain(
            GenericRecordData(
                isPermissionGranted = true,
                hasRecord = false
            )
        )
        assertEquals(HealthAvailabilityStatus.UNAVAILABLE, result.status)
        assertEquals(HealthStatusMapper.SOURCE_NOT_AVAILABLE, result.source)
        assertEquals(HealthStatusMapper.NO_USABLE_RECORD, result.coveredThrough)
        assertEquals("Dispositivo no utilizado o sin sincronización de sesión de sueño", result.reason)
    }

    @Test
    fun `when sleep permission is missing status is PERMISSION_NEEDED`() {
        val result = HealthStatusMapper.mapSleepDomain(
            GenericRecordData(
                isPermissionGranted = false,
                hasRecord = false
            )
        )
        assertEquals(HealthAvailabilityStatus.PERMISSION_NEEDED, result.status)
        assertEquals("Permiso de lectura de sueño no concedido", result.reason)
    }

    @Test
    fun `when weight measurement is missing status is UNAVAILABLE as event-based absence`() {
        val result = HealthStatusMapper.mapWeightDomain(
            GenericRecordData(
                isPermissionGranted = true,
                hasRecord = false
            )
        )
        assertEquals(HealthAvailabilityStatus.UNAVAILABLE, result.status)
        assertEquals("Sin medición puntual de peso registrada en este día", result.reason)
    }

    @Test
    fun `when nutrition is not manually logged status is UNAVAILABLE not ingestion failure`() {
        val result = HealthStatusMapper.mapNutritionDomain(
            GenericRecordData(
                isPermissionGranted = true,
                hasRecord = false
            )
        )
        assertEquals(HealthAvailabilityStatus.UNAVAILABLE, result.status)
        assertEquals("Sin registro nutricional manual en este día", result.reason)
    }

    @Test
    fun `when resting heart rate is not synced status is UNAVAILABLE and never zero`() {
        val result = HealthStatusMapper.mapRestingHeartRateDomain(
            GenericRecordData(
                isPermissionGranted = true,
                hasRecord = false
            )
        )
        assertEquals(HealthAvailabilityStatus.UNAVAILABLE, result.status)
        assertEquals("Dispositivo no utilizado o sin sincronización de frecuencia en reposo", result.reason)
    }

    @Test
    fun `overall status is COMPLETE only when all 5 domains are AVAILABLE`() {
        val date = LocalDate.of(2026, 8, 18)
        val zone = ZoneId.of("Europe/Madrid")

        val allFiveAvailable = listOf(
            HealthStatusMapper.mapStepsDomain(StepsDomainData(true, 5000L)),
            HealthStatusMapper.mapSleepDomain(GenericRecordData(true, true, extraFactualInfo = "7h")),
            HealthStatusMapper.mapWeightDomain(GenericRecordData(true, true, extraFactualInfo = "70kg")),
            HealthStatusMapper.mapNutritionDomain(GenericRecordData(true, true, extraFactualInfo = "Comida")),
            HealthStatusMapper.mapRestingHeartRateDomain(GenericRecordData(true, true, extraFactualInfo = "60bpm"))
        )

        val reportComplete = HealthStatusMapper.buildDayReport(date, zone, allFiveAvailable)
        assertEquals(HealthAvailabilityStatus.AVAILABLE, reportComplete.overallStatus)
        assertTrue(reportComplete.unavailableDomains.isEmpty())
    }

    @Test
    fun `overall status is PARTIAL when any domain is missing and lists unavailable domains`() {
        val date = LocalDate.of(2026, 8, 18)
        val zone = ZoneId.of("Europe/Madrid")

        val partialDomains = listOf(
            HealthStatusMapper.mapStepsDomain(StepsDomainData(true, 5000L)),
            HealthStatusMapper.mapSleepDomain(GenericRecordData(true, false)), // UNAVAILABLE
            HealthStatusMapper.mapWeightDomain(GenericRecordData(true, true, extraFactualInfo = "70kg")),
            HealthStatusMapper.mapNutritionDomain(GenericRecordData(false, false)), // PERMISSION_NEEDED
            HealthStatusMapper.mapRestingHeartRateDomain(GenericRecordData(true, true, extraFactualInfo = "60bpm"))
        )

        val reportPartial = HealthStatusMapper.buildDayReport(date, zone, partialDomains)
        assertEquals(HealthAvailabilityStatus.PARTIAL, reportPartial.overallStatus)
        assertEquals(2, reportPartial.unavailableDomains.size)
        assertTrue(reportPartial.unavailableDomains.contains(HealthDomain.SLEEP))
        assertTrue(reportPartial.unavailableDomains.contains(HealthDomain.NUTRITION))
    }
}
