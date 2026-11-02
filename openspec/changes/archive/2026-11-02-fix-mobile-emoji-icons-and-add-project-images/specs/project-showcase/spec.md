# Spec Delta

## ADDED Requirements

### Requirement: Assets de imágenes de proyecto

Las imágenes de proyecto SHALL almacenarse en formato WebP dentro de `public/proyect-images/`.

Los nombres de archivo SHALL ser estables y descriptivos, usando el patrón `<coleccion><numero>.webp` para las capturas de una misma aplicación.

#### Scenario: Capturas de thediary

- **WHEN** se añaden capturas de la aplicación thediary al portfolio
- **THEN** se guardan como `thediary1.webp`, `thediary2.webp`, `thediary3.webp` y `thediary4.webp` en `public/proyect-images/`

#### Scenario: Capturas de kanso

- **WHEN** se añaden capturas de la aplicación kanso al portfolio
- **THEN** se guardan como `kanso1.webp`, `kanso2.webp` y `kanso3.webp` en `public/proyect-images/`

#### Scenario: Referencia desde la galería

- **WHEN** un proyecto referencia una de estas imágenes por su nombre
- **THEN** la galería la carga desde `/proyect-images/<nombre>.webp`
