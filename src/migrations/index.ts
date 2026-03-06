import * as migration_20250306_initial from './20250306_initial'

export const migrations = [
  {
    up: migration_20250306_initial.up,
    down: migration_20250306_initial.down,
    name: '20250306_initial',
  },
]
