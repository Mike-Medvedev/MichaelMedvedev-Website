-- Activities are public to read; only the server's service-role key can write.
begin;
alter table public.activities enable row level security;
create policy "Public can read activities"
  on public.activities for select to anon, authenticated using (true);
commit;
