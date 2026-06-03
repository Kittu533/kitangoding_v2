create table if not exists blog_categories (
  id text primary key,
  name varchar(120) not null unique,
  slug varchar(160) not null unique,
  created_at timestamp not null default now()
);

insert into blog_categories (id, name, slug, created_at)
values
  (gen_random_uuid()::text, 'Tips Bisnis', 'tips-bisnis', now()),
  (gen_random_uuid()::text, 'Digital Marketing', 'digital-marketing', now()),
  (gen_random_uuid()::text, 'Web Development', 'web-development', now()),
  (gen_random_uuid()::text, 'Studi Kasus', 'studi-kasus', now()),
  (gen_random_uuid()::text, 'UI/UX', 'ui-ux', now()),
  (gen_random_uuid()::text, 'Strategi Branding', 'strategi-branding', now())
on conflict (slug) do nothing;
