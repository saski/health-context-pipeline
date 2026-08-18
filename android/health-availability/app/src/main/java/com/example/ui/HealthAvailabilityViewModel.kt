package com.example.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.data.model.HealthUiState
import com.example.data.model.SelectedDayTab
import com.example.data.repository.HealthConnectRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId

class HealthAvailabilityViewModel(
    private val repository: HealthConnectRepository,
    private val zoneId: ZoneId = ZoneId.systemDefault()
) : ViewModel() {

    private val _uiState = MutableStateFlow(HealthUiState())
    val uiState: StateFlow<HealthUiState> = _uiState.asStateFlow()

    init {
        checkSdkStatus()
    }

    fun checkSdkStatus() {
        val status = repository.getSdkAvailability()
        _uiState.update { it.copy(sdkAvailability = status) }
    }

    fun selectTab(tab: SelectedDayTab) {
        _uiState.update { it.copy(selectedTab = tab) }
    }

    fun showDataBoundaries(show: Boolean) {
        _uiState.update { it.copy(showDataBoundaries = show) }
    }

    fun getRequiredPermissions(): Set<String> {
        return repository.getRequiredPermissions()
    }

    fun refresh() {
        viewModelScope.launch {
            _uiState.update { it.copy(isRefreshing = true, errorMessage = null) }
            try {
                val sdkStatus = repository.getSdkAvailability()
                val granted = repository.getGrantedPermissions()

                val todayDate = LocalDate.now(zoneId)
                val yesterdayDate = todayDate.minusDays(1)

                val todayReport = repository.loadDayAvailability(todayDate, zoneId)
                val yesterdayReport = repository.loadDayAvailability(yesterdayDate, zoneId)

                _uiState.update {
                    it.copy(
                        sdkAvailability = sdkStatus,
                        grantedPermissions = granted,
                        todayReport = todayReport,
                        yesterdayReport = yesterdayReport,
                        lastRefreshed = Instant.now(),
                        isRefreshing = false
                    )
                }
            } catch (e: Exception) {
                _uiState.update {
                    it.copy(
                        isRefreshing = false,
                        errorMessage = "Error al leer Health Connect: ${e.localizedMessage ?: "desconocido"}"
                    )
                }
            }
        }
    }

    companion object {
        fun provideFactory(
            repository: HealthConnectRepository,
            zoneId: ZoneId = ZoneId.systemDefault()
        ): ViewModelProvider.Factory = object : ViewModelProvider.Factory {
            @Suppress("UNCHECKED_CAST")
            override fun <T : ViewModel> create(modelClass: Class<T>): T {
                return HealthAvailabilityViewModel(repository, zoneId) as T
            }
        }
    }
}
