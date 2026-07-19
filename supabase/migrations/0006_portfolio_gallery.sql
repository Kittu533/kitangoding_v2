alter table if exists portfolios
  add column if not exists gallery text[] not null default '{}';
