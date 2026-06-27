
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin')
    on conflict do nothing;
  else
    insert into public.user_roles (user_id, role) values (new.id, 'user')
    on conflict do nothing;
  end if;
  return new;
end; $$;

create trigger on_auth_user_created
after insert on auth.users for each row execute function public.handle_new_user();
