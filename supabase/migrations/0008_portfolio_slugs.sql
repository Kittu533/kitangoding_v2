alter table if exists portfolios
  add column if not exists slug varchar(255);

with normalized as (
  select
    id,
    coalesce(
      nullif(trim(both '-' from regexp_replace(lower(name), '[^a-z0-9]+', '-', 'g')), ''),
      'portfolio'
    ) as base_slug
  from portfolios
), ranked as (
  select
    id,
    base_slug,
    row_number() over (partition by base_slug order by id) as position
  from normalized
)
update portfolios as portfolio
set slug = case
  when ranked.position = 1 then ranked.base_slug
  else left(ranked.base_slug, 253 - length(ranked.position::text)) || '-' || ranked.position
end
from ranked
where portfolio.id = ranked.id and portfolio.slug is null;

alter table if exists portfolios
  alter column slug set not null;

create unique index if not exists portfolios_slug_unique on portfolios (slug);
