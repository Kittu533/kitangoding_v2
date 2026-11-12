-- Track when a portfolio project was last edited so the sitemap can publish an honest <lastmod>.
-- Existing rows have no edit history, so they start from their creation time. The backfill only
-- runs when the column is first added; re-running this file never overwrites real edit times.
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema = current_schema() and table_name = 'portfolios')
     and not exists (
       select 1 from information_schema.columns
       where table_schema = current_schema() and table_name = 'portfolios' and column_name = 'updated_at'
     ) then
    alter table portfolios add column updated_at timestamp not null default now();
    update portfolios set updated_at = created_at;
  end if;
end
$$;
