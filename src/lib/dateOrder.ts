const MONTHS: Record<string, number> = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  setiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

/**
 * Parses dates stored as "Mes YYYY" (e.g. "Mayo 2025") into a sortable number.
 * Returns 0 for empty or unparseable values so they sink to the bottom.
 */
export function parseSpanishDate(value?: string): number {
  if (!value) return 0;

  const match = value.trim().toLowerCase().match(/^([a-záéíóúñ]+)\s+(\d{4})$/);
  if (!match) return 0;

  const month = MONTHS[match[1]];
  const year = Number(match[2]);

  if (month === undefined || Number.isNaN(year)) return 0;

  return year * 12 + month;
}
