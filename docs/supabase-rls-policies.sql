begin;

alter table if exists public.plan_requests enable row level security;
alter table if exists public.pesapal_transactions enable row level security;

drop policy if exists "deny_direct_access_plan_requests" on public.plan_requests;
create policy "deny_direct_access_plan_requests"
  on public.plan_requests
  as restrictive
  for all
  to anon, authenticated
  using (false)
  with check (false);

drop policy if exists "deny_direct_access_pesapal_transactions" on public.pesapal_transactions;
create policy "deny_direct_access_pesapal_transactions"
  on public.pesapal_transactions
  as restrictive
  for all
  to anon, authenticated
  using (false)
  with check (false);

commit;
