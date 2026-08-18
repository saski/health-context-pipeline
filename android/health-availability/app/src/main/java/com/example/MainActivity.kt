package com.example

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.runtime.getValue
import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.PermissionController
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.data.repository.RealHealthConnectRepository
import com.example.ui.HealthAvailabilityScreen
import com.example.ui.HealthAvailabilityViewModel
import com.example.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {

    private val viewModel: HealthAvailabilityViewModel by viewModels {
        HealthAvailabilityViewModel.provideFactory(RealHealthConnectRepository(applicationContext))
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            MyApplicationTheme {
                val uiState by viewModel.uiState.collectAsStateWithLifecycle()

                val permissionLauncher = rememberLauncherForActivityResult(
                    contract = PermissionController.createRequestPermissionResultContract()
                ) {
                    viewModel.refresh()
                }

                HealthAvailabilityScreen(
                    uiState = uiState,
                    onRefresh = { viewModel.refresh() },
                    onSelectTab = { viewModel.selectTab(it) },
                    onRequestPermissions = {
                        val required = viewModel.getRequiredPermissions()
                        permissionLauncher.launch(required)
                    },
                    onOpenPlayStoreOrSettings = {
                        openHealthConnectSettingsOrStore()
                    },
                    onShowDataBoundaries = { viewModel.showDataBoundaries(it) }
                )
            }
        }
    }

    override fun onResume() {
        super.onResume()
        viewModel.checkSdkStatus()
    }

    private fun openHealthConnectSettingsOrStore() {
        try {
            // Intentar abrir la pantalla de ajustes de Health Connect
            val settingsIntent = Intent(HealthConnectClient.ACTION_HEALTH_CONNECT_SETTINGS)
            startActivity(settingsIntent)
        } catch (e: Exception) {
            try {
                // Si no está disponible como configuración del sistema, abrir Play Store
                val playStoreIntent = Intent(
                    Intent.ACTION_VIEW,
                    Uri.parse("market://details?id=com.google.android.apps.healthdata&url=healthconnect%3A%2F%2Fonboarding")
                )
                startActivity(playStoreIntent)
            } catch (e2: Exception) {
                val browserIntent = Intent(
                    Intent.ACTION_VIEW,
                    Uri.parse("https://play.google.com/store/apps/details?id=com.google.android.apps.healthdata")
                )
                startActivity(browserIntent)
            }
        }
    }
}
