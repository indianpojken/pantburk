export function getCategory(settings, category) {
  return settings.categories.filter(c =>
    c.category === category
  )[0]
}

export function getDay(settings, day) {
  return settings.days.filter(d =>
    d.day === day
  )[0]
}
