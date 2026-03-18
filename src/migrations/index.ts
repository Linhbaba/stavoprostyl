import * as migration_20250306_initial from './20250306_initial'
import * as migration_20250307_add_seo_footer from './20250307_add_seo_footer'
import * as migration_20250308_seo_og_services from './20250308_seo_og_services'

export const migrations = [
  { up: migration_20250306_initial.up, down: migration_20250306_initial.down, name: '20250306_initial' },
  { up: migration_20250307_add_seo_footer.up, down: migration_20250307_add_seo_footer.down, name: '20250307_add_seo_footer' },
  { up: migration_20250308_seo_og_services.up, down: migration_20250308_seo_og_services.down, name: '20250308_seo_og_services' },
]
