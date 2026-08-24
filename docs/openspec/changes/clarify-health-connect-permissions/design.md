# Design

- Derive a single `requiredPermissionsGranted` UI state from the repository's
  required permission set and the permissions currently granted by Health
  Connect.
- Show "Conceder permisos" while any required read permission is missing.
- Show "Gestionar permisos" with a granted-state treatment when all required
  read permissions are present; this action opens Health Connect settings.
- Use the activity resume lifecycle as the single refresh trigger after an
  external Health Connect screen closes. The permission result callback must
  not start a second refresh.
- Do not add, remove, or broaden any Health Connect permission.

