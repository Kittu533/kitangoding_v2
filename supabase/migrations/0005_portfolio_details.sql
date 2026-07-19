alter table if exists portfolios
  add column if not exists role varchar(255),
  add column if not exists features text[] not null default '{}';
