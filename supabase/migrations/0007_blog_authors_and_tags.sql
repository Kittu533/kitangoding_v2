alter table if exists blog_posts
  add column if not exists author varchar(120) not null default 'Tim kitangoding',
  add column if not exists tags text[] not null default '{}';
